'use client'

import { useChat } from '@ai-sdk/react'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatBubble } from '@/components/ChatBubble'
import { ChatForm } from '@/components/ChatForm'
import styles from './container.module.css'

export const ChatContainer = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat()

    return (
        <section className={styles.container}>
            <ChatHeader />
            <div className={styles.chat}>
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.content}
                        isUser={msg.role === 'user'}
                        onRemove={() => console.log('remove message', msg.id)}
                    />
                ))}
            </div>
            <ChatForm
                input={input}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
            />
        </section>
    )
}
