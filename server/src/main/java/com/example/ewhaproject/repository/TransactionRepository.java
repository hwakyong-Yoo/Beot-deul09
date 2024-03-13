package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query(value= "SELECT * " +
            "FROM tb_transaction t " +
            "WHERE t.post_id = :postId", nativeQuery = true)
    List<Transaction> findByPostId(@Param("postId") Long postId);

    @Query(value = "SELECT t.* " +
            "FROM tb_transaction t " +
            "WHERE t.user_id = :userId", nativeQuery = true)
    List<Transaction> findByUserId(@Param("userId") String userId);
}
