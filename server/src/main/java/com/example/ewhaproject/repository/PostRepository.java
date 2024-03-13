package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value= "SELECT * " +
    "FROM tb_post p " +
    "ORDER BY p.DATE DESC", nativeQuery = true) //date 순으로 최신순 정렬
    List<Post> findAll();

    @Query(value = "SELECT p.* " +
    "FROM tb_post p " +
    "WHERE p.user_id = :userId", nativeQuery = true)
    List<Post> findByUserId(@Param("userId") String userId);
}
