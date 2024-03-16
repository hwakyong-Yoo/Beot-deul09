package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findAllByBoardId(Long boardId);
}
