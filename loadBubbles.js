// Adjust path to bubbles.html relative to the page
// List of all bubble files to load, matching template ID to filename
const bubbleFiles = [
  'Template_API_overview.html',
  'Template_Form_elements.html',
  'Template_Form_attributes.html',
  'Template_Forms_HTML.html',
  'Template_Responsive_web.html',
  'Template_Semantic.html',
  'Template_Show_code.html',
  'Template_Syntax.html',
  'Template_Layout_elements.html',
  'Template_Iframe.html',
  'Template_ID.html',
  'Template_Class.html',
  'Template_Div.html',
  'Template_Advance_links.html',
  'Template_Effects.html',
  'Template_Images.html',
  'Template_Javascript_with_HTML.html',
  'Template_Links.html',
  'Template_Lists.html',
  'Template_String_tags.html',
  'Template_Styles.html',
  'Template_Table.html',
  'test.html'
];

// Folder where the bubble files are stored
const bubblesFolder = '/Bubbles/';

async function loadBubbles() {
  for (const filename of bubbleFiles) {
    const filePath = `${bubblesFolder}${filename}`;
    try {
      const res = await fetch(filePath);
      if (!res.ok) {
        console.warn(`Could not load ${filePath}: ${res.statusText}`);
        continue;
      }

      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const template = doc.querySelector('template');

      if (!template || !template.id) {
        console.warn(`No valid <template> with id found in ${filename}`);
        continue;
      }

      const bubbleId = template.id;
      const slot = document.querySelector(`.bubble-slot[data-id="${bubbleId}"]`);
      if (slot) {
        slot.appendChild(template.content.cloneNode(true));
      } else {
        console.warn(`No .bubble-slot found for ID "${bubbleId}"`);
      }

    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
    }
  }

  // Handle scroll-to-hash behavior after Bubbles load
  if (window.location.hash) {
    // Only scroll if coming from a different page or no referrer
    if (!document.referrer || (new URL(document.referrer)).pathname !== window.location.pathname) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

loadBubbles();

/*

*/