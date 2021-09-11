import { commandEmitter, eventEmitter } from './types'

let worker = new Worker('/Users/atabata/src/github.com/atsu0127/ts-book/dist/section8/worker.js')
worker.onmessage = event => 
  eventEmitter.emit(
    event.data.type,
    ...event.data.data
  )

commandEmitter.on('sendMessageToThread', data => 
  worker.postMessage({type: 'sendMessageToThread', data})
)
commandEmitter.on('createThread', data =>
  worker.postMessage({type: 'createThread', data})
)

eventEmitter.on('createdThread', (threadID, participants) =>
  console.log(`Created a new chat thread! ${threadID} ${participants}`)
)

commandEmitter.emit('createThread', [123, 456])
