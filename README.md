# 🛍️ VyaparAI — AI for Real Local Commerce

[![Track: LLM Apps](https://img.shields.io/badge/Track-LLM%20Apps-blue.svg)](https://hackathon.homingo.co.in/tracks)
[![Homingo Hackathon](https://img.shields.io/badge/Homingo%20Hackathon-Edition%2001-orange.svg)](https://hackathon.homingo.co.in/)
[![Tested with Keploy](https://img.shields.io/badge/Tested%20with-Keploy-9cf.svg)](https://github.com/keploy/keploy)
[![Enriched with Crustdata](https://img.shields.io/badge/Enriched%20with-Crustdata-purple.svg)](https://crustdata.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Built for **Homingo Hackathon · Edition 01** (*AI for real local commerce*).
> Team: **KGupta** (Captain: Krishna Gupta) | Pass ID: `HK26-MC8P96`

---

## 💡 The Problem
In India, millions of local shopkeepers, kirana owners, neighborhood artisans, and local service providers operate offline or struggle with complex digital inventory tools. At the same time, local buyers want immediate nearby availability, fair price negotiation, and natural vernacular communication (voice, Hindi, Hinglish, regional languages) rather than rigid e-commerce filters.

## 🚀 The Solution: VyaparAI
**VyaparAI** is a full-stack, multilingual LLM-powered commerce co-pilot that bridges local physical stores with digital consumers:

1. **Multimodal Merchant Voice-to-Catalog**:
   - Merchants can speak in Hindi, Hinglish, or English, or snap a photo of their physical shelves/bills.
   - LLMs automatically extract items, categories, local pricing, and stock status into structured catalog data.
2. **Conversational Hyper-Local Discovery & Negotiation**:
   - Buyers can search naturally (e.g. *"Find me a good organic cold-pressed mustard oil under ₹200 within 2km"*).
   - Real-time matching against neighborhood inventory with AI-assisted bargaining guardrails that protect merchant margins.
3. **B2B Market & Supplier Intelligence (Powered by Crustdata)**:
   - Integrates **Crustdata** B2B APIs to provide local shopkeepers with competitor intelligence, local brand trends, and wholesale supplier connections.
4. **Reliability & Automated Testing (Powered by Keploy)**:
   - Automated end-to-end API test suites and regression testing generated with **Keploy**.

---

## 🏛️ Architecture Overview

```
├── backend/                  # FastAPI / Python LLM application backend
│   ├── app/
│   │   ├── api/              # REST & WebSocket endpoints
│   │   ├── core/             # Config, security, and prompt templates
│   │   ├── services/
│   │   │   ├── llm_agent.py  # LangChain / Gemini LLM reasoning agents
│   │   │   ├── crustdata.py  # Crustdata B2B intelligence integration
│   │   │   └── catalog.py    # Multimodal voice & vision catalog parser
│   │   └── models/           # Data schemas & database models
│   └── tests/                # Keploy test suites & unit tests
├── frontend/                 # Modern Next.js / Tailwind UI for Merchants & Buyers
├── docs/                     # Architecture designs, demo scripts & presentation
├── .env.example              # Environment variables template
└── README.md
```

---

## 🛠️ Quick Start

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- API Keys: Google Gemini / OpenAI, Crustdata API Key

### 2. Setup Backend
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp ../.env.example .env
# Edit .env with your API keys
uvicorn app.main:app --reload --port 8000
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the application.

---

## 🏆 Hackathon Submission Checklist
- [x] Registered & Event Pass confirmed (`HK26-MC8P96`)
- [x] Team Code: `HK-3BBAST` (Track: LLM apps)
- [x] Crustdata $1,500 Credits Activated
- [x] GitHub Repository linked: [KGupta171025/Hamingo_Hackathon](https://github.com/KGupta171025/Hamingo_Hackathon)
- [ ] Star Keploy repo & complete dashboard verification
- [ ] Integrate Crustdata API key in backend
- [ ] Record 3-minute demo video (Submissions open 4 Dec - 6 Dec 2026)
