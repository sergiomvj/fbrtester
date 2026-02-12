
import * as fs from 'fs';
import * as path from 'path';

export interface TerezaReport {
    structureViolations: string[];
    codeSmells: string[];
    score: number;
}

export class Tereza {
    async run(projectPath: string): Promise<TerezaReport> {
        console.log("👵 Tereza: Verificando se vocês arrumaram a casa direitinho...");

        const violations: string[] = [];
        const smells: string[] = [];

        // 1. Check Standard Folders
        const requiredFolders = ['src', 'tests', 'docs', '.github']; // Example standard
        const files = fs.readdirSync(projectPath);

        // logic to be less strict if it's a specific framework, but let's check basic hygiene
        if (!fs.existsSync(path.join(projectPath, 'README.md'))) {
            violations.push("Falta o crachá da casa: README.md inexistente.");
        }

        // 2. Check for "any" in TypeScript files (Simple regex scan)
        const scanDir = (dir: string) => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                if (item === 'node_modules' || item === '.git') continue;

                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scanDir(fullPath);
                } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    if (content.includes(': any') || content.includes('as any')) {
                        smells.push(`O arquivo ${item} está usando 'any'. Que feio!`);
                    }
                    if (content.includes('console.log')) {
                        // smells.push(`Console.log esquecido em ${item}.`); // Maybe too strict for now
                    }
                }
            }
        };

        if (fs.existsSync(path.join(projectPath, 'src'))) {
            scanDir(path.join(projectPath, 'src'));
        }

        const report: TerezaReport = {
            structureViolations: violations,
            codeSmells: smells,
            score: Math.max(0, 100 - (violations.length * 20) - (smells.length * 5))
        };

        console.log(`👵 Tereza: Análise completa. Nota: ${report.score}/100`);
        return report;
    }
}
