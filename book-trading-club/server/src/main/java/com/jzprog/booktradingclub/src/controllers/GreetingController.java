package com.jzprog.booktradingclub.src.controllers;

import java.util.concurrent.atomic.AtomicLong;

import com.jzprog.booktradingclub.src.model.Greeting;
import com.jzprog.booktradingclub.src.model.HelloMessage;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class GreetingController {

    @Value("${test}")
    String test;

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();


    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(String.format(template, test));
    }

    @MessageMapping("/src")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + message.getName() + "!");
    }

}
