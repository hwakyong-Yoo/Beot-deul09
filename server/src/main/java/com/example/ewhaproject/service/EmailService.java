package com.example.ewhaproject.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;
    private String authNum; // 인증 번호 (무작위)

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
        String title = "[벗들공구] 회원가입 인증 코드 발송 안내";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setSubject(title);

        // 메일 내용
        String msgOfEmail="";
        msgOfEmail += "<div style='margin:100px;'>";
        msgOfEmail += "<h1> 벗들공구 회원가입을 위한 인증 코드 안내 </h1>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>벗들공구 서비스를 이용해주셔서 감사합니다.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>이메일 인증코드 입력 란에 아래 코드를 입력해주세요.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgOfEmail += "<h3 style='color:green;'>인증코드</h3>";
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