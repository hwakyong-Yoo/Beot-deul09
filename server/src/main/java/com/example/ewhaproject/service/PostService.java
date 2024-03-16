package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostKeywordService postKeywordService;

    @Transactional
    public PostDto create(PostDto postDto) {
        // 게시물 생성
        Post post = postDto.toEntity();

        // 게시물 저장
        Post createdPost = postRepository.save(post);
        log.info("DB에 게시물 저장 성공");

        postKeywordService.saveKeywords(createdPost, postDto.getKeywords());
        return PostDto.createdPostDto(createdPost);
    }

    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(PostDto::createdPostDto)
                .collect(Collectors.toList());
    }

    public void updatePostToLatest(Long postId) { //끝올
        Post post = postRepository.findById(postId).orElse(null);

        if (post != null) {
            String currentFormattedDate = PostDto.getCurrentFormattedDate();
            post.updateDate(currentFormattedDate);
            postRepository.save(post);
        } else {
            throw new IllegalArgumentException("포스트를 찾을 수 없습니다."); // 해당 ID의 포스트가 없을 경우 예외 처리
        }
    }

    public void closePost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);

        if (post!=null) {
            post.close();
            postRepository.save(post);
        } else {
            throw new IllegalArgumentException("포스트를 찾을 수 없습니다."); // 해당 ID의 포스트가 없을 경우 예외 처리
        }
    }

    public void updatePostContent(PostDto postDto, long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post existingPost = postOptional.get();

            Post updatePost = postDto.toEntity();

            postRepository.save(updatePost);
        }
    }

    public List<Post> findPostsByUserId(String userId) {
        return postRepository.findByUserId(userId);
    }

    public Optional<Post> getPostByPostId(Long postId) {
        return postRepository.findById(postId);
    }
}
