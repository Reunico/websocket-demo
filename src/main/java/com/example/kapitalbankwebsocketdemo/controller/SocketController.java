package com.example.kapitalbankwebsocketdemo.controller;

import com.example.kapitalbankwebsocketdemo.Message;
import com.example.kapitalbankwebsocketdemo.storage.MessageStorage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public  class SocketController {

    private final MessageStorage messageStorage;
    private final SimpMessagingTemplate template;


    public SocketController(MessageStorage messageStorage, SimpMessagingTemplate template) {
        this.messageStorage = messageStorage;
        this.template = template;
    }
    @GetMapping("/history")
    public List<Message> getHistory() {
        return messageStorage.getMessages();
    }

    @MessageMapping("/demo-messenger")
    @SendTo("/topic/message")
    public Message sendMessage(Message message) {
        message.setMessage("Message: " + message.getMessage());
        messageStorage.setMessages(message);
        return message;
    }

    @Scheduled(fixedRate = 10000)
    public void sendServiceMessage(){
        template.convertAndSend("/topic/message", new Message("robot", "This message shows that server sent message to client at: " + new Date().toString()));
    }


}
