import { commandEmitter, eventEmitter } from './types'

onmessage = command => {
  commandEmitter.emit(
    command.data.type,
    ...command.data.data
  )
}

eventEmitter.on('receiveMessage', data =>
  postMessage({type: 'receivedMessage', data})
)

eventEmitter.on('createdThread', data =>
  postMessage({type: 'createdThread', data})
)

commandEmitter.on('sendMessageToThread', (threadID, message) =>
  console.log(`OK, I will send a message to threadID ${threadID}`)
)

eventEmitter.emit('createdThread', 123, [456, 789])
