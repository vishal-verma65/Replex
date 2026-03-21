import { initializeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api";
import { createNewChat, addNewMessage, setChats, setCurrentChat, setError, setLoading } from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat =()=>{

    const dispatch = useDispatch()

    const handleSendMessage = async({message, chatId})=>{
        setLoading(true)

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
            dispatch(setCurrentChat(chat._id))
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Send chat failed"))
        }
        finally{
            setLoading(false)
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
    }
}