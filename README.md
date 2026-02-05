# AAC Communication App

A comprehensive **Augmentative and Alternative Communication (AAC)** web application with core words, typing keyboard, and bilingual support in English and Hindi.

![AAC App](https://img.shields.io/badge/AAC-Communication-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 🌟 Features

### Core Communication Features
- **⭐ 70+ Core Words** - Most frequently used words in AAC communication
- **🎨 Research-Based Color Coding** - AAC standard colors for word types
- **💬 14 Quick Phrases** - Pre-built essential communication templates
- **⌨️ Typing Keyboard** - Full keyboard support for English and Hindi
- **🗣️ Text-to-Speech** - Instant voice output with customizable settings
- **🔊 Tap-to-Speak** - Individual symbols speak when tapped

### AAC Color Coding System
Based on AAC research standards:
- **🟨 Yellow** - Core Words (I, want, go)
- **🟦 Blue** - Nouns (apple, water, home)
- **🟩 Green** - Verbs (eat, play, run)
- **🟪 Purple** - Descriptors/Adjectives (big, hot, fast)
- **🟧 Orange** - Prepositions (in, on, with)
- **🟫 Brown** - Questions (what, where, why)
- **🟥 Red/Pink** - Feelings (happy, sad, angry)
- **⬜ White** - Social Words (hello, thank you, please)

Toggle color coding ON/OFF with the 🎨 button!

### Vocabulary
- **600+ Total Words** across 16 categories:
  - ⭐ Core Words (70+)
  - 👥 Pronouns (22)
  - 📝 Adjectives (50+)
  - Feelings (20)
  - Food & Drink (30)
  - People (20)
  - Actions (30)
  - Places (25)
  - Body Parts (20)
  - Needs (18)
  - Animals (25)
  - Colors (12)
  - Numbers (13)
  - School (20)
  - Toys & Games (15)
  - ⌨️ Typing Keyboard

### Advanced Features
- **🌐 Bilingual Support** - Complete English & Hindi interface
- **🎙️ Voice Settings** - Adjust speed, pitch, and volume
- **➕ Add Custom Symbols** - Upload images or use emojis
- **🔍 Search Function** - Find words across all categories
- **💾 Persistent Storage** - Saves custom symbols locally
- **📱 Responsive Design** - Works on all devices

## 🚀 Quick Start

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aac-communication-app.git
cd aac-communication-app
```

2. **Open in Browser**
```bash
# Simply open index.html in your web browser
# No build process or dependencies required!
```

Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. **Access the App**
```
Open browser and navigate to:
http://localhost:8000
```

## 📖 Usage Guide

### Building Sentences

1. **Using Symbols**: Tap any symbol to add it to the sentence bar
2. **Using Quick Phrases**: Click pre-made phrases like "I want", "I need"
3. **Using Keyboard**: Switch to keyboard mode and type custom text
4. **Speak**: Press the 🔊 Speak button to hear the complete sentence

### Quick Phrases Examples

**English:**
- I want
- I need
- I like
- I don't like
- Help me
- I am hungry
- I am thirsty
- Can I have
- Where is

**Hindi:**
- मुझे चाहिए (I want)
- मुझे ज़रूरत है (I need)
- मुझे पसंद है (I like)
- मदद करो (Help me)
- मुझे भूख लगी है (I am hungry)

### Using the Keyboard

1. Click on **⌨️ Type** category
2. Type using on-screen keyboard
3. Press **Enter** to add word to sentence
4. Supports both English (QWERTY) and Hindi (Devanagari)

### Adding Custom Symbols

1. Click **➕ Add** button
2. Fill in:
   - Category
   - English text
   - Hindi text
   - Symbol/Emoji or upload image
   - Check "Mark as Core Word" if applicable
3. Click **💾 Save**

### Voice Settings

1. Click **🎙️ Voice** button
2. Adjust:
   - **Speed**: 0.5x to 2.0x
   - **Pitch**: 0.5 to 2.0
   - **Volume**: 0 to 1.0
3. Test voice before saving

## 🏗️ Project Structure

```
aac-communication-app/
├── index.html          # Main HTML file
├── app.js             # JavaScript application logic
├── README.md          # This file
└── LICENSE            # MIT License
```

## 🎨 Core Words Philosophy

Core words are the foundation of AAC communication. They make up 80% of what we say but represent only 300-400 words. This app includes:

### Core Word Categories:
- **Pronouns**: I, you, he, she, we, they
- **Verbs**: want, need, like, go, stop, help, make, get
- **Descriptors**: more, less, big, small, good, bad
- **Questions**: what, who, where, when, why, how
- **Affirmations**: yes, no, please, thank you
- **Prepositions**: in, out, on, off, up, down
- **Time**: now, later, today, tomorrow

## 🌍 Bilingual Support

Complete interface in:
- **English** - Full QWERTY keyboard
- **हिंदी (Hindi)** - Complete Devanagari keyboard

All symbols have translations in both languages!

## 💡 Technical Details

### Technologies Used
- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks or dependencies
- Web Speech API for text-to-speech
- LocalStorage for data persistence
- Responsive CSS Grid and Flexbox

### Browser Compatibility
- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Mobile browsers (text-to-speech may vary)

### Performance
- Lightweight: ~150KB total
- Fast loading
- Offline capable (after first load)
- No external API calls

## 🎯 Use Cases

Perfect for:
- **Speech Therapy** - Professional AAC sessions
- **Special Education** - Classroom communication
- **Home Use** - Daily communication needs
- **Language Learning** - English-Hindi vocabulary
- **Non-verbal Communication** - Complete communication solution

## 🔧 Customization

### Adding More Languages
Edit `app.js` to add more language keyboards and translations.

### Modifying Categories
Add new categories in the `symbols` object in `app.js`.

### Styling
Modify CSS in `index.html` to change colors, fonts, and layout.

## 📱 Mobile Installation

### iOS (Safari)
1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"

### Android (Chrome)
1. Open app in Chrome
2. Tap Menu (⋮)
3. Select "Add to Home Screen"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Vocabulary Statistics

- **Core Words**: 70+
- **Pronouns**: 22
- **Adjectives**: 50+
- **Total Vocabulary**: 600+ words
- **Quick Phrases**: 14 (English & Hindi)
- **Categories**: 16

## 👩‍⚕️ About the Developer

**Developed by Shabana Tariq**  
Speech Language Therapist

This app was created to provide an accessible, free, and comprehensive AAC solution for individuals who need alternative communication methods.

## 📄 License

This project is licensed under a **Proprietary License** - see the [LICENSE](LICENSE) file for details.

**All Rights Reserved © 2024 Shabana Tariq**

This software is proprietary and may not be copied, modified, distributed, or shared without explicit permission from the author.

For licensing inquiries, please contact Shabana Tariq.

## 🙏 Acknowledgments

- Inspired by Avaz AAC
- ARASAAC symbols philosophy
- Core word research by AAC community
- Hindi translation support

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🔄 Version History

### Version 1.0.0 (Current)
- ✅ Core words implementation
- ✅ Quick phrases
- ✅ Typing keyboard (English & Hindi)
- ✅ Pronouns and adjectives
- ✅ 600+ word vocabulary
- ✅ Bilingual support
- ✅ Voice settings
- ✅ Custom symbol addition
- ✅ Search functionality
- ✅ Responsive design

## 🎓 Educational Resources

### AAC Resources
- [ASHA AAC Resources](https://www.asha.org/practice-portal/professional-issues/augmentative-and-alternative-communication/)
- [AAC Institute](https://aacinstitute.org/)
- [PrAACtical AAC](http://praacticalaac.org/)

### Core Vocabulary
- [Core Vocabulary Research](https://www.project-core.com/)
- [AAC Language Lab](https://aaclanguagelab.com/)

---

**Made with ❤️ for better communication**

⭐ Star this repo if you find it helpful!
