"""Main FastAPI Application Entrypoint for VyaparAI."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.crustdata import CrustdataClient
from app.services.llm_agent import (
    LLMCommerceAgent,
    BuyerNegotiationRequest,
    CatalogExtractionRequest,
)

app = FastAPI(
    title="VyaparAI API - AI for Real Local Commerce",
    description="LLM Applications backend for Homingo Hackathon (Edition 01)",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

crustdata_client = CrustdataClient()
llm_agent = LLMCommerceAgent()


@app.get("/")
async def root():
    return {
        "project": "VyaparAI",
        "hackathon": "Homingo Hackathon · Edition 01",
        "track": "LLM Apps",
        "status": "online",
        "partner_integrations": ["Crustdata", "Keploy"],
    }


@app.post("/api/merchant/catalog/extract")
async def extract_catalog(req: CatalogExtractionRequest):
    """Convert vernacular voice transcript or raw text into structured product catalog."""
    items = await llm_agent.parse_vernacular_catalog(req)
    return {"status": "success", "extracted_items": items}


@app.post("/api/buyer/negotiate")
async def negotiate_price(req: BuyerNegotiationRequest):
    """AI negotiation engine balancing buyer satisfaction with merchant profit margins."""
    result = await llm_agent.negotiate(req)
    return result


@app.get("/api/suppliers/search")
async def search_suppliers(query: str, country: str = "India"):
    """Search wholesale suppliers and local distributors using Crustdata B2B intelligence."""
    results = await crustdata_client.search_companies(query=query, country=country)
    return {"query": query, "count": len(results), "suppliers": results}
