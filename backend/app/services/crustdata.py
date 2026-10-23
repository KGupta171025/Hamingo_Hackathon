"""Crustdata API Client for Homingo Hackathon.

Provides B2B market intelligence, local supplier search, and company
enrichment using Crustdata API endpoints.
"""

import os
from typing import Any, Dict, List, Optional
import httpx
from pydantic import BaseModel


class CrustdataClient:
    """Client wrapper for Crustdata API."""

    BASE_URL = "https://api.crustdata.com"

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("CRUSTDATA_API_KEY", "")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    async def search_companies(
        self,
        query: str,
        country: str = "India",
        industry: Optional[str] = None,
        limit: int = 10,
    ) -> List[Dict[str, Any]]:
        """Search companies and local business entities."""
        if not self.api_key or self.api_key.startswith("your_"):
            # Mock fallback response when API key is pending
            return [
                {
                    "name": f"{query.capitalize()} Suppliers Ltd",
                    "location": f"Indore, Madhya Pradesh, {country}",
                    "industry": industry or "Retail & Distribution",
                    "description": f"Verified regional distributor and supplier for {query}.",
                    "verified": True,
                    "credits_used": 1,
                }
            ]

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(
                    f"{self.BASE_URL}/screener/company/search",
                    headers=self.headers,
                    json={
                        "query": query,
                        "filters": {
                            "country": [country],
                            **({"industry": [industry]} if industry else {}),
                        },
                        "limit": limit,
                    },
                )
                response.raise_for_status()
                data = response.json()
                return data.get("companies", [])
            except Exception as e:
                return [{"error": str(e), "mock_fallback": True}]

    async def enrich_company(self, domain_or_name: str) -> Dict[str, Any]:
        """Enrich company details, headcount, founders, and contact signals."""
        if not self.api_key or self.api_key.startswith("your_"):
            return {
                "company": domain_or_name,
                "status": "mock_data",
                "summary": "Local retail merchant partner network",
            }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.get(
                    f"{self.BASE_URL}/screener/company/enrich",
                    headers=self.headers,
                    params={"domain": domain_or_name},
                )
                response.raise_for_status()
                return response.json()
            except Exception as e:
                return {"error": str(e)}
