import { NextRequest } from 'next/server'
import { convertToCoreMessages, streamText, UIMessage } from 'ai'
import { openai } from '@ai-sdk/openai'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

type RequestBody = {
    id: string
    messages: UIMessage[]
}

interface ExtendedRequest extends NextRequest {
    ip?: string
}

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(2, '60s'),
})

export async function POST(request: NextRequest) {
    const ip = (request as ExtendedRequest).ip ?? 'ip'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
        return new Response('Limite de mensagens atingido!', { status: 429 })
    }

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
