const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('/Users/naomishiels/Antigravity/ai-clarity-engine/Apex_3D_Printing_AI_Strategy.pdf'));

// Cover Page
doc.fontSize(28).fillColor('#0f172a').text('AI Clarity Engine: Strategy Playbook', { align: 'center', underline: true });
doc.moveDown(1);
doc.fontSize(18).fillColor('#2563eb').text('Prepared exclusively for: Apex 3D Printing Co.', { align: 'center' });
doc.moveDown(2);
doc.fontSize(12).fillColor('#64748b').text('Industry: Additive Manufacturing & Custom Prototyping', { align: 'center' });
doc.moveDown(5);

// Executive Summary
doc.fontSize(20).fillColor('#0f172a').text('1. Executive Summary');
doc.moveDown(0.5);
doc.fontSize(12).fillColor('#1c1917').text('Apex 3D Printing Co. currently struggles with manual quoting, managing a high volume of erratic customer STL files, and inefficient inventory tracking. By deploying targeted AI automation, Apex can instantly estimate print times from client uploads, significantly reducing the sales cycle from days to minutes. We project a 40% reduction in manual administrative overhead.', { align: 'justify', lineGap: 4 });
doc.moveDown(2);

// Tool Recommendations
doc.fontSize(20).fillColor('#0f172a').text('2. Recommended Tool Integrations');
doc.moveDown(0.5);
doc.fontSize(14).fillColor('#2563eb').text('Tool 1: Hubs (Protolabs) AI Quoting Engine API');
doc.fontSize(12).fillColor('#1c1917').text('Why: Automates the geometric analysis of uploaded STL/OBJ files to instantly calculate material volume, wall thickness issues, and print time without a human engineer needing to open the file in slicer software.', { lineGap: 4 });
doc.moveDown(1);
doc.fontSize(14).fillColor('#2563eb').text('Tool 2: ChatGPT Team + Zapier');
doc.fontSize(12).fillColor('#1c1917').text('Why: To monitor the public sales inbox. When a client emails "Can you print this?", ChatGPT categorizes the request, extracts dimensions, and automatically drafts an initial response while dropping the task into your Trello board.', { lineGap: 4 });
doc.moveDown(2);

// Custom Workflows
doc.fontSize(20).fillColor('#0f172a').text('3. Custom Workflow Playbook');
doc.moveDown(0.5);
doc.fontSize(14).fillColor('#1c1917').text('Workflow: The Zero-Touch Quote', { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).text('1. Client visits your website and uploads a 3D model via a Typeform integration.');
doc.text('2. Zapier catches the file and sends it to the Quoting API.');
doc.text('3. The API returns estimated resin/filament cost and time (e.g., $14.50, 4 hours).');
doc.text('4. Zapier triggers ChatGPT to draft a professional quote email using your pricing matrix.');
doc.text('5. The email is saved as a Draft in Gmail for final human review before sending.');
doc.moveDown(2);

// Prompt Kit
doc.fontSize(20).fillColor('#0f172a').text('4. Bespoke Prompt Kit');
doc.moveDown(0.5);
doc.fontSize(12).fillColor('#1c1917').text('Use these prompts in ChatGPT or Claude to accelerate daily operations:', { lineGap: 4 });
doc.moveDown(0.5);

doc.rect(50, doc.y, 500, 80).fillOpacity(0.1).fill('#2563eb').stroke();
doc.fillOpacity(1);
doc.moveDown(0.5);
doc.fillColor('#0f172a').text('Prompt: The Material Recommender', { indent: 10 });
doc.moveDown(0.5);
doc.fillColor('#1c1917').text('"A client wants to print a functional gear for an outdoor robotics project subject to high UV exposure and mechanical stress. I have PLA, PETG, ABS, and Nylon available. Evaluate these materials based on the specific constraints and recommend the best option, including required slicer settings." ', { indent: 10, italic: true });
doc.moveDown(2);

doc.end();
