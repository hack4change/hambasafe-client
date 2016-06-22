"use strict";
var ChatDetailComponent = (function () {
    function ChatDetailComponent($stateParams, chatService) {
        this.chat = chatService.get($stateParams.chatId);
    }
    return ChatDetailComponent;
}());
exports.ChatDetailComponent = ChatDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdERldGFpbEN0cmwuanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJjaGF0cy9DaGF0RGV0YWlsQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFHRSw2QkFBWSxZQUFZLEVBQUUsV0FBd0I7UUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLDJCQUFtQixzQkFNL0IsQ0FBQSJ9