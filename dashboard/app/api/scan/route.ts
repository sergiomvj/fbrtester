
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, agent } = body;

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // verification logic would go here
        // For now, return success to demonstrate UI

        return NextResponse.json({
            success: true,
            message: `A agente ${agent} iniciou a varredura em ${url}. Atualize o relatório em breve!`,
            reportLink: '/report.json'
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Erro ao processar solicitação' },
            { status: 500 }
        );
    }
}
