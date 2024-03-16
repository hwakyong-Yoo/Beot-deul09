package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.UserDto;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user/create") //회원가입
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserDto userDto)
            throws NoSuchAlgorithmException {
        Map<String, Object> response = new HashMap<>();

        try {
            userService.registerUser(userDto);
            response.put("msg", "회원가입이 완료되었습니다.");
            response.put("statusCode", 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // 예외가 발생한 경우
            response.put("msg", "회원가입 중 오류가 발생했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/user/edit") //회원 정보 수정
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, HttpSession session) throws NoSuchAlgorithmException {
        if (session != null) {
            // 세션에서 userId 가져오기
            String userId = userDto.getUserId(); // UserDto 객체에서 userId 가져오기
            log.info("현재 로그인한 사용자의 id: {}", userId);

            userService.updateUserInformation(userDto, userId);

            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/userId/exists") //아이디 중복 체크
    public ResponseEntity<Map<String, Object>> userIdDuplicate(@RequestBody String userId) {
        Map<String, Object> response = new HashMap<>();

        if (userService.isDuplicateUserId(userId)) {
            log.error("아이디가 이미 존재합니다.");
            response.put("msg", "이미 사용중인 아이디입니다.");
            response.put("statusCode", 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        else {
            log.info("사용 가능한 아이디입니다.");
            response.put("msg", "사용 가능한 아이디입니다.");
            response.put("statusCode", 200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @PostMapping("/user/login") //로그인
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto userDto, HttpSession session) throws NoSuchAlgorithmException {
        Map<String, Object> response = new HashMap<>();

        User user = userDto.toEntity();

        try {
            if (userService.login(userDto)) {
                session.setAttribute("userId", user.getUserId()); // 세션에 사용자 ID 저장
                response.put("msg", "로그인이 완료되었습니다.");
                response.put("statusCode", 200);
                response.put("userId", user.getUserId());
                response.put("name", userService.getNickname(user.getUserId()));
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("msg", "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.");
                response.put("statusCode", 401);
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            response.put("msg", "로그인 중 오류가 발생했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/logout") //로그아웃
    public ResponseEntity<String> logout(HttpSession session) {
        // 세션 무효화
        session.invalidate();
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

    @DeleteMapping("user/delete") //회원 삭제
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("userId") String userId, RedirectAttributes rttr) {
        Map<String, Object> response = new HashMap<>();

        log.info("삭제 요청이 들어왔습니다!!");
        try {
            userService.delete(userId);
            rttr.addFlashAttribute("msg", "삭제되었습니다.");
            response.put("msg", "회원탈퇴가 완료되었습니다.");
            response.put("statusCode", 200); // Unauthorized
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("msg", "회원탈퇴 중 오류가 발생했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
