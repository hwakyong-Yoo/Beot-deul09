package com.example.ewhaproject.VO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostFileVO {
    private String userId;
    private String title;
    private String content;
    private List<MultipartFile> files;
}
