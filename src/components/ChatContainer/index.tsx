'use client'

import { useChat } from '@ai-sdk/react'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatBubble } from '@/components/ChatBubble'
import { ChatForm } from '@/components/ChatForm'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/Button'
import { IconStop } from '@/components/Icons'
import { RetryButton } from '@/components/RetryButton'
import styles from './container.module.css'

export const ChatContainer = () => {
    const {
        messages,
        setMessages,
        input,
        handleInputChange,
        handleSubmit,
        status,
        stop,
        reload,
    } = useChat()

    function removeMessage(id: string) {
        setMessages(messages.filter((msg) => msg.id !== id))
    }

    return (
        <section className={styles.container}>
            <ChatHeader />
            <div className={styles.chat}>
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.content}
                        isUser={msg.role === 'user'}
                        onRemove={() => removeMessage(msg.id)}
                    />
                ))}
            </div>
            {(status === 'submitted' || status === 'streaming') && (
                <div>
                    <Loader />
                    <Button variant="danger" onClick={stop}>
                        <IconStop /> parar
                    </Button>
                </div>
            )}
            {(status === 'ready' && messages.length > 0) && (
                <div>
                    <RetryButton onClick={() => reload()} />
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
