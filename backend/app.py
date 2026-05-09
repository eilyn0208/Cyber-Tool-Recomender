import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

load_dotenv()

api_key = os.getenv("API_KEY")

client = genai.Client(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    prompt: str

@app.post("/analyze")
def analyze(user_input: UserInput):

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"""
            You are a cybersecurity educational assistant.

            NEVER:
            - solve flags
            - provide exploits
            - give passwords

            ONLY:
            - recommend cybersecurity tools
            - explain concepts
            - suggest methodologies

            User request:
            {user_input.prompt}
            """
        )

        return {
            "response": response.text
        }

    except Exception as e:

        return {
            "response": str(e)
        }