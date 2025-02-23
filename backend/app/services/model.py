import os
import glob
from dotenv import load_dotenv
import pandas as pd
import openai
import pinecone
import uuid
from pydantic import BaseModel
from app.schemas.users_schema import PlanList

load_dotenv()

# API keys
PINECONE_API_KEY = os.getenv("PINEKEY")
OPENAI_API_KEY = os.getenv("KEY")
openai.api_key = OPENAI_API_KEY

# Initialize Pinecone
pc = pinecone.Pinecone(api_key=PINECONE_API_KEY)
INDEX_NAME = "plandata"

# Ensure index exists
try:
    pc.describe_index(INDEX_NAME)
    print(f"✅ Pinecone index '{INDEX_NAME}' already exists.")
except:
    print(f"⚠️ Index '{INDEX_NAME}' not found. Creating it now...")
    pc.create_index(
        name=INDEX_NAME,
        dimension=1536,
        metric="cosine",
        spec=pinecone.ServerlessSpec(cloud="aws", region="us-east-1")
    )
    print(f"✅ Created Pinecone index '{INDEX_NAME}'.")

# Connect to Pinecone index
index = pc.Index(name=INDEX_NAME)


def clean_files() -> None:
    """Clean CSV files by removing irrelevant data."""
    csv_files = glob.glob("ragdata/*.csv")
    for file in csv_files:
        df = pd.read_csv(file, encoding="ISO-8859-1")
        df.replace([
            "Not enough data available",
            "Plan too new to be measured",
            "Plan not required to report measure",
            "Plan too small to be measured",
            "No data available"
        ], "", inplace=True)
        df.to_csv(file, index=False)


def get_embedding(text: str) -> list:
    """Generate an OpenAI embedding for a given text."""
    response = openai.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response.data[0].embedding


def write_embedding(text: str, plan_id: str, embedding: list) -> None:
    """Write a pre-generated text embedding to Pinecone."""
    vector = [(plan_id, embedding, {"text": text})]
    index.upsert(vectors=vector)
    print(f"✅ Stored embedding for Plan ID: {plan_id}")


def create_embeddings() -> None:
    """Generate embeddings for healthcare plans and store them in Pinecone."""
    csv_files = glob.glob("ragdata/*.csv")
    
    for file in csv_files:
        print(f"Processing: {file}")

        # Use correct headers for different CSV files
        header_row = 1 if "Star_rating_fall_domain.csv" in file or "Star_rating_spring_domain.csv" in file else 2
        df = pd.read_csv(file, header=header_row)

        df["combined_text"] = df.apply(lambda row: " | ".join(f"{col}: {str(row[col])}" for col in df.columns), axis=1)

        # Generate embeddings and store in Pinecone
        for i, row in df.iterrows():
            plan_text = row["combined_text"]
            embedding = get_embedding(plan_text)
            plan_id = str(uuid.uuid4())  # Generate unique ID

            # Store in Pinecone
            write_embedding(plan_text, plan_id, embedding)

def search_pinecone(query: str, top_k: int = 5) -> list:
    """
    Searches Pinecone for the most relevant healthcare plans.
    
    Args:
        query (str): The user's search query.
        top_k (int): Number of similar results to retrieve.
    
    Returns:
        list: A list of retrieved plan details.
    """
    # Generate embedding for the query
    query_embedding = get_embedding(query)

    # Search Pinecone for similar embeddings
    results = index.query(vector=query_embedding, top_k=top_k, include_metadata=True)

    # Extract and return relevant plan information
    retrieved_plans = []
    for match in results["matches"]:
        retrieved_plans.append(match["metadata"]["text"])  # Extract stored text

    return retrieved_plans

def ask_chatgpt(statement: str) -> str:
    """
    Uses RAG to enhance ChatGPT responses with Pinecone-retrieved data.

    Args:
        statement (str): The user's input query from questionnaire.

    Returns:
        str: The AI-generated response.
    """
    # Retrieve relevant plans from Pinecone
    retrieved_plans = search_pinecone(statement, top_k=15)
    
    # Construct a prompt with retrieved context
    context = "\n\n".join(retrieved_plans)
    prompt = f"Use the following retrieved healthcare plans to answer the user's question:\n\n{context}\n\nQuestion: {statement}"

    # Query ChatGPT with context
    response = openai.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """You are an expert in healthcare plan recommendations. 
            Use the retrieved healthcare plan details to help generate 3 recommended plans structured in JSON format
            based on user's details. In the description, include pros and cons of coverage, costs, etc. Make sure you validate estimated
            yearly costs online.
            """},
            {"role": "user", "content": prompt}
        ],
        response_format=PlanList,
    )

    return response.choices[0].message.content




# Run the script
if __name__ == "__main__":
    response = ask_chatgpt("Give me the best healthcare plans for an elderly patient")


