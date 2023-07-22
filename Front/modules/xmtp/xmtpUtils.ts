import { Client, Conversation, DecodedMessage, Message, Signer } from '@xmtp/xmtp-js'
import { getEthersSigner } from '@/modules/ethers/walletClientToSigner'

let isListeningNewConversation = false

const messageListenerActiveByConversation: Record<string, boolean> = {}

export const fetchConversationList = async (client: Client): Promise<Conversation[]> => {
  return await client.conversations.list()
}

export const getConversation = async (client: Client, contactedAdress: string): Promise<Conversation | undefined> => {
  const isOnProdNetwork = await client.canMessage(contactedAdress)

  if (!isOnProdNetwork) return

  const newConversation = await client.conversations.newConversation(contactedAdress)
  return newConversation
}

export const getMessagesFromConversation = async (conversation: Conversation): Promise<DecodedMessage[]> => {
  return await conversation.messages()
}

export const listenAndProcessNewMessageInConversation = async (conversation: Conversation, messageListToFeed: Ref<DecodedMessage[]>) => {
  if (messageListenerActiveByConversation[conversation.peerAddress]) return
  const existingMessages = await getMessagesFromConversation(conversation)
  messageListToFeed.value = existingMessages

  console.log('begin listen new messages')

  messageListenerActiveByConversation[conversation.peerAddress] = true

  for await (const message of await conversation.streamMessages()) {
    // if (message.senderAddress === conversation.clientAddress) {
    //   // This message was sent from me
    //   continue
    // }

    console.log('message received = ', message)
    // if (messageListenerActiveByConversation[conversation.peerAddress] === false) break

    messageListToFeed.value.push(message)
  }

  console.log('end of listening new messages')
}

export const listAllMessageInConversation = async (client: Client, conversation: Conversation): Promise<DecodedMessage[]> => {
  const messagesInConversation = await conversation.messages()

  return messagesInConversation
}

export const listenAndProcessNewConversation = async (client: Client, conversationListToFeed: Ref<Conversation[]>): Promise<void> => {
  if (isListeningNewConversation) return
  const existingConversations = await client.conversations.list()
  conversationListToFeed.value = existingConversations

  const stream = await client.conversations.stream()
  isListeningNewConversation = true
  for await (const conversation of stream) {
    console.log(`New conversation started with ${conversation.peerAddress}`)
    conversationListToFeed.value.push(conversation)
    if (!isListeningNewConversation) break
  }
}

export const stopListeningNewConversation = () => {
  isListeningNewConversation = false
}

export const stopListeningMessageForConversation = (peerAddress: string) => {
  messageListenerActiveByConversation[peerAddress] = false
}

export const stopListeningMessageForAllConversation = () => {
  Object.keys(messageListenerActiveByConversation).forEach((key) => {
    messageListenerActiveByConversation[key] = false
  })
}

export const sendMessage = async (conversation: Conversation, message: string) => {
  const messageDecoded = await conversation.send(message)
  console.log('messagze = ', messageDecoded)
}

export const createClient = async (wallet: Signer): Promise<Client> => {
  return await Client.create(wallet)
}
