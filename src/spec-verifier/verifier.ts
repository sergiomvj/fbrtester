
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export class SpecVerifier {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
        });
    }

    async verify(requirement: string, context: string): Promise<{ satisfied: boolean; reason: string }> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'openai/gpt-4o-mini', // or another generic model
                messages: [
                    {
                        role: 'system',
                        content: `You are a QA Specification Verifier. 
            Your job is to check if a specific requirement is satisfied given the current context (test results, code snippets, or logs).
            Return a JSON object: { "satisfied": boolean, "reason": string }`
                    },
                    {
                        role: 'user',
                        content: `Requirement: ${requirement}\n\nContext:\n${context}`
                    }
                ],
                response_format: { type: 'json_object' }
            });

            const content = completion.choices[0].message?.content;
            if (!content) return { satisfied: false, reason: "No response from AI" };

            return JSON.parse(content);
        } catch (error) {
            console.error("AI Verification failed:", error);
            return { satisfied: false, reason: "AI Error: " + error };
        }
    }

    loadSpecs(dirPath: string): string {
        // Simple implementation: read all .md files in the directory
        let specs = "";
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
                if (file.endsWith('.md')) {
                    specs += `\n--- File: ${file} ---\n`;
                    specs += fs.readFileSync(path.join(dirPath, file), 'utf-8');
                }
            }
        }
        return specs;
    }
}
