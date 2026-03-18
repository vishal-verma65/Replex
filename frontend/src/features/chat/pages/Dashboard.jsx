import React, { useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import {useSelector} from "react-redux"

const Dashboard = () => {

    const chat = useChat()

    const {user} = useSelector(state => state.auth)
    console.log(user)

    useEffect(()=>{
        chat.initializeSocketConnection()
    }, [])

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard