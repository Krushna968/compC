from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import re

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions"
JUDGE0_HEADERS = {
    "X-RapidAPI-Key": "YOUR_API_KEY",  # Replace with your actual RapidAPI key
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
}

def extract_main_class(code: str) -> str:
    """Extract the public class name from Java code"""
    match = re.search(r'public\s+class\s+(\w+)', code)
    return match.group(1) if match else "Main"

@app.post("/run")
async def run_code(request: Request):
    try:
        data = await request.json()
        code = data.get("code", "")
        className = data.get("className", "")
        
        # If className not provided, extract from code
        if not className:
            className = extract_main_class(code)
            if not className:
                raise HTTPException(status_code=400, detail="No public class found in code")

        payload = {
            "language_id": 62,  # Java
            "source_code": code,
            "stdin": "",
            "command": f"java {className}"  # Specify which class to run
        }

        response = requests.post(
            f"{JUDGE0_URL}?base64_encoded=false&wait=true",
            json=payload,
            headers=JUDGE0_HEADERS,
            timeout=10  # Add timeout to prevent hanging
        )
        response.raise_for_status()  # Raise exception for HTTP errors

        result = response.json()

        # Handle different response fields
        output = result.get("stdout") or result.get("compile_output") or result.get("stderr")
        if not output:
            output = "No output generated"

        return {
            "output": output,
            "className": className,
            "status": result.get("status", {}).get("description", "Completed")
        }

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Judge0 API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")