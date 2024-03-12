package com.example.ewhaproject.controller;

import com.example.ewhaproject.dto.TransactionDto;
import com.example.ewhaproject.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class TransactionController {
    @Autowired
    TransactionService transactionService;
    @PostMapping("/purchase/{postId}")
    public ResponseEntity<TransactionDto> purchase(@PathVariable long postId, @RequestBody TransactionDto transactionDto) {
        try {
            transactionDto.setPostId(postId);
            TransactionDto createdDto = transactionService.purchase(transactionDto);
            return ResponseEntity.status(HttpStatus.OK).body(createdDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
