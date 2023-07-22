import { Client, Conversation, Message } from '@xmtp/xmtp-js'
import { getEthersSigner } from '@/modules/ethers/walletClientToSigner'

let isListeningNewConversation = false

const messageListenerActive: Record<string, boolean> = {}

export const fetchConversationList = async (client: Client): Promise<Conversation[]> => {
  return await client.conversations.list()
}

export const getConversation = async (client: Client, contactedAdress: string): Promise<Conversation | undefined> => {
  const isOnProdNetwork = await client.canMessage(contactedAdress)

  if (!isOnProdNetwork) return

  const newConversation = await client.conversations.newConversation(contactedAdress)
  return newConversation
}

export const listenAndProcessNewMessageInConversation = (conversation: Conversation, messageListToFeed: Ref<Message[]>) => {}

export const listenAndProcessNewConversation = async (client: Client, conversationListToFeed: Ref<Conversation[]>): Promise<void> => {
  if (isListeningNewConversation) return
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

export const sendMessage = (conversation: Conversation, message: string) => {}

export const createClient = (cryptedPrivateKey: string, secretPhrase: string): Client => {}
