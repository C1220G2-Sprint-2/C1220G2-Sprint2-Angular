export class GroupUser {
    $key?: string;
    groupName: string;
    userEmail: string;
    lastTimeLeave: string = new Date().toString();
}