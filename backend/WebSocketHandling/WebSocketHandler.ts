import {handleSocketMessage} from "./Dispatcher";

import {WebSocket, WebSocketServer} from "ws";

var wss:WebSocketServer

export const createWebSocketServer = (server:any) => {
    wss = new WebSocketServer({server});

    wss.on("connection", (ws:WebSocket) => {
        console.log("Connection to Client achieved");

        ws.on("message", (data) => {

            const message = JSON.parse(data.toString());

            handleSocketMessage(ws,wss, message);
        })
    })
}
