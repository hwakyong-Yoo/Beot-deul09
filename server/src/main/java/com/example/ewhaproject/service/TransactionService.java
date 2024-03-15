package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.TransactionDto;
import com.example.ewhaproject.entity.Transaction;
import com.example.ewhaproject.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    public List<TransactionDto> getTransactionsByPostId(Long postId) {
        List<Transaction> transactions = transactionRepository.findByPostId(postId);
        return transactions.stream()
                .map(TransactionDto::createdTransactionDto)
                .collect(Collectors.toList());
    }

    public List<Transaction> findTransactionsByUserId(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public TransactionDto purchase(TransactionDto transactionDto) {
        Transaction transaction = transactionDto.toEntity();
        Transaction createdTransaction = transactionRepository.save(transaction);
        log.info("db에 구매내역 저장완료");
        return TransactionDto.createdTransactionDto(createdTransaction);
    }

    public void purchaseCheck(long transactionId) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);
        if (transactionOptional.isPresent()) {
            Transaction transaction = transactionOptional.get();
            transaction.setStatus("입금 완료");
            transactionRepository.save(transaction);
            log.info("입금이 확인되었습니다.");
        } else {
            throw new IllegalArgumentException("해당 구매 내역을 찾을 수 없습니다: " + transactionId);
        }

    }
}
