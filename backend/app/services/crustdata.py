"""Crustdata API Client for Homingo Hackathon.

Provides B2B market intelligence, local supplier search, and company
enrichment using Crustdata API endpoints.
"""

import os
from typing import Any, Dict, List, Optional
import httpx


class CrustdataClient:
    """Client wrapper for Crustdata API."""

    BASE_URL = "https://api.crustdata.com"

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("CRUSTDATA_API_KEY", "")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-api-version": "2025-11-01",
        }

    async def search_company_by_name(
        self,
        company_name: str,
        limit: int = 5,
    ) -> List[Dict[str, Any]]:
        """Search company by name using Crustdata company/search endpoint."""
        if not self.api_key or self.api_key.startswith("your_"):
            return [
                {
                    "name": company_name,
                    "location": "India",
                    "mock": True,
                }
            ]

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                payload = {
                    "filters": {
                        "field": "basic_info.name",
                        "type": "=",
                        "value": company_name,
                    },
                    "limit": limit,
                }
                response = await client.post(
                    f"{self.BASE_URL}/company/search",
                    headers=self.headers,
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()
                return data.get("companies", [data])
            except Exception as e:
                return [{"error": str(e), "fallback": True}]
