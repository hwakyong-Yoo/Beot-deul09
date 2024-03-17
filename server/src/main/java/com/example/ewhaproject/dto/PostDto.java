package com.example.ewhaproject.dto;

import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.entity.PostImage;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
public class PostDto {
    private Long postId;
    private String userId;
    private String product;
    private String img;
    private String explanation;     // 내용 (텍스트)
    private String size_img;
    private String answer1;
    private String answer2;
    private String answer3;
    private int min_participants;
    private double price;
    private String date; //작성일
    private List<String> keywords; // 키워드 정보를 담을 리스트
    private String deadline; //마감기한
    private String chatroom_link; //오픈 채팅방 링크
    private Boolean status = true;
    private String account_num;
    private String account_holder;

    private List<String> imageUrls;

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
                .answer1(createdPost.getAnswer1())
                .answer2(createdPost.getAnswer2())
                .answer3(createdPost.getAnswer3())
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
<<<<<<< HEAD
        Post post = new Post();
        post.setPostId(this.postId);
        post.setUserId(this.userId);
        post.setProduct(this.product);
        post.setImg(this.img);
        post.setExplanation(this.explanation);
        post.setSize_img(this.size_img);
        post.setAnswer1(this.answer1);
        post.setAnswer2(this.answer2);
        post.setAnswer3(this.answer3);
        post.setMin_participants(this.min_participants);
        post.setPrice(this.price);
        post.setDate(this.date);
        post.setDeadline(this.deadline);
        post.setChatroom_link(this.chatroom_link);
        post.setStatus(this.status);
        post.setAccount_num(this.account_num);
        post.setAccount_holder(this.account_holder);

        return post;
    }

    @Builder
    public PostDto(Post post) {
        this.postId = post.getPostId();
        this.userId = post.getUserId();
        this.product = post.getProduct();
        this.img = post.getImg();
        this.explanation = post.getExplanation();
        this.size_img = post.getSize_img();
        this.answer1 = post.getAnswer1();
        this.answer2 = post.getAnswer2();
        this.answer3 = post.getAnswer3();
        this.min_participants = post.getMin_participants();
        this.price = post.getPrice();
        this.date = post.getDate();
        this.deadline = post.getDeadline();
        this.chatroom_link = post.getChatroom_link();
        this.status = post.getStatus();
        this.account_num = post.getAccount_num();
        this.account_holder = post.getAccount_holder();

        this.imageUrls = post.getPostImages().stream()
                .map(PostImage::getUrl)
                .collect(Collectors.toList());
=======
        return new Post(
                postId,
                userId,
                product,
                img,
                explanation,
                size_img,
                answer1,
                answer2,
                answer3,
                min_participants,
                price,
                date,
                keywords,
                deadline,
                chatroom_link,
                status,
                account_num,
                account_holder
        );
>>>>>>> 6c47fa1f55ebfb8a5f585463715d6e0be736ddac
    }

}
