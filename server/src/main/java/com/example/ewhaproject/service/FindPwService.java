package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.FindPwRequestDto;
import com.example.ewhaproject.dto.FindPwResponseDto;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.service.UserService;
import com.example.ewhaproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.MailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;

@Service
@RequiredArgsConstructor
public class FindPwService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final MailSender mailSender;

    public String findPw(FindPwRequestDto request) throws Exception {
        // request validation
        User user = userRepository.findByuserId(request.getName().toString()).orElseThrow(() ->
                new BadCredentialsException("Invalid Account Information."));

        if(!user.getEmail().equals(request.getEmail())) {
            throw new BadCredentialsException("Email Does Not Match");
        }

        // generate temporary password
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        StringBuilder tempPw = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            int idx = (int) (charSet.length * Math.random());
            tempPw.append(charSet[idx]);
        }

        FindPwResponseDto newDto = FindPwResponseDto.builder()
                .email(request.getEmail())
                .mailTitle("메일 제목")
                .mailContent("메일 내용")
                .build();

        // send e-mail
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("발송인 이메일 주소");
        message.setTo(newDto.getEmail());
        message.setReplyTo("회신받을 이메일 주소");
        message.setSubject(newDto.getMailTitle());
        message.setText(newDto.getMailContent());

        mailSender.send(message);

        userService.SetTempPassword(request.getName(), tempPw.toString());
        userRepository.save(user);

        return "Temporary password issued.";
    }
}