const WebSocketServer = require('ws').Server;
const express = require('express');
const server = require('http').createServer();
const PubSubManager = require('./pubmanager');
const app = express();
const pubSubManager = new PubSubManager();
const port = process.env.port || "8000";
const router = express.Router();
const WebSocket = require('ws');

app.use(express.json())
const wss = new WebSocketServer({ server: server });
wss.on('connection', (ws, req) => {
    console.log(`Connection request from: ${req.connection.remoteAddress}`);
    ws.on('message', (data) => {
        console.log('data: ' + data);
        const json = JSON.parse(data);
        const request = json.request;
        const message = json.message;
        const channel = json.channel;

        switch (request) {
            case 'PUBLISH':
                pubSubManager.publish(ws, channel, message);
                break;
            case 'SUBSCRIBE':
                pubSubManager.subscribe(ws, channel);
                break;
        }
    });
    ws.on('close', () => {
        console.log('Stopping client connection.');
    });
});

app.post('/publish/topic1', (req,res) => {
    
    var ws = new WebSocket("ws://localhost:8000");
    ws.onopen = function () {
        ws.send(JSON.stringify({
            request: 'PUBLISH',
            message: req.body.message || "NO-MESSAGE",
            channel: req.body.topic || "topic1"
        }));

        res.json({ 'message': req.body.message, topic: req.body.topic})
        ws.close();
    }

   
});


server.on('request', app);
server.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
});