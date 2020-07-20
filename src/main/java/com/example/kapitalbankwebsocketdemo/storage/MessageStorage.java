package com.example.kapitalbankwebsocketdemo.storage;

import com.example.kapitalbankwebsocketdemo.Message;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class MessageStorage {
    private final List<Message> messages;

    private MessageStorage() {
        messages = new ArrayList<>();
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(Message message) {
        messages.add(message);
    }

}
