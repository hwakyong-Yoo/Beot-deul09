package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.EmailDto;
import com.example.ewhaproject.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/sign-up/email-check")
    public String mailConfirm(@RequestBody EmailDto emailDto) throws MessagingException, UnsupportedEncodingException {

        String authCode = emailService.sendEmail(emailDto.getEmail());
        return authCode;
    }
}
