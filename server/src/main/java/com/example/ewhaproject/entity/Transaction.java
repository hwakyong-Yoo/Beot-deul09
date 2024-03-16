package com.example.ewhaproject.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Table(name="TB_TRANSACTION")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transaction_id;

    @Column
    private String name;

    @Column
    private String userId;

    @Column
    private Long postId;

    @Column
    private String amount;

    @Column
    private String size;

    @Column
    private String status= "입금 미완료"; // 디폴트 값 , 총대가 입금확인 누르면 입금 완료로 바뀜

    public void completeDeposit() {
        this.status = "입금 완료";
    }
}
