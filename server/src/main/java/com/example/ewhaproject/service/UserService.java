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
        // SHA-256 사용해서 비밀번호 해시화
        String hashedPassword = SHA256.encrypt(userDto.getPassword());
        User user = new User(userDto.getUserId(), userDto.getEmail(), hashedPassword, userDto.getName(), userDto.getAge());

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

    public String getNameById(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            return userOptional.get().getName();
        } else {
            // 사용자를 찾을 수 없는 경우에 대한 처리를 추가하세요.
            throw new IllegalArgumentException("해당 사용자를 찾을 수 없습니다: " + userId);
        }
    }
}
