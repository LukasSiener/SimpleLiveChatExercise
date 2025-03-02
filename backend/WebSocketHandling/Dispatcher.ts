import {WebSocket, WebSocketServer} from "ws";
import {IMessage} from "../model/IMessage";
import {TYPE_ENUM} from "../model/TYPE_ENUM";

require('dotenv').config();


const jwt = require('jsonwebtoken');

const clients = new Map<string, WebSocket>

export const handleSocketMessage = (ws:WebSocket, wss:WebSocketServer, msg:IMessage) => {
   switch(msg.type){
       case TYPE_ENUM.REGISTER:
           registerClient(ws, msg);
           break;

       case TYPE_ENUM.MESSAGE:
           handleClientMessage(msg);
           break;

       case TYPE_ENUM.AUTH:
           authenticateUser(ws, msg);
           break;

       case TYPE_ENUM.TEST:
           handleSecret(ws, msg);
           break;
   }
}

export const handleSecret = (ws:WebSocket, msg:IMessage) => {
    if(verifyToken(msg)){
        const tempMessage:IMessage = {
            type: TYPE_ENUM.TEST,
            content: "You are authenticated!"
        }
        ws.send(JSON.stringify(tempMessage));
    }
}

export const authenticateUser = (ws:WebSocket, msg:IMessage) => {

    if(msg.content!.split(",")[1] == "secret"){
        const token = generateAccessToken(msg.content!.split(",")[0]);
        const message:IMessage = {
            type: TYPE_ENUM.AUTH,
            content: token,
            token: token,
        }
        ws.send(JSON.stringify(message));
    }
}


export const verifyToken = (msg: IMessage): boolean => {
    try {
        jwt.verify(msg.token, process.env.ACCESS_TOKEN_SECRET);
        return true;
    } catch (err) {
        return false;
    }
};

export const generateAccessToken =(name:string) => {
    return jwt.sign({
        name:name
    }, process.env.ACCESS_TOKEN_SECRET)
}

export const registerClient = (ws:WebSocket, msg:IMessage) => {
    clients.set(msg.content, ws)
    const message:IMessage = {
        type: TYPE_ENUM.REGISTER,
        content: msg.content,
    }
    console.log("Client added! Current Clients: " + Array.from(clients.keys()));
    ws.send(JSON.stringify(message))
}

export const handleClientMessage = (msg:IMessage) => {
    const recipient = msg.to;
    console.log("Message from " + msg.from + " to " + msg.to + " received")

    const ws = clients.get(recipient!)
    console.log("ws: " + ws)
    ws!.send(JSON.stringify(msg));
}

export const broadcastAvailableClients = () => {
    const onlineClients = Array.from(clients.keys());

    const message: IMessage = {
        type: TYPE_ENUM.CLIENTS,
        content: JSON.stringify(onlineClients),
    }

    clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    });
}

setInterval(broadcastAvailableClients, 5000);



