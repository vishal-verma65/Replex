import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'
import {useSelector} from "react-redux"

const Dashboard = () => {

    const [chatInput, setChatInput] = useState("")
    const [userMessage, setUserMessage] = useState("")

    const chat = useChat()
    const chats = useSelector(state => state.chat.chats)
    const currentChatId = useSelector((state)=> state.chat.currentChatId)

    useEffect(() => {
        chat.initializeSocketConnection()
        chat.handleGetChats()
    }, [])

    const handleSubmitMessage =(e)=>{
        e.preventDefault()

        const trimmedMessage = chatInput.trim()
        if(!trimmedMessage){
            return 
        }

        chat.handleSendMessage({message: trimmedMessage, chatId: currentChatId})
        setChatInput("")
    }

    const openChat = async(chatId)=>{
        await chat.handleOpenChat({chatId})
    }

    return (
        <main className='h-screen w-full flex bg-slate-900 text-slate-100'>
            <aside className='w-80 border-r border-slate-700 bg-slate-950 flex flex-col'>
                <div className='p-4 border-b border-slate-700'>
                    <h1 className='text-2xl font-bold tracking-wider'>Replex</h1>
                </div>
                <div className='flex-1 overflow-y-auto p-3 space-y-2'>
                    {Object.values(chats).map((chat, idx) => (
                        <button
                            onClick={() => {openChat(chat.id)}}
                            key={idx}
                            className='w-full text-left rounded-lg border border-slate-700 px-2 py-1 transition-colors duration-150 hover:bg-slate-800 hover:border-slate-500 cursor-pointer'
                        >
                            {chat.title}
                        </button>
                    ))}
                </div>
                <div className='p-4 border-t border-slate-700'>
                    <button className='w-full rounded-lg bg-sky-600 px-3 py-2 font-medium text-white hover:bg-sky-500'>+ New Chat</button>
                </div>
            </aside>

            <section className='flex-1 flex flex-col'>
                <div className='flex items-center justify-between border-b border-slate-700 bg-slate-950 px-6 py-1.5'>
                    <div>
                        <h2 className='text-xl font-semibold'>Current Chat</h2>
                    </div>
                    <span className='rounded-md bg-slate-700 px-3 py-1 text-xs text-slate-200'>Delete</span>
                </div>

                <div className='flex-1 overflow-y-auto p-4 bg-linear-to-b from-slate-900 to-slate-800'>
                    <div className='max-w-6xl mx-auto space-y-4 flex flex-col'>
                        {chats[currentChatId]?.messages.map((msg, idx) => (
                            <article
                                key={idx}
                                className={`py-1 px-3 rounded-xl ${msg.role === 'ai' ? 'bg-slate-800 text-slate-100 self-start rounded-tl-xs' : 'bg-sky-700/20 text-sky-100 self-end text-right rounded-br-xs'} max-w-[80%] w-fit`}
                            >
                                {msg.role === 'ai' ? (
                                    <div className='prose prose-invert text-sm leading-relaxed'>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className='text-base leading-relaxed'>{msg.content}</p>
                                )}
                            </article>
                        ))}
                    </div>
                </div>

                <footer className='border-t border-slate-700 bg-slate-950 px-6 py-3.5'>
                    <form onSubmit={handleSubmitMessage} className='flex items-center gap-3'>
                        <input
                            value={chatInput}
                            onChange={(e)=> setChatInput(e.target.value)}
                            type='text'
                            placeholder='Type your message...'
                            className='flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
                        />
                        <button 
                            type='submit'
                            disabled={!chatInput.trim()}
                            className='rounded-lg bg-sky-600 px-5 py-2.5 font-semibold text-white hover:bg-sky-500'
                        >Send</button>
                    </form>
                </footer>
            </section>
        </main>
    )
}

export default Dashboard

