import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import PDFDocument from 'pdfkit';

// Initialize OpenAI with a dummy key if missing
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

export async function POST(req) {
    try {
        const data = await req.json();
        const { businessName, industry, businessContext, painPoints, techStack } = data;

        // 1. Construct the master prompt for the LLM
        const prompt = `
      Act as an elite AI Strategy Consultant. 
      The client is a business named "${businessName}" in the "${industry}" industry.
      Context: ${businessContext}
      Pain Points: ${painPoints}
      Current Tech Stack: ${techStack.join(', ')}

      Please generate a comprehensive, structured response that I can compile into a 15-page PDF playbook.
      Include:
      1. Executive Summary
      2. Recommended AI Tools (You MUST provide at least 10 specific, highly relevant tools to solve their pain points).
      3. Custom Workflows integrating with their tech stack.
      4. A bespoke Prompt Kit (You MUST provide at least 30 detailed, ready-to-use prompts spanning operations, marketing, and sales).
    `;

        // 2. Call OpenAI
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4-turbo-preview",
            temperature: 0.7,
        });
        const strategyContent = completion.choices[0].message.content;

        // 3. Generate the PDF
        // We create a new Promise to handle the stream output of PDFKit into a standard response
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                const buffers = [];

                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => {
                    const pdfData = Buffer.concat(buffers);

                    resolve(new NextResponse(pdfData, {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment; filename="${businessName.replace(/\s+/g, '_')}_AI_Strategy.pdf"`,
                        }
                    }));
                });

                // Design the PDF Document
                doc.fontSize(24).fillColor('#0f172a').text('AI Clarity Engine: Strategy Playbook', { align: 'center' });
                doc.moveDown(1);
                doc.fontSize(16).fillColor('#2563eb').text(`Prepared exclusively for: ${businessName}`, { align: 'center' });
                doc.moveDown(3);

                doc.fontSize(12).fillColor('#1c1917').text(strategyContent, {
                    align: 'left',
                    lineGap: 4
                });

                doc.end();

            } catch (err) {
                reject(err);
            }
        });

    } catch (error) {
        console.error('Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate strategy PDF' },
            { status: 500 }
        );
    }
}
