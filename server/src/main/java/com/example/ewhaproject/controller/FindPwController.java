package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.FindPwRequestDto;
import com.example.ewhaproject.service.FindPwService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class FindPwController {

    private final FindPwService findPwService;

    @PostMapping("/find/password")
    private ResponseEntity<String> findPassword(@RequestBody FindPwRequestDto request) throws Exception {
        String status;

        try {
            status = findPwService.findPw(request);
        } catch(Exception e) {
            e.printStackTrace();
            status = e.getMessage();
        }

        return ResponseEntity.ok().body(status);
    }
}