from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Allow all origins (for simplicity, or restrict to your site later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true"
HEADERS = {
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "x-rapidapi-key": "08c7fd543amshe880e12433ba263p1418bfjsnf37768c6d4c0", 
    "content-type": "application/json"
}

@app.post("/run")
async def run_code(request: Request):
    data = await request.json()
    source_code = data.get("code", "")

    payload = {
        "language_id": 62,  # Java
        "source_code": source_code
    }

    res = requests.post(JUDGE0_URL, json=payload, headers=HEADERS)
    output = res.json().get("stdout") or res.json().get("compile_output") or res.json().get("stderr")

    return {"output": output}
