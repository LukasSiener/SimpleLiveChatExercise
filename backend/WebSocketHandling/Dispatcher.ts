import {WebSocket, WebSocketServer} from "ws";
import {IMessage} from "../model/IMessage";


export const handleSocketMessage = (ws:WebSocket, wss:WebSocketServer, msg:IMessage) => {
    console.log("Hi")
}