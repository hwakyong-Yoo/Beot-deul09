package com.example.ewhaproject.exception;

public class InvalidAccountInfoException extends RuntimeException {

    public InvalidAccountInfoException(String message) {
        super(message);
    }
}