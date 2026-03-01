import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import PDFDocument from 'pdfkit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key',
});

const SYSTEM_PROMPT = `You are an expert AI publishing consultant and developmental editor with 20 years of experience across all fiction and non-fiction genres. You create practical, specific, actionable content for authors — never generic advice. Every recommendation must reference the author's specific book, characters, genre, and situation. You write in clear, direct prose. No markdown formatting (no **, no ##, no bullet symbols). Use CAPITALISED HEADERS for sections and numbered lists where appropriate. Write with authority and warmth — like a mentor who respects the author's intelligence.`;

function buildFictionPrompts(data) {
  const { bookTitle, genre, writingStage, blurb, struggle, protagonist, theme } = data;

  const part1 = `
You are creating PART 1 of a personalised Author's AI Toolkit for a fiction writer.

BOOK DETAILS:
- Title: "${bookTitle}"
- Genre: ${genre}
- Writing Stage: ${writingStage}
- Blurb/Synopsis: ${blurb}
- Protagonist: ${protagonist}
- Core Theme: ${theme}
- Biggest Struggle: ${struggle}

Write the following two sections. Be thorough, specific, and reference the author's book details throughout.

SECTION 1: YOUR GENRE DECODED — AI ANALYSIS OF ${genre.toUpperCase()}

Analyse the genre "${genre}" specifically for "${bookTitle}". Cover:
- The 5 core reader expectations for ${genre} (what readers buy this genre FOR)
- How the theme "${theme}" maps to these expectations — where it aligns naturally and where the author needs to work harder
- The 3 most common mistakes authors make in ${genre} and how to avoid them
- How the protagonist profile (${protagonist}) fits or challenges genre conventions
- Specific tension and pacing patterns that ${genre} readers expect

SECTION 2: THE 4-D PROMPTING METHOD — YOUR KEY TO BETTER AI OUTPUT

Teach the author the 4-D method for getting useful AI responses instead of generic slop:

1. DECONSTRUCT — What do you actually need? (Not "edit my chapter" but what specific kind of feedback?)
2. DIAGNOSE — What's missing from your prompt? (Genre? Audience? Format? Specifics?)
3. DEVELOP — Build the prompt with 4 layers: ROLE (who the AI should be), CONTEXT (your book details), TASK (the specific instruction), FORMAT (what the output should look like)
4. DELIVER — Assemble, send, then push back and iterate

Provide ONE fully worked example using "${bookTitle}" — show a bad prompt vs a 4-D prompt for getting feedback on ${struggle}. Make the difference dramatic and obvious.

Write at least 1,200 words total. Do NOT use markdown formatting.`;

  const part2 = `
You are creating PART 2 of a personalised Author's AI Toolkit for a fiction writer.

BOOK DETAILS:
- Title: "${bookTitle}"
- Genre: ${genre}
- Writing Stage: ${writingStage}
- Blurb/Synopsis: ${blurb}
- Protagonist: ${protagonist}
- Core Theme: ${theme}
- Biggest Struggle: ${struggle}

Write the following two sections.

SECTION 3: YOUR PERSONALISED PROMPT LIBRARY — 20 COPY-PASTE PROMPTS

Create exactly 20 AI prompts the author can copy and paste directly into Claude or ChatGPT. EVERY prompt must follow the 4-D structure:

ROLE: [specific expert role relevant to the task]
CONTEXT: [references "${bookTitle}", "${genre}", and relevant book details]
TASK: [specific instruction]
FORMAT: [what the output should look like]

[Paste your chapter/text/outline here]

Organise into these groups:
- DEVELOPMENTAL EDITING (5 prompts) — pacing, structure, plot logic, character arcs. At least 2 must specifically address "${struggle}".
- LINE EDITING (4 prompts) — prose tightening, voice, dialogue, crutch words
- BRAINSTORMING (3 prompts) — plot complications, character development, theme reinforcement for "${theme}"
- RESEARCH (3 prompts) — fact-checking, authenticity, period/setting details relevant to ${genre}
- MARKETING (5 prompts) — blurb writing, social media, query letters, reader engagement

Each prompt should be substantial (at least 4 lines). These must be genuinely useful, not surface-level.

SECTION 4: CUSTOM REVISION WORKFLOW FOR "${struggle.toUpperCase()}"

Since the author's biggest struggle is "${struggle}", create a step-by-step revision workflow specifically targeting this. Include:
- A diagnostic step (how to identify where ${struggle} is happening in their manuscript)
- 3-5 specific revision actions with AI prompt examples for each
- A quality check rubric for evaluating whether the revision worked
- Tailor everything to the "${writingStage}" stage they are currently at

Write at least 1,500 words total. Do NOT use markdown formatting.`;

  const part3 = `
You are creating PART 3 (FINAL) of a personalised Author's AI Toolkit for a fiction writer.

BOOK DETAILS:
- Title: "${bookTitle}"
- Genre: ${genre}
- Writing Stage: ${writingStage}
- Blurb/Synopsis: ${blurb}
- Protagonist: ${protagonist}
- Core Theme: ${theme}
- Biggest Struggle: ${struggle}

Write the following three sections.

SECTION 5: VOICE PRESERVATION — KEEPING YOUR STYLE WHEN USING AI

The author's biggest fear is that AI will flatten their voice. Address this directly:
- Explain the "Voice Anchor" technique: paste a sample of your best writing and instruct the AI to match that register, not improve it
- Provide 3 specific prompts for voice-checking AI output against their natural style
- Explain the difference between AI as editor (good) vs AI as rewriter (dangerous)
- Give ${genre}-specific voice tips (what makes ${genre} prose distinctive vs generic)
- Include a VOICE CHECK prompt they can run on any AI output:

ROLE: You are a literary voice analyst specialising in ${genre}.
CONTEXT: The author's natural voice from "${bookTitle}" is characterised by the sample below. The second passage is AI-assisted output.
TASK: Compare both passages. Identify where the AI output has flattened, genericised, or altered the author's distinctive voice. Be specific — quote exact phrases.
FORMAT: List each divergence with the original phrase, the AI version, and a suggestion that preserves the author's voice.

SECTION 6: MARKETING STARTER KIT FOR "${bookTitle.toUpperCase()}"

Create ready-to-use marketing content:
- 3 different back-cover blurb variations (150-180 words each) — one leading with emotion, one with mystery, one with stakes. All based on: ${blurb}
- 5 social media post templates that tease the book without spoilers
- A 3-email launch sequence outline (subject lines + key beats for each email)
- A one-paragraph "elevator pitch" they can use at events or in query letters

SECTION 7: YOUR 24-HOUR AI ACTION PLAN

Based on the author being at the "${writingStage}" stage and struggling with "${struggle}", create a single-day plan:

HOUR 0-1: Setup (sign up for Claude or ChatGPT free tier, have manuscript chapter ready)
HOUR 1-3: First AI Edit (use specific prompts from Section 3 — reference by number)
HOUR 3-5: Revision Workflow (use the workflow from Section 4)
HOUR 5-7: Marketing Sprint (use blurb prompts and social templates from Section 6)
HOUR 7-8: Lock It In (save best prompts, run voice check from Section 5)

Make every hour reference a specific tool from earlier in the toolkit. This should feel like a guided workshop, not a vague plan.

Write at least 1,500 words total. Do NOT use markdown formatting.`;

  return [part1, part2, part3];
}

function buildNonFictionPrompts(data) {
  const { bookTitle, genre, writingStage, blurb, struggle, readerProblem, framework } = data;

  const part1 = `
You are creating PART 1 of a personalised Author's AI Toolkit for a non-fiction writer.

BOOK DETAILS:
- Title: "${bookTitle}"
- Category: Non-Fiction / Self-Help
- Genre/Topic: ${genre}
- Writing Stage: ${writingStage}
- Synopsis: ${blurb}
- Target Reader's Problem: ${readerProblem}
- Core Framework/Methodology: ${framework}
- Biggest Struggle: ${struggle}

Write the following two sections. Be thorough, specific, and reference the author's book details throughout.

SECTION 1: YOUR CATEGORY DECODED — AI ANALYSIS OF ${genre.toUpperCase()}

Analyse the non-fiction space for "${bookTitle}". Cover:
- The 5 core expectations readers have in the ${genre} category (what they need to believe by the end)
- How the framework "${framework}" positions against common approaches in this space
- The 3 most common structural mistakes in ${genre} non-fiction and how to avoid them
- How the target reader's problem (${readerProblem}) should shape every chapter's opening hook
- Authority-building patterns that work in this category

SECTION 2: THE 4-D PROMPTING METHOD — YOUR KEY TO BETTER AI OUTPUT

Teach the author the 4-D method for getting useful AI responses instead of generic slop:

1. DECONSTRUCT — What do you actually need? (Not "edit my chapter" but what specific kind of feedback?)
2. DIAGNOSE — What's missing from your prompt? (Topic? Audience? Format? Specifics?)
3. DEVELOP — Build the prompt with 4 layers: ROLE (who the AI should be), CONTEXT (your book details), TASK (the specific instruction), FORMAT (what the output should look like)
4. DELIVER — Assemble, send, then push back and iterate

Provide ONE fully worked example using "${bookTitle}" — show a bad prompt vs a 4-D prompt for getting feedback on ${struggle}. Make the difference dramatic and obvious.

Write at least 1,200 words total. Do NOT use markdown formatting.`;

  const part2 = `
You are creating PART 2 of a personalised Author's AI Toolkit for a non-fiction writer.

BOOK DETAILS:
- Title: "${bookTitle}"
- Genre/Topic: ${genre}
- Writing Stage: ${writingStage}
- Synopsis: ${blurb}
- Target Reader's Problem: ${readerProblem}
- Core Framework: ${framework}
- Biggest Struggle: ${struggle}

Write the following two sections.

SECTION 3: YOUR PERSONALISED PROMPT LIBRARY — 20 COPY-PASTE PROMPTS

Create exactly 20 AI prompts the author can copy and paste directly into Claude or ChatGPT. EVERY prompt must follow the 4-D structure:

ROLE: [specific expert role relevant to the task]
CONTEXT: [references "${bookTitle}", "${genre}", and the framework "${framework}"]
TASK: [specific instruction]
FORMAT: [what the output should look like]

[Paste your chapter/text/outline here]

Organise into these groups:
- STRUCTURAL EDITING (5 prompts) — argument flow, chapter transitions, logic gaps, framework clarity. At least 2 must address "${struggle}".
- LINE EDITING (4 prompts) — clarity, jargon reduction, authority vs accessibility balance, reader engagement
- FRAMEWORK DEVELOPMENT (3 prompts) — stress-testing arguments, finding counterexamples, strengthening the "${framework}" methodology
- RESEARCH & CREDIBILITY (3 prompts) — fact-checking claims, finding supporting evidence, identifying weak assertions
- MARKETING (5 prompts) — blurb writing, thought leadership content, speaking pitches, reader engagement

Each prompt should be substantial (at least 4 lines).

SECTION 4: CUSTOM REVISION WORKFLOW FOR "${struggle.toUpperCase()}"

Since the author's biggest struggle is "${struggle}", create a step-by-step revision workflow. Include:
- A diagnostic step (how to identify where ${struggle} is weakening the manuscript)
- 3-5 specific revision actions with AI prompt examples for each
- A quality check rubric for evaluating whether the revision worked
- Tailor everything to the "${writingStage}" stage

Write at least 1,500 words total. Do NOT use markdown formatting.`;

  const part3 = `
You are creating PART 3 (FINAL) of a personalised Author's AI Toolkit for a non-fiction writer.

BOOK DETAILS:
- Title: "${bookTitle}"
- Genre/Topic: ${genre}
- Writing Stage: ${writingStage}
- Synopsis: ${blurb}
- Target Reader's Problem: ${readerProblem}
- Core Framework: ${framework}
- Biggest Struggle: ${struggle}

Write the following three sections.

SECTION 5: VOICE & AUTHORITY PRESERVATION — STAYING YOU WHEN USING AI

Non-fiction authors need to sound authoritative AND human. Address:
- The "Voice Anchor" technique: paste your best writing sample and instruct AI to match that register
- 3 specific prompts for checking AI output against your natural authority voice
- How to use AI for research and structure WITHOUT letting it flatten your perspective into "both sides" mush
- ${genre}-specific voice tips (what makes compelling ${genre} prose vs academic dryness)
- Include a VOICE CHECK prompt they can run on any AI output

SECTION 6: MARKETING STARTER KIT FOR "${bookTitle.toUpperCase()}"

Create ready-to-use marketing content:
- 3 different back-cover blurb variations (150-180 words each) — one leading with the reader's pain point, one with the transformation promise, one with authority/credentials. Based on: ${blurb}
- 5 thought leadership social media posts that establish expertise without being salesy
- A 3-email launch sequence outline (subject lines + key beats)
- A one-paragraph "elevator pitch" for events, podcasts, or speaking enquiries
- 3 potential subtitle options that communicate the "${framework}" methodology

SECTION 7: YOUR 24-HOUR AI ACTION PLAN

Based on the author being at "${writingStage}" and struggling with "${struggle}", create a single-day plan:

HOUR 0-1: Setup (sign up for Claude or ChatGPT free tier, have manuscript chapter ready)
HOUR 1-3: First AI Edit (use specific prompts from Section 3 — reference by number)
HOUR 3-5: Revision Workflow (use the workflow from Section 4)
HOUR 5-7: Marketing Sprint (use blurb prompts and content from Section 6)
HOUR 7-8: Lock It In (save best prompts, run voice check from Section 5)

Reference specific tools from earlier sections. This should feel like a guided workshop.

Write at least 1,500 words total. Do NOT use markdown formatting.`;

  return [part1, part2, part3];
}

function buildPDF(bookTitle, category, genre, strategyContent) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 72, autoFirstPage: true });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Footer on every new page
      doc.on('pageAdded', () => {
        const prevX = doc.x;
        const prevY = doc.y;
        const originalBottom = doc.page.margins.bottom;
        doc.page.margins.bottom = 0;
        doc.fontSize(8).fillColor('#c9a050').text(
          `Author's AI Toolkit | ${bookTitle}`,
          72, doc.page.height - 45,
          { align: 'right', lineBreak: false }
        );
        doc.page.margins.bottom = originalBottom;
        doc.x = prevX;
        doc.y = prevY;
        doc.font('Helvetica').fontSize(10.5).fillColor('#1c1917');
      });

      // ===== COVER PAGE =====
      doc.moveDown(6);
      doc.fontSize(44).font('Helvetica-Bold').fillColor('#2d8b5e').text("AUTHOR'S AI", { align: 'center' });
      doc.fontSize(44).font('Helvetica-Bold').fillColor('#c9a050').text("TOOLKIT", { align: 'center' });
      doc.moveDown(2);
      doc.fontSize(14).font('Helvetica').fillColor('#666666').text('Personalised for:', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(22).font('Helvetica-Bold').fillColor('#2d8b5e').text(bookTitle, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(12).font('Helvetica').fillColor('#999999').text(`${category} | ${genre}`, { align: 'center' });

      // Cover page footer
      const origBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      doc.fontSize(8).fillColor('#c9a050').text(
        `Author's AI Toolkit | ${bookTitle}`,
        72, doc.page.height - 45,
        { align: 'right', lineBreak: false }
      );
      doc.page.margins.bottom = origBottom;

      // ===== CONTENT =====
      doc.addPage();

      const lines = strategyContent.split('\n');
      doc.font('Helvetica').fontSize(10.5).fillColor('#1c1917');

      for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === '') {
          doc.moveDown(0.4);
          continue;
        }

        // Section headers (SECTION X:)
        if (trimmed.startsWith('SECTION')) {
          doc.moveDown(1.2);
          doc.font('Helvetica-Bold').fontSize(15).fillColor('#2d8b5e').text(trimmed);
          doc.moveDown(0.4);
          doc.font('Helvetica').fontSize(10.5).fillColor('#1c1917');
          continue;
        }

        // Sub-headers (ALL CAPS lines that are short, like category headers)
        if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 80 && !trimmed.startsWith('ROLE:') && !trimmed.startsWith('CONTEXT:') && !trimmed.startsWith('TASK:') && !trimmed.startsWith('FORMAT:') && !trimmed.startsWith('HOUR')) {
          doc.moveDown(0.8);
          doc.font('Helvetica-Bold').fontSize(12).fillColor('#c9a050').text(trimmed);
          doc.moveDown(0.3);
          doc.font('Helvetica').fontSize(10.5).fillColor('#1c1917');
          continue;
        }

        // Prompt structure labels (ROLE:, CONTEXT:, TASK:, FORMAT:)
        if (/^(ROLE|CONTEXT|TASK|FORMAT):/.test(trimmed)) {
          const colonIndex = trimmed.indexOf(':');
          const label = trimmed.substring(0, colonIndex + 1);
          const rest = trimmed.substring(colonIndex + 1).trim();

          doc.font('Helvetica-Bold').fontSize(10).fillColor('#2d8b5e').text(label, { continued: true });
          doc.font('Helvetica').fontSize(10).fillColor('#444444').text(' ' + rest);
          doc.font('Helvetica').fontSize(10.5).fillColor('#1c1917');
          continue;
        }

        // Hour-based action plan items
        if (trimmed.startsWith('HOUR')) {
          doc.moveDown(0.5);
          doc.font('Helvetica-Bold').fontSize(11).fillColor('#2d8b5e').text(trimmed);
          doc.moveDown(0.2);
          doc.font('Helvetica').fontSize(10.5).fillColor('#1c1917');
          continue;
        }

        // Numbered items
        if (/^\d+[\.\)]/.test(trimmed)) {
          doc.moveDown(0.2);
          doc.text(trimmed, { align: 'left', lineGap: 2.5 });
          continue;
        }

        // Standard body text
        doc.text(trimmed, { align: 'left', lineGap: 2.5 });
      }

      // ===== FINAL PAGE =====
      doc.addPage();
      doc.moveDown(4);
      doc.font('Helvetica-Bold').fontSize(18).fillColor('#2d8b5e').text('Your Next Step', { align: 'center' });
      doc.moveDown(1);
      doc.font('Helvetica').fontSize(11).fillColor('#1c1917').text(
        'This toolkit was built for you and your book. The prompts reference your characters, your genre, and your specific challenges. Start with the 24-Hour Action Plan in Section 7 and work through it today.',
        { align: 'center', lineGap: 3 }
      );
      doc.moveDown(1.5);
      doc.font('Helvetica').fontSize(10).fillColor('#666666').text(
        'For professional AI-powered manuscript reviews, visit wildheartspublishing.com',
        { align: 'center', link: 'https://wildheartspublishing.com' }
      );
      doc.moveDown(2);
      doc.font('Helvetica').fontSize(9).fillColor('#999999').text(
        "Author's AI Toolkit — A Wild Hearts Publishing Product",
        { align: 'center' }
      );

      doc.end();

    } catch (err) {
      reject(err);
    }
  });
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { category, bookTitle, genre } = data;

    // Build prompts based on category
    const prompts = category === 'Fiction'
      ? buildFictionPrompts(data)
      : buildNonFictionPrompts(data);

    // Run all 3 parts in parallel for speed
    const [msg1, msg2, msg3] = await Promise.all(
      prompts.map(prompt =>
        anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 4096,
          temperature: 0.6,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }]
        })
      )
    );

    const fullContent = [
      msg1.content[0].text,
      msg2.content[0].text,
      msg3.content[0].text
    ].join('\n\n');

    // Generate PDF
    const pdfData = await buildPDF(bookTitle, category, genre, fullContent);

    return new NextResponse(pdfData, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${bookTitle.replace(/\s+/g, '_')}_AI_Toolkit.pdf"`,
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
