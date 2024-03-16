package com.example.ewhaproject.controller;

import com.example.ewhaproject.VO.PostFileVO;
import com.example.ewhaproject.dto.*;
import com.example.ewhaproject.entity.Photo;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.service.KeywordService;
import com.example.ewhaproject.service.PhotoService;
import com.example.ewhaproject.service.PostService;
import com.example.ewhaproject.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private KeywordService keywordService;
    @Autowired
    private PhotoService fileService;

    @PostMapping("/posts") // 게시물 작성
    public ResponseEntity<PostDto> create(@RequestBody PostDto postDto, HttpSession session) {
        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");
        String name = userService.getNameById(userId);
        log.info("현재 로그인한 사용자의 id: {}", userId);
        try {
            postDto.setUserId(userId);
            postDto.setDate(PostDto.getCurrentFormattedDate());

            // 키워드를 게시물과 연결하기 위해 키워드를 생성하고 연결
            PostDto createdDto = postService.create(postDto);
            createdDto.setKeywords(postDto.getKeywords());
            return ResponseEntity.status(HttpStatus.OK).body(createdDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/post/edit/{postId}") // 게시물 수정
    public ResponseEntity<PostDto> updatePost(@PathVariable long postId, @RequestBody PostDto postDto) {
        try {
            postService.updatePostContent(postDto, postId);
            return ResponseEntity.status(HttpStatus.OK).body(postDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/posts") //전체 게시물 조회
    public ResponseEntity<List<PostDto>> getAllPosts() {
        try {
            List<PostDto> postDtoLists = postService.getAllPosts();
            return ResponseEntity.ok(postDtoLists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/posts/{postId}") //상세 게시물 조회
    public ResponseEntity<PostDto> getDetailPosts(@PathVariable Long postId) {
        try {
            Optional<Post> postOptional = postService.getPostByPostId(postId);
            if (postOptional.isPresent()) {
                Post post = postOptional.get();
                PostDto postDto = PostDto.createdPostDto(post);
                List<String> keywords = keywordService.findKeywordsByPostId(postId);
                postDto.setKeywords(keywords);
                return ResponseEntity.ok(postDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/close/{postId}") //공구 마감
    public ResponseEntity<String> closePost(@PathVariable Long postId){
        try {
            postService.closePost(postId);
            return new ResponseEntity<>("공구가 마감되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/bump/{postId}") //끝올
    public ResponseEntity<Void> bumpToLatest(@PathVariable Long postId) {
        try {
            postService.updatePostToLatest(postId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/products/seller") // 자신의 판매상품 확인
    public ResponseEntity<List<PostDto>> getPostByUserId(HttpSession session) {
        if (session != null) {
            // 세션에서 userId 가져오기
            String userId = (String) session.getAttribute("userId");
            log.info("현재 로그인한 사용자의 id: {}", userId);

            // userId를 이용하여 작성된 post들을 가져오는 로직 추가
            List<PostDto> myProducts = postService.findPostsByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(myProducts);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @PostMapping("/searchByKeyword")
    public ResponseEntity<List<PostDto>> getPostsByKeyword(@RequestBody KeywordDto keywordDto) {
        String keyword = keywordDto.getKeyword();

        // 키워드에 해당하는 포스트들을 가져옴
        List<PostDto> postDtos = postService.findPostsByKeyword(keyword);

        // 검색된 포스트들이 없는 경우
        if (postDtos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 컨텐츠가 없음을 의미하는 상태코드 204를 반환
        }

        return ResponseEntity.ok(postDtos); // 포스트들을 담은 응답 반환
    }

    @PostMapping("/board")
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(PostFileVO postFileVO) throws Exception {
        // Member id로 조회하는 메소드 존재한다고 가정하에 진행
        User user = userService.getNameById(postFileVO.getUserId());

        PostUpdateRequestDto requestDto =
                PostUpdateRequestDto.builder()
                        .user(user)
                        .title(postFileVO.getTitle())
                        .content(postFileVO.getContent())
                        .build();

        return postService.create(requestDto, postFileVO.getFiles());
    }

    @PutMapping("/board/{id}")
    public Long update(@PathVariable Long id, PostFileVO postFileVO) throws Exception {

        PostUpdateRequestDto requestDto =
                PostUpdateRequestDto.builder()
                        .title(postFileVO.getTitle())
                        .content(postFileVO.getContent())
                        .build();

        // DB에 저장되어있는 파일 불러오기
        List<Photo> dbPhotoList = fileService.findAllByBoard(id);
        // 전달되어온 파일들
        List<MultipartFile> multipartList = postFileVO.getFiles();
        // 새롭게 전달되어온 파일들의 목록을 저장할 List 선언
        List<MultipartFile> addFileList = new ArrayList<>();

        if (CollectionUtils.isEmpty(dbPhotoList)) { // DB에 아예 존재 x
            if (!CollectionUtils.isEmpty(multipartList)) { // 전달되어온 파일이 하나라도 존재
                for (MultipartFile multipartFile : multipartList)
                    addFileList.add(multipartFile);    // 저장할 파일 목록에 추가
            }
        } else {  // DB에 한 장 이상 존재
            if (CollectionUtils.isEmpty(multipartList)) { // 전달되어온 파일 아예 x
                // 파일 삭제
                for (Photo dbPhoto : dbPhotoList)
                    fileService.deletePhoto(dbPhoto.getId());
            } else {  // 전달되어온 파일 한 장 이상 존재

                // DB에 저장되어있는 파일 원본명 목록
                List<String> dbOriginNameList = new ArrayList<>();

                // DB의 파일 원본명 추출
                for (Photo dbPhoto : dbPhotoList) {
                    // file id로 DB에 저장된 파일 정보 얻어오기
                    PhotoDto dbPhotoDto = fileService.findByFileId(dbPhoto.getId());
                    // DB의 파일 원본명 얻어오기
                    String dbOrigFileName = dbPhotoDto.getOrigFileName();

                    if (!multipartList.contains(dbOrigFileName))  // 서버에 저장된 파일들 중 전달되어온 파일이 존재하지 않는다면
                        fileService.deletePhoto(dbPhoto.getId());  // 파일 삭제
                    else  // 그것도 아니라면
                        dbOriginNameList.add(dbOrigFileName);    // DB에 저장할 파일 목록에 추가
                }

                for (MultipartFile multipartFile : multipartList) { // 전달되어온 파일 하나씩 검사
                    // 파일의 원본명 얻어오기
                    String multipartOrigName = multipartFile.getOriginalFilename();
                    if (!dbOriginNameList.contains(multipartOrigName)) {   // DB에 없는 파일이면
                        addFileList.add(multipartFile); // DB에 저장할 파일 목록에 추가
                    }
                }
            }

        }
    }

    /**
     * 개별 조회
     */
    @GetMapping("/board/{id}")
    public PostResponseDto searchById(@PathVariable Long id) {

        // 게시글 id로 해당 게시글 첨부파일 전체 조회
        List<PhotoResponseDto> photoResponseDtoList =
                fileService.findAllByBoard(id);
        // 게시글 첨부파일 id 담을 List 객체 생성
        List<Long> photoId = new ArrayList<>();
        // 각 첨부파일 id 추가
        for(PhotoResponseDto photoResponseDto : photoResponseDtoList)
            photoId.add(photoResponseDto.getFileId());

        // 게시글 id와 첨부파일 id 목록 전달받아 결과 반환
        return postService.searchById(id, photoId);
    }

    /**
     * 전체 조회(목록)
     */
    @GetMapping("/board")
    public List<PostListResponseDto> searchAllDesc() {

        // 게시글 전체 조회
        List<Post> postList = postService.searchAllDesc();
        // 반환할 List<BoardListResponseDto> 생성
        List<PostListResponseDto> responseDtoList = new ArrayList<>();

        for(Post post : postList){
            // 전체 조회하여 획득한 각 게시글 객체를 이용하여 BoardListResponseDto 생성
            PostListResponseDto responseDto = new PostListResponseDto(post);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

}

