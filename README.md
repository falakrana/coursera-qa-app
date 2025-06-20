# Coursera QA Simplifier

![Extension Screenshot](/image.png) 

The Coursera QA Assistant is a browser extension that helps learners get answers to their questions about Coursera course content directly from the course page they're viewing. The extension uses AI to analyze the course content and provide relevant answers.

## Features
   - In-context answers: Get answers based on the specific Coursera course page you're viewing
   - Easy to use: Simply type your question and click "Get Answer"
   - Visual feedback: Loading spinner and clear response display
   - Error handling: Clear error messages when issues occur

## Installation
   
   - Python 3.7+
   - Playwright browsers
   - Gemini API key

## Installation

### Browser Extension:
   - Clone or download this repository
   - Open Chrome and navigate to chrome://extensions/
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the extension directory
   - The extension icon will appear in your toolbar

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coursera-qa-simplifier.git
   cd coursera-qa-simplifier
Create and activate a virtual environment:

```
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:
```
  pip install -r requirements.txt
  playwright install
```

Create a .env file and add your Groq API key:
```
  GOOGLE_API_KEY=your_api_key_here
```
## Usage
   - Navigate to any Coursera course page
   - Click the extension icon in your browser toolbar
   - Type your question about the course content in the text area
   - Click "Get Answer"
   - View the response in the popup

**Open the extension on your respective browser and question on your course.**

