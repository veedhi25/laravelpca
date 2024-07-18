import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import io from "socket.io-client";


interface ChatState {
  isOpen: boolean;
  messages: never[];
  currentUser: null;
  recipientUser: null;
}

interface ChatContextProps {
  //socket
  socket: any;
  //user
  user: any;
  chatState: ChatState;
  toggleChatWindow: () => void;
  sendMessage: (message: any) => void;
  setCurrentUser: (user: any) => void;
  setRecipientUser: (user: any) => void;
}

// Define initial state
const initialState: ChatState = {
  isOpen: false,
  messages: [],
  currentUser: null,
  recipientUser: null,
};

// Define the actions that can modify the chat state
const ACTIONS = {
  TOGGLE_CHAT_WINDOW: "TOGGLE_CHAT_WINDOW",
  SEND_MESSAGE: "SEND_MESSAGE",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_RECIPIENT_USER: "SET_RECIPIENT_USER",
};

// Define a reducer to handle the chat state changes
function chatReducer(state: ChatState, action: any): ChatState {
  switch (action.type) {
    case ACTIONS.TOGGLE_CHAT_WINDOW:
      return { ...state, isOpen: !state.isOpen };
    case ACTIONS.SEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case ACTIONS.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case ACTIONS.SET_RECIPIENT_USER:
      return { ...state, recipientUser: action.payload };
    default:
      return state;
  }
}

// Create a context to manage the chat state and actions
export const ChatContext = createContext<Partial<ChatContextProps>>({});

// Create a provider component to provide the chat context to the application
export function ChatProvider({ children }: any) {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  // Define functions to handle the chat actions
  function toggleChatWindow() {
    dispatch({ type: ACTIONS.TOGGLE_CHAT_WINDOW });
  }

  function sendMessage(message: any) {
    // Emit the message to the server using the socket
    socket.emit("chat:message", {
      sender: chatState.currentUser,
      recipient: chatState.recipientUser,
      message,
    });
    dispatch({ type: ACTIONS.SEND_MESSAGE, payload: message });
  }

  function setCurrentUser(user: any) {
    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: user });
  }

  function setRecipientUser(user: any) {
    dispatch({ type: ACTIONS.SET_RECIPIENT_USER, payload: user });
  }

  // Create a socket instance to communicate with the server
  const socket = io("http://localhost:3003");

  // Listen to incoming messages from the server
  socket.on("chat:message", (data) => {
    dispatch({ type: ACTIONS.SEND_MESSAGE, payload: data.message });
  });

  return (
    <ChatContext.Provider
      value={{
        chatState,
        toggleChatWindow,
        sendMessage,
        setCurrentUser,
        setRecipientUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
