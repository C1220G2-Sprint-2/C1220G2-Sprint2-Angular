export class ChatMessage {
    $key?: string;
    email?: string;
    userName?: string;
    message?: string;
    groupName?: string;
    timeSend?: string = new Date().toString();
}
