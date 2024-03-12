package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.TransactionDto;
import com.example.ewhaproject.entity.Transaction;
import com.example.ewhaproject.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    public List<Transaction> findTransactionsByUserId(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public TransactionDto purchase(TransactionDto transactionDto) {
        Transaction transaction = transactionDto.toEntity();
        Transaction createdTransaction = transactionRepository.save(transaction);
        log.info("db에 구매내역 저장완료");
        return TransactionDto.createdTransactionDto(createdTransaction);
    }
}
