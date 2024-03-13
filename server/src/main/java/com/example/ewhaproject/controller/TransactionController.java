package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.TransactionDto;
import com.example.ewhaproject.entity.Transaction;
import com.example.ewhaproject.service.TransactionService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
public class TransactionController {
    @Autowired
    TransactionService transactionService;
    @PostMapping("/purchase/{postId}") //상품 구매하기
    public ResponseEntity<TransactionDto> purchase(@PathVariable long postId, @RequestBody TransactionDto transactionDto) {
        try {
            transactionDto.setPostId(postId);
            TransactionDto createdDto = transactionService.purchase(transactionDto);
            return ResponseEntity.status(HttpStatus.OK).body(createdDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/transactions/{postId}") //상품 구매자 확인하기
    public ResponseEntity<List<TransactionDto>> transactions(@PathVariable long postId) {
        try {
            List<TransactionDto> transactionDtos = transactionService.getTransactionsByPostId(postId);
            return ResponseEntity.status(HttpStatus.OK).body(transactionDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/products/buyer") // 내가 구매한 상품보기
    public ResponseEntity<List<Transaction>> myPurchases(HttpSession session) {
        if (session != null) {
            // 세션에서 userId 가져오기
            String userId = (String) session.getAttribute("userId");
            log.info("현재 로그인한 사용자의 id: {}", userId);

            // userId를 이용하여 작성된 post들을 가져오는 로직 추가
            List<Transaction> myPurchases = transactionService.findTransactionsByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(myPurchases);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
