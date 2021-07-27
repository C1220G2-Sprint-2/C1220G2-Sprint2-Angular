export class ChatMessage {
    $key?: string;
    email?: string;
    // userName?: string;
    userAvatar?: string;
    message?: string;
    groupName?: string;
    timeSend?: string = new Date().toString();
}
