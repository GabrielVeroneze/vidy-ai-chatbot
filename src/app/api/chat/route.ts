import { convertToCoreMessages, streamText, UIMessage } from 'ai'
import { openai } from '@ai-sdk/openai'

type RequestBody = {
    id: string
    messages: UIMessage[]
}

export async function POST(request: Request) {
    const { messages }: RequestBody = await request.json()

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToCoreMessages(messages),
        system: `
            Você é um assistente pessoal divertido e gentil que fala sobre filmes.
            Se alguém te perguntar qualquer coisa que não seja sobre filmes,
            responda de forma divertida que você só sabe falar sobre filmes e ofereça seus serviços.
        `,
    })

    return result.toDataStreamResponse()
}
