package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value= "SELECT p.* " +
            "FROM tb_post p " +
            "LEFT JOIN post_keyword_map pk ON p.post_id = pk.post_id " +
            "LEFT JOIN tb_keyword k ON pk.keyword_id = k.keyword_id " +
            "ORDER BY p.DATE DESC", nativeQuery = true) //date 순으로 최신순 정렬
    List<Post> findAll();

    @Query(value = "SELECT p.* " +
            "FROM tb_post p " +
            "LEFT JOIN post_keyword_map pk ON p.post_id = pk.post_id " +
            "LEFT JOIN tb_keyword k ON pk.keyword_id = k.keyword_id " +
            "WHERE p.user_id = :userId " +
            "ORDER BY p.DATE DESC", nativeQuery = true)
    List<Post> findByUserId(@Param("userId") String userId);

    @Query(value= "SELECT p.* " +
            "FROM tb_post p " +
            "LEFT JOIN post_keyword_map pk ON p.post_id = pk.post_id " +
            "LEFT JOIN tb_keyword k ON pk.keyword_id = k.keyword_id " +
            "WHERE k.keyword = :keyword " + // 주어진 키워드와 일치하는 경우 선택
            "ORDER BY p.DATE DESC", nativeQuery = true) //date 순으로 최신순 정렬
    List<Post> findByKeyword(@Param("keyword") String keyword);
}
