package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
