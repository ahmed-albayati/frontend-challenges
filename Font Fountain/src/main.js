// Global variable for display text
const displayText = 'Preview text for the selected font'; // General text for all fonts

// Array of font objects, each with a name and corresponding display text
const fonts = [
    { name: 'Aladin' },
    { name: 'Archivo Black' },
    { name: 'Asar' },
    { name: 'Asul' },
    { name: 'Beth Ellen' },
    { name: 'Bevan' },
    { name: 'Biryani' },
    { name: 'Bodoni Moda SC' },
    { name: 'Bungee Shade' },
    { name: 'Carlito' },
    { name: 'Carrois Gothic SC' },
    { name: 'Cormorant SC' },
    { name: 'Courgette' },
    { name: 'DM Serif Display' },
    { name: 'Dokdo' },
    { name: 'Doppio One' },
    { name: 'Edu AU VIC WA NT Dots' },
    { name: 'Edu AU VIC WA NT Guides' },
    { name: 'Edu AU VIC WA NT Hand' },
    { name: 'Fredoka' },
    { name: 'Freeman' },
    { name: 'Gurajada' },
    { name: 'IBM Plex Sans' },
    { name: 'Jacquarda Bastarda 9' },
    { name: 'Jacquard 12 Charted' },
    { name: 'Jockey One' },
    { name: 'Kaisei Tokumin' },
    { name: 'Major Mono Display' },
    { name: 'Norican' },
    { name: 'Open Sans' },
    { name: 'Oswald' },
    { name: 'Playfair Display' },
    { name: 'Playwrite AU NSW' },
    { name: 'Playwrite DE Grund' },
    { name: 'Playwrite ES' },
    { name: 'Poiret One' },
    { name: 'Port Lligat Sans' },
    { name: 'Protest Revolution' },
    { name: 'Recursive' },
    { name: 'Roboto' },
    { name: 'Roboto Mono' },
    { name: 'Rubik Dirt' },
    { name: 'Ruthie' },
    { name: 'Saira' },
    { name: 'Seaweed Script' },
    { name: 'Special Elite' },
    { name: 'Stalinist One' },
    { name: 'Ubuntu Sans Mono' },
    { name: 'Volkhov' },
    { name: 'Yellowtail' }
];

// Initialize font history array
let fontHistory = [];

// Alphabet array for glyph rounding
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Function to dynamically generate the font list and display it in the font list area
function loadFontList() {
    const fontListElement = document.getElementById('font-preview-list');
    
    // Clear existing list items
    fontListElement.innerHTML = '';

    // Create list items for each font
    fonts.forEach(font => {
        const li = document.createElement('li');
        li.classList.add('font-item'); // Add styling

        // Set the font-family for the list item
        li.style.fontFamily = font.name;

        // Handle font selection when the item is clicked
        li.onclick = () => selectFont(font.name);

        const span = document.createElement('span');
        span.textContent = displayText; // Use the global displayText
        span.classList.add('font-preview-text');

        const small = document.createElement('small');
        small.textContent = font.name;
        small.classList.add('font-name');

        li.appendChild(span);
        li.appendChild(small);
        fontListElement.appendChild(li);
    });
}

// Function to apply selected font to the preview area and update the font history
function selectFont(fontName) {
    const previewTextArea = document.getElementById('App');
    previewTextArea.style.fontFamily = fontName;

    // Highlight the selected font in the list
    const fontItems = document.querySelectorAll('.font-item');
    fontItems.forEach(item => item.classList.remove('selected'));

    const selectedItem = Array.from(fontItems).find(item => item.textContent.includes(fontName));
    if (selectedItem) selectedItem.classList.add('selected');

    updateFontHistory(fontName); // Add to history
}

// Function to manage and display the history of selected fonts
function updateFontHistory(fontName) {
    // Remove duplicate entries
    fontHistory = fontHistory.filter(font => font !== fontName);

    // Add the newly selected font to the history
    fontHistory.unshift(fontName);

    // Limit the history to the last two fonts
    if (fontHistory.length > 2) fontHistory.pop();

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear existing history

    // Add fonts from history to the list
    fontHistory.forEach(font => {
        const li = document.createElement('li');
        li.textContent = `${font}`;
        li.classList.add('history-item');
        li.onclick = () => selectFont(font); // Handle history selection
        historyList.appendChild(li);
    });
}

// Function to enable typing in the preview area and update the placeholder
function handleTyping() {
    const previewTextArea = document.getElementById('App');

    previewTextArea.addEventListener('input', function () {
        const typedText = this.value;
        previewTextArea.placeholder = typedText; // Update placeholder as user types
    });
}

// Function to handle glyph rounding using the mouse wheel
function handleGlyphRounding() {
    const previewTextArea = document.getElementById('App');

    previewTextArea.addEventListener('wheel', function (event) {
        const caretPosition = this.selectionStart;
        const text = this.value;
        const currentChar = text[caretPosition - 1];

        const index = alphabet.indexOf(currentChar);

        if (index !== -1) {
            const newChar = event.deltaY > 0
                ? alphabet[(index + 1) % alphabet.length] // Next character
                : alphabet[(index - 1 + alphabet.length) % alphabet.length]; // Previous character

            // Replace the current character with the new one
            this.value = text.substring(0, caretPosition - 1) + newChar + text.substring(caretPosition);

            // Maintain the caret position
            this.setSelectionRange(caretPosition, caretPosition);
        }

        // Prevent default scroll behavior
        event.preventDefault();
    });
}

// Load fonts and initialize typing and glyph rounding
loadFontList();
handleTyping();
handleGlyphRounding();
