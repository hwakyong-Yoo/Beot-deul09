package com.example.ewhaproject.service;

import com.example.ewhaproject.config.SHA256;
import com.example.ewhaproject.dto.UserDto;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void registerUser(UserDto userDto) throws NoSuchAlgorithmException {
        User user = userDto.toEntity();

        // SHA-256 사용해서 비밀번호 해시화
        String hashedPassword = SHA256.encrypt(user.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
        log.info("DB에 회원 저장 성공");
    }


    public boolean login(UserDto userDto) throws NoSuchAlgorithmException{
        User user = userDto.toEntity();
        // 사용자 정보 가져오기
        Optional<User> userOptional = userRepository.findById(user.getUserId());
        if (userOptional.isPresent()) {
            User storedUser = userOptional.get();

            // 사용자가 입력한 비밀번호를 해시화하여 저장된 해시화된 비밀번호와 비교
            String hashedPassword = SHA256.encrypt(user.getPassword());

            // 비밀번호가 일치하면 로그인 성공
            return hashedPassword.equals(storedUser.getPassword());
        } else {
            // 사용자가 존재하지 않을 경우
            return false;
        }
    }

    public Object getNickname(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getName();
        } else {
            return null;
        }
    }
}
