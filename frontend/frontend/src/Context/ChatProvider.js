import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { ChakraProvider } from '@chakra-ui/react';
//import { BrowserRouter } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <ChatContext.Provider value={{ 
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
             }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    //return useContext(ChatContext);
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChatState must be used within a ChatProvider");
    }
    return context;
};

export default ChatProvider;
