
import { Page, Locator } from 'playwright';

export interface InteractableResult {
    selector: string;
    type: 'button' | 'link' | 'input';
    text?: string;
    isVisible: boolean;
    isEnabled: boolean;
    issues: string[];
}

export class InteractablesChecker {
    async check(page: Page): Promise<InteractableResult[]> {
        const results: InteractableResult[] = [];

        // Helper to check elements
        const checkElement = async (locator: Locator, type: 'button' | 'link' | 'input') => {
            const count = await locator.count();
            for (let i = 0; i < count; i++) {
                const el = locator.nth(i);
                const isVisible = await el.isVisible();
                const isEnabled = await el.isEnabled();
                const text = await el.textContent().catch(() => '');

                const issues: string[] = [];
                if (!isVisible) issues.push('Not visible');
                if (!isEnabled) issues.push('Disabled');

                // Check for basic clickability issues if visible and enabled
                if (isVisible && isEnabled) {
                    try {
                        // We don't want to actually click and navigate, so we might just check bounding box
                        const box = await el.boundingBox();
                        if (!box || box.width === 0 || box.height === 0) {
                            issues.push('Zero size');
                        }
                    } catch (e) {
                        issues.push('Error checking bounding box');
                    }
                }

                results.push({
                    selector: await el.evaluate(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.className ? '.' + e.className.split(' ').join('.') : '')),
                    type,
                    text: text?.trim() || undefined,
                    isVisible,
                    isEnabled,
                    issues
                });
            }
        };

        await checkElement(page.locator('button'), 'button');
        await checkElement(page.locator('a[href]'), 'link');
        await checkElement(page.locator('input'), 'input');
        await checkElement(page.locator('select'), 'input');
        await checkElement(page.locator('textarea'), 'input');

        return results;
    }
}
