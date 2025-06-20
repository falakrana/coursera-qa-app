from flask import Flask, render_template, request
from playwright.sync_api import sync_playwright
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Setup model
# model = ChatGroq(model="llama3-70b-8192")
model = ChatGoogleGenerativeAI(model = "gemini-1.5-flash")

prompt = PromptTemplate(
    template="Answer the following question:\n\n{question}\n\nFrom the following text:\n\n{text}",
    input_variables=["question", "text"],
)

parser = StrOutputParser()
chain = prompt | model | parser

def get_page_content_with_playwright(url):
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=15000)
            page.wait_for_timeout(5000)
            content = page.inner_text("body")
            browser.close()
            return content
    except Exception as e:
        print("❌ Error while scraping:", e)
        return None

@app.route("/", methods=["GET", "POST"])
def index():
    answer = ""
    course_url = ""
    question = ""
    
    if request.method == "POST":
        course_url = request.form.get("course_url", "")
        question = request.form.get("question", "")
        
        print("📥 User Input URL:", course_url)
        print("📥 Question:", question)
        
        if course_url and question:
            page_text = get_page_content_with_playwright(course_url)
            if page_text:
                try:
                    answer = chain.invoke({"question": question, "text": page_text})
                except Exception as e:
                    print("❌ Error in model chain:", e)
                    answer = "An error occurred while processing your question."
            else:
                answer = "Could not retrieve content from the page. Please check the URL."

    return render_template("index.html", response=answer, course_url=course_url, question=question)

if __name__ == "__main__":
    app.run(debug=True)

