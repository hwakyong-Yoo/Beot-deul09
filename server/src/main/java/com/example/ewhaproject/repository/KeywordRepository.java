package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    @Query(value= "SELECT k.keyword " +
            "FROM tb_keyword k " +
            "JOIN post_keyword_map pk ON k.keyword_id = pk.keyword_id " +
            "JOIN tb_post p ON pk.post_id = p.post_id " +
            "WHERE p.post_id = :postId", nativeQuery = true)
    List<String> findKeywordsByPostId(@Param("postId") Long postId);

    @Query(value=  "SELECT * " +
            "FROM tb_keyword k " +
            "WHERE k.keyword = :keywordName", nativeQuery = true)
    Keyword findByKeyword(@Param("keywordName") String keywordName);
}
