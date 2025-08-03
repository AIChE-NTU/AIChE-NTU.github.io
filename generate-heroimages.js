#!/usr/bin/env node

/**
 * Generate heroimages.json from all images in public/images/heroimages/
 * Run this script whenever you add new hero images to automatically update the list
 */

import { readdir, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const heroImagesDir = join(__dirname, 'public', 'images', 'heroimages');
const outputFile = join(heroImagesDir, 'heroimages.json');

async function generateHeroImagesList() {
    try {
        const files = await readdir(heroImagesDir);
        
        // Filter for image files only
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const imageFiles = files
            .filter(file => {
                const ext = extname(file).toLowerCase();
                return imageExtensions.includes(ext) && file !== 'heroimages.json';
            })
            .sort() // Sort alphabetically for consistent ordering
            .map(file => `/images/heroimages/${file}`);
        
        // Write the JSON file
        await writeFile(outputFile, JSON.stringify(imageFiles, null, 2));
        
        console.log(`✅ Generated heroimages.json with ${imageFiles.length} images:`);
        imageFiles.forEach(img => console.log(`   ${img}`));
        
    } catch (error) {
        console.error('❌ Error generating heroimages.json:', error);
        process.exit(1);
    }
}

generateHeroImagesList();
