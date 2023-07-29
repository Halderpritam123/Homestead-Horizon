import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Message {
  isUser: boolean;
  content: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  chatMessages: Message[] = [];
  isChatVisible: boolean = false;
  showChat: boolean = false; // For toggling the chat window

  constructor(private http: HttpClient) { }

  sendMessage() {
    const userMessage = this.userInput.trim();
    if (userMessage === '') {
      return;
    }

    this.chatMessages.push({ isUser: true, content: userMessage });
    this.http.post<any>('https://horizon-2pqa.onrender.com/api/chat', { user_input: userMessage })
      .subscribe(response => {
        const chatbotResponse = response.response;
        this.chatMessages.push({ isUser: false, content: chatbotResponse });
      });

    this.userInput = '';
  }

  toggleChatVisibility() {
    this.showChat = !this.showChat;
  }
}
