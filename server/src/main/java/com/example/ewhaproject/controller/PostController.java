package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.service.PostService;
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

    @PostMapping("/posts") // 게시물 작성
    public ResponseEntity<PostDto> create(@RequestBody PostDto dto) {
        try {
            dto.setDate(PostDto.getCurrentFormattedDate());
            PostDto createdDto = postService.create(dto);
            return ResponseEntity.status(HttpStatus.OK).body(createdDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/posts") //전체 게시물 조회
    public ResponseEntity<List<PostDto>> getAllPosts() {
        try {
            List<PostDto> postDto = postService.getAllPosts();
            return ResponseEntity.ok(postDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/posts/{postId}") //상세 게시물 조회
    public ResponseEntity<Optional<Post>> getDetailPosts(@PathVariable Long postId) {
        try {
            Optional<Post> postDto = postService.getPostByPostId(postId);
            return ResponseEntity.ok(postDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/close/{postId}")
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
    public ResponseEntity<List<Post>> getPostByUserId(HttpSession session) {
        if (session != null) {
            // 세션에서 userId 가져오기
            String userId = (String) session.getAttribute("userId");
            log.info("현재 로그인한 사용자의 id: {}", userId);

            // userId를 이용하여 작성된 post들을 가져오는 로직 추가
            List<Post> myProducts = postService.findPostsByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(myProducts);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

}
