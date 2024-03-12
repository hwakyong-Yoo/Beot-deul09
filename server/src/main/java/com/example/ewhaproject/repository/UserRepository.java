package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
