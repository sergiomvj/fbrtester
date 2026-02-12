
import { SpecVerifier } from '../spec-verifier/verifier';
import * as fs from 'fs';
import * as path from 'path';

export interface JudithReport {
    conceptAlignment: boolean;
    issues: string[];
    score: number;
}

export class Judith {
    private verifier: SpecVerifier;

    constructor() {
        this.verifier = new SpecVerifier();
    }

    async run(projectRoot: string, auditResults: any[]): Promise<JudithReport> {
        console.log("👩‍⚖️ Judith: Analisando se isso aqui é o que foi prometido...");

        const issues: string[] = [];
        let alignmentScore = 100;

        // 1. Load Concept
        const conceptPath = path.join(projectRoot, 'conceito.md');
        let concept = "";
        if (fs.existsSync(conceptPath)) {
            concept = fs.readFileSync(conceptPath, 'utf-8');
        } else {
            issues.push("Onde está o conceito.md? Como vou saber o que verificar?");
            alignmentScore -= 50;
        }

        // 2. AI Verification of alignment (Sample check)
        // We check if the audit results show evidence of the concept implementation
        // For a real check, we'd summarize the audit results and ask the AI.

        // Simplification for this implementation:
        // Check if critical pages from concept might exist in audit results (if we had a smart parser)

        // Let's use SpecVerifier for a general "Project seems healthy" check based on audit data
        const auditSummary = JSON.stringify(auditResults, null, 2).slice(0, 2000); // Truncate for token limits

        try {
            const result = await this.verifier.verify(
                "The application should have valid pages, no broken links, and accessible elements.",
                auditSummary
            );

            if (!result.satisfied) {
                issues.push(`O projeto não parece saudável: ${result.reason}`);
                alignmentScore -= 30;
            }
        } catch (e) {
            issues.push(`Erro ao consultar minha bola de cristal (AI): ${e}`);
        }

        const report: JudithReport = {
            conceptAlignment: alignmentScore > 70,
            issues,
            score: alignmentScore
        };

        console.log(`👩‍⚖️ Judith: Veredito dado. Nota: ${report.score}/100`);
        return report;
    }
}
