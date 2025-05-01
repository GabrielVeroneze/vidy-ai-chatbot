import { convertToCoreMessages, streamText, UIMessage } from 'ai'
import { openai } from '@ai-sdk/openai'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

type RequestBody = {
    id: string
    messages: UIMessage[]
}

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(5, '30s'),
})

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

    return result.toDataStreamResponse({
        getErrorMessage: (error) => {
            if (error === null) {
                console.error('[POST] :: toDataStreamResponse - Erro recebido como nulo, o que não deveria acontecer.')

                return 'Algum erro inesperado aconteceu!'
            }

            if (typeof error === 'string') {
                console.error('[POST] :: toDataStreamResponse - Erro recebido como string:', error)

                return error
            }

            if (error instanceof Error) {
                console.error('[POST] :: toDataStreamResponse - Erro recebido como instância de Error:', error)

                return error.message
            }

            return JSON.stringify(error)
        },
    })
}
