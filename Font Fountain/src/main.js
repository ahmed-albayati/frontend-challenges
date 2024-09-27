// Define an array of all font objects (name and displayText)
const fonts = [
    { name: 'Aladin', displayText: 'Preview text for Aladin' },
    { name: 'Archivo Black', displayText: 'Preview text for Archivo Black' },
    { name: 'Asar', displayText: 'Preview text for Asar' },
    { name: 'Asul', displayText: 'Preview text for Asul' },
    { name: 'Beth Ellen', displayText: 'Preview text for Beth Ellen' },
    { name: 'Bevan', displayText: 'Preview text for Bevan' },
    { name: 'Biryani', displayText: 'Preview text for Biryani' },
    { name: 'Bodoni Moda SC', displayText: 'Preview text for Bodoni Moda SC' },
    { name: 'Bungee Shade', displayText: 'Preview text for Bungee Shade' },
    { name: 'Carlito', displayText: 'Preview text for Carlito' },
    { name: 'Carrois Gothic SC', displayText: 'Preview text for Carrois Gothic SC' },
    { name: 'Cormorant SC', displayText: 'Preview text for Cormorant SC' },
    { name: 'Courgette', displayText: 'Preview text for Courgette' },
    { name: 'DM Serif Display', displayText: 'Preview text for DM Serif Display' },
    { name: 'Dokdo', displayText: 'Preview text for Dokdo' },
    { name: 'Doppio One', displayText: 'Preview text for Doppio One' },
    { name: 'Edu AU VIC WA NT Dots', displayText: 'Preview text for Edu AU VIC WA NT Dots' },
    { name: 'Edu AU VIC WA NT Guides', displayText: 'Preview text for Edu AU VIC WA NT Guides' },
    { name: 'Edu AU VIC WA NT Hand', displayText: 'Preview text for Edu AU VIC WA NT Hand' },
    { name: 'Fredoka', displayText: 'Preview text for Fredoka' },
    { name: 'Freeman', displayText: 'Preview text for Freeman' },
    { name: 'Gurajada', displayText: 'Preview text for Gurajada' },
    { name: 'IBM Plex Sans', displayText: 'Preview text for IBM Plex Sans' },
    { name: 'Jacquarda Bastarda 9', displayText: 'Preview text for Jacquarda Bastarda 9' },
    { name: 'Jacquard 12 Charted', displayText: 'Preview text for Jacquard 12 Charted' },
    { name: 'Jockey One', displayText: 'Preview text for Jockey One' },
    { name: 'Kaisei Tokumin', displayText: 'Preview text for Kaisei Tokumin' },
    { name: 'Major Mono Display', displayText: 'Preview text for Major Mono Display' },
    { name: 'Norican', displayText: 'Preview text for Norican' },
    { name: 'Open Sans', displayText: 'Preview text for Open Sans' },
    { name: 'Oswald', displayText: 'Preview text for Oswald' },
    { name: 'Playfair Display', displayText: 'Preview text for Playfair Display' },
    { name: 'Playwrite AU NSW', displayText: 'Preview text for Playwrite AU NSW' },
    { name: 'Playwrite DE Grund', displayText: 'Preview text for Playwrite DE Grund' },
    { name: 'Playwrite ES', displayText: 'Preview text for Playwrite ES' },
    { name: 'Poiret One', displayText: 'Preview text for Poiret One' },
    { name: 'Port Lligat Sans', displayText: 'Preview text for Port Lligat Sans' },
    { name: 'Protest Revolution', displayText: 'Preview text for Protest Revolution' },
    { name: 'Recursive', displayText: 'Preview text for Recursive' },
    { name: 'Roboto', displayText: 'Preview text for Roboto' },
    { name: 'Roboto Mono', displayText: 'Preview text for Roboto Mono' },
    { name: 'Rubik Dirt', displayText: 'Preview text for Rubik Dirt' },
    { name: 'Ruthie', displayText: 'Preview text for Ruthie' },
    { name: 'Saira', displayText: 'Preview text for Saira' },
    { name: 'Seaweed Script', displayText: 'Preview text for Seaweed Script' },
    { name: 'Special Elite', displayText: 'Preview text for Special Elite' },
    { name: 'Stalinist One', displayText: 'Preview text for Stalinist One' },
    { name: 'Ubuntu Sans Mono', displayText: 'Preview text for Ubuntu Sans Mono' },
    { name: 'Volkhov', displayText: 'Preview text for Volkhov' },
    { name: 'Yellowtail', displayText: 'Preview text for Yellowtail' }
  ];
  
 // Initialize the font history
let fontHistory = [];

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Function to dynamically generate the font list
function loadFontList() {
  const fontListElement = document.getElementById('font-preview-list');
  
  // Clear any existing list items
  fontListElement.innerHTML = '';

  // Loop through the fonts array and generate the list items
  fonts.forEach(font => {
    // Create the li element
    const li = document.createElement('li');
    li.classList.add('font-item'); // Add class for styling

    // Set the font-family dynamically for the preview text
    li.style.fontFamily = font.name;

    li.onclick = () => selectFont(font.name); // Set onclick event to select the font

    // Create the span for the preview text
    const span = document.createElement('span');
    span.textContent = font.displayText;
    span.classList.add('font-preview-text');

    // Create the small element for the font name
    const small = document.createElement('small');
    small.textContent = font.name;
    small.classList.add('font-name');

    // Append span and small to the li
    li.appendChild(span);
    li.appendChild(small);

    // Append the li to the font list
    fontListElement.appendChild(li);
  });
}

// Function to select and apply the font to the preview area
function selectFont(fontName) {
  const previewTextArea = document.getElementById('App'); // Get the preview textarea

  // Set the font family for the textarea (the preview area)
  previewTextArea.style.fontFamily = fontName;

  // Remove the 'selected' class from all font items
  const fontItems = document.querySelectorAll('.font-item');
  fontItems.forEach(item => {
    item.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked item
  const selectedItem = Array.from(fontItems).find(item => item.textContent.includes(fontName));
  if (selectedItem) {
    selectedItem.classList.add('selected');
  }

  // Update the font history
  updateFontHistory(fontName);
}

// Function to update the history
function updateFontHistory(fontName) {
  // Check if the font is already in the history; if so, remove it
  fontHistory = fontHistory.filter(font => font !== fontName);

  // Add the new font to the start of the array
  fontHistory.unshift(fontName);

  // Keep only the last two fonts in the history
  if (fontHistory.length > 2) {
    fontHistory.pop(); // Remove the oldest font
  }

  // Update the history section in the UI
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = ''; // Clear the existing list

  // Add the fonts from the history to the list
  fontHistory.forEach(font => {
    const li = document.createElement('li');
    li.textContent = `${font}`;  // Add a mark before the font name
    li.classList.add('history-item');

    // Add onclick event to select the font when clicking on history item
    li.onclick = () => selectFont(font);

    historyList.appendChild(li);
  });
}

// Function to handle typing in the preview area
function handleTyping() {
  const previewTextArea = document.getElementById('App');
  
  previewTextArea.addEventListener('input', function () {
    // The user can type and update the text in the preview area
    const typedText = this.value;
    previewTextArea.placeholder = typedText; // Update placeholder dynamically if needed
  });
}

// Function to handle the glyph rounding with mouse wheel
function handleGlyphRounding() {
  const previewTextArea = document.getElementById('App');
  
  previewTextArea.addEventListener('wheel', function (event) {
    const caretPosition = this.selectionStart; // Get the cursor position in the text
    const text = this.value;
    const currentChar = text[caretPosition - 1];

    // Get the position of the character in the alphabet
    const index = alphabet.indexOf(currentChar);
    
    if (index !== -1) {
      // Determine if we are scrolling up or down (deltaY > 0 means down, deltaY < 0 means up)
      const newChar = event.deltaY > 0
        ? alphabet[(index + 1) % alphabet.length] // Move to the next letter
        : alphabet[(index - 1 + alphabet.length) % alphabet.length]; // Move to the previous letter

      // Replace the character under the cursor
      this.value = text.substring(0, caretPosition - 1) + newChar + text.substring(caretPosition);

      // Set the caret back to the same position after the letter change
      this.setSelectionRange(caretPosition, caretPosition);
    }

    // Prevent default scrolling behavior
    event.preventDefault();
  });
}

// Call the function to load the fonts and set up handlers
loadFontList();
handleTyping(); // Enable typing in the preview area
handleGlyphRounding(); // Enable glyph rounding on mouse wheel
