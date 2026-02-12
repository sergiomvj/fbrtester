
import { Lurdinha } from './src/agents/lurdinha';
import { Tereza } from './src/agents/tereza';
import { Judith } from './src/agents/judith';
import { Rosangela } from './src/agents/rosangela';

async function test() {
    console.log("Imports successful via ES imports!");
    try {
        console.log("Lurdinha:", new Lurdinha());
        console.log("Tereza:", new Tereza());
        console.log("Judith:", new Judith());
        console.log("Rosangela:", new Rosangela());
    } catch (e) {
        console.error("Instantiation failed:", e);
    }
}

test().catch(console.error);
