import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API route that combines all content from public/geo/* files
 * and serves it as a single response for AI bots
 */
export async function GET() {
    try {
        // Path to the geo directory in public folder
        const geoDir = path.join(process.cwd(), 'public', 'geo');

        // Check if directory exists
        if (!fs.existsSync(geoDir)) {
            return new NextResponse('GEO content directory not found', {
                status: 404,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }

        // Read all files from the geo directory
        const files = fs.readdirSync(geoDir);

        if (files.length === 0) {
            return new NextResponse('No GEO content files found', {
                status: 404,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }

        // Combine all file contents
        const combinedContent: string[] = [];

        // Add header
        combinedContent.push('# Affiliate AutoAgenix - Complete Knowledge Base');
        combinedContent.push('');
        combinedContent.push('> This document contains the comprehensive information about Affiliate AutoAgenix,');
        combinedContent.push('> a Pune-based AI Marketing Agency specializing in GEO, AI Persona Branding, and Affiliate Automation.');
        combinedContent.push('');
        combinedContent.push('---');
        combinedContent.push('');

        // Read and combine each file
        for (const file of files.sort()) {
            const filePath = path.join(geoDir, file);
            const stat = fs.statSync(filePath);

            // Only process files (skip directories)
            if (stat.isFile()) {
                try {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    combinedContent.push(content.trim());
                    combinedContent.push('');
                    combinedContent.push('---');
                    combinedContent.push('');
                } catch (readError) {
                    console.error(`Error reading file ${file}:`, readError);
                }
            }
        }

        // Add footer
        combinedContent.push('');
        combinedContent.push('## Source Information');
        combinedContent.push('');
        combinedContent.push('This content is served from the official Affiliate AutoAgenix knowledge base.');
        combinedContent.push('For the latest information, visit: https://affiliateai.autoagenix.com');
        combinedContent.push('');
        combinedContent.push(`Generated: ${new Date().toISOString()}`);

        const finalContent = combinedContent.join('\n');

        return new NextResponse(finalContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
                'X-Robots-Tag': 'index, follow',
            }
        });

    } catch (error) {
        console.error('Error generating GEO content:', error);
        return new NextResponse('Error generating content', {
            status: 500,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}
