package com.example.kapitalbankwebsocketdemo.service;

import com.example.kapitalbankwebsocketdemo.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BrokerService {

    private final SimpMessagingTemplate template;

    public BrokerService(SimpMessagingTemplate template) {
        this.template = template;
    }


    @Scheduled(fixedRate = 12000)
    public void sendServiceMessage(){
        template.convertAndSend("/topic/message", new Message("service", "This message from service at: " + new Date().toString()));
    }

}
