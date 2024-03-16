package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Photo;
import lombok.Getter;

@Getter
public class PhotoResponseDto {
    private Long fileId;  // 파일 id

    public PhotoResponseDto(Photo entity){
        this.fileId = entity.getId();
    }
}