package com.example.ewhaproject.service;

import com.example.ewhaproject.config.SHA256;
import com.example.ewhaproject.dto.UserDto;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Random;


@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void SetTempPassword(String userId, String tempPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 임시 비밀번호를 해시화하여 저장
            String hashedTempPassword = hashPassword(tempPassword);
            user.setPassword(hashedTempPassword);

            // 사용자 엔티티 저장
            userRepository.save(user);
            log.info("임시 비밀번호 설정 성공");
        } else {
            throw new IllegalArgumentException("해당 사용자를 찾을 수 없습니다: " + userId);
        }
    }

    // 비밀번호 해시화 메서드
    private String hashPassword(String password) {
        try {
            // SHA-256 해시 함수를 사용하여 MessageDigest 객체 생성
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // 비밀번호를 바이트 배열로 변환하여 해시화
            byte[] hashBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));

            // 바이트 배열을 16진수 문자열로 변환
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            // 해시된 비밀번호 반환
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // 해당 알고리즘이 지원되지 않을 경우 예외 처리
            throw new RuntimeException("해시 알고리즘이 지원되지 않습니다.", e);
        }
    }

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

    public boolean isDuplicateUserId(String userId) {
        return userRepository.findById(userId).isPresent();
    }

    public void updateUserInformation(UserDto userDto, String userId) throws NoSuchAlgorithmException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            log.info("해당 사용자 :" + userId);
            User existingUser = userOptional.get();

            //새로운 비밀번호 해시화하고 저장
            String hashedPassword = SHA256.encrypt(userDto.getPassword());
            userDto.setPassword(hashedPassword);

            // 새로운 사용자 정보로 기존 사용자 엔티티를 업데이트합니다.
            existingUser.updateFromDto(userDto);
            userRepository.save(existingUser);
        } else {
            throw new IllegalArgumentException("해당 사용자를 찾을 수 없습니다: " + userId);
        }
    }
}
