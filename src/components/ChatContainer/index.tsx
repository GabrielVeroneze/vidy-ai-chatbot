'use client'

import { useChat } from '@ai-sdk/react'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatBubble } from '@/components/ChatBubble'
import { ChatForm } from '@/components/ChatForm'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/Button'
import { IconStop } from '@/components/Icons'
import styles from './container.module.css'

export const ChatContainer = () => {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        status,
        stop,
    } = useChat()

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
            {status === 'submitted' || status === 'streaming' && (
                <div>
                    <Loader />
                    <Button variant="danger" onClick={stop}>
                        <IconStop /> parar
                    </Button>
                </div>
            )}
            <ChatForm
                input={input}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
            />
        </section>
    )
}
