package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.SizeDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
public class FlaskController {

    @PostMapping("/send-data")
    public ResponseEntity<Map<String, Object>> sendDataToFlask(@RequestBody SizeDto dto) {
        Map<String, Object> response = new HashMap<>();
        try {
            // RestTemplate을 사용하여 POST 요청 보내기
            RestTemplate restTemplate = new RestTemplate();
            String size = restTemplate.postForObject("http://localhost:5000/send-data", dto, String.class);
            response.put("size", size);
            return new ResponseEntity<>(response, HttpStatus.OK); // 플라스크 서버에서 반환한 응답을 클라이언트에 그대로 반환
        } catch (Exception e) {
            e.printStackTrace();
            response.put("msg", "데이터 전송에 실패했습니다.");
            response.put("statusCode", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
