const socket = new WebSocket('ws://localhost:8082')

const msgContainer = document.querySelector('.msg-container')
const inputText = document.querySelector('.inputText')
const inputName = document.querySelector('.input-name')
const sendBtn = document.querySelector('.btn')

let playerObj = {
  username: 'Anonymous',
  message: 'undefined'
}

let receivedMessageObj = {
  username: 'Anonymous',
  message: 'undefined'
}

socket.onopen = (event) => {
  console.log('Connection to the server has been established.')
}

socket.onmessage = (event) => {
  console.log(`Data received from server: ${event.data}`)
  receivedMessageObj = JSON.parse(event.data)
  console.log(`${receivedMessageObj.username} [message] ${receivedMessageObj.message}`)
  receivedMessage()
}

socket.onclose = function (event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
}

socket.onerror = function (error) {
  alert(`[error]`)
}

sendBtn.addEventListener('click', () => {

  if (inputText.value != '' && inputName.value != '') {
    playerObj.username = inputName.value
    playerObj.message = inputText.value
    socket.send(JSON.stringify(playerObj))
  } else {
    createErrorMessage('Please enter a name and/or message text.')
  }
})

function createMessage() {
  const outgoingMessage = document.createElement('div')
  outgoingMessage.classList.add('container')
  outgoingMessage.classList.add('pt-1')
  outgoingMessage.classList.add('pb-1')
  outgoingMessage.classList.add('outgoing-message')
  outgoingMessage.style.backgroundColor = 'darkcyan'
  outgoingMessage.style.borderRadius = '10px'
  outgoingMessage.style.fontSize = '14px'
  outgoingMessage.style.color = 'lightskyblue'
  outgoingMessage.style.marginTop = '5px'
  let p1 = document.createElement('p')
  let p2 = document.createElement('p')
  let h61 = document.createElement('h6')
  let h62 = document.createElement('h6')
  playerObj.username = inputName.value
  h61.innerHTML = playerObj.username
  p1.append(h61)
  h62.innerHTML = inputText.value
  p2.append(h62)
  outgoingMessage.append(p1)
  outgoingMessage.append(p2)
  //msgContainer.append(outgoingMessage)

  playerObj.message = inputText.value
}

function receivedMessage() {
  const outgoingMessage = document.createElement('div')
  outgoingMessage.classList.add('container')
  outgoingMessage.classList.add('pt-1')
  outgoingMessage.classList.add('pb-1')
  outgoingMessage.classList.add('outgoing-message')
  outgoingMessage.style.backgroundColor = 'darkcyan'
  outgoingMessage.style.borderRadius = '10px'
  outgoingMessage.style.fontSize = '14px'
  outgoingMessage.style.color = 'lightskyblue'
  outgoingMessage.style.marginTop = '5px'
  let p1 = document.createElement('p')
  let p2 = document.createElement('p')
  let h61 = document.createElement('h6')
  let h62 = document.createElement('h6')
  h61.innerHTML = receivedMessageObj.username
  p1.append(h61)
  h62.innerHTML = receivedMessageObj.message
  p2.append(h62)
  outgoingMessage.append(p1)
  outgoingMessage.append(p2)
  msgContainer.append(outgoingMessage)
}

function createErrorMessage(message) {
  const outgoingMessage = document.createElement('div')
  outgoingMessage.classList.add('container')
  outgoingMessage.classList.add('pt-1')
  outgoingMessage.classList.add('pb-1')
  outgoingMessage.classList.add('outgoing-message')
  outgoingMessage.style.backgroundColor = 'darkcyan'
  outgoingMessage.style.borderRadius = '10px'
  outgoingMessage.style.fontSize = '14px'
  outgoingMessage.style.color = 'lightskyblue'
  outgoingMessage.style.marginTop = '5px'
  let p1 = document.createElement('p')
  let p2 = document.createElement('p')
  let h61 = document.createElement('h6')
  let h62 = document.createElement('h6')
  p1.append(h61)
  h62.innerHTML = message
  p2.append(h62)
  outgoingMessage.append(p1)
  outgoingMessage.append(p2)
  msgContainer.append(outgoingMessage)
}