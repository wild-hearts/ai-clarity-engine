const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('/Users/naomishiels/Antigravity/authors-ai-toolkit/The_Midnight_Library_AI_Toolkit.pdf'));

// Cover Page
doc.fontSize(28).fillColor('#2d8b5e').text("Author's AI Toolkit", { align: 'center', underline: true });
doc.moveDown(1);
doc.fontSize(18).fillColor('#c9a050').text('Prepared exclusively for your book: The Midnight Library', { align: 'center' });
doc.moveDown(2);
doc.fontSize(12).fillColor('#64748b').text('Genre: Fantasy / Magical Realism', { align: 'center' });
doc.moveDown(5);

// Executive Summary
doc.fontSize(20).fillColor('#2d8b5e').text('1. Genre & Theme Analysis');
doc.moveDown(0.5);
doc.fontSize(12).fillColor('#1c1917').text("The Midnight Library explores profound themes of regret, alternate lives, and the choices that define human existence. As a piece of magical realism, balancing the fantastical elements of the infinite library with Nora's deeply grounded emotional stakes is crucial. AI can assist in tracking these thematic arcs and ensuring the pacing doesn't lag during pivotal quantum-branching sequences.", { align: 'justify', lineGap: 4 });
doc.moveDown(2);

// Tool Recommendations
doc.fontSize(20).fillColor('#2d8b5e').text('2. Revision Workflows');
doc.moveDown(0.5);
doc.fontSize(14).fillColor('#c9a050').text('Workflow 1: The Timeline Integrity Check');
doc.fontSize(12).fillColor('#1c1917').text("Why: Keeping track of Nora's \"root\" life versus the numerous branching lives can become intensely complicated. Use Claude to feed in chapter summaries and explicitly request a chronological logic check to identify any continuity errors in how the library operates.", { lineGap: 4 });
doc.moveDown(1);
doc.fontSize(14).fillColor('#c9a050').text('Workflow 2: Voice & Tone Alignment');
doc.fontSize(12).fillColor('#1c1917').text("Why: Nora's internal monologue should shift subtly depending on which life she inhabits. Use the provided prompts to ask the AI to analyze the tone of a specific scene and suggest ways to heighten the contrast between lives.", { lineGap: 4 });
doc.moveDown(2);

// Custom Workflows
doc.fontSize(20).fillColor('#2d8b5e').text('3. Custom Writing Prompts');
doc.moveDown(0.5);
doc.fontSize(14).fillColor('#1c1917').text('World-Building: The Rules of the Library', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text('1. "Describe the mechanics of the Book of Regrets: how heavy is it, and what does the dust on its cover smell like?"');
doc.text("2. \"If Mrs. Elm was not the librarian, what form would the guide take based on Nora's deepest subconscious desire?\"");
doc.text('3. "Write a deleted scene where a book glitches and Nora experiences two lives simultaneously."');
doc.moveDown(2);

// Prompt Kit
doc.fontSize(20).fillColor('#2d8b5e').text('4. Voice-Preservation Techniques');
doc.moveDown(0.5);
doc.fontSize(12).fillColor('#1c1917').text('Use these prompts in Claude to protect your unique authorial voice:', { lineGap: 4 });
doc.moveDown(0.5);

doc.rect(50, doc.y, 500, 80).fillOpacity(0.1).fill('#c9a050').stroke();
doc.fillOpacity(1);
doc.moveDown(0.5);
doc.fillColor('#2d8b5e').text('Prompt: The Style Analyzer', { indent: 10 });
doc.moveDown(0.5);
doc.fillColor('#1c1917').text('"Analyze the following 1,000 words. Identify the three most prominent stylistic quirks (e.g., specific metaphor structures, sentence length variations, preferred verbs). Then, read the next 500 words and tell me where I deviated from this precise style, suggesting revisions that sound like ME." ', { indent: 10, italic: true });
doc.moveDown(2);

doc.end();
