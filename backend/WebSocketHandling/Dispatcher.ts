import {WebSocket, WebSocketServer} from "ws";
import {IMessage} from "../model/IMessage";
import {TYPE_ENUM} from "../model/TYPE_ENUM";


const clients = new Map<string, WebSocket>

export const handleSocketMessage = (ws:WebSocket, wss:WebSocketServer, msg:IMessage) => {
   switch(msg.type){
       case TYPE_ENUM.REGISTER:
           registerClient(ws, msg);
           break;

       case TYPE_ENUM.MESSAGE:
           handleClientMessage(msg);
           break;
   }
}

export const registerClient = (ws:WebSocket, msg:IMessage) => {
    clients.set(msg.content, ws)
}

export const handleClientMessage = (msg:IMessage) => {
    const recipient = msg.to;

    const ws = clients.get(recipient!)

    ws!.send(JSON.stringify(msg));
}