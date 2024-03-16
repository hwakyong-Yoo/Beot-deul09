package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.service.KeywordService;
import com.example.ewhaproject.service.PostService;
import com.example.ewhaproject.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/posts") // 게시물 작성
    public ResponseEntity<PostDto> create(@RequestBody PostDto postDto, HttpSession session) {
        try {
            // 세션에서 userId 가져오기
            String userId = (String) session.getAttribute("userId");
            String name = userService.getNameById(userId);
            log.info("현재 로그인한 사용자의 id: {}", userId);
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

    @GetMapping("/searchByKeyword")
    public ResponseEntity<List<PostDto>> getPostsByKeyword(@RequestParam("keyword") String keyword) {
        if (keyword.isEmpty()) {
            return ResponseEntity.badRequest().build(); // 키워드가 비어있는 경우 유효하지 않은 요청으로 처리
        }

        // 여러 키워드에 해당하는 포스트들을 가져옴
        List<PostDto> postDtos = postService.findPostsByKeyword(keyword);

        // 검색된 포스트들이 없는 경우
        if (postDtos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 컨텐츠가 없음을 의미하는 상태코드 204를 반환
        }

        return ResponseEntity.ok(postDtos); // 포스트들을 담은 응답 반환
    }

}
