package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/posts")
    public ResponseEntity<PostDto> create(@RequestBody PostDto dto) {
        try {
            dto.setDate(PostDto.getCurrentFormattedDate());
            PostDto createdDto = postService.create(dto);
            return ResponseEntity.status(HttpStatus.OK).body(createdDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
