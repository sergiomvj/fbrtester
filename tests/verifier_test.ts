
import { SpecVerifier } from '../src/spec-verifier/verifier';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function test() {
    console.log("Starting test...");
    console.log("API Key present:", process.env.OPENROUTER_API_KEY ? "Yes" : "No");

    const verifier = new SpecVerifier();
    const specsPath = path.join(__dirname, '../specs');

    console.log("Loading specs from:", specsPath);

    const contextSuccess = `
    User entered 'test@example.com' and 'password123'.
    Clicked 'Login' button.
    Navigation occurred to '/dashboard'.
    `;

    const contextFailure = `
    User entered 'test@example.com' and 'wrong'.
    Clicked 'Login' button.
    Page stayed at '/login'.
    No error message displayed.
    `;

    try {
        console.log("Testing Success Context...");
        const result1 = await verifier.verify("User should contain login with valid credentials and redirect to dashboard", contextSuccess);
        console.log("Result 1:", JSON.stringify(result1, null, 2));
    } catch (e) {
        console.error("Test 1 failed:", e);
    }

    try {
        console.log("Testing Failure Context...");
        const result2 = await verifier.verify("If login fails, an error message 'Invalid credentials' must be shown", contextFailure);
        console.log("Result 2:", JSON.stringify(result2, null, 2));
    } catch (e) {
        console.error("Test 2 failed:", e);
    }
}

test().catch(e => console.error("Script failed:", e));
