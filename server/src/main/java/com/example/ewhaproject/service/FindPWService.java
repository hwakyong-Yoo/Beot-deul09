package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.EmailDto;
import com.example.ewhaproject.entity.User;
import com.example.ewhaproject.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;

@RequiredArgsConstructor
@Service
public class FindPWService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final SpringTemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;

    @Transactional
    public User updatePassword(FindUserInfo findUserInfo){
        User user = userRepository.findByEmail(findUserInfo.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("NOT FOUND" + findUserInfo.getEmail()));

        //임시 비번 생성
        String tempPwd = getTempPassword();
        //임시 비번 encoding
        String encodedTempPwd = passwordEncoder(tempPwd);
        //User의 정보를 업데이트함.
        user.updatePassword(user.getEmail(),encodedTempPwd);

        //메일 생성
        EmailDto emailDto = new EmailDto();
        emailDto.setSender("sj.youns1027@gmail.com");
        emailDto.setReceiver(findUserInfo.getEmail());
        emailDto.setTitle("쭈쭈르 홈페이지 임시비밀번호 안내");
        emailDto.setMessage("안녕하세요 쭈주르입니다." + user.getName() + " 회원님의 임시 비밀번호는 " + tempPwd + " 입니다.");

        //메일 송부
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try{
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailDto.getReceiver());
            mimeMessageHelper.setSubject(emailDto.getTitle());
            mimeMessageHelper.setText(emailDto.getMessage(), false);
            javaMailSender.send(mimeMessage);

            return user;

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }

    //존재하는 user일 경우 임시 비번 생성
    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        StringBuilder tempPwd = new StringBuilder();

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            tempPwd.append(charSet[idx]);
        }
        return tempPwd.toString();
    }

    //임시로 생성한 비번 encoding
    public String passwordEncoder(String tempPwd){
        return bCryptPasswordEncoder.encode(tempPwd);
    }
}