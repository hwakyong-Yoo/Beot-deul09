package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Post;
import lombok.Getter;

@Getter
public class PostListResponseDto {
    private String userId;
    private String product;
    private String explanation;
    private Long thumbnailId;  // 썸네일 id

    public PostListResponseDto(Post post) {
        this.userId = post.getUserId();
        this.product = post.getProduct();

        if(!post.getPhoto().isEmpty())  // 첨부파일 존재 o
            this.thumbnailId = post.getPhoto().get(0).getId();  // 첫번째 이미지 반환
        else // 첨부파일 존재 x
            this.thumbnailId = 0L;  // 서버에 저장된 기본 이미지 반환
    }
}