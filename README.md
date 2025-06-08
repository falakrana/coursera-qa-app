# Coursera QA Simplifier

A Flask application that extracts and summarizes key information from Coursera course pages using Playwright for web scraping and Groq/Llama3 for analysis.

## Features

- Extracts course details from Coursera URLs
- Provides structured summaries of course content
- Answers specific questions about courses
- Clean, responsive web interface

## Prerequisites

- Python 3.8+
- Playwright browsers
- Groq API key

## Installation

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
  GROQ_API_KEY=your_api_key_here
```
## Usage
Run the Flask application:

```
  python app.py
```
Open your browser and navigate to:
http://localhost:5000

**Enter a Coursera course URL and your question, then click "Ask"**

Project Structure
```
  coursera-qa-simplifier/
  ├── app.py                # Main Flask application
  ├── scraper.py            # Web scraping functions
  ├── model_chain.py        # LLM chain setup
  ├── requirements.txt      # Python dependencies
  ├── .env                  # Environment variables
  ├── static/
  │   └── style.css         # CSS styles
  └── templates/
      └── index.html        # HTML template
```
## Customization
To modify the output format:
- Edit the prompt template in model_chain.py
- Change the CSS styles in static/style.css
- Adjust the timeout values in scraper.py if needed
