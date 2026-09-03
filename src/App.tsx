/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Globe2,
  Clock,
  Anchor,
  Mail,
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
  FileSpreadsheet,
  MapPin,
  ShieldAlert,
  Ship,
  Landmark,
  PlusCircle,
  Calculator,
  ClipboardCheck,
  FileBadge,
  FileText,
  Send,
  CheckCircle,
  Phone,
  Building2,
  ExternalLink,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'div1' | 'div2' | 'div3' | 'div4'>('all');
  
  // Quick Inquiry Form State
  const [quickCompany, setQuickCompany] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickCategory, setQuickCategory] = useState('Industrial Equipment & Belting');

  // Trade Calculator State
  const [calcDivision, setCalcDivision] = useState('Industrial Equipment & Belting');
  const [calcTonnage, setCalcTonnage] = useState(25);
  const [calcPort, setCalcPort] = useState('Port of Miami, USA (7-10 Days)');
  const [calcIncoterm, setCalcIncoterm] = useState('FOB Point Lisas');

  // Formal RFQ State
  const [rfqCompany, setRfqCompany] = useState('');
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqCategory, setRfqCategory] = useState('Industrial Equipment & Belting');
  const [rfqQuantity, setRfqQuantity] = useState('');
  const [rfqIncoterm, setRfqIncoterm] = useState('FOB Point Lisas');
  const [rfqPort, setRfqPort] = useState('');
  const [rfqNotes, setRfqNotes] = useState('');
  const [rfqConsent, setRfqConsent] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedRfqId, setGeneratedRfqId] = useState('JEL-RFQ-2026-9942');

  // Handle Quick RFQ submission
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqCompany(quickCompany);
    setRfqEmail(quickEmail);
    setRfqCategory(quickCategory);
    const rfqElement = document.getElementById('rfq');
    if (rfqElement) rfqElement.scrollIntoView({ behavior: 'smooth' });
  };

  // Select product from catalog to prefill RFQ
  const handleSelectProduct = (cat: string) => {
    setRfqCategory(cat);
    const rfqElement = document.getElementById('rfq');
    if (rfqElement) rfqElement.scrollIntoView({ behavior: 'smooth' });
  };

  // Transfer Calculator to RFQ
  const handleTransferCalculator = () => {
    setRfqCategory(calcDivision);
    setRfqQuantity(`${calcTonnage} Metric Tons / Units`);
    setRfqPort(calcPort.split(' (')[0]);
    setRfqIncoterm(calcIncoterm);
    const rfqElement = document.getElementById('rfq');
    if (rfqElement) rfqElement.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit Formal RFQ
  const handleFormalRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `JEL-RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRfqId(newId);
    setModalOpen(true);
  };

  // Calculate container text & transit
  const getContainerEstimate = () => {
    const t = Number(calcTonnage) || 25;
    if (t <= 5) return '1 x LCL Palletized Lot';
    if (t <= 24) return '1 x 20ft Standard FCL Container';
    if (t <= 50) return '2 x 40ft High Cube FCL Containers';
    return `${Math.ceil(t / 25)} x 40ft FCL Bulk Containers`;
  };

  const getTransitEstimate = () => {
    if (calcPort.includes('Rotterdam')) return '18-22 Business Days';
    if (calcPort.includes('Yokohama')) return '35-42 Business Days';
    if (calcPort.includes('Kingston') || calcPort.includes('Barbados') || calcPort.includes('Guyana')) return '3-6 Business Days';
    return '7-10 Business Days';
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#F1C40F] selection:text-[#0B192C]">
      
      {/* Top Utility Bar */}
      <div className="bg-[#060E18] text-slate-300 text-xs py-2 px-4 border-b border-[#152C48]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F1C40F]" />
              <span>Mon-Fri: 08:00 - 17:00 AST</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-[#F1C40F]" />
              <span>Point Lisas Port Status: <strong className="text-emerald-400 font-medium">Operational (Berthing Normal)</strong></span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:trade@jeljapanenterpriseltd.shop" className="hover:text-[#F1C40F] transition flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#F1C40F]" />
              <span>trade@jeljapanenterpriseltd.shop</span>
            </a>
            <span className="hidden lg:inline-block text-[#F1C40F] bg-[#F1C40F]/10 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-[#F1C40F]/20">
              Active Trade Desk: CARICOM & Transatlantic Corridor
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-[#1E3E62]/60 shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Typography */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#F1C40F] to-[#D4AC0D] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                <Globe2 className="w-6 h-6 text-[#060E18] stroke-[2.5]" />
              </div>
              <div>
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white block">
                  JEL JAPAN ENTERPRISE <span className="text-[#F1C40F]">LTD.</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold block">
                  Global Merchant Exporter & Industrial Sourcing
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#about" className="text-slate-300 hover:text-[#F1C40F] text-sm font-medium transition">About & Infrastructure</a>
              <a href="#catalog" className="text-slate-300 hover:text-[#F1C40F] text-sm font-medium transition">Commodities & Catalog</a>
              <a href="#calculator" className="text-slate-300 hover:text-[#F1C40F] text-sm font-medium transition">Trade Calculator</a>
              <a href="#compliance" className="text-slate-300 hover:text-[#F1C40F] text-sm font-medium transition">Compliance & STOW</a>
              <a href="#rfq" className="text-slate-300 hover:text-[#F1C40F] text-sm font-medium transition">Request Quote</a>
            </nav>

            {/* Header CTA Button */}
            <div className="hidden sm:flex items-center space-x-4">
              <a href="#rfq" className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] px-5 py-2.5 rounded-md font-bold text-sm shadow-md hover:shadow-[#F1C40F]/20 transition flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Submit RFQ</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                id="mobile-menu-toggle"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-200 hover:text-[#F1C40F] focus:outline-none p-2"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060E18] border-t border-[#152C48] px-6 py-6 space-y-4">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">About & Infrastructure</a>
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Commodities & Catalog</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Trade Calculator</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Compliance & STOW</a>
            <a href="#rfq" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Request Quote</a>
            <div className="pt-4 border-t border-[#152C48]">
              <a href="#rfq" onClick={() => setMobileMenuOpen(false)} className="w-full text-center block bg-[#F1C40F] text-[#060E18] py-3 rounded-md font-bold text-sm shadow-md">
                Submit Formal RFQ
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#060E18] via-[#0B192C] to-[#152C48] text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F1C40F_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#F1C40F]/15 border border-[#F1C40F]/30 px-3.5 py-1.5 rounded-full text-[#F1C40F] text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified CARICOM & Transatlantic Merchant Exporter</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Connecting Global Supply Chains Through the <span className="text-[#F1C40F] underline decoration-[#F1C40F]/40 decoration-wavy underline-offset-8">Caribbean Trade Gateway</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                Anchored at Port of Point Lisas, Trinidad & Tobago. Delivering verified merchant export, bulk commodity brokering, industrial machinery procurement, and multi-modal freight fulfillment with absolute compliance.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a href="#catalog" className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-[#F1C40F]/25 transition text-center flex items-center justify-center gap-3">
                  <span>Explore Product Manifest</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#rfq" className="bg-[#152C48] hover:bg-[#1E3E62] text-white font-semibold px-8 py-4 rounded-lg border border-[#1E3E62] shadow-md transition text-center flex items-center justify-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#F1C40F]" />
                  <span>Submit Formal RFQ</span>
                </a>
              </div>

              {/* Trust Badges Under Hero */}
              <div className="pt-6 border-t border-[#152C48]/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0B192C]/60 p-3 rounded-lg border border-[#152C48]">
                  <span className="block font-bold text-[#F1C40F] text-xl">Point Lisas</span>
                  <span className="text-xs text-slate-400">Primary Port Staging Hub</span>
                </div>
                <div className="bg-[#0B192C]/60 p-3 rounded-lg border border-[#152C48]">
                  <span className="block font-bold text-[#F1C40F] text-xl">CARICOM</span>
                  <span className="text-xs text-slate-400">& Transatlantic Coverage</span>
                </div>
                <div className="bg-[#0B192C]/60 p-3 rounded-lg border border-[#152C48]">
                  <span className="block font-bold text-[#F1C40F] text-xl">STOW</span>
                  <span className="text-xs text-slate-400">Certified Safety Standard</span>
                </div>
                <div className="bg-[#0B192C]/60 p-3 rounded-lg border border-[#152C48]">
                  <span className="block font-bold text-[#F1C40F] text-xl">100% In-Bond</span>
                  <span className="text-xs text-slate-400">Compliant Logistics</span>
                </div>
              </div>

            </div>

            {/* Hero Right Card / Quick Inquiry Widget */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B192C]/90 backdrop-blur-xl p-8 rounded-2xl border border-[#1E3E62] shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-[#F1C40F] text-[#060E18] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Active Desk
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Priority Trade Desk</h3>
                <p className="text-sm text-slate-300 mb-6">Immediate inquiry routing for industrial equipment, fertilizers, and lubricants.</p>
                
                <form id="quick-inquiry-form" onSubmit={handleQuickSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="quick-company" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Company / Entity Name</label>
                    <input
                      type="text"
                      required
                      id="quick-company"
                      value={quickCompany}
                      onChange={(e) => setQuickCompany(e.target.value)}
                      placeholder="e.g. Antilles Logistics Corp"
                      className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F1C40F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="quick-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Corporate Email</label>
                    <input
                      type="email"
                      required
                      id="quick-email"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="buyer@company.com"
                      className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F1C40F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="quick-category" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Target Product Category</label>
                    <select
                      id="quick-category"
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                      className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                    >
                      <option value="Industrial Equipment & Belting">Industrial Equipment & Food Grade Machinery</option>
                      <option value="Agricultural Fertilizers & Nutrients">Agricultural Fertilizers & Soil Nutrients</option>
                      <option value="Industrial Lubricants & Greases">Industrial Lubricants, Greases & Chemicals</option>
                      <option value="Automotive Glass & Technical Parts">Automotive Glass, Parts & Technical Supplies</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    id="quick-inquiry-submit"
                    className="w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-3.5 rounded-lg shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Initiate Priority Inquiry</span>
                  </button>
                </form>
                <div className="mt-4 pt-4 border-t border-[#152C48] text-center">
                  <span className="text-xs text-slate-400">Response SLA: &lt; 2 Business Hours. Secure SSL Encrypted.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About & Trade Infrastructure Section */}
      <section id="about" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AC0D] bg-[#F1C40F]/10 px-3 py-1 rounded-full border border-[#F1C40F]/20">Operational Footprint & Strategy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-4">
              Engineered for Precision Merchant Export & Logistics
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Operating from our strategic headquarters at <strong>92 Katwaroo Trace, Penal, Trinidad & Tobago</strong>, Jel Japan Enterprise Ltd. bridges Asian and European manufacturing excellence directly with CARICOM and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-[#F1C40F] transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F1C40F] group-hover:text-[#060E18] transition">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-2">Penal HQ & Point Lisas Hub</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Centrally managed administrative offices with rapid logistical connectivity to the Port of Point Lisas heavy industrial estate and container terminal.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-[#F1C40F] transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F1C40F] group-hover:text-[#060E18] transition">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-2">Pre-Shipment Inspection</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Rigorous quality verification adhering to SGS and Bureau Veritas standards, ensuring zero-defect compliance for heavy machinery and industrial chemicals.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-[#F1C40F] transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F1C40F] group-hover:text-[#060E18] transition">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-2">Multi-Modal Freight</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Seamless FCL (20ft/40ft), LCL, and bulk vessel chartering coordination with comprehensive Bill of Lading traceability and customs brokerage.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-[#F1C40F] transition group shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#F1C40F] group-hover:text-[#060E18] transition">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-2">Trade Finance Support</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Flexible secure settlement structures including Irrevocable Letters of Credit (LC), Telegraphic Transfer (TT), and documentary collections.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Core Commodity & Product Divisions Section */}
      <section id="catalog" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AC0D] bg-[#F1C40F]/15 px-3 py-1 rounded-full border border-[#F1C40F]/30">Verified Manifest</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-3">
                Core Commodity & Product Divisions
              </h2>
              <p className="text-slate-600 mt-2 max-w-xl">
                Inspect our primary export divisions complete with international HS codes, origin benchmarks, and flexible packaging options.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                id="cat-filter-all"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${activeCategory === 'all' ? 'bg-[#0B192C] text-white' : 'bg-white text-slate-700 hover:bg-[#060E18] hover:text-white border border-slate-300'}`}
              >
                All Divisions
              </button>
              <button
                type="button"
                id="cat-filter-div1"
                onClick={() => setActiveCategory('div1')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${activeCategory === 'div1' ? 'bg-[#0B192C] text-white' : 'bg-white text-slate-700 hover:bg-[#060E18] hover:text-white border border-slate-300'}`}
              >
                Industrial & Machinery
              </button>
              <button
                type="button"
                id="cat-filter-div2"
                onClick={() => setActiveCategory('div2')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${activeCategory === 'div2' ? 'bg-[#0B192C] text-white' : 'bg-white text-slate-700 hover:bg-[#060E18] hover:text-white border border-slate-300'}`}
              >
                Fertilizers & Nutrients
              </button>
              <button
                type="button"
                id="cat-filter-div3"
                onClick={() => setActiveCategory('div3')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${activeCategory === 'div3' ? 'bg-[#0B192C] text-white' : 'bg-white text-slate-700 hover:bg-[#060E18] hover:text-white border border-slate-300'}`}
              >
                Lubricants & Chemicals
              </button>
              <button
                type="button"
                id="cat-filter-div4"
                onClick={() => setActiveCategory('div4')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${activeCategory === 'div4' ? 'bg-[#0B192C] text-white' : 'bg-white text-slate-700 hover:bg-[#060E18] hover:text-white border border-slate-300'}`}
              >
                Automotive & Technical
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {(activeCategory === 'all' || activeCategory === 'div1') && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#0B192C] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded">HS Code: 8438 / 3926</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">In-Stock / FCL Ready</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B192C] mb-2">Industrial Equipment, Food Grade Machinery & Belting</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    High-precision stainless steel food processing machinery, automated bottling lines, heavy-duty conveyor belting, and abrasion-resistant industrial rollers.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Origin Benchmark</span>
                      <strong className="text-slate-800">Japan, Germany & South Korea</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Packaging Options</span>
                      <strong className="text-slate-800">20ft / 40ft FCL & Wooden Crates</strong>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Min Order: 1 Metric Ton / 1 Unit</span>
                  <button
                    type="button"
                    id="inquire-lot-div1"
                    onClick={() => handleSelectProduct('Industrial Equipment & Belting')}
                    className="bg-[#0B192C] hover:bg-[#F1C40F] hover:text-[#060E18] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Inquire on this Lot</span>
                  </button>
                </div>
              </div>
            )}

            {(activeCategory === 'all' || activeCategory === 'div2') && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#0B192C] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded">HS Code: 3105</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Bulk Cargo Available</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B192C] mb-2">Agricultural Fertilizers & Soil Nutrients</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Bulk granulated NPK compound fertilizers, urea 46% nitrogen, potassium chloride, and specialized agricultural micro-nutrient soil conditioners.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Origin Benchmark</span>
                      <strong className="text-slate-800">Middle East, USA & Japan</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Packaging Options</span>
                      <strong className="text-slate-800">50kg Bags / Jumbo Super Sacks (1MT)</strong>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Min Order: 25 Metric Tons (FCL)</span>
                  <button
                    type="button"
                    id="inquire-lot-div2"
                    onClick={() => handleSelectProduct('Agricultural Fertilizers & Nutrients')}
                    className="bg-[#0B192C] hover:bg-[#F1C40F] hover:text-[#060E18] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Inquire on this Lot</span>
                  </button>
                </div>
              </div>
            )}

            {(activeCategory === 'all' || activeCategory === 'div3') && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#0B192C] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded">HS Code: 3403</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Certified ISO 9001</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B192C] mb-2">Industrial Lubricants, Greases & Chemicals</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Synthetic heavy-duty gear oils, lithium-complex high temperature greases, marine diesel engine lubricants, and industrial cleaning solvents.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Origin Benchmark</span>
                      <strong className="text-slate-800">Japan & Singapore Blended</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Packaging Options</span>
                      <strong className="text-slate-800">200L Steel Drums / 1000L IBC Totes</strong>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Min Order: 5 Drums / Pallet LCL</span>
                  <button
                    type="button"
                    id="inquire-lot-div3"
                    onClick={() => handleSelectProduct('Industrial Lubricants & Greases')}
                    className="bg-[#0B192C] hover:bg-[#F1C40F] hover:text-[#060E18] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Inquire on this Lot</span>
                  </button>
                </div>
              </div>
            )}

            {(activeCategory === 'all' || activeCategory === 'div4') && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#0B192C] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded">HS Code: 7007 / 8708</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">OEM Grade Quality</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B192C] mb-2">Automotive Glass, Parts & Specialized Technical Supplies</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Laminated automotive windshields, tempered side glass, heavy commercial truck suspension spares, and precision hydraulic seals.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Origin Benchmark</span>
                      <strong className="text-slate-800">Japan, Thailand & Taiwan</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold">Packaging Options</span>
                      <strong className="text-slate-800">Custom Wooden Crates & Pallets</strong>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Min Order: Mixed Assortment LCL</span>
                  <button
                    type="button"
                    id="inquire-lot-div4"
                    onClick={() => handleSelectProduct('Automotive Glass & Technical Parts')}
                    className="bg-[#0B192C] hover:bg-[#F1C40F] hover:text-[#060E18] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Inquire on this Lot</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Interactive FOB / CIF Quick Trade Calculator */}
      <section id="calculator" className="py-24 bg-[#060E18] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F1C40F_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1C40F] bg-[#F1C40F]/15 px-3 py-1 rounded-full border border-[#F1C40F]/30">Client-Side Logistics Tool</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
              Interactive FOB / CIF Quick Trade Calculator
            </h2>
            <p className="text-slate-300 mt-4 text-base">
              Select your product division, input desired tonnage, and choose a discharge port for instant container estimates and lead-time calculations.
            </p>
          </div>

          <div className="bg-[#0B192C] border border-[#1E3E62] rounded-2xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="calc-division" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Select Product Division</label>
                  <select
                    id="calc-division"
                    value={calcDivision}
                    onChange={(e) => setCalcDivision(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="Industrial Equipment & Belting">Industrial Equipment & Machinery</option>
                    <option value="Agricultural Fertilizers & Nutrients">Agricultural Fertilizers & Nutrients</option>
                    <option value="Industrial Lubricants & Greases">Industrial Lubricants & Chemicals</option>
                    <option value="Automotive Glass & Technical Parts">Automotive Glass & Technical Parts</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="calc-tonnage" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Volume / Tonnage (Metric Tons)</label>
                  <input
                    type="number"
                    min="1"
                    id="calc-tonnage"
                    value={calcTonnage}
                    onChange={(e) => setCalcTonnage(Number(e.target.value))}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="calc-port" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Destination Port Hub</label>
                  <select
                    id="calc-port"
                    value={calcPort}
                    onChange={(e) => setCalcPort(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="Port of Miami, USA (7-10 Days)">Port of Miami, USA (7-10 Days)</option>
                    <option value="Port of Kingston, Jamaica (4-6 Days)">Port of Kingston, Jamaica (4-6 Days)</option>
                    <option value="Bridgetown Port, Barbados (3-5 Days)">Bridgetown Port, Barbados (3-5 Days)</option>
                    <option value="Port of Georgetown, Guyana (3-5 Days)">Port of Georgetown, Guyana (3-5 Days)</option>
                    <option value="Port of Rotterdam, Netherlands (18-22 Days)">Port of Rotterdam, Netherlands (18-22 Days)</option>
                    <option value="Port of Yokohama, Japan (35-42 Days)">Port of Yokohama, Japan (35-42 Days)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="calc-incoterm" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Incoterms 2020 Preference</label>
                  <select
                    id="calc-incoterm"
                    value={calcIncoterm}
                    onChange={(e) => setCalcIncoterm(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="FOB Point Lisas">FOB (Free On Board - Point Lisas)</option>
                    <option value="CIF Destination">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR Port of Discharge">CFR (Cost and Freight)</option>
                    <option value="DDP Designated Warehouse">DDP (Delivered Duty Paid)</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#0B192C]/50 border border-[#1E3E62] p-4 rounded-lg flex items-center justify-between text-xs text-slate-300">
                <span>Calculated Parameters Active</span>
                <span className="text-emerald-400 font-semibold">Real-Time Simulation Ready</span>
              </div>

            </div>

            <div className="lg:col-span-5 bg-[#060E18] border border-[#1E3E62]/80 rounded-xl p-6 sm:p-8 relative">
              <div className="absolute -top-3 right-4 bg-[#F1C40F] text-[#060E18] text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Instant Estimate
              </div>
              
              <h4 className="font-bold text-lg text-white mb-6 border-b border-[#152C48] pb-3 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-[#F1C40F]" />
                <span>Logistical Breakdown</span>
              </h4>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Origin Staging:</span>
                  <strong className="text-white">Point Lisas, T&T</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Estimated Container Load:</span>
                  <strong className="text-[#F1C40F]">{getContainerEstimate()}</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Estimated Transit Time:</span>
                  <strong className="text-white">{getTransitEstimate()}</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Customs & Inspection:</span>
                  <strong className="text-emerald-400">SGS / STOW Ready</strong>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Documentation:</span>
                  <strong className="text-white">Bill of Lading & Cert. of Origin</strong>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#152C48] text-center">
                <button
                  type="button"
                  id="calc-transfer-btn"
                  onClick={handleTransferCalculator}
                  className="inline-flex items-center gap-2 text-[#F1C40F] hover:underline text-xs font-bold bg-transparent border-0 cursor-pointer"
                >
                  <span>Lock in this rate with an official RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Quality, Verification & Compliance Section */}
      <section id="compliance" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AC0D] bg-[#F1C40F]/10 px-3 py-1 rounded-full border border-[#F1C40F]/20">Trust & Governance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-4">
              Quality Assurance, Verification & Compliance
            </h2>
            <p className="text-slate-600 mt-4 text-base">
              Jel Japan Enterprise Ltd. enforces rigorous international compliance standards for every export lot, assuring absolute security from origin factory to port discharge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm hover:border-[#0B192C] transition">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-3">STOW Certified Standards</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Safe To Work (STOW) certified operational protocols ensuring highest occupational health, safety, and environmental stewardship across all port staging and handling.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm hover:border-[#0B192C] transition">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6">
                <FileBadge className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-3">SGS & Bureau Veritas Inspection</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Independent pre-shipment inspection certificates issued for weight, quality, and technical specifications prior to sealing containers at origin.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm hover:border-[#0B192C] transition">
              <div className="w-12 h-12 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B192C] mb-3">Incoterms 2020 Compliance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparent, legally binding trade terms encompassing FOB Point Lisas, CFR, CIF, and DDP with complete Bill of Lading and Certificate of Origin traceability.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Formal B2B RFQ Form Section */}
      <section id="rfq" className="py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            
            <div className="bg-[#0B192C] px-8 py-8 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F1C40F] bg-[#F1C40F]/15 px-3 py-1 rounded-full border border-[#F1C40F]/30">Secure B2B Channel</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">Request For Quotation (RFQ)</h2>
              <p className="text-slate-300 text-sm mt-1">Complete the formal specification form below to receive an official commercial proforma invoice.</p>
            </div>

            <form id="formal-rfq-form" onSubmit={handleFormalRfqSubmit} className="p-8 sm:p-10 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rfq-company" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    id="rfq-company"
                    value={rfqCompany}
                    onChange={(e) => setRfqCompany(e.target.value)}
                    placeholder="e.g. Caribbean Industrial Corp"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Authorized Buyer Name *</label>
                  <input
                    type="text"
                    required
                    id="rfq-name"
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                    placeholder="e.g. Marcus Sterling, Procurement Director"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rfq-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    id="rfq-email"
                    value={rfqEmail}
                    onChange={(e) => setRfqEmail(e.target.value)}
                    placeholder="m.sterling@caribbeanind.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone / WhatsApp with Country Code *</label>
                  <input
                    type="tel"
                    required
                    id="rfq-phone"
                    value={rfqPhone}
                    onChange={(e) => setRfqPhone(e.target.value)}
                    placeholder="+1 868 555-0199"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rfq-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Target Product Category *</label>
                  <select
                    id="rfq-category"
                    value={rfqCategory}
                    onChange={(e) => setRfqCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  >
                    <option value="Industrial Equipment & Belting">Industrial Equipment & Food Grade Machinery</option>
                    <option value="Agricultural Fertilizers & Nutrients">Agricultural Fertilizers & Soil Nutrients</option>
                    <option value="Industrial Lubricants & Greases">Industrial Lubricants, Greases & Chemicals</option>
                    <option value="Automotive Glass & Technical Parts">Automotive Glass, Parts & Specialized Technical Supplies</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rfq-quantity" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Quantity / Volume (Metric Tons or Units) *</label>
                  <input
                    type="text"
                    required
                    id="rfq-quantity"
                    value={rfqQuantity}
                    onChange={(e) => setRfqQuantity(e.target.value)}
                    placeholder="e.g. 50 Metric Tons / 2x 40ft FCL"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rfq-incoterm" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Incoterms 2020 Preference *</label>
                  <select
                    id="rfq-incoterm"
                    value={rfqIncoterm}
                    onChange={(e) => setRfqIncoterm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  >
                    <option value="FOB Point Lisas">FOB (Free On Board - Point Lisas)</option>
                    <option value="CIF Port of Discharge">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR Port of Discharge">CFR (Cost and Freight)</option>
                    <option value="DDP Designated Facility">DDP (Delivered Duty Paid)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rfq-port" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Discharge Port / Destination Country *</label>
                  <input
                    type="text"
                    required
                    id="rfq-port"
                    value={rfqPort}
                    onChange={(e) => setRfqPort(e.target.value)}
                    placeholder="e.g. Port of Kingston, Jamaica"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="rfq-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Technical Specifications / Notes / File Reference</label>
                <textarea
                  rows={4}
                  id="rfq-notes"
                  value={rfqNotes}
                  onChange={(e) => setRfqNotes(e.target.value)}
                  placeholder="Specify grade requirements, packaging preferences, inspection agency preference (SGS/BV), or target delivery date..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0B192C]"
                ></textarea>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  required
                  id="rfq-consent"
                  checked={rfqConsent}
                  onChange={(e) => setRfqConsent(e.target.checked)}
                  className="w-4 h-4 text-[#0B192C] rounded border-slate-300 focus:ring-[#0B192C]"
                />
                <label htmlFor="rfq-consent" className="text-xs text-slate-600">
                  I confirm authorized procurement representation and agree to Jel Japan Enterprise Ltd. terms of trade and compliance verification.
                </label>
              </div>

              <button
                type="submit"
                id="rfq-submit-btn"
                className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-4 rounded-lg shadow-lg transition flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Transmit Formal RFQ to Trade Desk</span>
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-[#060E18]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              id="modal-close-x-btn"
              aria-label="Close modal"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B192C] text-center mb-2">RFQ Transmitted Successfully</h3>
            <p className="text-slate-600 text-sm text-center mb-6">
              Your inquiry has been successfully registered with our Point Lisas Trade Desk. A senior commercial officer has been assigned.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Reference RFQ ID:</span>
                <strong className="text-[#0B192C] font-mono">{generatedRfqId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Desk:</span>
                <strong className="text-[#0B192C]">Point Lisas Export Operations</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target SLA:</span>
                <strong className="text-emerald-600">&lt; 2 Business Hours</strong>
              </div>
            </div>

            <button
              type="button"
              id="modal-ack-btn"
              onClick={() => {
                setModalOpen(false);
                setRfqCompany('');
                setRfqName('');
                setRfqEmail('');
                setRfqPhone('');
                setRfqQuantity('');
                setRfqPort('');
                setRfqNotes('');
                setRfqConsent(false);
              }}
              className="w-full bg-[#0B192C] hover:bg-[#152C48] text-white font-bold py-3 rounded-lg transition text-sm cursor-pointer"
            >
              Acknowledge & Return to Manifest
            </button>
          </div>
        </div>
      )}

      {/* Corporate Footer */}
      <footer className="bg-[#060E18] text-slate-400 py-16 border-t border-[#152C48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F1C40F] rounded-lg flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-[#060E18] stroke-[2.5]" />
                </div>
                <span className="font-bold text-lg text-white">Jel Japan Enterprise Ltd.</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Global merchant exporter, bulk commodity broker, and industrial procurement specialist anchored at the Port of Point Lisas gateway.
              </p>
              <div className="text-xs text-[#F1C40F] font-mono">
                Domain: jeljapanenterpriseltd.shop
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Operational Headquarters</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                92 Katwaroo Trace, Penal / Katwaroo<br />
                Trinidad & Tobago, West Indies
              </p>
              <p className="text-xs text-slate-300 pt-2">
                <strong>Primary Port Staging:</strong><br />
                Port of Point Lisas, Couva, T&T
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Trade Divisions</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#catalog" className="hover:text-[#F1C40F] transition flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-[#F1C40F]" /><span>Industrial Equipment & Machinery</span></a></li>
                <li><a href="#catalog" className="hover:text-[#F1C40F] transition flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-[#F1C40F]" /><span>Agricultural Fertilizers (HS 3105)</span></a></li>
                <li><a href="#catalog" className="hover:text-[#F1C40F] transition flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-[#F1C40F]" /><span>Industrial Lubricants & Chemicals</span></a></li>
                <li><a href="#catalog" className="hover:text-[#F1C40F] transition flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-[#F1C40F]" /><span>Automotive Glass & Technical Spares</span></a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Compliance & Hotline</h4>
              <p className="text-xs text-slate-300">
                Trade Compliance Hotline:<br />
                <strong className="text-white">+1 868 647-TRADE</strong>
              </p>
              <p className="text-xs text-slate-300">
                Inquiries: <a href="mailto:trade@jeljapanenterpriseltd.shop" className="text-[#F1C40F] hover:underline">trade@jeljapanenterpriseltd.shop</a>
              </p>
              <div className="mt-4 inline-block bg-[#0B192C] border border-[#1E3E62] px-3 py-1.5 rounded text-[11px] text-emerald-400 font-semibold">
                Incoterms 2020 Compliant
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#0B192C] flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div>
              &copy; 2026 Jel Japan Enterprise Ltd. (jeljapanenterpriseltd.shop). All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition">Terms of Trade</a>
              <a href="#" className="hover:text-slate-300 transition">Bill of Lading Verification</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
