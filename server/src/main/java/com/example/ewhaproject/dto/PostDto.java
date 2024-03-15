package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Post;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long postId;
    private String userId;
    private String product;
    private String img;
    private String explanation;     // 내용 (텍스트)
    private String size_img;
    private String qna;
    private int min_participants;
    private double price;
    private String date; //작성일
    private List<String> keywords; // 키워드 정보를 담을 리스트
    private String deadline; //마감기한
    private String chatroom_link; //오픈 채팅방 링크
    private Boolean status = true;
    private String account_num;
    private String account_holder;

    public static String getCurrentFormattedDate() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }

    public static PostDto createdPostDto(Post createdPost) {
        return PostDto.builder()
                .postId(createdPost.getPostId())
                .userId(createdPost.getUserId())
                .product(createdPost.getProduct())
                .img(createdPost.getImg())
                .explanation(createdPost.getExplanation())
                .size_img(createdPost.getSize_img())
                .qna(createdPost.getQna())
                .min_participants(createdPost.getMin_participants())
                .price(createdPost.getPrice())
                .date(createdPost.getDate())
                .deadline(createdPost.getDeadline())
                .chatroom_link(createdPost.getChatroom_link())
                .status(createdPost.getStatus())
                .account_num(createdPost.getAccount_num())
                .account_holder(createdPost.getAccount_holder())
                .build();
    }

    public Post toEntity() {
        return new Post(
                postId,
                userId,
                product,
                img,
                explanation,
                size_img,
                qna,
                min_participants,
                price,
                date,
                deadline,
                chatroom_link,
                status,
                account_num,
                account_holder
        );
    }
}
