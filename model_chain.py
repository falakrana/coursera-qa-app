from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

model = ChatGroq(model="llama3-70b-8192")

prompt = PromptTemplate(
    template="Answer the following question:\n\n{question}\n\nFrom the following text:\n\n{text}",
    input_variables=["question", "text"],
)

parser = StrOutputParser()
chain = prompt | model | parser

def get_response(question, text):
    return chain.invoke({"question": question, "text": text})
