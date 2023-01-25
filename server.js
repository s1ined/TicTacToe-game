const WebSocketServer = require('ws')
const server = new WebSocketServer.Server({ port: 8082 })

server.on('connection', (ws) => {
    console.log(`New player has been connected.`)
    console.log(`Connected clients: ${server.clients.size}`)

    ws.on('message', (rawMessage) => {
        if (JSON.parse(rawMessage) instanceof Array) {
            server.clients.forEach(function each(client) {
                if (client != ws && client.readyState == ws.OPEN) {
                    client.send(rawMessage.toString())
                    console.log(rawMessage.toString())
                }
            })
        }
        else {
            server.clients.forEach(function each(client) {
                if (client != ws && client.readyState == ws.OPEN) {
                    client.send(rawMessage.toString())
                    let obj = JSON.parse(rawMessage)
                    console.log(`${obj.username} sends ${obj.message}`)
                }
            })
        }
    })
})

server.on('close', () => {
    console.log('Client has been disconnected.')
    console.log(`Connected clients: ${server.clients.size}`)
})