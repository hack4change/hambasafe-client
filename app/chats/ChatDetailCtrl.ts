import {ChatService} from "./ChatService";

export class ChatDetailComponent {
  chat: any;

  constructor($stateParams, chatService: ChatService) {
    this.chat = chatService.get($stateParams.chatId);
  }
}
