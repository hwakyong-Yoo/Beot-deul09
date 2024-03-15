package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    @Query(value=  "SELECT * " +
            "FROM tb_keyword k " +
            "WHERE k.keyword = :keywordName", nativeQuery = true)
    Keyword findByKeyword(@Param("keywordName") String keywordName);
}
