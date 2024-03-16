package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Post;
import lombok.Getter;

import java.util.List;

@Getter
public class PostResponseDto {
    private String userId;
    private String product;
    private String explanation;
    private List<Long> fileId;  // 첨부 파일 id 목록

    public PostResponseDto(Post post, List<Long> fileId) {
        this.userId = post.getUserId();
        this.product = post.getProduct();
        this.explanation = post.getExplanation();
        this.fileId = fileId;
    }
}