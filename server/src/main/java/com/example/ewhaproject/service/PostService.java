package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.repository.PostRepository;
import com.example.ewhaproject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    public PostDto create(PostDto dto) {
        Post post = dto.toEntity();
        Post createdPost = postRepository.save(post);
        log.info("DB에 게시물 저장 성공");
        return PostDto.createdPostDto(createdPost);
    }
}
