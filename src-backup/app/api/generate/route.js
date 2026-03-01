import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import PDFDocument from 'pdfkit';

// Initialize Anthropic with a dummy key if missing
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key',
});

export async function POST(req) {
    try {
        const data = await req.json();
        const {
            category, bookTitle, genre, writingStage, blurb, struggle,
            protagonist, theme, readerProblem, framework
        } = data;

        // --- MULTIPART GENERATION CHAIN ---
        // To bypass the summarization limits of faster models, we chain 3 separate requests.

        let promptPart1, promptPart2, promptPart3;

        if (category === 'Fiction') {
            promptPart1 = `
      You are an elite AI Publishing Strategist taking an author through Part 1 of their bespoke 12-page "AI Author Toolkit".
      Book: "${bookTitle}" | Genre: "${genre}" | Stage: ${writingStage} | Blurb: ${blurb} | Protagonist: ${protagonist} | Theme: ${theme}

      Write an absolutely MASSIVE, multi-page tutorial covering only the following two sections. Do NOT be concise. Expand deeply on every point. 

      CRITICAL UX RULE: Whenever you introduce a new tool (like Claude or Fictionary), you MUST provide its exact web address on its own line exactly like this: \`URL: https://www.example.com\`. Furthermore, you MUST spell out EVERY SINGLE click the user needs to make (e.g. 'Click the New Chat button, click the attachment icon, upload your file, then type...'). Don't make them work for it.

      SECTION 1: AI GENRE & THEME BRAINSTORMING WITH CLAUDE
      Write an extensive deep dive into analyzing the core tropes of "${genre}" using Claude. Provide 5 massive, copy-paste prompt templates they can use to brainstorm how to weave their core theme ("${theme}") into the narrative. Explain exactly why Claude is better for this task than ChatGPT.

      SECTION 2: AI-POWERED REVISION WORKFLOWS (CHATGPT & FICTIONARY)
      Since they are struggling with "${struggle}", provide a highly customized, step-by-step revision workflow. Dedicate at least 3 long paragraphs explaining how to use ChatGPT's Advanced Data Analysis to map their character arcs (especially for ${protagonist}). Then, explain how to use software like Fictionary to edit pacing.

      DO NOT USE MARKDOWN (no **, no ##). Use clean capitalization, spacing, and numbered lists. Write at least 1,500 words for these two sections alone.
            `;

            promptPart2 = `
      You are an elite AI Publishing Strategist taking an author through Part 2 of their bespoke "AI Author Toolkit".
      Book: "${bookTitle}" | Genre: "${genre}" | Stage: ${writingStage} | Blurb: ${blurb}

      Write an absolutely MASSIVE, multi-page tutorial covering only the following two sections. Do NOT be concise.

      CRITICAL UX RULE: Whenever you introduce a new tool (like Midjourney or Sudowrite), you MUST provide its exact web address on its own line exactly like this: \`URL: https://www.example.com\`. Furthermore, you MUST spell out EVERY SINGLE click the user needs to make (e.g. 'Click this button, paste this prompt, hit enter'). Don't make them work for it.

      SECTION 3: WORLD-BUILDING & IDEATION WITH MIDJOURNEY
      Write a massive tutorial on how the author can use AI image generation (specifically Midjourney and DALL-E 3) to build a visual bible for their book. Provide exactly 10 highly precise Midjourney image prompts tailored to the concepts in their blurb: "${blurb}". Explain the exact parameters (--ar 16:9, --stylize) they should use.

      SECTION 4: VOICE PRESERVATION WITH SUDOWRITE
      Write at least 5 long paragraphs providing an advanced tutorial on how to use AI writing tools built for fiction (like Sudowrite's Story Engine). Give them specific system instructions to ensure the AI matches their unique sentence variation without sounding generic.

      DO NOT USE MARKDOWN. Use clean capitalization, spacing, and numbered lists. Write at least 1,500 words for these two sections.
            `;

            promptPart3 = `
      You are an elite AI Publishing Strategist taking an author through the Final Part of their bespoke "AI Author Toolkit".
      Book: "${bookTitle}" | Stage: ${writingStage} | Struggle: ${struggle}

      Write an absolutely MASSIVE tutorial covering only the final two sections. Do NOT be concise.

      SECTION 5: 20 PRECISE COPY-PASTE AI PROMPTS
      To overdeliver on value, write exactly 20 massive, highly-complex AI prompts they can copy and paste into any LLM. These prompts MUST directly reference their book. Group them into distinct categories (e.g., Deep Character Conflict, Dialogue Simulation, Stakes Escalation).

      SECTION 6: STRATEGIC 90-DAY AI ACTION PLAN
      Provide a massive timeline and checklist for the next 3 months of their writing career based on their current stage. What specific AI platforms should they sign up for tomorrow? Next week? Next month?

      DO NOT USE MARKDOWN. Use clean capitalization, spacing, and numbered lists. Write at least 1,500 words for these two sections.
            `;
        } else {
            promptPart1 = `
      You are an elite AI Publishing Strategist taking an author through Part 1 of their bespoke "AI Author Toolkit".
      Book: "${bookTitle}" | Category: ${category} | Stage: ${writingStage} | Reader Problem: ${readerProblem} | Framework: ${framework}

      Write an absolutely MASSIVE, multi-page tutorial covering only the following two sections. Do NOT be concise.

      CRITICAL UX RULE: Whenever you introduce a new tool (like Claude or ChatGPT), you MUST provide its exact web address on its own line exactly like this: \`URL: https://www.example.com\`. Furthermore, you MUST spell out EVERY SINGLE step and click the user needs to make in the software interface. Don't make them work for it.

      SECTION 1: FRAMEWORK EXPANSION WITH CLAUDE
      Write an extensive deep dive into analyzing the target reader's pain point ("${readerProblem}") using Anthropic's Claude. Provide 5 massive, copy-paste prompt templates they can use to expand and solidify their Core Framework ("${framework}"). Explain exactly why Claude is superior for Non-Fiction outlining.

      SECTION 2: AI-POWERED STRUCTURAL WORKFLOWS (CHATGPT)
      Since they are struggling with "${struggle}", provide a highly customized, step-by-step outlining workflow. Dedicate at least 3 long paragraphs explaining how to use ChatGPT to evaluate arguments, tighten chapter flow, and generate actionable exercises at the end of every chapter.

      DO NOT USE MARKDOWN (no **, no ##). Use clean capitalization, spacing, and numbered lists. Write at least 1,500 words.
            `;

            promptPart2 = `
      You are an elite AI Publishing Strategist taking an author through Part 2 of their bespoke "AI Author Toolkit".
      Book: "${bookTitle}" | Category: ${category} | Stage: ${writingStage}

      Write an absolutely MASSIVE, multi-page tutorial covering only the following two sections. Do NOT be concise.

      CRITICAL UX RULE: Whenever you introduce a new tool (like Opus Clip or Grammarly GO), you MUST provide its exact web address on its own line exactly like this: \`URL: https://www.example.com\`. Furthermore, you MUST spell out EVERY SINGLE step and click the user needs to make (e.g. 'Click upload, paste your script'). Don't make them work for it.

      SECTION 3: THOUGHT LEADERSHIP & REPURPOSING WITH OPUS CLIP
      Write a massive tutorial on how the author can use AI tools (like Opus Clip and ChatGPT) to repurpose their manuscript chapters into thousands of social media posts, LinkedIn articles, and YouTube shorts to establish thought leadership before the launch. Provide specific workflows.

      SECTION 4: VOICE PRESERVATION & EDITING WITH GRAMMARLY GO & AI
      Write at least 5 long paragraphs providing advanced techniques for the author to train an AI on their unique authoritative voice. Explain how to use tools like Grammarly GO alongside standard LLMs to edit and polish their prose without sounding like generic, academic AI text.

      DO NOT USE MARKDOWN. Use clean capitalization, spacing, and numbered lists. Write at least 1,500 words.
            `;

            promptPart3 = `
      You are an elite AI Publishing Strategist taking an author through the Final Part of their bespoke "AI Author Toolkit".
      Book: "${bookTitle}" | Stage: ${writingStage} | Struggle: ${struggle}

      Write an absolutely MASSIVE tutorial covering only the final two sections. Do NOT be concise.

      SECTION 5: 20 PRECISE COPY-PASTE AI PROMPTS
      To overdeliver on value, write exactly 20 massive, highly-complex AI prompts they can copy and paste into any LLM. These prompts MUST directly reference their framework and reader problem. Group them into distinct categories (e.g., Argument Stress-Testing, Finding Perfect Metaphors, Generating Reader Exercises).

      SECTION 6: STRATEGIC 90-DAY AI ACTION PLAN
      Provide a massive timeline and checklist for the next 3 months of their writing career based on their current stage. What specific AI platforms should they sign up for tomorrow? Next week? Next month?

      DO NOT USE MARKDOWN. Use clean capitalization, spacing, and numbered lists. Write at least 1,500 words.
            `;
        }

        // Execute the chained generation in parallel for speed, then combine sequentially
        const [msgPart1, msgPart2, msgPart3] = await Promise.all([
            anthropic.messages.create({
                model: "claude-3-haiku-20240307",
                max_tokens: 4000,
                temperature: 0.7,
                system: "You are a professional book editor and elite AI publishing consultant.",
                messages: [{ role: "user", content: promptPart1 }]
            }),
            anthropic.messages.create({
                model: "claude-3-haiku-20240307",
                max_tokens: 4000,
                temperature: 0.7,
                system: "You are a professional book editor and elite AI publishing consultant.",
                messages: [{ role: "user", content: promptPart2 }]
            }),
            anthropic.messages.create({
                model: "claude-3-haiku-20240307",
                max_tokens: 4000,
                temperature: 0.7,
                system: "You are a professional book editor and elite AI publishing consultant.",
                messages: [{ role: "user", content: promptPart3 }]
            })
        ]);

        const strategyContent = msgPart1.content[0].text + "\n\n" + msgPart2.content[0].text + "\n\n" + msgPart3.content[0].text;

        // 3. Generate the PDF
        // We create a new Promise to handle the stream output of PDFKit into a standard response
        return new Promise((resolve, reject) => {
            try {
                // Initialize premium layout margins
                const doc = new PDFDocument({ margin: 72, autoFirstPage: true });
                const buffers = [];

                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => {
                    const pdfData = Buffer.concat(buffers);

                    resolve(new NextResponse(pdfData, {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment; filename="${bookTitle.replace(/\\s+/g, '_')}_AI_Toolkit.pdf"`,
                        }
                    }));
                });

                // --- FOOTER LOGIC ---
                // Add footer on every newly created page
                doc.on('pageAdded', () => {
                    // Capture the cursor position where the new page naturally starts (top margin)
                    const prevX = doc.x;
                    const prevY = doc.y;

                    const originalBottom = doc.page.margins.bottom;
                    doc.page.margins.bottom = 0; // Temporarily bypass bottom margin limits
                    const bottomPos = doc.page.height - 50;

                    doc.fontSize(9).fillColor('#c9a050').text(`Author's AI Toolkit | ${bookTitle}`, 72, bottomPos, { align: 'right', lineBreak: false });

                    doc.page.margins.bottom = originalBottom;

                    // Restore the cursor position so standard body text can flow normally
                    doc.x = prevX;
                    doc.y = prevY;
                    doc.font('Helvetica').fontSize(11).fillColor('#1c1917'); // Restore body font
                });

                // --- COVER PAGE ---
                doc.moveDown(5);
                doc.fontSize(42).font('Helvetica-Bold').fillColor('#2d8b5e').text("AUTHOR'S AI", { align: 'center' });
                doc.fontSize(42).font('Helvetica-Bold').fillColor('#c9a050').text("TOOLKIT", { align: 'center' });
                doc.moveDown(2);
                doc.fontSize(16).font('Helvetica').fillColor('#1c1917').text(`Prepared exclusively for:`, { align: 'center' });
                doc.moveDown(0.5);
                doc.fontSize(24).font('Helvetica-Bold').fillColor('#2d8b5e').text(bookTitle, { align: 'center' });
                doc.moveDown(0.5);
                doc.fontSize(14).fillColor('#666666').text(category.toUpperCase(), { align: 'center' });

                // Add the footer explicitly for the first page since the event doesn't trigger for autoFirstPage
                const originalFirstBottom = doc.page.margins.bottom;
                doc.page.margins.bottom = 0;
                const firstPageBottom = doc.page.height - 50;
                doc.fontSize(9).fillColor('#c9a050').text(`Author's AI Toolkit | ${bookTitle}`, 72, firstPageBottom, { align: 'right', lineBreak: false });
                doc.page.margins.bottom = originalFirstBottom;

                // Move to Content Page
                doc.addPage();

                // --- DYNAMIC CONTENT PARSING ---
                const lines = strategyContent.split('\n');
                doc.font('Helvetica').fontSize(11).fillColor('#1c1917');

                lines.forEach(line => {
                    if (line.trim() === '') {
                        doc.moveDown(0.5);
                        return;
                    }

                    // Dynamically style headers
                    if (line.trim().startsWith('SECTION')) {
                        doc.moveDown(1.5);
                        doc.font('Helvetica-Bold').fontSize(16).fillColor('#2d8b5e').text(line);
                        doc.moveDown(0.5);
                        doc.font('Helvetica').fontSize(11).fillColor('#1c1917');
                    } else if (line.trim().startsWith('Step') || /^[A-Z][a-z]+ [0-9]+:/.test(line.trim())) {
                        // Subheaders
                        doc.moveDown(0.5);
                        doc.font('Helvetica-Bold').fontSize(12).fillColor('#c9a050').text(line);
                        doc.font('Helvetica').fontSize(11).fillColor('#1c1917');
                    } else if (line.trim().startsWith('URL:')) {
                        // Clickable URLs
                        const urlString = line.replace('URL:', '').trim();
                        // Prepend https:// if it's missing so the PDF reader correctly resolves it
                        const safeUrl = urlString.startsWith('http') ? urlString : `https://${urlString}`;

                        doc.moveDown(0.2);
                        doc.font('Helvetica-Oblique').fontSize(11).fillColor('#2d8b5e').text(urlString, {
                            link: safeUrl,
                            underline: true
                        });
                        doc.font('Helvetica').fillColor('#1c1917'); // Restore body font
                        doc.moveDown(0.5);
                    } else {
                        // Standard body paragraph
                        doc.text(line, { align: 'left', lineGap: 3 });
                    }
                });

                doc.end();

            } catch (err) {
                reject(err);
            }
        });

    } catch (error) {
        console.error('Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate toolkit PDF' },
            { status: 500 }
        );
    }
}
