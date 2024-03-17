package com.example.ewhaproject.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostImageUploadDto {

    private List<MultipartFile> files;

}