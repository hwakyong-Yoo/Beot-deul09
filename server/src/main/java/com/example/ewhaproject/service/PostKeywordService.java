package com.example.ewhaproject.service;

import com.example.ewhaproject.entity.Keyword;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.entity.PostKeywordMap;
import com.example.ewhaproject.repository.PostKeywordMapRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostKeywordService {
    @Autowired
    private KeywordService keywordService;
    @Autowired
    private PostKeywordMapRepository postKeywordMapRepository;

    @Transactional
    public void saveKeywords(Post post, List<String> keywords) {
        for (String keywordName : keywords) {
            Keyword keyword = keywordService.findByName(keywordName); // 주어진 이름의 키워드 찾기
            if (keyword == null) {
                // 선택된 키워드가 데이터베이스에 존재하지 않는 경우, 새로운 키워드를 생성하여 저장
                keyword = new Keyword(keywordName);
                keywordService.save(keyword);
            }
            PostKeywordMap postKeywordMap = new PostKeywordMap(post, keyword);
            postKeywordMapRepository.save(postKeywordMap);
        }
    }
}
