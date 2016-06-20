import {ChatService} from "./ChatService";

export class ChatsComponent{
  constructor(private chatService :ChatService) {
   
 }

  chats() { this.chatService.all(); }

  remove (chat) {
    this.chatService.remove(chat);
  };
}
