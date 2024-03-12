package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter
@Table(name="TB_TRANSACTION")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transaction_id;

    @Column
    private String userId;

    @Column
    private Long postId;

    @Column
    String size;

    @Column
    String amount;


}
