package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.repository.PostRepository;
import com.example.ewhaproject.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public PostDto create(PostDto dto) {
        // 이미지 경로가 null이면 생성 불가
        if (dto.getImg() == null) {
            throw new IllegalArgumentException("Post 생성 실패! 이미지 경로는 null일 수 없습니다.");
        }
        User user = userRepository.findById(dto.getUserID())
                .orElseThrow(() -> new IllegalArgumentException("Post 생성 실패! User not found"));
        Post post = dto.toEntity(user);
        Post createdPost = postRepository.save(post);
        return PostDto.createPostDto(createdPost);
    }
}
