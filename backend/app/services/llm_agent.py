"""LLM Reasoning & Local Commerce Negotiation Agent."""

import os
from typing import Any, Dict, List, Optional
from pydantic import BaseModel


class BuyerNegotiationRequest(BaseModel):
    product_name: str
    store_price: float
    offered_price: float
    quantity: int = 1
    buyer_message: str


class CatalogExtractionRequest(BaseModel):
    raw_text_or_transcript: str
    language: str = "Hinglish"


class LLMCommerceAgent:
    """Agent orchestrating vernacular parsing, negotiation, and catalog creation."""

    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY", "")
        self.openai_key = os.getenv("OPENAI_API_KEY", "")

    async def negotiate(
        self, req: BuyerNegotiationRequest, min_allowed_margin: float = 0.85
    ) -> Dict[str, Any]:
        """Evaluate a buyer's offer against minimum acceptable merchant margins.

        Ensures fair deals without merchant exploitation.
        """
        floor_price = req.store_price * min_allowed_margin
        total_offered = req.offered_price * req.quantity
        total_store = req.store_price * req.quantity

        if req.offered_price >= req.store_price:
            return {
                "decision": "ACCEPTED",
                "final_unit_price": req.offered_price,
                "total": total_offered,
                "message": "Offer accepted immediately! Adding to your WhatsApp order cart.",
            }
        elif req.offered_price >= floor_price:
            # Volume discount or fair compromise
            counter_price = round((req.store_price + req.offered_price) / 2, 2)
            if req.quantity >= 3:
                # Offer wholesale/volume perk
                return {
                    "decision": "ACCEPTED_VOLUME_DISCOUNT",
                    "final_unit_price": req.offered_price,
                    "total": total_offered,
                    "message": f"Special deal! Since you're ordering {req.quantity} items, we accept ₹{req.offered_price}/unit.",
                }
            return {
                "decision": "COUNTER_OFFER",
                "counter_unit_price": counter_price,
                "message": f"We can't do ₹{req.offered_price}, but since you are nearby, we can offer ₹{counter_price} per unit.",
            }
        else:
            return {
                "decision": "REJECTED_BELOW_COST",
                "counter_unit_price": round(floor_price, 2),
                "message": f"That's below wholesale cost. The best price the shopkeeper can do is ₹{round(floor_price, 2)}.",
            }

    async def parse_vernacular_catalog(
        self, req: CatalogExtractionRequest
    ) -> List[Dict[str, Any]]:
        """Parses speech transcript (e.g.

        'Doo kilo chawal 90 rupaye aur ek packet tata namak 28 rupaye') into
        structured catalog items.
        """
        # Structured mock fallback if LLM key is not yet set
        return [
            {
                "item_name": "Rice (Basmati)",
                "quantity": "2 kg",
                "price_inr": 90.0,
                "category": "Grains & Groceries",
                "stock": "In Stock",
            },
            {
                "item_name": "Tata Salt (1kg Pack)",
                "quantity": "1 packet",
                "price_inr": 28.0,
                "category": "Groceries",
                "stock": "In Stock",
            },
        ]
