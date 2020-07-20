WebSocket app
Server (Spring Boot) on port 8888
Client (React) on port 3000

Server has:

  1) WebSocket configuration
  2) local Storage of Message (List<Message>)
  3) three methods on controller
      - GET /history
      - MessageMapper 
      - Scheduled server message sender
  4) one service that can send message to client too
  
  
Client has:
  
  1) React ui
  2) SockJsClient that autoconnecting to server
      (Optional can be using manual setting of SockJS and STOMP) 
