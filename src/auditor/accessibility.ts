
import { Page } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

export interface A11yResult {
    violetions: any[];
    score?: number; // Axe Asdasd doesn't give a score, but we can count violations
}

export class AccessibilityScanner {
    async scan(page: Page): Promise<any> {
        try {
            const results = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();

            return results.violations;
        } catch (e) {
            console.error("Axe scan failed", e);
            return [];
        }
    }
}
