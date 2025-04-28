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
    })

    return result.toDataStreamResponse()
}
