package com.example.ewhaproject.config;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA256 {
    public static String encrypt(String text) throws NoSuchAlgorithmException {
        if (text == null) {
            // text가 null인 경우 예외 던지거나 특정 값을 반환하도록 처리
            throw new IllegalArgumentException("Input text cannot be null");
        }

        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());

        return bytesToHex(md.digest());
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }
}
