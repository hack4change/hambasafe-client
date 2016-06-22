"use strict";
var ChatsComponent = (function () {
    function ChatsComponent(chatService) {
        this.chatService = chatService;
    }
    ChatsComponent.prototype.chats = function () { this.chatService.all(); };
    ChatsComponent.prototype.remove = function (chat) {
        this.chatService.remove(chat);
    };
    ;
    return ChatsComponent;
}());
exports.ChatsComponent = ChatsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdEN0cmwuanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJjaGF0cy9DaGF0Q3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFDRSx3QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFFN0MsQ0FBQztJQUVBLDhCQUFLLEdBQUwsY0FBVSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuQywrQkFBTSxHQUFOLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLHNCQUFjLGlCQVUxQixDQUFBIn0=