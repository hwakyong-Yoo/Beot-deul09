package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Transaction;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private Long transaction_id;
    private String userId;
    private String name;
    private long postId;
    private String amount;
    private String product_option;
    private String size;
    private String status = "입금 미완료";

    public static TransactionDto createdTransactionDto(Transaction createdTransaction) {
        return TransactionDto.builder()
                .transaction_id(createdTransaction.getTransaction_id())
                .userId(createdTransaction.getUserId())
                .name(createdTransaction.getName())
                .postId(createdTransaction.getPostId())
                .amount(createdTransaction.getAmount())
                .product_option(createdTransaction.getProduct_option())
                .size(createdTransaction.getSize())
                .status(createdTransaction.getStatus())
                .build();
    }

    public Transaction toEntity() {
        return new Transaction (transaction_id, name, userId, postId, amount, product_option, size, status);
    }

}

