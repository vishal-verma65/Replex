import { initializeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api";
import { createNewChat, addNewMessage, addMessages, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat =()=>{

    const dispatch = useDispatch()

    const handleSendMessage = async({message, chatId})=>{
        dispatch(setLoading(true))

        try{
            const data = await sendMessage({message, chatId})
            const {chat, aiMessage} = data
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
            dispatch(addNewMessage({
                chatId: chat._id,
                content: message,
                role: "user",
            }))
            dispatch(addNewMessage({
                chatId: chat._id,
                content: aiMessage.content,
                role: aiMessage.role,
            }))
            dispatch(setCurrentChatId(chat._id))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Send chat failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    const handleGetChats = async()=>{
        dispatch(setLoading(true))

        try{
            const data = await getChats()
            const {chats} = data
            dispatch(setChats(chats.reduce((acc, chat)=>{
                acc[chat._id]= {
                    id: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updateAt,
                }

                return acc
            }, {})))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Get chat failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    const handleOpenChat = async({chatId})=>{
        dispatch(setLoading(true))
        try{
            const data = await getMessages({chatId})
            const {messages } =data

            const formattedMessages = messages.map(msg=>({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(setCurrentChatId(chatId))
            dispatch(addMessages({
                chatId,
                messages: formattedMessages
            }))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Open chat failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
    }
}