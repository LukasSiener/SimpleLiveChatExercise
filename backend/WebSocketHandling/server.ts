import {createWebSocketServer} from "./WebSocketHandler";

const express = require('express')
import cors = require('cors')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
    console.log("Server is running on port: " + port)
})


createWebSocketServer(server);
