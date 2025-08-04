#!/usr/bin/env node

import { readdir, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const imagesRoot = join(__dirname, 'public', 'images');
const repoPath = 'AIChE-NTU/aiche-ntu.github.io'; // Change if your repo path is different

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

async function processFolder(folderAbsPath, relPathFromImages) {
    const entries = await readdir(folderAbsPath, { withFileTypes: true });
    const imageFiles = entries
        .filter(e => e.isFile() && imageExtensions.includes(extname(e.name).toLowerCase()))
        .map(e => e.name);

    if (imageFiles.length > 0) {
        // Local paths
        const localPaths = imageFiles.map(f => `/images/${relPathFromImages}/${f}`.replace(/\\/g, '/'));
        await writeFile(join(folderAbsPath, `${basename(relPathFromImages)}.json`), JSON.stringify(localPaths, null, 2));
        // CDN paths
        const cdnPaths = imageFiles.map(f =>
            `https://cdn.jsdelivr.net/gh/${repoPath}/public/images/${relPathFromImages}/${f}`.replace(/\\/g, '/')
        );
        await writeFile(join(folderAbsPath, `${basename(relPathFromImages)}_github.json`), JSON.stringify(cdnPaths, null, 2));
        console.log(`✅ Generated JSONs in ${relPathFromImages}`);
    }

    // Recurse into subfolders
    for (const entry of entries) {
        if (entry.isDirectory()) {
            await processFolder(
                join(folderAbsPath, entry.name),
                relPathFromImages ? `${relPathFromImages}/${entry.name}` : entry.name
            );
        }
    }
}

async function main() {
    await processFolder(imagesRoot, '');
}

main().catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
});