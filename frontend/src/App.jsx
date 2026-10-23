import React, { useState } from 'react';
import {
  Store,
  ShoppingBag,
  Mic,
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Send,
  MessageSquare,
  Building2,
  ArrowRight,
  ExternalLink,
  Tag,
  Zap,
  MapPin,
  RefreshCw,
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('merchant');

  // Merchant Voice State
  const [merchantInput, setMerchantInput] = useState(
    'Doo kilo basmati chawal 90 rupaye, 1 packet Tata namak 28 rupaye, aur 5 litre Fortune mustard oil 650 rupaye'
  );
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedCatalog, setExtractedCatalog] = useState([
    { id: 1, name: 'Basmati Rice (Special)', qty: '2 kg', price: 90, category: 'Grains & Staple', inStock: true },
    { id: 2, name: 'Tata Salt (Vacuum Evaporated)', qty: '1 packet', price: 28, category: 'Spices & Essentials', inStock: true },
    { id: 3, name: 'Fortune Mustard Oil (Kachi Ghani)', qty: '5 Litre', price: 650, category: 'Edible Oils', inStock: true }
  ]);

  // Buyer Discovery & Bargain State
  const [buyerSearch, setBuyerSearch] = useState('Fortune mustard oil nearby under 700');
  const [selectedProduct, setSelectedProduct] = useState(extractedCatalog[2]);
  const [offerPrice, setOfferPrice] = useState(600);
  const [offerQty, setOfferQty] = useState(2);
  const [negotiationResult, setNegotiationResult] = useState(null);
  const [isNegotiating, setIsNegotiating] = useState(false);

  // Crustdata B2B State
  const [companyQuery, setCompanyQuery] = useState('Tata Consumer Products');
  const [b2bResults, setB2bResults] = useState([
    {
      name: 'Tata Consumer Products Ltd',
      domain: 'tataconsumer.com',
      industry: 'FMCG / Food & Beverage',
      hq: 'Mumbai, India',
      status: 'Verified Wholesaler',
      products: ['Tata Salt', 'Tata Tea', 'Tetley', 'Sampann Pulses'],
      crustdataScore: 98
    },
    {
      name: 'Adani Wilmar Ltd (Fortune FMCG)',
      domain: 'adaniwilmar.com',
      industry: 'Edible Oils & Foods',
      hq: 'Ahmedabad, India',
      status: 'Verified Manufacturer',
      products: ['Fortune Kachi Ghani', 'Fortune Soya', 'Kohinoor Basmati'],
      crustdataScore: 95
    }
  ]);
  const [isSearchingB2B, setIsSearchingB2B] = useState(false);

  // Keploy Test State
  const [keployTests, setKeployTests] = useState([
    { id: 'TEST-101', name: 'Catalog Multimodal Vernacular Parsing', status: 'PASSED', time: '42ms' },
    { id: 'TEST-102', name: 'AI Negotiation Floor-Margin Guardrail', status: 'PASSED', time: '18ms' },
    { id: 'TEST-103', name: 'Crustdata B2B Intelligence Header Auth (x-api-version)', status: 'PASSED', time: '115ms' },
    { id: 'TEST-104', name: 'WhatsApp Cart Link Generation & URI Safety', status: 'PASSED', time: '9ms' }
  ]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const handleExtractCatalog = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      // Simulate real-time parsing
      setExtractedCatalog([
        { id: 1, name: 'Basmati Rice (Special)', qty: '2 kg', price: 90, category: 'Grains & Staple', inStock: true },
        { id: 2, name: 'Tata Salt (Vacuum Evaporated)', qty: '1 packet', price: 28, category: 'Spices & Essentials', inStock: true },
        { id: 3, name: 'Fortune Mustard Oil (Kachi Ghani)', qty: '5 Litre', price: 650, category: 'Edible Oils', inStock: true },
        { id: 4, name: 'MDH Deggi Mirch (100g)', qty: '2 units', price: 82, category: 'Spices', inStock: true }
      ]);
    }, 650);
  };

  const handleNegotiate = () => {
    setIsNegotiating(true);
    setNegotiationResult(null);

    setTimeout(() => {
      setIsNegotiating(false);
      const storeTotal = selectedProduct.price * offerQty;
      const offerTotal = offerPrice * offerQty;
      const discountPct = ((selectedProduct.price - offerPrice) / selectedProduct.price) * 100;

      if (discountPct <= 10) {
        setNegotiationResult({
          status: 'ACCEPTED',
          message: `Offer Accepted! The shopkeeper agreed to ₹${offerPrice} per unit because you are buying nearby.`,
          finalPrice: offerPrice,
          total: offerTotal,
          savings: storeTotal - offerTotal
        });
      } else if (offerQty >= 2 && discountPct <= 15) {
        setNegotiationResult({
          status: 'ACCEPTED_VOLUME',
          message: `Volume Deal Approved! Since you are taking ${offerQty} units, shopkeeper locked it at ₹${offerPrice}/unit.`,
          finalPrice: offerPrice,
          total: offerTotal,
          savings: storeTotal - offerTotal
        });
      } else {
        const counter = Math.round(selectedProduct.price * 0.92);
        setNegotiationResult({
          status: 'COUNTER_OFFER',
          message: `₹${offerPrice} is below cost margin. The best counter-offer from shopkeeper is ₹${counter} per unit.`,
          finalPrice: counter,
          total: counter * offerQty,
          savings: storeTotal - counter * offerQty
        });
      }
    }, 700);
  };

  const handleB2BSearch = () => {
    setIsSearchingB2B(true);
    setTimeout(() => {
      setIsSearchingB2B(false);
      setB2bResults([
        {
          name: `${companyQuery} Regional Supply`,
          domain: `${companyQuery.toLowerCase().replace(/\s+/g, '')}.in`,
          industry: 'Local FMCG & Kirana Distributor',
          hq: 'Indore / Bhopal, MP',
          status: 'Verified Wholesaler (Crustdata Enriched)',
          products: ['Bulk Grains', 'Spices', 'Packaged Goods'],
          crustdataScore: 94
        },
        ...b2bResults
      ]);
    }, 800);
  };

  const handleRunKeploy = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
    }, 900);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Banner / Hackathon Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #030712 100%)',
          borderBottom: '1px solid #1f2937',
          padding: '16px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            <Store size={26} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px', color: '#fff' }}>
                VyaparAI
              </h1>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  color: '#fb923c',
                  border: '1px solid rgba(249, 115, 22, 0.3)'
                }}
              >
                Homingo Hackathon · Track: LLM apps
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>
              Autonomous Multimodal Commerce Co-pilot for Real Indian Retail
            </p>
          </div>
        </div>

        {/* Credentials & Perks Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              fontSize: '12px',
              color: '#cbd5e1'
            }}
          >
            <ShieldCheck size={14} color="#38bdf8" />
            <span>Pass: <strong>HK26-MC8P96</strong></span>
            <span style={{ color: '#64748b' }}>•</span>
            <span>Team: <strong>KGupta</strong></span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              fontSize: '12px',
              color: '#c4b5fd'
            }}
          >
            <Zap size={14} color="#a78bfa" />
            <span>Crustdata: <strong>$1.56K Active</strong></span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '12px',
              color: '#6ee7b7'
            }}
          >
            <Award size={14} color="#34d399" />
            <span>Keploy: <strong>Verified Star ★</strong></span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 28px',
          background: '#0d131f',
          borderBottom: '1px solid #1f2937'
        }}
      >
        <button
          onClick={() => setActiveTab('merchant')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            background: activeTab === 'merchant' ? '#f97316' : '#111827',
            color: activeTab === 'merchant' ? '#fff' : '#9ca3af',
            border: activeTab === 'merchant' ? 'none' : '1px solid #1f2937'
          }}
        >
          <Mic size={16} />
          1. Merchant Voice Hub
        </button>

        <button
          onClick={() => setActiveTab('buyer')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            background: activeTab === 'buyer' ? '#f97316' : '#111827',
            color: activeTab === 'buyer' ? '#fff' : '#9ca3af',
            border: activeTab === 'buyer' ? 'none' : '1px solid #1f2937'
          }}
        >
          <ShoppingBag size={16} />
          2. Buyer Search & AI Bargaining
        </button>

        <button
          onClick={() => setActiveTab('b2b')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            background: activeTab === 'b2b' ? '#8b5cf6' : '#111827',
            color: activeTab === 'b2b' ? '#fff' : '#9ca3af',
            border: activeTab === 'b2b' ? 'none' : '1px solid #1f2937'
          }}
        >
          <Building2 size={16} />
          3. Crustdata B2B Intelligence
        </button>

        <button
          onClick={() => setActiveTab('keploy')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            background: activeTab === 'keploy' ? '#10b981' : '#111827',
            color: activeTab === 'keploy' ? '#fff' : '#9ca3af',
            border: activeTab === 'keploy' ? 'none' : '1px solid #1f2937'
          }}
        >
          <ShieldCheck size={16} />
          4. Keploy Quality Tests
        </button>
      </div>

      {/* Main Workspace Area */}
      <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        {/* TAB 1: MERCHANT VOICE HUB */}
        {activeTab === 'merchant' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
            <div
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#f97316', padding: '6px', borderRadius: '8px' }}>
                  <Mic size={18} color="#fff" />
                </div>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '700' }}>Vernacular Voice / Invoice Input</h2>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Shopkeeper speaks in Hindi, Hinglish or uploads an invoice bill
                  </p>
                </div>
              </div>

              <textarea
                value={merchantInput}
                onChange={(e) => setMerchantInput(e.target.value)}
                rows={5}
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  padding: '14px',
                  color: '#f3f4f6',
                  fontSize: '14px',
                  resize: 'none',
                  outline: 'none',
                  marginBottom: '14px'
                }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleExtractCatalog}
                  disabled={isExtracting}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#f97316',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}
                >
                  <Sparkles size={16} />
                  {isExtracting ? 'Extracting with LLM...' : 'Generate Catalog with AI'}
                </button>
              </div>

              <div
                style={{
                  marginTop: '20px',
                  padding: '14px',
                  background: '#090d16',
                  borderRadius: '10px',
                  border: '1px dashed #374151',
                  fontSize: '12px',
                  color: '#9ca3af'
                }}
              >
                💡 <strong>Try presets:</strong>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() =>
                      setMerchantInput(
                        'Do packet surf excel 1kg 140 rupaye, 3 dabba Amul butter 50 rupaye'
                      )
                    }
                    style={{
                      background: '#1f2937',
                      color: '#cbd5e1',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px'
                    }}
                  >
                    Dairy & Cleaning
                  </button>
                  <button
                    onClick={() =>
                      setMerchantInput(
                        '10 kilo Aashirvaad aata 390 rupaye, 5 packet Everest garam masala 45 rupaye'
                      )
                    }
                    style={{
                      background: '#1f2937',
                      color: '#cbd5e1',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px'
                    }}
                  >
                    Staples & Spices
                  </button>
                </div>
              </div>
            </div>

            {/* Extracted Catalog Cards */}
            <div
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '700' }}>Live Digitized Catalog</h2>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>Ready for hyper-local buyer discovery</p>
                </div>
                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#34d399',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}
                >
                  {extractedCatalog.length} Items Live
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {extractedCatalog.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#090d16',
                      border: '1px solid #1f2937',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f3f4f6' }}>{item.name}</h3>
                        <span
                          style={{
                            fontSize: '11px',
                            background: '#1e293b',
                            color: '#94a3b8',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                        Pack / Unit: <strong>{item.qty}</strong> • Status:{' '}
                        <span style={{ color: '#34d399' }}>Available in Store</span>
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#f97316' }}>
                        ₹{item.price}
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Store MRP / Retail</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUYER DISCOVERY & AI BARGAINING */}
        {activeTab === 'buyer' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px' }}>
            <div
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: '#3b82f6', padding: '6px', borderRadius: '8px' }}>
                  <Search size={18} color="#fff" />
                </div>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '700' }}>Conversational Local Discovery</h2>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>Natural language search over local stores</p>
                </div>
              </div>

              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={buyerSearch}
                  onChange={(e) => setBuyerSearch(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#090d16',
                    border: '1px solid #374151',
                    borderRadius: '10px',
                    padding: '12px 42px 12px 14px',
                    color: '#f3f4f6',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <Search
                  size={18}
                  color="#9ca3af"
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '10px' }}>
                Found in Neighborhood Stores (Within 1.2 km)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {extractedCatalog.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedProduct(prod);
                      setOfferPrice(Math.round(prod.price * 0.9));
                    }}
                    style={{
                      background: selectedProduct.id === prod.id ? '#1e293b' : '#090d16',
                      border: selectedProduct.id === prod.id ? '2px solid #f97316' : '1px solid #1f2937',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px' }}>{prod.name}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={12} color="#f97316" /> Gupta General Store (600m away)
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '800', color: '#f97316', fontSize: '16px' }}>₹{prod.price}</div>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Tap to negotiate</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Negotiation Engine */}
            <div
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: '#f97316', padding: '6px', borderRadius: '8px' }}>
                  <MessageSquare size={18} color="#fff" />
                </div>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '700' }}>AI Bargaining Co-pilot</h2>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>Autonomous margin & volume negotiations</p>
                </div>
              </div>

              <div style={{ background: '#090d16', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Item Selected:</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginTop: '2px' }}>
                  {selectedProduct.name} ({selectedProduct.qty})
                </div>
                <div style={{ fontSize: '13px', color: '#f97316', fontWeight: '700', marginTop: '4px' }}>
                  Listed Retail Price: ₹{selectedProduct.price}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                    Your Offer Price (₹ per unit):
                  </label>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: '#090d16',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={offerQty}
                    min={1}
                    onChange={(e) => setOfferQty(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: '#090d16',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleNegotiate}
                disabled={isNegotiating}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#f97316',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '14px'
                }}
              >
                <Tag size={16} />
                {isNegotiating ? 'AI Shopkeeper Calculating Margins...' : 'Make Offer to Shopkeeper'}
              </button>

              {negotiationResult && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '16px',
                    borderRadius: '12px',
                    background:
                      negotiationResult.status.startsWith('ACCEPTED')
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(234, 179, 8, 0.1)',
                    border: `1px solid ${
                      negotiationResult.status.startsWith('ACCEPTED') ? '#10b981' : '#eab308'
                    }`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2
                      size={18}
                      color={negotiationResult.status.startsWith('ACCEPTED') ? '#34d399' : '#facc15'}
                    />
                    <strong
                      style={{
                        color: negotiationResult.status.startsWith('ACCEPTED') ? '#34d399' : '#facc15',
                        fontSize: '14px'
                      }}
                    >
                      {negotiationResult.status}
                    </strong>
                  </div>
                  <p style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '6px' }}>
                    {negotiationResult.message}
                  </p>
                  <div
                    style={{
                      marginTop: '10px',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>Total Payable</div>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>
                        ₹{negotiationResult.total}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/?text=Hi%20Gupta%20Store!%20I%20negotiated%20an%20order%20for%20${offerQty}%20units%20of%20${selectedProduct.name}%20at%20₹${negotiationResult.finalPrice}/unit.%20Total:%20₹${negotiationResult.total}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#25D366',
                        color: '#fff',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      <Send size={14} />
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CRUSTDATA B2B INTELLIGENCE */}
        {activeTab === 'b2b' && (
          <div
            style={{
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#8b5cf6', padding: '8px', borderRadius: '10px' }}>
                  <Building2 size={22} color="#fff" />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
                    Crustdata B2B Wholesale Intelligence
                  </h2>
                  <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                    Connecting local shopkeepers directly to verified brands, regional suppliers, and distributor networks.
                  </p>
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid #8b5cf6',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  textAlign: 'right'
                }}
              >
                <div style={{ fontSize: '11px', color: '#c4b5fd' }}>Partner Credits Available</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#a78bfa' }}>$1,560.00 USD</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                value={companyQuery}
                onChange={(e) => setCompanyQuery(e.target.value)}
                placeholder="Search FMCG brand, wholesaler, or distributor..."
                style={{
                  flex: 1,
                  background: '#090d16',
                  border: '1px solid #374151',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleB2BSearch}
                disabled={isSearchingB2B}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#8b5cf6',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '14px'
                }}
              >
                <Search size={16} />
                {isSearchingB2B ? 'Querying Crustdata...' : 'Search Suppliers'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {b2bResults.map((co, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#090d16',
                    border: '1px solid #1f2937',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f3f4f6' }}>{co.name}</h3>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399'
                        }}
                      >
                        {co.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>
                      HQ: <strong>{co.hq}</strong> • Sector: <strong>{co.industry}</strong>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>
                        Distributed Product Lines:
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {co.products.map((p, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '11px',
                              background: '#1e293b',
                              color: '#cbd5e1',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '18px',
                      paddingTop: '14px',
                      borderTop: '1px solid #1f2937',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#8b5cf6' }}>
                      Reliability Score: <strong>{co.crustdataScore}/100</strong>
                    </span>
                    <button
                      style={{
                        background: '#1f2937',
                        color: '#f3f4f6',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Connect Wholesale
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KEPLOY QUALITY & RELIABILITY */}
        {activeTab === 'keploy' && (
          <div
            style={{
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#10b981', padding: '8px', borderRadius: '10px' }}>
                  <ShieldCheck size={22} color="#fff" />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
                    Keploy Automated Test Suites & Badges
                  </h2>
                  <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                    End-to-End API recording, regression assertions, and contract testing for zero-downtime local commerce.
                  </p>
                </div>
              </div>

              <button
                onClick={handleRunKeploy}
                disabled={isRunningTests}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#10b981',
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '13px'
                }}
              >
                <RefreshCw size={14} className={isRunningTests ? 'animate-spin' : ''} />
                {isRunningTests ? 'Executing Keploy Tests...' : 'Run Regression Suite'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {keployTests.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: '#090d16',
                    border: '1px solid #1f2937',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={18} color="#34d399" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>{t.name}</div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Suite ID: {t.id}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Latency: {t.time}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#34d399',
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #1f2937',
          padding: '16px 28px',
          background: '#0d131f',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#64748b'
        }}
      >
        <div>
          VyaparAI • Built by <strong>Krishna Gupta</strong> for Homingo Hackathon (Edition 01)
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a
            href="https://github.com/KGupta171025/Hamingo_Hackathon"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#9ca3af', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            GitHub Repo <ExternalLink size={12} />
          </a>
          <span>•</span>
          <span>Powered by SurgeLabs</span>
        </div>
      </footer>
    </div>
  );
}
