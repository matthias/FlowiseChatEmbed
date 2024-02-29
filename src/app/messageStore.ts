/* eslint-disable solid/reactivity */
import { createStore } from 'solid-js/store';
import { sendMessageQuery, isStreamAvailableQuery, IncomingInput, getChatbotConfig } from '@/queries/sendMessageQuery';
import socketIOClient from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { BotProps } from '..';

type messageType = 'apiMessage' | 'userMessage' | 'usermessagewaiting';

export type MessageType = {
  message: string;
  type: messageType;
  sourceDocuments?: any;
  fileAnnotations?: any;
};

export interface MessageState {
  chatId: string;
  socketIOClientId: string;
  loading: boolean;
  messages: MessageType[];
  starterPrompts: string[];
  isChatFlowAvailableToStream: boolean;
  userInput: string;
  language: string;
}

const initialMessageState: MessageState = {
  chatId: uuidv4(),
  socketIOClientId: '',
  loading: false,
  messages: [
    {
      message: '',
      type: 'apiMessage',
    },
  ],
  starterPrompts: [],
  isChatFlowAvailableToStream: false,
  userInput: '',
  language: 'de',
};

export const [messageStore, setMessageStore] = createStore<MessageState>(initialMessageState);

// ===== message store methods =====

/**
 * Load the messages from the local storage and save them in the store.
 *
 * @param {string} chatflowid - The UID for the chat flow.
 * @param {string} apiHost - The base URL of the API host.
 * @returns {Promise<MessageType[]>} Promise: The loaded messages, or an empty array.
 */
export const loadLocalMessages = async (chatflowid: string) => {
  // Load messages from local storage
  const storedMessages = localStorage.getItem(`${chatflowid}_EXTERNAL`);
  if (storedMessages) {
    const storedMessagesObject = JSON.parse(storedMessages);
    setMessageStore('chatId', storedMessagesObject.chatId);
    const loadedMessages = storedMessagesObject.chatHistory.map((storedMessage: MessageType) => {
      const msg: MessageType = {
        message: storedMessage.message,
        type: storedMessage.type,
      };
      if (storedMessage.sourceDocuments) msg.sourceDocuments = storedMessage.sourceDocuments;
      if (storedMessage.fileAnnotations) msg.fileAnnotations = storedMessage.fileAnnotations;
      return msg;
    });
    setMessageStore('messages', [...loadedMessages]);
    return loadedMessages;
  }

  return [];
};

export const clearLocalStorage = (chatflowid: string) => {
  localStorage.removeItem(`${chatflowid}_EXTERNAL`);
};

/**
 * Add each chat message into localStorage
 */
export const saveToLocalStore = (chatflowid: string, allMessages: MessageType[]) => {
  localStorage.setItem(`${chatflowid}_EXTERNAL`, JSON.stringify({ chatId: messageStore.chatId, chatHistory: allMessages }));
};

export const updateLastMessage = (chatflowid: string, text: string) => {
  setMessageStore('messages', messageStore.messages.length - 1, (msg) => {
    return { ...msg, message: msg.message + text };
  });
  saveToLocalStore(chatflowid, messageStore.messages);
  return messageStore.messages;
};

export const updateLastMessageSourceDocuments = (chatflowid: string, sourceDocuments: any) => {
  setMessageStore('messages', messageStore.messages.length, (msg) => {
    msg.sourceDocuments = sourceDocuments;
    return msg;
  });
  saveToLocalStore(chatflowid, messageStore.messages);
  return messageStore.messages;
};

export const handleError = (message = 'Oops! There seems to be an error. Please try again.') => {
  setMessageStore('messages', (prevMessages) => [...prevMessages, { message, type: 'apiMessage' }]);
  setMessageStore('loading', false);
  setMessageStore('userInput', '');
  // scrollToBottom(); // FIXME
};

export const clearChat = (chatflowid: string, welcomeMessage = 'Hi, how can I help you?') => {
  try {
    clearLocalStorage(chatflowid);
    setMessageStore('chatId', uuidv4()); // create a new chatId
    setMessageStore('messages', [
      {
        message: welcomeMessage,
        type: 'apiMessage',
      },
    ]);
  } catch (error: any) {
    const errorData = error.response.data || `${error.response.status}: ${error.response.statusText}`;
    console.error(`error: ${errorData}`);
  }
};

// ===== API methods =====

export const sendMessage = async (userInput: string, props: BotProps) => {
  setMessageStore('userInput', userInput);

  if (userInput.trim() === '') {
    return;
  }

  setMessageStore('loading', true);
  // scrollToBottom();
  console.log('sendMessage2', userInput);

  // Send user question and history to API
  const welcomeMessage = props.welcomeMessage ?? 'props.welcomeMessage missing';
  console.log('messageList', messageStore.messages);
  const messageList = messageStore.messages.filter((msg) => msg.message !== welcomeMessage);
  console.log('messageList', messageList);

  setMessageStore('messages', (prevMessages) => {
    const messages: MessageType[] = [...prevMessages, { message: userInput, type: 'userMessage' }];
    saveToLocalStore(props.chatflowid, messages);
    return messages;
  });

  console.log('messageList::', messageStore.messages);

  const body: IncomingInput = {
    question: userInput,
    history: messageList,
    chatId: messageStore.chatId,
  };

  if (props.chatflowConfig) body.overrideConfig = props.chatflowConfig;

  console.log('isChatFlowAvailableToStream', messageStore.isChatFlowAvailableToStream);

  if (messageStore.isChatFlowAvailableToStream) body.socketIOClientId = messageStore.socketIOClientId;

  console.log('messageStore', messageStore);

  const result = await sendMessageQuery({
    chatflowid: props.chatflowid,
    apiHost: props.apiHost,
    body,
  });

  console.log('result', result);

  setMessageStore('loading', false);

  console.log('messageStore', messageStore);

  // Handle errors
  if (result.error) {
    const error = result.error;
    console.error(error);
    const err: any = error;
    const errorData = typeof err === 'string' ? err : err.response.data || `${err.response.status}: ${err.response.statusText}`;
    handleError(errorData);
    return {
      error: errorData,
    };
  }

  // Handle successful response
  if (result.data) {
    const data = result.data;
    if (!messageStore.isChatFlowAvailableToStream) {
      let text = '';
      if (data.text) text = data.text;
      else if (data.json) text = JSON.stringify(data.json, null, 2);
      else text = JSON.stringify(data, null, 2);

      setMessageStore('messages', (prevMessages) => {
        const messages: MessageType[] = [
          ...prevMessages,
          { message: text, sourceDocuments: data?.sourceDocuments, fileAnnotations: data?.fileAnnotations, type: 'apiMessage' },
        ];
        saveToLocalStore(props.chatflowid, messages);
        return messages;
      });
    }
    setMessageStore('userInput', '');
    // scrollToBottom();
  }

  return {
    ...result.data,
  };
};

/**
 * Checks if streaming is available for a specific chat flow via async API call.
 * And stores the result in the store.
 *
 * @param {string} chatflowid - The UID for the chat flow.
 * @param {string} apiHost - The base URL of the API host.
 * @returns {Promise<boolean>} Promise: Whether streaming is available.
 */
export const checkIfStreamingIsAvailable = async (chatflowid: string, apiHost: string) => {
  let isStreaming = false;

  // Determine if particular chatflow is available for streaming
  const { data } = await isStreamAvailableQuery({
    chatflowid: chatflowid,
    apiHost: apiHost,
  });

  // and remember it in the store
  if (data) {
    isStreaming = data?.isStreaming ?? false;
    setMessageStore('isChatFlowAvailableToStream', isStreaming);
  }

  return isStreaming;
};

/**
 * Gets the starter prompts for a specific chat flow via an async API call.
 * And stores the result in the store.
 *
 * @param {string} chatflowid - The UID for the chat flow.
 * @param {string} apiHost - The base URL of the API host.
 * @returns {Promise<string[] | null>} Promise: Array of starter prompts, or null.
 */
export const loadStarterPrompts = async (chatflowid: string, apiHost: string) => {
  // Get the chatbotConfig
  const result = await getChatbotConfig({
    chatflowid: chatflowid,
    apiHost: apiHost,
  });

  if (result.data) {
    const chatbotConfig = result.data;
    if (chatbotConfig.starterPrompts) {
      const prompts: string[] = [];
      Object.getOwnPropertyNames(chatbotConfig.starterPrompts).forEach((key) => {
        prompts.push(chatbotConfig.starterPrompts[key].prompt);
      });
      setMessageStore('starterPrompts', prompts);
      return prompts;
    }
  }

  return null;
};

export const listenToChatStream = async (chatflowid: string, apiHost: string) => {
  const socket = socketIOClient(apiHost);

  socket.on('connect', () => {
    setMessageStore('socketIOClientId', socket.id);
  });

  socket.on('start', () => {
    setMessageStore('messages', (prevMessages) => [...prevMessages, { message: '', type: 'apiMessage' }]);
  });

  socket.on('sourceDocuments', (sourceDocuments: any) => {
    updateLastMessageSourceDocuments(chatflowid, sourceDocuments);
  });

  socket.on('token', (token: string) => {
    updateLastMessage(chatflowid, token);
  });
};

export function addMessage(message: MessageType) {
  setMessageStore('messages', (messages) => [...messages, message]);
}

/// UTILITY FUNCTIONS ///

export function isValidURL(url: string): URL | undefined {
  try {
    return new URL(url);
  } catch (err) {
    return undefined;
  }
}

export function removeDuplicateURL(message: MessageType) {
  const visitedURLs = new Set<string>();

  const newSourceDocuments = message.sourceDocuments.reduce((accumulator: any[], source: any) => {
    const url = source.metadata.source;

    if (!isValidURL(url) || !visitedURLs.has(url)) {
      if (isValidURL(url)) {
        visitedURLs.add(url); // Mark this URL as visited
      }
      accumulator.push(source); // Add source to the accumulator
    }

    return accumulator;
  }, []);

  return newSourceDocuments;
}
