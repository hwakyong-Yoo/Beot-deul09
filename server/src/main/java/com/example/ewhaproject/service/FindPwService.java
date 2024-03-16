package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.FindPwRequestDto;
import com.example.ewhaproject.dto.FindPwResponseDto;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.service.UserService;
import com.example.ewhaproject.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import com.example.ewhaproject.exception.InvalidAccountInfoException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Member;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class FindPwService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final MailSender mailSender;

    private final JavaMailSender emailSender;
    private String authNum; // 인증 번호

    public String findPw(FindPwRequestDto request) throws Exception {
        User user = userRepository.findByname(request.getName()).orElseThrow(() ->
                new InvalidAccountInfoException("Invalid Account Information."));

        if(!user.getEmail().equals(request.getEmail())) {
            throw new InvalidAccountInfoException("Email Does Not Match");
        }

        userService.SetTempPassword(request.getName(), sendEmail(request.getEmail()).toString());
        userRepository.save(user);

        return "Temporary password issued.";
    }

    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i=0; i<8; i++) {
            int idx = random.nextInt(3);

            switch (idx) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    // 메일 양식 작성
    public MimeMessage createEmailForm(String email) throws MessagingException, UnsupportedEncodingException {
        createCode();
        // 메일발송
        String setFrom = "sendmail0909@naver.com";
        // 메일 수신
        String toEmail = email;
        // 메일 제목
        String title = "[벗들공구] 임시비밀번호 발송 안내";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setSubject(title);

        // 메일 내용
        String msgOfEmail="";
        msgOfEmail += "<div style='margin:100px;'>";
        msgOfEmail += "<h1> 벗들공구 비밀번호 찾기를 위한 임시비밀번호 안내 </h1>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>벗들공구 서비스를 이용해주셔서 감사합니다.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>로그인 시 기존 비밀번호 대신 아래 임시비밀번호를 입력해주세요.<p>";
        msgOfEmail += "<p>아이디는 기존과 동일하게 입력해주세요.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgOfEmail += "<h3 style='color:green;'>임시비밀번호</h3>";
        msgOfEmail += "<div style='font-size:130%'>";
        msgOfEmail += "CODE : <strong>";
        msgOfEmail += authNum + "</strong><div><br/> ";
        msgOfEmail += "</div>";

        message.setFrom(setFrom);
        message.setText(msgOfEmail, "utf-8", "html");

        return message;
    }

    public String sendEmail(String email) throws MessagingException, UnsupportedEncodingException {

        MimeMessage mimeMessage = createEmailForm(email);
        emailSender.send(mimeMessage);

        return authNum;
    }
}