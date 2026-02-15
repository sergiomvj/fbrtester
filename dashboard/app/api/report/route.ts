
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // In production/docker, this checks the shared volume path
        // Default relative path is for local dev fallback
        const reportPath = process.env.REPORT_PATH || path.join(process.cwd(), 'public', 'report.json');

        console.log(`[API] Serving report from: ${reportPath}`);

        if (!fs.existsSync(reportPath)) {
            return NextResponse.json({ error: 'Report not found' }, { status: 404 });
        }

        const fileContents = fs.readFileSync(reportPath, 'utf8');
        const data = JSON.parse(fileContents);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading report:", error);
        return NextResponse.json({ error: 'Failed to read report' }, { status: 500 });
    }
}
