
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, agent } = body;


        // Call the Agent Service (running in a separate container)
        // In Docker (Easypanel/Compose), the service name is usually the hostname
        const agentServiceUrl = process.env.AGENT_SERVICE_URL || 'http://agent:4000';

        console.log(`Forwarding scan request to ${agentServiceUrl}/scan`);

        const response = await fetch(`${agentServiceUrl}/scan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, agent }),
        });

        if (!response.ok) {
            throw new Error(`Agent service responded with ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Erro ao processar solicitação' },
            { status: 500 }
        );
    }
}
