package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.TransactionDto;
import com.example.ewhaproject.entity.Transaction;
import com.example.ewhaproject.service.TransactionService;
import com.example.ewhaproject.service.UserService;
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
    @Autowired
    UserService userService;

    @PostMapping("/purchase/{postId}") //상품 구매하기
    public ResponseEntity<TransactionDto> purchase(@PathVariable long postId, @RequestBody TransactionDto transactionDto, @RequestHeader String userId) {
        String name = userService.getNameById(userId);
        log.info("현재 로그인한 사용자의 id: {}", userId);
        log.info("현재 로그인한 사용자의 이름: {}", name);

        try {
            transactionDto.setPostId(postId);
            transactionDto.setUserId(userId);
            transactionDto.setName(name);
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
    public ResponseEntity<List<Transaction>> myPurchases(@RequestHeader String userId) {
        try {
            log.info("현재 로그인한 사용자의 id: {}", userId);

            // userId를 이용하여 작성된 post들을 가져오는 로직 추가
            List<Transaction> myPurchases = transactionService.findTransactionsByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(myPurchases);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/purchase/checked/{transactionId}") //입금확인
    public ResponseEntity<String> check(@PathVariable long transactionId) {
        try {
            transactionService.purchaseCheck(transactionId);
            return new ResponseEntity<>("구매가 확인되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("구매확인 에러", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
