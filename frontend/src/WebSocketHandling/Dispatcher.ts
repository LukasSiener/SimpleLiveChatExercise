import {IMessage} from "../model/IMessage.ts";
import {TYPE_ENUM} from "../model/TYPE_ENUM.ts";
import {useNotifyStore} from "./NotifyState.ts";


let socket: WebSocket;

export const connect = () => {
    socket = new WebSocket('ws://localhost:3000');

    socket.onmessage  = (event) => {
        try{
            const message = JSON.parse(event.data);
            handleSocketMessage(message);
        }catch (error){
            console.log("Error when receiving message: " + error);
        }
    }
}

export const registerPlayer = (name:string) => {
    const message:IMessage = {
        type: TYPE_ENUM.REGISTER,
        content: name,
    }
    socket.send(JSON.stringify(message));
}

export const sendMessage = (message: IMessage) => {
    const { updateState, messages } = useNotifyStore.getState();
    updateState({
        messages: [...messages!, message]
    })
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}

export const handleSocketMessage = (message:IMessage) => {
    console.log("Received Message: " + JSON.stringify(message));

    const { updateState, messages } = useNotifyStore.getState();

    switch (message.type){
        case TYPE_ENUM.REGISTER:
            updateState({
                clientName: message.content,
            })
            break;

        case TYPE_ENUM.MESSAGE:
            updateState({
                messages: [...messages!, message]
            })
            break;

        case TYPE_ENUM.CLIENTS:
            console.log("Received clients list: ", JSON.parse(message.content));

            updateState({
                onlineClients: JSON.parse(message.content)
            })
            break;

        case TYPE_ENUM.AUTH:
            console.log("Token received: " + message.token);

            updateState({
                authToken: message.token,
            })
            break;

        case TYPE_ENUM.TEST:
            console.log("Message returned: " + message.content);
            break;
    }
}