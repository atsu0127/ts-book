import { EventEmitter } from 'events'

interface SafeEmitter<
  Events extends Record<PropertyKey, unknown[]>
> {
  emit<K extends keyof Events>(
    channel: K,
    ...date: Events[K]
  ): boolean

  on<K extends keyof Events>(
    channel: K,
    listener: (...date: Events[K]) => void
  ): this
  on(
    channel: never,
    listener: (...data: unknown[]) => void
  ): this
}

type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]

type Commands = {
  sendMessageToThread: [ThreadID, Message]
  createThread: [Participants]
  addUserToThread: [ThreadID, UserID]
  removeUserFromThread: [ThreadID, UserID]
}

type Events = {
  receiveMessage: [ThreadID, UserID, Message]
  createdThread: [ThreadID, Participants]
  addedUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}

export const commandEmitter: SafeEmitter<Commands> = new EventEmitter()
export const eventEmitter: SafeEmitter<Events> = new EventEmitter()
