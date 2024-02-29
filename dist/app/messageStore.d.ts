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
export declare const messageStore: MessageState, setMessageStore: import("solid-js/store").SetStoreFunction<MessageState>;
/**
 * Load the messages from the local storage and save them in the store.
 *
 * @param {string} chatflowid - The UID for the chat flow.
 * @param {string} apiHost - The base URL of the API host.
 * @returns {Promise<MessageType[]>} Promise: The loaded messages, or an empty array.
 */
export declare const loadLocalMessages: (chatflowid: string) => Promise<any>;
export declare const clearLocalStorage: (chatflowid: string) => void;
/**
 * Add each chat message into localStorage
 */
export declare const saveToLocalStore: (chatflowid: string, allMessages: MessageType[]) => void;
export declare const updateLastMessage: (chatflowid: string, text: string) => MessageType[];
export declare const updateLastMessageSourceDocuments: (chatflowid: string, sourceDocuments: any) => MessageType[];
export declare const handleError: (message?: string) => void;
export declare const clearChat: (chatflowid: string, welcomeMessage?: string) => void;
export declare const sendMessage: (userInput: string, props: BotProps) => Promise<any>;
/**
 * Checks if streaming is available for a specific chat flow via async API call.
 * And stores the result in the store.
 *
 * @param {string} chatflowid - The UID for the chat flow.
 * @param {string} apiHost - The base URL of the API host.
 * @returns {Promise<boolean>} Promise: Whether streaming is available.
 */
export declare const checkIfStreamingIsAvailable: (chatflowid: string, apiHost: string) => Promise<boolean>;
/**
 * Gets the starter prompts for a specific chat flow via an async API call.
 * And stores the result in the store.
 *
 * @param {string} chatflowid - The UID for the chat flow.
 * @param {string} apiHost - The base URL of the API host.
 * @returns {Promise<string[] | null>} Promise: Array of starter prompts, or null.
 */
export declare const loadStarterPrompts: (chatflowid: string, apiHost: string) => Promise<string[] | null>;
export declare const listenToChatStream: (chatflowid: string, apiHost: string) => Promise<void>;
export declare function addMessage(message: MessageType): void;
export declare function isValidURL(url: string): URL | undefined;
export declare function removeDuplicateURL(message: MessageType): any;
export {};
//# sourceMappingURL=messageStore.d.ts.map