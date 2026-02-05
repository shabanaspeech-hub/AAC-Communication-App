// AAC Communication App - Main JavaScript
// Author: Shabana Tariq - Speech Language Therapist

let currentLanguage = 'english';
let currentCategory = 'core';
let sentence = [];
let voiceSettings = {
    rate: 0.9,
    pitch: 1,
    volume: 1
};
let searchQuery = '';
let shiftActive = false;
let typingBuffer = '';
let colorCodingEnabled = false;

// AAC Color Coding System (Research-based)
const wordColors = {
    'core': 'yellow',        // Core words (I, want, go)
    'noun': 'blue',          // Nouns (apple, water)
    'verb': 'green',         // Verbs (eat, play)
    'descriptor': 'purple',  // Descriptors/Adjectives (big, hot)
    'preposition': 'orange', // Prepositions (in, on)
    'question': 'brown',     // Questions (what, where)
    'feeling': 'red',        // Feelings (happy, sad)
    'social': 'white'        // Social words (hello, thank you)
};

// Load custom symbols from localStorage
function loadCustomSymbols() {
    const saved = localStorage.getItem('customSymbols');
    return saved ? JSON.parse(saved) : {};
}

function saveCustomSymbols() {
    localStorage.setItem('customSymbols', JSON.stringify(customSymbols));
}

let customSymbols = loadCustomSymbols();

// Quick Phrases - Essential Communication Templates
const quickPhrases = {
    en: [
        'I want', 'I need', 'I like', 'I don\'t like', 
        'I feel', 'Help me', 'Thank you', 'Please',
        'I am hungry', 'I am thirsty', 'I am tired',
        'Can I have', 'Where is', 'I want to go'
    ],
    hi: [
        'मुझे चाहिए', 'मुझे ज़रूरत है', 'मुझे पसंद है', 'मुझे पसंद नहीं',
        'मैं महसूस करता हूं', 'मेरी मदद करो', 'धन्यवाद', 'कृपया',
        'मुझे भूख लगी है', 'मुझे प्यास लगी है', 'मैं थक गया हूं',
        'क्या मुझे मिल सकता है', 'कहाँ है', 'मैं जाना चाहता हूं'
    ]
};

// English Keyboard Layout
const englishKeyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
    ['SPACE', 'ENTER']
];

// Hindi Keyboard Layout (Devanagari)
const hindiKeyboard = [
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
    ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ'],
    ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ'],
    ['ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स'],
    ['ह', 'क्ष', 'त्र', 'ज्ञ', 'ं', 'ः', 'ा', 'ि', 'ी', 'ु'],
    ['ू', 'े', 'ै', 'ो', 'ौ', '्', '⌫'],
    ['SPACE', 'ENTER']
];

// CORE WORDS - Most frequently used words in AAC
const symbols = {
    core: [
        // Core Pronouns & People - YELLOW (Core words)
        { emoji: '👤', en: 'I', hi: 'मैं', core: true, wordType: 'core' },
        { emoji: '👥', en: 'You', hi: 'तुम', core: true, wordType: 'core' },
        { emoji: '🧑', en: 'He/She', hi: 'वह', core: true, wordType: 'core' },
        { emoji: '👨‍👩‍👧', en: 'We', hi: 'हम', core: true, wordType: 'core' },
        { emoji: '👥', en: 'They', hi: 'वे', core: true, wordType: 'core' },
        { emoji: '🙋', en: 'Me', hi: 'मुझे', core: true, wordType: 'core' },
        { emoji: '👉', en: 'My', hi: 'मेरा', core: true, wordType: 'core' },
        { emoji: '👈', en: 'Your', hi: 'तुम्हारा', core: true, wordType: 'core' },
        
        // Core Verbs - GREEN
        { emoji: '❤️', en: 'Want', hi: 'चाहना', core: true, wordType: 'verb' },
        { emoji: '🆘', en: 'Need', hi: 'ज़रूरत', core: true, wordType: 'verb' },
        { emoji: '👍', en: 'Like', hi: 'पसंद', core: true, wordType: 'verb' },
        { emoji: '❌', en: 'Don\'t', hi: 'नहीं', core: true, wordType: 'core' },
        { emoji: '✅', en: 'Do', hi: 'करना', core: true, wordType: 'verb' },
        { emoji: '▶️', en: 'Go', hi: 'जाओ', core: true, wordType: 'verb' },
        { emoji: '🛑', en: 'Stop', hi: 'रुको', core: true, wordType: 'verb' },
        { emoji: '👀', en: 'See', hi: 'देखो', core: true, wordType: 'verb' },
        { emoji: '👂', en: 'Hear', hi: 'सुनो', core: true, wordType: 'verb' },
        { emoji: '🗣️', en: 'Say', hi: 'कहो', core: true, wordType: 'verb' },
        { emoji: '🎁', en: 'Give', hi: 'दो', core: true, wordType: 'verb' },
        { emoji: '🤲', en: 'Take', hi: 'लो', core: true, wordType: 'verb' },
        { emoji: '🔍', en: 'Find', hi: 'खोजो', core: true, wordType: 'verb' },
        { emoji: '💭', en: 'Think', hi: 'सोचो', core: true, wordType: 'verb' },
        { emoji: '📖', en: 'Know', hi: 'जानना', core: true, wordType: 'verb' },
        { emoji: '🤝', en: 'Help', hi: 'मदद', core: true, wordType: 'verb' },
        { emoji: '🏃', en: 'Come', hi: 'आओ', core: true, wordType: 'verb' },
        { emoji: '🔨', en: 'Make', hi: 'बनाओ', core: true, wordType: 'verb' },
        { emoji: '👉', en: 'Put', hi: 'रखो', core: true, wordType: 'verb' },
        { emoji: '🤲', en: 'Get', hi: 'पाओ', core: true, wordType: 'verb' },
        { emoji: '💬', en: 'Tell', hi: 'बताओ', core: true, wordType: 'verb' },
        { emoji: '🙏', en: 'Ask', hi: 'पूछो', core: true, wordType: 'verb' },
        
        // Core Descriptors - PURPLE
        { emoji: '🔴', en: 'More', hi: 'और', core: true, wordType: 'descriptor' },
        { emoji: '🔵', en: 'Less', hi: 'कम', core: true, wordType: 'descriptor' },
        { emoji: '💯', en: 'All', hi: 'सब', core: true, wordType: 'descriptor' },
        { emoji: '🔘', en: 'Some', hi: 'कुछ', core: true, wordType: 'descriptor' },
        { emoji: '🔴', en: 'Big', hi: 'बड़ा', core: true, wordType: 'descriptor' },
        { emoji: '🔵', en: 'Small', hi: 'छोटा', core: true, wordType: 'descriptor' },
        { emoji: '✅', en: 'Good', hi: 'अच्छा', core: true, wordType: 'descriptor' },
        { emoji: '❌', en: 'Bad', hi: 'बुरा', core: true, wordType: 'descriptor' },
        { emoji: '🆕', en: 'New', hi: 'नया', core: true, wordType: 'descriptor' },
        { emoji: '🕰️', en: 'Old', hi: 'पुराना', core: true, wordType: 'descriptor' },
        { emoji: '🏃', en: 'Fast', hi: 'तेज़', core: true, wordType: 'descriptor' },
        { emoji: '🐌', en: 'Slow', hi: 'धीमा', core: true, wordType: 'descriptor' },
        { emoji: '🔥', en: 'Hot', hi: 'गर्म', core: true, wordType: 'descriptor' },
        { emoji: '❄️', en: 'Cold', hi: 'ठंडा', core: true, wordType: 'descriptor' },
        
        // Core Questions - BROWN
        { emoji: '❓', en: 'What', hi: 'क्या', core: true, wordType: 'question' },
        { emoji: '❔', en: 'Who', hi: 'कौन', core: true, wordType: 'question' },
        { emoji: '⁉️', en: 'Where', hi: 'कहाँ', core: true, wordType: 'question' },
        { emoji: '🕐', en: 'When', hi: 'कब', core: true, wordType: 'question' },
        { emoji: '🤔', en: 'Why', hi: 'क्यों', core: true, wordType: 'question' },
        { emoji: '🧐', en: 'How', hi: 'कैसे', core: true, wordType: 'question' },
        { emoji: '⚖️', en: 'Which', hi: 'कौन सा', core: true, wordType: 'question' },
        
        // Core Affirmations - SOCIAL (WHITE)
        { emoji: '✅', en: 'Yes', hi: 'हाँ', core: true, wordType: 'social' },
        { emoji: '❌', en: 'No', hi: 'नहीं', core: true, wordType: 'social' },
        { emoji: '👍', en: 'Okay', hi: 'ठीक है', core: true, wordType: 'social' },
        { emoji: '🙏', en: 'Please', hi: 'कृपया', core: true, wordType: 'social' },
        { emoji: '🙏', en: 'Thank You', hi: 'धन्यवाद', core: true, wordType: 'social' },
        
        // Core Time - CORE (YELLOW)
        { emoji: '⏰', en: 'Now', hi: 'अभी', core: true, wordType: 'core' },
        { emoji: '⏱️', en: 'Later', hi: 'बाद में', core: true, wordType: 'core' },
        { emoji: '📅', en: 'Today', hi: 'आज', core: true, wordType: 'core' },
        { emoji: '📆', en: 'Tomorrow', hi: 'कल', core: true, wordType: 'core' },
        
        // Core Locations - NOUNS (BLUE)
        { emoji: '📍', en: 'Here', hi: 'यहाँ', core: true, wordType: 'core' },
        { emoji: '📌', en: 'There', hi: 'वहाँ', core: true, wordType: 'core' },
        { emoji: '🏠', en: 'Home', hi: 'घर', core: true, wordType: 'noun' },
        { emoji: '🏫', en: 'School', hi: 'स्कूल', core: true, wordType: 'noun' },
        
        // Core Prepositions - ORANGE
        { emoji: '⬆️', en: 'Up', hi: 'ऊपर', core: true, wordType: 'preposition' },
        { emoji: '⬇️', en: 'Down', hi: 'नीचे', core: true, wordType: 'preposition' },
        { emoji: '🏠', en: 'In', hi: 'अंदर', core: true, wordType: 'preposition' },
        { emoji: '🚪', en: 'Out', hi: 'बाहर', core: true, wordType: 'preposition' },
        { emoji: '🔛', en: 'On', hi: 'पर', core: true, wordType: 'preposition' },
        { emoji: '🔽', en: 'Off', hi: 'से', core: true, wordType: 'preposition' },
        { emoji: '➡️', en: 'To', hi: 'को', core: true, wordType: 'preposition' },
        { emoji: '👉', en: 'For', hi: 'के लिए', core: true, wordType: 'preposition' },
        { emoji: '↔️', en: 'With', hi: 'के साथ', core: true, wordType: 'preposition' },
        
        // Core Feelings - RED
        { emoji: '😊', en: 'Happy', hi: 'खुश', core: true, wordType: 'feeling' },
        { emoji: '😢', en: 'Sad', hi: 'उदास', core: true, wordType: 'feeling' },
        { emoji: '😠', en: 'Angry', hi: 'गुस्सा', core: true, wordType: 'feeling' },
        { emoji: '😰', en: 'Scared', hi: 'डरा', core: true, wordType: 'feeling' }
    ],

    pronouns: [
        { emoji: '👤', en: 'I', hi: 'मैं', wordType: 'core' },
        { emoji: '🙋', en: 'Me', hi: 'मुझे', wordType: 'core' },
        { emoji: '👉', en: 'My', hi: 'मेरा', wordType: 'core' },
        { emoji: '🙋‍♂️', en: 'Mine', hi: 'मेरा', wordType: 'core' },
        { emoji: '👥', en: 'You', hi: 'तुम', wordType: 'core' },
        { emoji: '👈', en: 'Your', hi: 'तुम्हारा', wordType: 'core' },
        { emoji: '🫵', en: 'Yours', hi: 'तुम्हारा', wordType: 'core' },
        { emoji: '🧑', en: 'He', hi: 'वह (पुरुष)', wordType: 'core' },
        { emoji: '👩', en: 'She', hi: 'वह (महिला)', wordType: 'core' },
        { emoji: '🧑', en: 'His', hi: 'उसका', wordType: 'core' },
        { emoji: '👩', en: 'Her', hi: 'उसकी', wordType: 'core' },
        { emoji: '👤', en: 'It', hi: 'यह', wordType: 'core' },
        { emoji: '👨‍👩‍👧', en: 'We', hi: 'हम', wordType: 'core' },
        { emoji: '👨‍👩‍👧‍👦', en: 'Us', hi: 'हमें', wordType: 'core' },
        { emoji: '👪', en: 'Our', hi: 'हमारा', wordType: 'core' },
        { emoji: '👥', en: 'They', hi: 'वे', wordType: 'core' },
        { emoji: '👥', en: 'Them', hi: 'उन्हें', wordType: 'core' },
        { emoji: '👥', en: 'Their', hi: 'उनका', wordType: 'core' },
        { emoji: '👤', en: 'This', hi: 'यह', wordType: 'core' },
        { emoji: '👉', en: 'That', hi: 'वह', wordType: 'core' },
        { emoji: '👥', en: 'These', hi: 'ये', wordType: 'core' },
        { emoji: '👉', en: 'Those', hi: 'वे', wordType: 'core' }
    ],

    adjectives: [
        // Size - DESCRIPTOR (PURPLE)
        { emoji: '🔴', en: 'Big', hi: 'बड़ा', wordType: 'descriptor' },
        { emoji: '🔵', en: 'Small', hi: 'छोटा', wordType: 'descriptor' },
        { emoji: '📏', en: 'Long', hi: 'लंबा', wordType: 'descriptor' },
        { emoji: '📐', en: 'Short', hi: 'छोटा', wordType: 'descriptor' },
        { emoji: '⬆️', en: 'Tall', hi: 'ऊंचा', wordType: 'descriptor' },
        { emoji: '⬇️', en: 'Low', hi: 'नीचा', wordType: 'descriptor' },
        { emoji: '➡️', en: 'Wide', hi: 'चौड़ा', wordType: 'descriptor' },
        { emoji: '↔️', en: 'Narrow', hi: 'संकरा', wordType: 'descriptor' },
        { emoji: '🏋️', en: 'Heavy', hi: 'भारी', wordType: 'descriptor' },
        { emoji: '🪶', en: 'Light', hi: 'हल्का', wordType: 'descriptor' },
        
        // Quality - DESCRIPTOR (PURPLE)
        { emoji: '✅', en: 'Good', hi: 'अच्छा', wordType: 'descriptor' },
        { emoji: '❌', en: 'Bad', hi: 'बुरा', wordType: 'descriptor' },
        { emoji: '😊', en: 'Nice', hi: 'अच्छा', wordType: 'descriptor' },
        { emoji: '👍', en: 'Beautiful', hi: 'सुंदर', wordType: 'descriptor' },
        { emoji: '👎', en: 'Ugly', hi: 'बदसूरत', wordType: 'descriptor' },
        { emoji: '🧼', en: 'Clean', hi: 'साफ', wordType: 'descriptor' },
        { emoji: '🗑️', en: 'Dirty', hi: 'गंदा', wordType: 'descriptor' },
        { emoji: '🆕', en: 'New', hi: 'नया', wordType: 'descriptor' },
        { emoji: '🕰️', en: 'Old', hi: 'पुराना', wordType: 'descriptor' },
        
        // Speed & Time - DESCRIPTOR (PURPLE)
        { emoji: '🏃', en: 'Fast', hi: 'तेज़', wordType: 'descriptor' },
        { emoji: '🐌', en: 'Slow', hi: 'धीमा', wordType: 'descriptor' },
        { emoji: '⏱️', en: 'Quick', hi: 'जल्दी', wordType: 'descriptor' },
        { emoji: '🐢', en: 'Late', hi: 'देर', wordType: 'descriptor' },
        { emoji: '⏰', en: 'Early', hi: 'जल्दी', wordType: 'descriptor' },
        
        // Temperature - DESCRIPTOR (PURPLE)
        { emoji: '🔥', en: 'Hot', hi: 'गर्म', wordType: 'descriptor' },
        { emoji: '❄️', en: 'Cold', hi: 'ठंडा', wordType: 'descriptor' },
        { emoji: '🌡️', en: 'Warm', hi: 'गुनगुना', wordType: 'descriptor' },
        { emoji: '🧊', en: 'Cool', hi: 'ठंडक', wordType: 'descriptor' },
        
        // Taste - DESCRIPTOR (PURPLE)
        { emoji: '😋', en: 'Sweet', hi: 'मीठा', wordType: 'descriptor' },
        { emoji: '😖', en: 'Sour', hi: 'खट्टा', wordType: 'descriptor' },
        { emoji: '🧂', en: 'Salty', hi: 'नमकीन', wordType: 'descriptor' },
        { emoji: '🌶️', en: 'Spicy', hi: 'मसालेदार', wordType: 'descriptor' },
        { emoji: '😝', en: 'Bitter', hi: 'कड़वा', wordType: 'descriptor' },
        { emoji: '😋', en: 'Tasty', hi: 'स्वादिष्ट', wordType: 'descriptor' },
        
        // Sound - DESCRIPTOR (PURPLE)
        { emoji: '🔊', en: 'Loud', hi: 'तेज़', wordType: 'descriptor' },
        { emoji: '🔇', en: 'Quiet', hi: 'शांत', wordType: 'descriptor' },
        { emoji: '🎵', en: 'Noisy', hi: 'शोर', wordType: 'descriptor' },
        
        // Quantity - DESCRIPTOR (PURPLE)
        { emoji: '📊', en: 'Many', hi: 'बहुत', wordType: 'descriptor' },
        { emoji: '📉', en: 'Few', hi: 'कम', wordType: 'descriptor' },
        { emoji: '💯', en: 'All', hi: 'सब', wordType: 'descriptor' },
        { emoji: '🔘', en: 'Some', hi: 'कुछ', wordType: 'descriptor' },
        { emoji: '➕', en: 'More', hi: 'और', wordType: 'descriptor' },
        { emoji: '➖', en: 'Less', hi: 'कम', wordType: 'descriptor' },
        { emoji: '🈳', en: 'Empty', hi: 'खाली', wordType: 'descriptor' },
        { emoji: '🈵', en: 'Full', hi: 'भरा', wordType: 'descriptor' },
        
        // Feelings/State - FEELING (RED)
        { emoji: '😊', en: 'Happy', hi: 'खुश', wordType: 'feeling' },
        { emoji: '😢', en: 'Sad', hi: 'उदास', wordType: 'feeling' },
        { emoji: '😠', en: 'Angry', hi: 'गुस्सा', wordType: 'feeling' },
        { emoji: '😰', en: 'Scared', hi: 'डरा', wordType: 'feeling' },
        { emoji: '😴', en: 'Tired', hi: 'थका', wordType: 'feeling' },
        { emoji: '🤒', en: 'Sick', hi: 'बीमार', wordType: 'feeling' },
        { emoji: '💪', en: 'Strong', hi: 'मज़बूत', wordType: 'descriptor' },
        { emoji: '🤕', en: 'Weak', hi: 'कमज़ोर', wordType: 'descriptor' },
        { emoji: '😌', en: 'Calm', hi: 'शांत', wordType: 'feeling' },
        { emoji: '😰', en: 'Nervous', hi: 'घबराया', wordType: 'feeling' }
    ],
    
    feelings: [
        { emoji: '😊', en: 'Happy', hi: 'खुश' },
        { emoji: '😢', en: 'Sad', hi: 'उदास' },
        { emoji: '😠', en: 'Angry', hi: 'गुस्सा' },
        { emoji: '😰', en: 'Scared', hi: 'डरा हुआ' },
        { emoji: '😴', en: 'Tired', hi: 'थका हुआ' },
        { emoji: '🤒', en: 'Sick', hi: 'बीमार' },
        { emoji: '😃', en: 'Excited', hi: 'उत्साहित' },
        { emoji: '😌', en: 'Calm', hi: 'शांत' },
        { emoji: '😭', en: 'Crying', hi: 'रो रहा' },
        { emoji: '❤️', en: 'Love', hi: 'प्यार' },
        { emoji: '😱', en: 'Surprised', hi: 'हैरान' },
        { emoji: '😄', en: 'Laugh', hi: 'हंसना' },
        { emoji: '😥', en: 'Worried', hi: 'चिंतित' },
        { emoji: '🥰', en: 'Lovely', hi: 'प्यारा' },
        { emoji: '😡', en: 'Mad', hi: 'पागल' },
        { emoji: '🤗', en: 'Hug', hi: 'गले लगाना' },
        { emoji: '😎', en: 'Cool', hi: 'कूल' },
        { emoji: '🥳', en: 'Celebrate', hi: 'जश्न' },
        { emoji: '😫', en: 'Frustrated', hi: 'निराश' },
        { emoji: '😌', en: 'Relaxed', hi: 'आराम से' }
    ],
    
    food: [
        { emoji: '💧', en: 'Water', hi: 'पानी' },
        { emoji: '🍞', en: 'Bread', hi: 'रोटी' },
        { emoji: '🍚', en: 'Rice', hi: 'चावल' },
        { emoji: '🥛', en: 'Milk', hi: 'दूध' },
        { emoji: '🍎', en: 'Apple', hi: 'सेब' },
        { emoji: '🍌', en: 'Banana', hi: 'केला' },
        { emoji: '🍪', en: 'Biscuit', hi: 'बिस्कुट' },
        { emoji: '🍵', en: 'Tea', hi: 'चाय' },
        { emoji: '🍽️', en: 'Food', hi: 'खाना' },
        { emoji: '🍬', en: 'Candy', hi: 'मिठाई' },
        { emoji: '🍊', en: 'Orange', hi: 'संतरा' },
        { emoji: '🍇', en: 'Grapes', hi: 'अंगूर' },
        { emoji: '🥕', en: 'Carrot', hi: 'गाजर' },
        { emoji: '🥔', en: 'Potato', hi: 'आलू' },
        { emoji: '🍅', en: 'Tomato', hi: 'टमाटर' },
        { emoji: '🥒', en: 'Cucumber', hi: 'खीरा' },
        { emoji: '🌽', en: 'Corn', hi: 'मकई' },
        { emoji: '🥗', en: 'Salad', hi: 'सलाद' },
        { emoji: '🍲', en: 'Curry', hi: 'करी' },
        { emoji: '🍕', en: 'Pizza', hi: 'पिज्जा' },
        { emoji: '🍔', en: 'Burger', hi: 'बर्गर' },
        { emoji: '🍟', en: 'Fries', hi: 'फ्राइज' },
        { emoji: '🍿', en: 'Popcorn', hi: 'पॉपकॉर्न' },
        { emoji: '🍰', en: 'Cake', hi: 'केक' },
        { emoji: '🍦', en: 'Ice Cream', hi: 'आइसक्रीम' },
        { emoji: '🍫', en: 'Chocolate', hi: 'चॉकलेट' },
        { emoji: '☕', en: 'Coffee', hi: 'कॉफी' },
        { emoji: '🧃', en: 'Juice', hi: 'जूस' },
        { emoji: '🥤', en: 'Soft Drink', hi: 'सॉफ्ट ड्रिंक' },
        { emoji: '🍳', en: 'Egg', hi: 'अंडा' }
    ],
    
    people: [
        { emoji: '👨', en: 'Father', hi: 'पिताजी' },
        { emoji: '👩', en: 'Mother', hi: 'माताजी' },
        { emoji: '👦', en: 'Brother', hi: 'भाई' },
        { emoji: '👧', en: 'Sister', hi: 'बहन' },
        { emoji: '👴', en: 'Grandfather', hi: 'दादाजी' },
        { emoji: '👵', en: 'Grandmother', hi: 'दादीजी' },
        { emoji: '👨‍🏫', en: 'Teacher', hi: 'शिक्षक' },
        { emoji: '👨‍⚕️', en: 'Doctor', hi: 'डॉक्टर' },
        { emoji: '👶', en: 'Baby', hi: 'बच्चा' },
        { emoji: '👫', en: 'Friend', hi: 'दोस्त' },
        { emoji: '👨‍👩‍👧', en: 'Family', hi: 'परिवार' },
        { emoji: '🧑', en: 'Person', hi: 'व्यक्ति' },
        { emoji: '👧', en: 'Girl', hi: 'लड़की' },
        { emoji: '👦', en: 'Boy', hi: 'लड़का' },
        { emoji: '👪', en: 'Parents', hi: 'माता-पिता' },
        { emoji: '👨‍💼', en: 'Worker', hi: 'कार्यकर्ता' },
        { emoji: '👮', en: 'Police', hi: 'पुलिस' },
        { emoji: '🧑‍🍳', en: 'Chef', hi: 'रसोइया' },
        { emoji: '🧑‍🌾', en: 'Farmer', hi: 'किसान' },
        { emoji: '👨‍✈️', en: 'Pilot', hi: 'पायलट' }
    ],
    
    actions: [
        { emoji: '🍽️', en: 'Eat', hi: 'खाओ' },
        { emoji: '🚰', en: 'Drink', hi: 'पीओ' },
        { emoji: '😴', en: 'Sleep', hi: 'सोओ' },
        { emoji: '🏃', en: 'Run', hi: 'दौड़ो' },
        { emoji: '🚶', en: 'Walk', hi: 'चलो' },
        { emoji: '🪑', en: 'Sit', hi: 'बैठो' },
        { emoji: '🧍', en: 'Stand', hi: 'खड़े हो' },
        { emoji: '🎮', en: 'Play', hi: 'खेलो' },
        { emoji: '📖', en: 'Read', hi: 'पढ़ो' },
        { emoji: '✍️', en: 'Write', hi: 'लिखो' },
        { emoji: '🎨', en: 'Draw', hi: 'बनाओ' },
        { emoji: '🎵', en: 'Sing', hi: 'गाओ' },
        { emoji: '💃', en: 'Dance', hi: 'नाचो' },
        { emoji: '🤸', en: 'Jump', hi: 'कूदो' },
        { emoji: '🧗', en: 'Climb', hi: 'चढ़ो' },
        { emoji: '🏊', en: 'Swim', hi: 'तैरो' },
        { emoji: '🛁', en: 'Bathe', hi: 'नहाओ' },
        { emoji: '🪥', en: 'Brush', hi: 'ब्रश करो' },
        { emoji: '👀', en: 'Look', hi: 'देखो' },
        { emoji: '👂', en: 'Listen', hi: 'सुनो' },
        { emoji: '🗣️', en: 'Talk', hi: 'बोलो' },
        { emoji: '🤫', en: 'Quiet', hi: 'चुप' },
        { emoji: '😴', en: 'Rest', hi: 'आराम' },
        { emoji: '🧹', en: 'Clean', hi: 'साफ करो' },
        { emoji: '🧺', en: 'Wash', hi: 'धोओ' },
        { emoji: '🔨', en: 'Work', hi: 'काम करो' },
        { emoji: '🎓', en: 'Study', hi: 'पढ़ाई' },
        { emoji: '💭', en: 'Think', hi: 'सोचो' },
        { emoji: '🤝', en: 'Help', hi: 'मदद करो' },
        { emoji: '🎁', en: 'Give', hi: 'दो' }
    ],
    
    places: [
        { emoji: '🏠', en: 'Home', hi: 'घर' },
        { emoji: '🏫', en: 'School', hi: 'स्कूल' },
        { emoji: '🏥', en: 'Hospital', hi: 'अस्पताल' },
        { emoji: '🏪', en: 'Shop', hi: 'दुकान' },
        { emoji: '🌳', en: 'Park', hi: 'पार्क' },
        { emoji: '🚗', en: 'Car', hi: 'गाड़ी' },
        { emoji: '🚌', en: 'Bus', hi: 'बस' },
        { emoji: '🛏️', en: 'Bedroom', hi: 'कमरा' },
        { emoji: '🚽', en: 'Bathroom', hi: 'बाथरूम' },
        { emoji: '🍳', en: 'Kitchen', hi: 'रसोई' },
        { emoji: '🏛️', en: 'Temple', hi: 'मंदिर' },
        { emoji: '🕌', en: 'Mosque', hi: 'मस्जिद' },
        { emoji: '⛪', en: 'Church', hi: 'गिरजा' },
        { emoji: '🏖️', en: 'Beach', hi: 'समुद्र तट' },
        { emoji: '🏔️', en: 'Mountain', hi: 'पहाड़' },
        { emoji: '🌊', en: 'River', hi: 'नदी' },
        { emoji: '🏟️', en: 'Stadium', hi: 'स्टेडियम' },
        { emoji: '🎪', en: 'Circus', hi: 'सर्कस' },
        { emoji: '🎢', en: 'Amusement Park', hi: 'मनोरंजन पार्क' },
        { emoji: '🏨', en: 'Hotel', hi: 'होटल' },
        { emoji: '🏦', en: 'Bank', hi: 'बैंक' },
        { emoji: '📮', en: 'Post Office', hi: 'डाकघर' },
        { emoji: '🚉', en: 'Station', hi: 'स्टेशन' },
        { emoji: '✈️', en: 'Airport', hi: 'हवाई अड्डा' },
        { emoji: '🚂', en: 'Train', hi: 'ट्रेन' }
    ],
    
    body: [
        { emoji: '🧠', en: 'Head', hi: 'सिर' },
        { emoji: '👁️', en: 'Eyes', hi: 'आँखें' },
        { emoji: '👃', en: 'Nose', hi: 'नाक' },
        { emoji: '👄', en: 'Mouth', hi: 'मुँह' },
        { emoji: '👂', en: 'Ears', hi: 'कान' },
        { emoji: '🦷', en: 'Teeth', hi: 'दांत' },
        { emoji: '👅', en: 'Tongue', hi: 'जीभ' },
        { emoji: '💪', en: 'Arm', hi: 'बाजू' },
        { emoji: '✋', en: 'Hand', hi: 'हाथ' },
        { emoji: '👆', en: 'Finger', hi: 'उंगली' },
        { emoji: '🦵', en: 'Leg', hi: 'पैर' },
        { emoji: '🦶', en: 'Foot', hi: 'पाँव' },
        { emoji: '🫀', en: 'Heart', hi: 'दिल' },
        { emoji: '🫁', en: 'Lungs', hi: 'फेफड़े' },
        { emoji: '🦴', en: 'Bone', hi: 'हड्डी' },
        { emoji: '🩸', en: 'Blood', hi: 'खून' },
        { emoji: '💪', en: 'Muscle', hi: 'मांसपेशी' },
        { emoji: '🧑', en: 'Body', hi: 'शरीर' },
        { emoji: '👃', en: 'Face', hi: 'चेहरा' },
        { emoji: '🦴', en: 'Back', hi: 'पीठ' }
    ],
    
    needs: [
        { emoji: '🚽', en: 'Toilet', hi: 'शौचालय' },
        { emoji: '🛁', en: 'Bath', hi: 'नहाना' },
        { emoji: '🤕', en: 'Pain', hi: 'दर्द' },
        { emoji: '🥵', en: 'Hot', hi: 'गर्म' },
        { emoji: '🥶', en: 'Cold', hi: 'ठंडा' },
        { emoji: '😫', en: 'Hungry', hi: 'भूख' },
        { emoji: '🥱', en: 'Thirsty', hi: 'प्यास' },
        { emoji: '🌙', en: 'Night', hi: 'रात' },
        { emoji: '☀️', en: 'Day', hi: 'दिन' },
        { emoji: '🕐', en: 'Time', hi: 'समय' },
        { emoji: '💊', en: 'Medicine', hi: 'दवा' },
        { emoji: '🩹', en: 'Bandage', hi: 'पट्टी' },
        { emoji: '😷', en: 'Mask', hi: 'मास्क' },
        { emoji: '🌡️', en: 'Fever', hi: 'बुखार' },
        { emoji: '🤧', en: 'Sneeze', hi: 'छींक' },
        { emoji: '🤮', en: 'Vomit', hi: 'उल्टी' },
        { emoji: '💤', en: 'Sleepy', hi: 'नींद' },
        { emoji: '🥴', en: 'Dizzy', hi: 'चक्कर' }
    ],
    
    animals: [
        { emoji: '🐕', en: 'Dog', hi: 'कुत्ता' },
        { emoji: '🐈', en: 'Cat', hi: 'बिल्ली' },
        { emoji: '🐄', en: 'Cow', hi: 'गाय' },
        { emoji: '🐘', en: 'Elephant', hi: 'हाथी' },
        { emoji: '🐅', en: 'Tiger', hi: 'बाघ' },
        { emoji: '🦁', en: 'Lion', hi: 'शेर' },
        { emoji: '🐒', en: 'Monkey', hi: 'बंदर' },
        { emoji: '🐎', en: 'Horse', hi: 'घोड़ा' },
        { emoji: '🐑', en: 'Sheep', hi: 'भेड़' },
        { emoji: '🐐', en: 'Goat', hi: 'बकरी' },
        { emoji: '🐖', en: 'Pig', hi: 'सूअर' },
        { emoji: '🐔', en: 'Chicken', hi: 'मुर्गी' },
        { emoji: '🐦', en: 'Bird', hi: 'चिड़िया' },
        { emoji: '🦜', en: 'Parrot', hi: 'तोता' },
        { emoji: '🦚', en: 'Peacock', hi: 'मोर' },
        { emoji: '🐸', en: 'Frog', hi: 'मेंढक' },
        { emoji: '🐍', en: 'Snake', hi: 'सांप' },
        { emoji: '🐢', en: 'Turtle', hi: 'कछुआ' },
        { emoji: '🦋', en: 'Butterfly', hi: 'तितली' },
        { emoji: '🐝', en: 'Bee', hi: 'मधुमक्खी' },
        { emoji: '🐜', en: 'Ant', hi: 'चींटी' },
        { emoji: '🕷️', en: 'Spider', hi: 'मकड़ी' },
        { emoji: '🐠', en: 'Fish', hi: 'मछली' },
        { emoji: '🦈', en: 'Shark', hi: 'शार्क' },
        { emoji: '🐙', en: 'Octopus', hi: 'ऑक्टोपस' }
    ],
    
    colors: [
        { emoji: '🔴', en: 'Red', hi: 'लाल' },
        { emoji: '🔵', en: 'Blue', hi: 'नीला' },
        { emoji: '🟢', en: 'Green', hi: 'हरा' },
        { emoji: '🟡', en: 'Yellow', hi: 'पीला' },
        { emoji: '🟠', en: 'Orange', hi: 'नारंगी' },
        { emoji: '🟣', en: 'Purple', hi: 'बैंगनी' },
        { emoji: '🟤', en: 'Brown', hi: 'भूरा' },
        { emoji: '⚫', en: 'Black', hi: 'काला' },
        { emoji: '⚪', en: 'White', hi: 'सफेद' },
        { emoji: '🩷', en: 'Pink', hi: 'गुलाबी' },
        { emoji: '🩶', en: 'Grey', hi: 'ग्रे' },
        { emoji: '🌈', en: 'Rainbow', hi: 'इंद्रधनुष' }
    ],
    
    numbers: [
        { emoji: '0️⃣', en: 'Zero', hi: 'शून्य' },
        { emoji: '1️⃣', en: 'One', hi: 'एक' },
        { emoji: '2️⃣', en: 'Two', hi: 'दो' },
        { emoji: '3️⃣', en: 'Three', hi: 'तीन' },
        { emoji: '4️⃣', en: 'Four', hi: 'चार' },
        { emoji: '5️⃣', en: 'Five', hi: 'पांच' },
        { emoji: '6️⃣', en: 'Six', hi: 'छह' },
        { emoji: '7️⃣', en: 'Seven', hi: 'सात' },
        { emoji: '8️⃣', en: 'Eight', hi: 'आठ' },
        { emoji: '9️⃣', en: 'Nine', hi: 'नौ' },
        { emoji: '🔟', en: 'Ten', hi: 'दस' },
        { emoji: '💯', en: 'Hundred', hi: 'सौ' },
        { emoji: '🔢', en: 'Numbers', hi: 'संख्या' }
    ],
    
    school: [
        { emoji: '📚', en: 'Book', hi: 'किताब' },
        { emoji: '✏️', en: 'Pencil', hi: 'पेंसिल' },
        { emoji: '🖊️', en: 'Pen', hi: 'पेन' },
        { emoji: '📝', en: 'Paper', hi: 'कागज' },
        { emoji: '📏', en: 'Ruler', hi: 'स्केल' },
        { emoji: '✂️', en: 'Scissors', hi: 'कैंची' },
        { emoji: '🖍️', en: 'Crayon', hi: 'क्रेयॉन' },
        { emoji: '🎨', en: 'Paint', hi: 'पेंट' },
        { emoji: '📐', en: 'Geometry', hi: 'ज्यामिति' },
        { emoji: '🔬', en: 'Science', hi: 'विज्ञान' },
        { emoji: '🧮', en: 'Math', hi: 'गणित' },
        { emoji: '🌍', en: 'Geography', hi: 'भूगोल' },
        { emoji: '📖', en: 'Reading', hi: 'पढ़ना' },
        { emoji: '✍️', en: 'Writing', hi: 'लिखना' },
        { emoji: '🎒', en: 'Bag', hi: 'बैग' },
        { emoji: '🖥️', en: 'Computer', hi: 'कंप्यूटर' },
        { emoji: '🖨️', en: 'Printer', hi: 'प्रिंटर' },
        { emoji: '📱', en: 'Phone', hi: 'फोन' },
        { emoji: '⌨️', en: 'Keyboard', hi: 'कीबोर्ड' },
        { emoji: '🖱️', en: 'Mouse', hi: 'माउस' }
    ],
    
    toys: [
        { emoji: '⚽', en: 'Ball', hi: 'गेंद' },
        { emoji: '🏀', en: 'Basketball', hi: 'बास्केटबॉल' },
        { emoji: '🏏', en: 'Cricket', hi: 'क्रिकेट' },
        { emoji: '🎮', en: 'Video Game', hi: 'वीडियो गेम' },
        { emoji: '🧸', en: 'Teddy Bear', hi: 'टेडी बियर' },
        { emoji: '🪀', en: 'Yo-Yo', hi: 'यो-यो' },
        { emoji: '🪁', en: 'Kite', hi: 'पतंग' },
        { emoji: '🎯', en: 'Dart', hi: 'डार्ट' },
        { emoji: '🎲', en: 'Dice', hi: 'पासा' },
        { emoji: '🧩', en: 'Puzzle', hi: 'पहेली' },
        { emoji: '🎪', en: 'Circus', hi: 'सर्कस' },
        { emoji: '🎭', en: 'Drama', hi: 'नाटक' },
        { emoji: '🎨', en: 'Art', hi: 'कला' },
        { emoji: '🎵', en: 'Music', hi: 'संगीत' },
        { emoji: '🎸', en: 'Guitar', hi: 'गिटार' }
    ],

    keyboard: [] // This will be populated dynamically
};

const categories = {
    en: {
        core: '⭐ Core Words',
        pronouns: '👥 Pronouns',
        adjectives: '📝 Adjectives',
        feelings: 'Feelings',
        food: 'Food & Drink',
        people: 'People',
        actions: 'Actions',
        places: 'Places',
        body: 'Body Parts',
        needs: 'Needs',
        animals: 'Animals',
        colors: 'Colors',
        numbers: 'Numbers',
        school: 'School',
        toys: 'Toys & Games',
        keyboard: '⌨️ Type'
    },
    hi: {
        core: '⭐ मुख्य शब्द',
        pronouns: '👥 सर्वनाम',
        adjectives: '📝 विशेषण',
        feelings: 'भावनाएं',
        food: 'खाना-पीना',
        people: 'लोग',
        actions: 'क्रियाएं',
        places: 'स्थान',
        body: 'शरीर के अंग',
        needs: 'आवश्यकताएं',
        animals: 'जानवर',
        colors: 'रंग',
        numbers: 'संख्या',
        school: 'स्कूल',
        toys: 'खिलौने',
        keyboard: '⌨️ टाइप करें'
    }
};

// Keyboard Functions
function renderKeyboard() {
    const container = document.getElementById('keyboardContainer');
    const layout = currentLanguage === 'english' ? englishKeyboard : hindiKeyboard;
    
    let html = '<div class="typing-input-container">';
    html += '<input type="text" class="typing-input" id="typingInput" placeholder="Type here..." value="' + typingBuffer + '">';
    html += '</div>';
    
    layout.forEach(row => {
        html += '<div class="keyboard-row">';
        row.forEach(key => {
            if (key === 'SPACE') {
                html += `<button class="key space" onclick="typeKey(' ')">Space</button>`;
            } else if (key === 'ENTER') {
                html += `<button class="key enter" onclick="addTypedWord()">Enter</button>`;
            } else if (key === 'SHIFT') {
                html += `<button class="key shift ${shiftActive ? 'active' : ''}" onclick="toggleShift()">⇧ Shift</button>`;
            } else if (key === '⌫') {
                html += `<button class="key backspace" onclick="backspaceTyping()">⌫</button>`;
            } else {
                const displayKey = (shiftActive && currentLanguage === 'english') ? key : (currentLanguage === 'english' ? key.toLowerCase() : key);
                const className = currentLanguage === 'hindi' ? 'key hindi-key' : 'key';
                html += `<button class="${className}" onclick="typeKey('${displayKey}')">${displayKey}</button>`;
            }
        });
        html += '</div>';
    });
    
    container.innerHTML = html;
}

function typeKey(key) {
    typingBuffer += key;
    document.getElementById('typingInput').value = typingBuffer;
    if (shiftActive && currentLanguage === 'english') {
        shiftActive = false;
        renderKeyboard();
    }
}

function backspaceTyping() {
    typingBuffer = typingBuffer.slice(0, -1);
    document.getElementById('typingInput').value = typingBuffer;
}

function toggleShift() {
    shiftActive = !shiftActive;
    renderKeyboard();
}

function addTypedWord() {
    if (typingBuffer.trim() === '') return;
    
    const typedSymbol = {
        emoji: '💬',
        en: typingBuffer.trim(),
        hi: typingBuffer.trim(),
        isTyped: true
    };
    
    speakText(typingBuffer.trim());
    sentence.push(typedSymbol);
    updateSentenceBar();
    
    typingBuffer = '';
    renderKeyboard();
}

// Quick Phrases Functions
function renderQuickPhrases() {
    const phrasesDiv = document.getElementById('quickPhrases');
    const phrases = currentLanguage === 'english' ? quickPhrases.en : quickPhrases.hi;
    
    phrasesDiv.innerHTML = phrases.map(phrase => 
        `<button class="phrase-btn" onclick="addPhrase('${phrase.replace(/'/g, "\\'")}')">${phrase}</button>`
    ).join('');
}

function addPhrase(phraseText) {
    speakText(phraseText);
    
    const phraseSymbol = {
        emoji: '💬',
        en: phraseText,
        hi: phraseText,
        isPhrase: true
    };
    sentence.push(phraseSymbol);
    updateSentenceBar();
}

// Stats Functions
function updateStats() {
    let totalWords = 0;
    let coreWords = 0;
    
    Object.keys(symbols).forEach(cat => {
        if (cat !== 'keyboard') {
            const catSymbols = symbols[cat];
            totalWords += catSymbols.length;
            coreWords += catSymbols.filter(s => s.core).length;
            
            if (customSymbols[cat]) {
                totalWords += customSymbols[cat].length;
                coreWords += customSymbols[cat].filter(s => s.core).length;
            }
        }
    });
    
    document.getElementById('wordCount').textContent = totalWords;
    document.getElementById('coreCount').textContent = coreWords;
    document.getElementById('categoryCount').textContent = Object.keys(symbols).length - 1; // Exclude keyboard
}

// Language Functions
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderQuickPhrases();
    renderCategories();
    if (currentCategory === 'keyboard') {
        renderKeyboard();
    } else {
        renderSymbols();
    }
    updateSentenceBar();
}

// Category Functions
function setCategory(category) {
    currentCategory = category;
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'keyboard') {
        document.getElementById('symbolsGrid').style.display = 'none';
        document.getElementById('keyboardContainer').style.display = 'block';
        renderKeyboard();
    } else {
        document.getElementById('symbolsGrid').style.display = 'grid';
        document.getElementById('keyboardContainer').style.display = 'none';
        renderSymbols();
    }
}

function renderCategories() {
    const categoriesDiv = document.getElementById('categories');
    const catList = currentLanguage === 'english' ? categories.en : categories.hi;
    categoriesDiv.innerHTML = Object.keys(catList).map(key => {
        let className = 'category-btn';
        if (key === 'core') className += ' core';
        if (key === 'keyboard') className += ' keyboard';
        if (key === currentCategory) className += ' active';
        
        return `<button class="${className}" onclick="setCategory('${key}')">${catList[key]}</button>`;
    }).join('');
}

// Symbol Rendering Functions
function renderSymbols() {
    const symbolsGrid = document.getElementById('symbolsGrid');
    const categorySymbols = symbols[currentCategory] || [];
    const customCategorySymbols = customSymbols[currentCategory] || [];
    let allSymbols = [...categorySymbols, ...customCategorySymbols];

    if (searchQuery) {
        allSymbols = allSymbols.filter(symbol => {
            const enText = symbol.en.toLowerCase();
            const hiText = symbol.hi.toLowerCase();
            const query = searchQuery.toLowerCase();
            return enText.includes(query) || hiText.includes(query);
        });
    }
    
    symbolsGrid.innerHTML = allSymbols.map((symbol, index) => {
        const text = currentLanguage === 'english' ? symbol.en : symbol.hi;
        const translation = currentLanguage === 'english' ? symbol.hi : symbol.en;
        const isCustom = index >= categorySymbols.length;
        const actualIndex = isCustom ? index - categorySymbols.length : index;
        const isCore = symbol.core === true;
        
        // Determine color class based on wordType
        let colorClass = '';
        if (colorCodingEnabled && symbol.wordType) {
            colorClass = `color-${wordColors[symbol.wordType] || 'white'}`;
        } else if (isCore && !colorCodingEnabled) {
            colorClass = 'core';
        }
        
        const imgDisplay = symbol.img 
            ? (symbol.img.startsWith('data:') 
                ? `<img src="${symbol.img}">` 
                : `<div class="emoji">${symbol.img}</div>`)
            : (symbol.emoji 
                ? `<div class="emoji">${symbol.emoji}</div>`
                : `<div class="emoji">❓</div>`);
        
        return `
            <div class="symbol-card ${colorClass}" onclick="addToSentence(${index}, '${currentCategory}', event)">
                ${isCore && !colorCodingEnabled ? '<span class="core-badge">CORE</span>' : ''}
                ${isCustom ? `<button class="edit-delete-btn" onclick="deleteSymbol(${actualIndex}, '${currentCategory}', event)">🗑️</button>` : ''}
                ${imgDisplay}
                <div class="text">${text}</div>
                <div class="translation">${translation}</div>
            </div>
        `;
    }).join('');

    if (allSymbols.length === 0) {
        symbolsGrid.innerHTML = '<p style="padding: 20px; text-align: center; color: #999;">No symbols found</p>';
    }
}

function searchSymbols() {
    searchQuery = document.getElementById('searchInput').value;
    
    if (searchQuery.trim() === '') {
        renderSymbols();
        return;
    }

    const symbolsGrid = document.getElementById('symbolsGrid');
    let allMatches = [];

    Object.keys(symbols).forEach(cat => {
        if (cat === 'keyboard') return;
        
        const categorySymbols = symbols[cat] || [];
        const customCategorySymbols = customSymbols[cat] || [];
        const allSymbols = [...categorySymbols, ...customCategorySymbols];

        allSymbols.forEach((symbol, index) => {
            const enText = symbol.en.toLowerCase();
            const hiText = symbol.hi.toLowerCase();
            const query = searchQuery.toLowerCase();
            if (enText.includes(query) || hiText.includes(query)) {
                allMatches.push({ symbol, cat, index });
            }
        });
    });

    symbolsGrid.innerHTML = allMatches.map(match => {
        const { symbol, cat, index } = match;
        const text = currentLanguage === 'english' ? symbol.en : symbol.hi;
        const translation = currentLanguage === 'english' ? symbol.hi : symbol.en;
        const catLabel = currentLanguage === 'english' ? categories.en[cat] : categories.hi[cat];
        const isCore = symbol.core === true;
        
        const imgDisplay = symbol.img 
            ? (symbol.img.startsWith('data:') 
                ? `<img src="${symbol.img}">` 
                : `<div class="emoji">${symbol.img}</div>`)
            : (symbol.emoji 
                ? `<div class="emoji">${symbol.emoji}</div>`
                : `<div class="emoji">❓</div>`);
        
        return `
            <div class="symbol-card ${isCore ? 'core' : ''}" onclick="addSymbolFromSearch(${JSON.stringify(symbol).replace(/"/g, '&quot;')}, event)">
                ${isCore ? '<span class="core-badge">CORE</span>' : ''}
                ${imgDisplay}
                <div class="text">${text}</div>
                <div class="translation">${translation}</div>
                <div style="font-size: 10px; color: #999; margin-top: 3px;">${catLabel}</div>
            </div>
        `;
    }).join('');

    if (allMatches.length === 0) {
        symbolsGrid.innerHTML = '<p style="padding: 20px; text-align: center; color: #999;">No symbols found matching your search</p>';
    }
}

function addSymbolFromSearch(symbol, event) {
    if (event && event.target.classList.contains('edit-delete-btn')) {
        return;
    }
    
    const text = currentLanguage === 'english' ? symbol.en : symbol.hi;
    speakText(text);
    sentence.push(symbol);
    updateSentenceBar();
}

function addToSentence(index, category, event) {
    if (event && event.target.classList.contains('edit-delete-btn')) {
        return;
    }
    
    const categorySymbols = symbols[category] || [];
    const customCategorySymbols = customSymbols[category] || [];
    const allSymbols = [...categorySymbols, ...customCategorySymbols];
    const symbol = allSymbols[index];
    
    const text = currentLanguage === 'english' ? symbol.en : symbol.hi;
    speakText(text);
    
    sentence.push(symbol);
    updateSentenceBar();
}

// Speech Functions
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'english' ? 'en-US' : 'hi-IN';
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

// Sentence Bar Functions
function updateSentenceBar() {
    const sentenceBar = document.getElementById('sentenceBar');
    if (sentence.length === 0) {
        sentenceBar.innerHTML = '<p style="color: #999; font-style: italic; font-size: 14px;">Tap symbols or type to build a sentence...</p>';
        return;
    }
    
    sentenceBar.innerHTML = sentence.map((symbol, index) => {
        const text = currentLanguage === 'english' ? symbol.en : symbol.hi;
        const emoji = symbol.img || symbol.emoji || '❓';
        const isCore = symbol.core === true;
        const isTyped = symbol.isTyped === true;
        
        const imgDisplay = emoji.startsWith('data:') 
            ? `<img src="${emoji}" style="width: 40px; height: 40px; object-fit: contain;">` 
            : `<div class="emoji">${emoji}</div>`;
        
        let className = 'sentence-word';
        if (isTyped) {
            className += ' typed-word';
        } else if (colorCodingEnabled && symbol.wordType) {
            className += ` color-${wordColors[symbol.wordType] || 'white'}`;
        } else if (isCore) {
            className += ' core-word';
        }
        
        return `
            <div class="${className}" onclick="removeWord(${index})">
                ${imgDisplay}
                <span>${text}</span>
            </div>
        `;
    }).join('');
}

function removeWord(index) {
    sentence.splice(index, 1);
    updateSentenceBar();
}

function removeLastWord() {
    if (sentence.length > 0) {
        sentence.pop();
        updateSentenceBar();
    }
}

function clearSentence() {
    sentence = [];
    updateSentenceBar();
}

function speakSentence() {
    if (sentence.length === 0) {
        alert('Please select symbols first!');
        return;
    }

    const text = sentence.map(symbol => 
        currentLanguage === 'english' ? symbol.en : symbol.hi
    ).join(' ');

    speakText(text);
}

// Voice Settings Functions
function openVoiceSettings() {
    document.getElementById('voiceModal').style.display = 'block';
    document.getElementById('rateSlider').value = voiceSettings.rate;
    document.getElementById('pitchSlider').value = voiceSettings.pitch;
    document.getElementById('volumeSlider').value = voiceSettings.volume;
    updateVoiceDisplays();
}

function closeVoiceSettings() {
    document.getElementById('voiceModal').style.display = 'none';
}

function updateVoiceValue(setting) {
    const slider = document.getElementById(setting + 'Slider');
    voiceSettings[setting] = parseFloat(slider.value);
    updateVoiceDisplays();
}

function updateVoiceDisplays() {
    document.getElementById('rateValue').textContent = voiceSettings.rate.toFixed(1);
    document.getElementById('pitchValue').textContent = voiceSettings.pitch.toFixed(1);
    document.getElementById('volumeValue').textContent = voiceSettings.volume.toFixed(1);
}

function testVoice() {
    const testText = currentLanguage === 'english' 
        ? 'Hello, this is a test of the voice settings' 
        : 'नमस्ते, यह आवाज़ सेटिंग का परीक्षण है';
    speakText(testText);
}

// Add Symbol Functions
function openAddSymbol() {
    document.getElementById('addSymbolModal').style.display = 'block';
    
    const select = document.getElementById('newCategory');
    const catList = currentLanguage === 'english' ? categories.en : categories.hi;
    select.innerHTML = Object.keys(catList)
        .filter(key => key !== 'keyboard')
        .map(key => 
            `<option value="${key}" ${key === currentCategory ? 'selected' : ''}>${catList[key]}</option>`
        ).join('');
    
    clearAddSymbolForm();
}

function closeAddSymbol() {
    document.getElementById('addSymbolModal').style.display = 'none';
    clearAddSymbolForm();
}

function clearAddSymbolForm() {
    document.getElementById('englishText').value = '';
    document.getElementById('hindiText').value = '';
    document.getElementById('emojiText').value = '';
    document.getElementById('imageUpload').value = '';
    document.getElementById('imagePreview').innerHTML = '<span>📷</span>';
    document.getElementById('isCoreWord').checked = false;
}

function previewImage() {
    const file = document.getElementById('imageUpload').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').innerHTML = 
                `<img src="${e.target.result}">`;
        }
        reader.readAsDataURL(file);
    }
}

function saveNewSymbol() {
    const category = document.getElementById('newCategory').value;
    const englishText = document.getElementById('englishText').value.trim();
    const hindiText = document.getElementById('hindiText').value.trim();
    const emojiText = document.getElementById('emojiText').value.trim();
    const imageUpload = document.getElementById('imageUpload').files[0];
    const isCoreWord = document.getElementById('isCoreWord').checked;

    if (!englishText || !hindiText) {
        alert('Please fill in both English and Hindi text!');
        return;
    }

    let imgData = '❓';

    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgData = e.target.result;
            saveSymbolData();
        }
        reader.readAsDataURL(imageUpload);
    } else if (emojiText) {
        imgData = emojiText;
        saveSymbolData();
    } else {
        saveSymbolData();
    }

    function saveSymbolData() {
        const newSymbol = {
            img: imgData,
            en: englishText,
            hi: hindiText,
            core: isCoreWord
        };

        if (!customSymbols[category]) {
            customSymbols[category] = [];
        }
        customSymbols[category].push(newSymbol);
        
        saveCustomSymbols();
        closeAddSymbol();
        
        currentCategory = category;
        renderCategories();
        renderSymbols();
        updateStats();
        
        alert('✅ Symbol added successfully!');
    }
}

function deleteSymbol(index, category, event) {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this symbol?')) {
        customSymbols[category].splice(index, 1);
        if (customSymbols[category].length === 0) {
            delete customSymbols[category];
        }
        saveCustomSymbols();
        renderSymbols();
        updateStats();
    }
}

// Modal Close on Outside Click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Color Coding Toggle Function
function toggleColorCoding() {
    colorCodingEnabled = !colorCodingEnabled;
    document.getElementById('colorToggleText').textContent = colorCodingEnabled ? 'Hide Colors' : 'Show Colors';
    document.getElementById('colorLegend').style.display = colorCodingEnabled ? 'block' : 'none';
    
    // Re-render symbols and sentence bar
    if (currentCategory === 'keyboard') {
        renderKeyboard();
    } else {
        renderSymbols();
    }
    updateSentenceBar();
    
    // Save preference
    localStorage.setItem('colorCodingEnabled', colorCodingEnabled);
}

// Load color coding preference
const savedColorPref = localStorage.getItem('colorCodingEnabled');
if (savedColorPref === 'true') {
    colorCodingEnabled = true;
    document.getElementById('colorToggleText').textContent = 'Hide Colors';
    document.getElementById('colorLegend').style.display = 'block';
}

// Initialize the app
updateStats();
renderQuickPhrases();
renderCategories();
renderSymbols();
updateSentenceBar();