package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.repository.KeywordRepository;
import com.example.ewhaproject.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostKeywordService postKeywordService;
    @Autowired
    private KeywordRepository keywordRepository;

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
        List<PostDto> postDtos = new ArrayList<>();

        for (Post post : posts) {
            PostDto postDto = PostDto.createdPostDto(post); // 포스트를 DTO로 변환
            List<String> keywords = keywordRepository.findKeywordsByPostId(post.getPostId()); // 각 포스트에 대한 키워드를 가져옴
            postDto.setKeywords(keywords); // 키워드 설정
            postDtos.add(postDto); // DTO를 리스트에 추가
        }
        return postDtos;
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

    public PostDto updatePostContent(PostDto postDto, long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post existingPost = postOptional.get();


            existingPost.update(postDto.getExplanation(), postDto.getAnswer1(), postDto.getAnswer2(), postDto.getAnswer3(), postDto.getPrice(), postDto.getDeadline());
            postRepository.save(existingPost);
            return PostDto.createdPostDto(existingPost);
        } else {
            throw new IllegalArgumentException("포스트를 찾을 수 없습니다."); // 해당 ID의 포스트가 없을 경우 예외 처리
        }
    }

    public List<PostDto> findPostsByUserId(String userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        List<PostDto> postDtos = new ArrayList<>();

        for (Post post : posts) {
            PostDto postDto = PostDto.createdPostDto(post); // 포스트를 DTO로 변환
            List<String> keywords = keywordRepository.findKeywordsByPostId(post.getPostId()); // 각 포스트에 대한 키워드를 가져옴
            postDto.setKeywords(keywords); // 키워드 설정
            postDtos.add(postDto); // DTO를 리스트에 추가
        }
        return postDtos;
    }

    public List<PostDto> findPostsByKeyword(String keyword) {
        // 키워드가 비어있을 경우 빈 리스트 반환
        if (keyword.isEmpty()) {
            return Collections.emptyList();
        }

        // 키워드에 해당하는 포스트들을 검색하는 쿼리 실행
        List<Post> posts = postRepository.findByKeyword(keyword);

        // 검색된 포스트들을 DTO로 변환하여 반환
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            PostDto postDto = PostDto.createdPostDto(post);
            // 각 포스트에 대한 키워드를 가져와 설정
            List<String> postKeywords = keywordRepository.findKeywordsByPostId(post.getPostId());
            postDto.setKeywords(postKeywords);
            postDtos.add(postDto);
        }
        return postDtos;
    }

    public Optional<Post> getPostByPostId(Long postId) {
        return postRepository.findById(postId);
    }
}
