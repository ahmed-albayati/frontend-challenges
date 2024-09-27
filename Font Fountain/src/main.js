// Display text used for all fonts
const displayText = 'Preview text for the selected font,';

// Array of font objects
const fonts = [
    { name: 'Aladin' }, { name: 'Archivo Black' }, { name: 'Asar' },
    { name: 'Asul' }, { name: 'Beth Ellen' }, { name: 'Bevan' },
    { name: 'Biryani' }, { name: 'Bodoni Moda SC' }, { name: 'Bungee Shade' },
    { name: 'Carlito' }, { name: 'Carrois Gothic SC' }, { name: 'Cormorant SC' },
    { name: 'Courgette' }, { name: 'DM Serif Display' }, { name: 'Dokdo' },
    { name: 'Doppio One' }, { name: 'Edu AU VIC WA NT Dots' },
    { name: 'Edu AU VIC WA NT Guides' }, { name: 'Edu AU VIC WA NT Hand' },
    { name: 'Fredoka' }, { name: 'Freeman' }, { name: 'Gurajada' },
    { name: 'IBM Plex Sans' }, { name: 'Jacquarda Bastarda 9' },
    { name: 'Jacquard 12 Charted' }, { name: 'Jockey One' }, { name: 'Kaisei Tokumin' },
    { name: 'Major Mono Display' }, { name: 'Norican' }, { name: 'Open Sans' },
    { name: 'Oswald' }, { name: 'Playfair Display' }, { name: 'Playwrite AU NSW' },
    { name: 'Playwrite DE Grund' }, { name: 'Playwrite ES' }, { name: 'Poiret One' },
    { name: 'Port Lligat Sans' }, { name: 'Protest Revolution' }, { name: 'Recursive' },
    { name: 'Roboto' }, { name: 'Roboto Mono' }, { name: 'Rubik Dirt' },
    { name: 'Ruthie' }, { name: 'Saira' }, { name: 'Seaweed Script' },
    { name: 'Special Elite' }, { name: 'Stalinist One' }, { name: 'Ubuntu Sans Mono' },
    { name: 'Volkhov' }, { name: 'Yellowtail' }
];

let fontHistory = [];
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Generate the font list and display in the font list area
function loadFontList() {
    const fontListElement = document.getElementById('font-preview-list');
    fontListElement.innerHTML = '';

    fonts.forEach(font => {
        const li = document.createElement('li');
        li.classList.add('font-item');
        li.style.fontFamily = font.name; // Apply font style

        li.onclick = () => selectFont(font.name); // Font selection handler

        const span = document.createElement('span');
        span.textContent = displayText;
        span.classList.add('font-preview-text');

        const small = document.createElement('small');
        small.textContent = font.name;
        small.classList.add('font-name');

        li.appendChild(span);
        li.appendChild(small);
        fontListElement.appendChild(li);
    });
}

// Apply selected font to preview area and update history
function selectFont(fontName) {
    const previewTextArea = document.getElementById('App');
    previewTextArea.style.fontFamily = fontName;

    document.querySelectorAll('.font-item').forEach(item => item.classList.remove('selected'));
    const selectedItem = Array.from(document.querySelectorAll('.font-item'))
        .find(item => item.textContent.includes(fontName));
    if (selectedItem) selectedItem.classList.add('selected');

    updateFontHistory(fontName);
}

// Manage and display the history of selected fonts
function updateFontHistory(fontName) {
    fontHistory = fontHistory.filter(font => font !== fontName);
    fontHistory.unshift(fontName);
    if (fontHistory.length > 2) fontHistory.pop();

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    fontHistory.forEach(font => {
        const li = document.createElement('li');
        li.textContent = `${font}`;
        li.classList.add('history-item');
        li.onclick = () => selectFont(font); // History selection handler
        historyList.appendChild(li);
    });
}

// Enable typing in the preview area
function handleTyping() {
    const previewTextArea = document.getElementById('App');
    previewTextArea.addEventListener('input', function () {
        const typedText = this.value;
        previewTextArea.placeholder = typedText;
    });
}

// Handle glyph rounding using mouse wheel
function handleGlyphRounding() {
    const previewTextArea = document.getElementById('App');
    previewTextArea.addEventListener('wheel', function (event) {
        const caretPosition = this.selectionStart;
        const text = this.value;
        const currentChar = text[caretPosition - 1];
        const index = alphabet.indexOf(currentChar);

        if (index !== -1) {
            const newChar = event.deltaY > 0
                ? alphabet[(index + 1) % alphabet.length]
                : alphabet[(index - 1 + alphabet.length) % alphabet.length];
            this.value = text.substring(0, caretPosition - 1) + newChar + text.substring(caretPosition);
            this.setSelectionRange(caretPosition, caretPosition);
        }

        event.preventDefault(); // Prevent default scroll
    });
}

// Initialize
loadFontList();
handleTyping();
handleGlyphRounding();
