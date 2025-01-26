export interface IMessage {
    id: string;
    message: string;
    time: string;
    isSent: boolean;
}

export interface IChat {
    id: string;
    avatar: string;
    name:string;
    phoneNumber: string;
    messages: IMessage [];
}
