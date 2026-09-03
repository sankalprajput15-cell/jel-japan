/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Clock,
  Anchor,
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
  Mail,
  Copy,
  Phone,
  Building2,
  Lock,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  PackageCheck,
  Check,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  ShoppingBag,
  Coins,
  Warehouse,
  Briefcase
} from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { COMMODITY_DIVISIONS, PORT_ROUTES, INCOTERMS_INFO, PROCUREMENT_WANTED } from './data/tradeData';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'div1' | 'div2' | 'div3' | 'div4'>('all');
  
  // Quick Inquiry Form State with Buy / Sell toggle
  const [quickTradeType, setQuickTradeType] = useState<'buy' | 'sell'>('buy');
  const [quickCompany, setQuickCompany] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickCategory, setQuickCategory] = useState('Industrial Equipment, Food Grade Machinery & Belting');

  // Trade Calculator State
  const [calcDivision, setCalcDivision] = useState('Industrial Equipment, Food Grade Machinery & Belting');
  const [calcTonnage, setCalcTonnage] = useState(25);
  const [calcPort, setCalcPort] = useState('Port of Miami, USA (7-10 Days)');
  const [calcIncoterm, setCalcIncoterm] = useState('FOB Point Lisas');
  const [calcApplied, setCalcApplied] = useState(false);

  // Formal Commercial Trade Desk Form State (Dual Mode: Buy vs. Sell)
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
  const [tradeCompany, setTradeCompany] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [tradeEmail, setTradeEmail] = useState('');
  const [tradePhone, setTradePhone] = useState('');
  const [tradeCategory, setTradeCategory] = useState('Industrial Equipment, Food Grade Machinery & Belting');
  const [tradeQuantity, setTradeQuantity] = useState('25 Metric Tons / 1 FCL Container');
  const [tradeIncoterm, setTradeIncoterm] = useState('FOB (Free On Board - Point Lisas)');
  const [tradePortOrOrigin, setTradePortOrOrigin] = useState('Port of Miami, USA');
  const [tradePriceTarget, setTradePriceTarget] = useState('');
  const [tradeNotes, setTradeNotes] = useState('');
  const [tradeConsent, setTradeConsent] = useState(false);

  // Modal & Mail Transmission State
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('JEL-TRD-2026-9942');
  const [tradeMailtoUrl, setTradeMailtoUrl] = useState('');
  const [copiedTradeSummary, setCopiedTradeSummary] = useState(false);

  // Quick form submission routes to Trade Desk
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeMode(quickTradeType);
    setTradeCompany(quickCompany);
    setTradeEmail(quickEmail);
    setTradeCategory(quickCategory);
    
    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill from catalog division for buying
  const handleSelectBuyProduct = (productTitle: string) => {
    setTradeMode('buy');
    setTradeCategory(productTitle);
    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill from catalog division for selling to us
  const handleSelectSellToUs = (productTitle: string) => {
    setTradeMode('sell');
    setTradeCategory(productTitle);
    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apply calculator estimate to Buy RFQ form
  const handleApplyCalculatorToRfq = () => {
    setTradeMode('buy');
    setTradeCategory(calcDivision);
    setTradeQuantity(`${calcTonnage} Metric Tons (${getContainerEstimate()})`);
    setTradeIncoterm(calcIncoterm);
    setTradePortOrOrigin(calcPort.split('(')[0].trim());
    setCalcApplied(true);
    setTimeout(() => setCalcApplied(false), 2500);

    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format trade documentation for email
  const getTradeSummaryText = (refId: string) => {
    const isBuyingFromUs = tradeMode === 'buy';
    const headerTitle = isBuyingFromUs
      ? 'FORMAL COMMERCIAL REQUEST FOR QUOTATION (BUY FROM JEL JAPAN)'
      : 'FORMAL SUPPLIER OFFER / PROCUREMENT MANIFEST (SELL TO JEL JAPAN)';

    return [
      '==============================================',
      headerTitle,
      'Jel Japan Enterprise Ltd. - Commercial Trade Desk',
      '==============================================',
      'Routing: Commercial Trade Desk (Port of Point Lisas)',
      `Reference ID: ${refId}`,
      `Trade Direction: ${isBuyingFromUs ? 'BUY FROM US (Export Supply Inquiry)' : 'SELL TO US (Supplier / Manufacturer Offer)'}`,
      '',
      '--- COUNTERPARTY & AUTHORIZED SIGNATORY ---',
      `Company / Entity: ${tradeCompany}`,
      `Authorized Representative: ${tradeName}`,
      `Corporate Email: ${tradeEmail}`,
      `Phone / WhatsApp: ${tradePhone}`,
      '',
      '--- COMMERCIAL SPECIFICATIONS ---',
      `Product Division: ${tradeCategory}`,
      `Volume / Quantity: ${tradeQuantity}`,
      isBuyingFromUs
        ? `Incoterms 2020 Preference: ${tradeIncoterm}`
        : `Supply Delivery Terms: ${tradeIncoterm}`,
      isBuyingFromUs
        ? `Discharge Port / Destination: ${tradePortOrOrigin}`
        : `Cargo Origin / Staging Location: ${tradePortOrOrigin}`,
      tradePriceTarget ? `Target / Asking Price: ${tradePriceTarget}` : '',
      '',
      '--- TECHNICAL SPECIFICATIONS & NOTES ---',
      tradeNotes.trim() ? tradeNotes : 'Standard commercial grade as per trade manifest.',
      '',
      '--- AUTHORIZATION ---',
      'Authorized representative confirms commercial authenticity.',
      '=============================================='
    ].filter(Boolean).join('\n');
  };

  // Submit Formal Trade Inquiry addressed to jeljapanenterpriseltdshop@gmail.com
  const handleFormalTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isBuying = tradeMode === 'buy';
    const prefix = isBuying ? 'JEL-BUY' : 'JEL-SELL';
    const newId = `${prefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRefId(newId);
    setCopiedTradeSummary(false);

    const subject = `[${newId}] ${isBuying ? 'RFQ (Buy)' : 'Supplier Offer (Sell)'}: ${tradeCategory} - ${tradeCompany}`;
    const body = getTradeSummaryText(newId);
    const mailto = `mailto:jeljapanenterpriseltdshop@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTradeMailtoUrl(mailto);
    setModalOpen(true);

    try {
      // Direct redirect to default email client with all pre-filled trade parameters
      window.location.href = mailto;
    } catch (err) {
      console.error('Mail dispatch:', err);
    }
  };

  // Calculator helpers
  const getContainerEstimate = () => {
    const t = Number(calcTonnage) || 25;
    if (t <= 5) return '1 x LCL Palletized Lot';
    if (t <= 24) return '1 x 20ft Standard FCL Container';
    if (t <= 50) return '2 x 40ft High Cube FCL Containers';
    return `${Math.ceil(t / 25)} x 40ft FCL Bulk Containers`;
  };

  const getTransitEstimate = () => {
    if (calcPort.includes('Rotterdam')) return '18 - 22 Business Days';
    if (calcPort.includes('Yokohama')) return '35 - 42 Business Days';
    if (calcPort.includes('Kingston') || calcPort.includes('Barbados') || calcPort.includes('Guyana')) return '3 - 6 Business Days';
    return '7 - 10 Business Days';
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#F1C40F] selection:text-[#0B192C]">
      
      {/* Top Utility Bar */}
      <div className="bg-[#050B12] text-slate-300 text-xs py-2 px-4 border-b border-[#152C48]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#F1C40F]" />
              <span className="font-medium text-slate-300">Desk Hours: Mon-Fri 08:00 - 17:00 AST</span>
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Anchor className="w-3.5 h-3.5 text-[#F1C40F]" />
              <span className="text-slate-300">Port of Point Lisas Berthing: <strong className="text-emerald-400 font-medium">Normal / Active</strong></span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-amber-300 font-semibold bg-[#0B192C] px-2.5 py-0.5 rounded border border-[#1E3E62]">
              Dual Desk: Buy (Procurement) & Sell (Export)
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden lg:inline">
              Registry: 10°24'N 61°29'W • STOW-TT Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Header with Real Corporate Logo */}
      <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-[#1E3E62]/70 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Real Corporate Logo */}
            <a href="#" className="flex items-center group transition">
              <BrandLogo variant="light" size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#how-we-trade" className="text-slate-200 hover:text-[#F1C40F] text-sm font-medium tracking-wide transition flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#F1C40F]" />
                <span>Buy & Sell Model</span>
              </a>
              <a href="#catalog" className="text-slate-200 hover:text-[#F1C40F] text-sm font-medium tracking-wide transition">Commodity Divisions</a>
              <a href="#procurement" className="text-slate-200 hover:text-[#F1C40F] text-sm font-medium tracking-wide transition flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>We Buy (Procurement)</span>
              </a>
              <a href="#calculator" className="text-slate-200 hover:text-[#F1C40F] text-sm font-medium tracking-wide transition">Freight Calculator</a>
              <a href="#trade-desk" className="text-slate-200 hover:text-[#F1C40F] text-sm font-medium tracking-wide transition">Trade Desk Portal</a>
            </nav>

            {/* Header Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#trade-desk"
                onClick={() => setTradeMode('buy')}
                className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] text-xs font-bold px-3.5 py-2 rounded-lg transition shadow flex items-center gap-1"
              >
                <span>Buy / RFQ</span>
              </a>
              <a
                href="#trade-desk"
                onClick={() => setTradeMode('sell')}
                className="bg-[#152C48] hover:bg-[#1E3E62] text-white border border-[#1E3E62] text-xs font-bold px-3.5 py-2 rounded-lg transition shadow flex items-center gap-1"
              >
                <span>Sell to Us</span>
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
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060E18] border-t border-[#152C48] px-6 py-6 space-y-3">
            <a href="#how-we-trade" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Buy & Sell Model</a>
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Commodity Divisions</a>
            <a href="#procurement" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">We Buy (Procurement Off-Take)</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Freight Calculator</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Compliance & STOW</a>
            <a href="#trade-desk" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#F1C40F] font-medium text-base py-1.5">Trade Desk Portal</a>
            <div className="pt-3 border-t border-[#152C48] grid grid-cols-2 gap-2">
              <a
                href="#trade-desk"
                onClick={() => { setTradeMode('buy'); setMobileMenuOpen(false); }}
                className="text-center block bg-[#F1C40F] text-[#060E18] py-2.5 rounded-lg font-bold text-xs shadow"
              >
                Buy (RFQ)
              </a>
              <a
                href="#trade-desk"
                onClick={() => { setTradeMode('sell'); setMobileMenuOpen(false); }}
                className="text-center block bg-[#152C48] text-white border border-[#1E3E62] py-2.5 rounded-lg font-bold text-xs shadow"
              >
                Sell to Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Clarifying Buyer & Merchant Exporter (Buy & Sell) */}
      <section className="relative bg-[#081220] text-white overflow-hidden py-20 lg:py-28 border-b border-[#152C48]">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F1C40F]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 bg-[#0B192C] border border-[#1E3E62] px-3.5 py-1.5 rounded-full text-slate-200 text-xs font-semibold tracking-wide">
                <RefreshCw className="w-4 h-4 text-[#F1C40F]" />
                <span>International Merchant Trading House • We Buy & We Sell</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                Global <span className="text-[#F1C40F]">Buyer</span> & <span className="text-[#F1C40F]">Merchant Exporter</span> via the Caribbean Gateway
              </h1>
              
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                Anchored at the <strong>Port of Point Lisas, Trinidad & Tobago</strong>, Jel Japan Enterprise Ltd. operates an active dual-direction trading house. We <strong>BUY</strong> bulk commodities, industrial machinery, and feedstock from certified producers—and we <strong>SELL & EXPORT</strong> turn-key consignments to commercial distributors across the Americas, CARICOM, and Europe.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                <a
                  href="#trade-desk"
                  onClick={() => setTradeMode('buy')}
                  className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition text-center flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
                >
                  <ArrowDownLeft className="w-4 h-4 text-[#060E18]" />
                  <span>Buy From Us (Request Quote)</span>
                </a>
                <a
                  href="#trade-desk"
                  onClick={() => setTradeMode('sell')}
                  className="bg-[#0B192C] hover:bg-[#152C48] text-white font-semibold px-7 py-3.5 rounded-lg border border-[#1E3E62] shadow-sm transition text-center flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4 text-[#F1C40F]" />
                  <span>Sell To Us (Supplier Offer)</span>
                </a>
              </div>

              {/* Dual Trade Operational Highlights */}
              <div className="pt-6 border-t border-[#152C48]/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0B192C]/70 p-3.5 rounded-xl border border-[#1E3E62]">
                  <span className="block font-black text-[#F1C40F] text-lg">We Buy</span>
                  <span className="text-xs text-slate-400">Cash & LC Purchase Orders</span>
                </div>
                <div className="bg-[#0B192C]/70 p-3.5 rounded-xl border border-[#1E3E62]">
                  <span className="block font-black text-[#F1C40F] text-lg">We Sell</span>
                  <span className="text-xs text-slate-400">FOB / CIF Export Cargo</span>
                </div>
                <div className="bg-[#0B192C]/70 p-3.5 rounded-xl border border-[#1E3E62]">
                  <span className="block font-black text-[#F1C40F] text-lg">Pt. Lisas</span>
                  <span className="text-xs text-slate-400">Deepwater Staging Hub</span>
                </div>
                <div className="bg-[#0B192C]/70 p-3.5 rounded-xl border border-[#1E3E62]">
                  <span className="block font-black text-[#F1C40F] text-lg">STOW-TT</span>
                  <span className="text-xs text-slate-400">Safe Loading Protocol</span>
                </div>
              </div>

            </div>

            {/* Hero Right Card: Dual-Mode Trade Dispatch Form */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B192C] p-7 sm:p-8 rounded-2xl border border-[#1E3E62] shadow-2xl relative">
                
                {/* Trade Direction Selector Tabs */}
                <div className="flex rounded-lg bg-[#060E18] p-1 border border-[#1E3E62] mb-5">
                  <button
                    type="button"
                    onClick={() => setQuickTradeType('buy')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 ${
                      quickTradeType === 'buy'
                        ? 'bg-[#F1C40F] text-[#060E18] shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                    <span>I Want to BUY (Quote)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickTradeType('sell')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 ${
                      quickTradeType === 'sell'
                        ? 'bg-[#1E3E62] text-white shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>I Want to SELL to Jel</span>
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F1C40F]">
                    {quickTradeType === 'buy' ? 'Export Supply Inquiry' : 'Supplier Off-Take Desk'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Response &lt; 2h</span>
                </div>

                <p className="text-xs text-slate-300 mb-4">
                  {quickTradeType === 'buy'
                    ? 'Submit your commodity or equipment requirements for competitive pricing and freight schedules.'
                    : 'Submit your available inventory, surplus lots, or factory production capacity for direct purchase.'}
                </p>
                
                <form id="quick-inquiry-form" onSubmit={handleQuickSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="quick-company" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      {quickTradeType === 'buy' ? 'Purchasing Company / Entity' : 'Supplier / Manufacturer Entity'}
                    </label>
                    <input
                      type="text"
                      required
                      id="quick-company"
                      value={quickCompany}
                      onChange={(e) => setQuickCompany(e.target.value)}
                      placeholder={quickTradeType === 'buy' ? 'e.g. Caribbean Industrial Supplies Ltd.' : 'e.g. Nippon Petrochemicals Corp.'}
                      className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F1C40F] transition"
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
                      placeholder="trade@corporate.com"
                      className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F1C40F] transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="quick-category" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Target Division</label>
                    <select
                      id="quick-category"
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                      className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F] transition"
                    >
                      <option value="Industrial Equipment, Food Grade Machinery & Belting">Industrial Equipment & Food Grade Machinery</option>
                      <option value="Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients">Agricultural Fertilizers (Granular Urea 46% / DAP)</option>
                      <option value="Industrial Lubricants, Greases & Process Chemicals">Industrial Lubricants & Process Chemicals</option>
                      <option value="Automotive Glass, Technical Spare Parts & Fleet Supplies">Automotive Glass & Fleet Spare Parts</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    id="quick-inquiry-submit"
                    className="w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-3 rounded-lg shadow transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{quickTradeType === 'buy' ? 'Initiate Commercial RFQ (Buy)' : 'Submit Supplier Offering (Sell)'}</span>
                  </button>
                </form>

                <div className="mt-4 pt-3.5 border-t border-[#152C48] text-center">
                  <span className="text-xs text-slate-400">Directly routed to the <strong className="text-slate-200">Commercial Trade Desk</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Merchant Trading House Model: How We Buy & How We Sell */}
      <section id="how-we-trade" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7950B] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">Merchant Trading House Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-3">
              We Buy & We Sell: Complete Trade Flow
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              As a licensed Buyer & Merchant Exporter, Jel Japan Enterprise Ltd. bridges global manufacturers and regional demand. We provide reliable liquidity and off-take for producers, while delivering certified, logistics-insured commodities to commercial buyers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Column 1: HOW WE BUY (Procurement) */}
            <div className="bg-slate-50 rounded-2xl border-2 border-amber-300 p-8 relative flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                    <ArrowDownLeft className="w-3.5 h-3.5 text-amber-700" />
                    <span>PROCUREMENT DESK: WE BUY</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500">For Producers & Suppliers</span>
                </div>

                <h3 className="text-2xl font-bold text-[#0B192C] mb-3">
                  We Purchase Commodities & Surplus Inventory
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  We actively purchase bulk agricultural fertilizers, virgin base oils, industrial machinery lots, and automotive supplies from global factories, refineries, and trading houses.
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 mb-8">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Prompt Payment Terms:</strong> Irrevocable Letters of Credit (LC), Telegraphic Transfer (TT), and Cash Against Documents.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Flexible Off-Take Terms:</strong> We buy EXW (Ex Works), FOB Port of Origin, or CIF Port of Point Lisas.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>High Volume Capacity:</strong> Containerized FCL lots up to chartered bulk ocean vessel commitments.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Rapid Verification:</strong> Independent inspection protocols (SGS, Bureau Veritas) for swift cargo release.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <a
                  href="#trade-desk"
                  onClick={() => setTradeMode('sell')}
                  className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-3 px-4 rounded-lg transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Offer Products to Us (Sell to Jel Japan)</span>
                </a>
              </div>
            </div>

            {/* Column 2: HOW WE SELL (Export Supply) */}
            <div className="bg-[#0B192C] text-white rounded-2xl border-2 border-[#1E3E62] p-8 relative flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#152C48] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full border border-[#1E3E62]">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>EXPORT SUPPLY DESK: WE SELL</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400">For Buyers & Importers</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  We Export & Fulfill Global Commercial Orders
                </h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  We supply commercial distributors, government tenders, agricultural estates, and industrial plants with certified commodities staged at our Port of Point Lisas gateway.
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-200 mb-8">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                    <span><strong>Incoterms 2020 Compliance:</strong> FOB Point Lisas, CIF Destination Port, CFR, and DAP delivery.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                    <span><strong>Certified Quality Standards:</strong> Complete Certificate of Analysis (COA), MSDS, and Bill of Lading.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                    <span><strong>Fast Regional Transit:</strong> 2 to 6 business days feeder routes across CARICOM & South America.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                    <span><strong>Custom Export Packaging:</strong> 50kg bags, 1,000kg FIBC jumbo bags, steel drums, and wooden crates.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#152C48]">
                <a
                  href="#trade-desk"
                  onClick={() => setTradeMode('buy')}
                  className="w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-3 px-4 rounded-lg transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Request Export Quotation (Buy from Jel Japan)</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Commodity & Product Divisions Section with WE BUY & WE SELL specs */}
      <section id="catalog" className="py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B7950B] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">Commercial Divisions</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B192C] mt-2.5">
                Commodity & Equipment Divisions (Buy & Sell)
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Explore our active trade divisions. For each category, we both <strong>buy bulk lots from suppliers</strong> and <strong>export verified cargo to commercial buyers</strong>.
              </p>
            </div>

            {/* Division Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Divisions' },
                { id: 'div1', label: 'Machinery' },
                { id: 'div2', label: 'Fertilizers' },
                { id: 'div3', label: 'Lubricants' },
                { id: 'div4', label: 'Automotive' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0B192C] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid with WE BUY & WE SELL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {COMMODITY_DIVISIONS.filter(
              (item) => activeCategory === 'all' || item.category === activeCategory
            ).map((division) => (
              <div
                key={division.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="bg-[#0B192C] text-[#F1C40F] text-xs font-bold px-2.5 py-1 rounded font-mono">
                      {division.hsCode}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-amber-600" />
                      <span>{division.stockStatus}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0B192C] mb-2 leading-snug">
                    {division.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
                    {division.description}
                  </p>

                  {/* Dual Trade Scope Box: WE BUY vs WE SELL */}
                  <div className="space-y-2 mb-5">
                    <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-lg text-xs">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                        <ArrowDownLeft className="w-3.5 h-3.5 text-amber-700" />
                        <span>WE BUY IN THIS DIVISION:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{division.weBuySpec}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs">
                      <div className="font-bold text-[#0B192C] flex items-center gap-1.5 mb-1">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WE SELL & EXPORT:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{division.weSellSpec}</p>
                    </div>
                  </div>

                  {/* Specifications Checklist */}
                  <div className="mb-5 space-y-1.5">
                    {division.keySpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Origin & Packaging Grid */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold text-[10px]">Benchmark Origin</span>
                      <strong className="text-slate-800 text-xs">{division.origin}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-semibold text-[10px]">Packaging Standards</span>
                      <strong className="text-slate-800 text-xs">{division.packaging}</strong>
                    </div>
                  </div>
                </div>

                {/* Dual Action Bottom Bar */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">{division.minOrder}</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleSelectSellToUs(division.title)}
                      className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span>Sell to Us</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectBuyProduct(division.title)}
                      className="bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] text-xs font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy / Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Procurement / What We Buy Section */}
      <section id="procurement" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7950B] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">Supplier Procurement Desk</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-3">
              Commodities & Lots We Actively Purchase
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              Are you a producer, manufacturer, refinery, or industrial liquidator? We issue formal Purchase Orders, arrange marine vessel cargo, and provide secure institutional payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PROCUREMENT_WANTED.map((item) => (
              <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-amber-400 transition shadow-sm">
                <div>
                  <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center mb-4">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0B192C] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="space-y-1.5 mb-5">
                    {item.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Volume:</span> {item.volumeNeeded}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectSellToUs(item.title)}
                    className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] text-xs font-bold py-2 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit Offer for this Stream</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Supplier Trust Banner */}
          <div className="bg-[#0B192C] text-white p-7 rounded-2xl border border-[#1E3E62] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F1C40F]">Supplier Partnership & Off-Take</span>
              <h4 className="text-xl font-bold">Have certified cargo or factory machinery to sell?</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We accept supplier manifests via email or direct portal submission. Commercial officers review technical assay and pricing within 24 hours.
              </p>
            </div>
            <a
              href="#trade-desk"
              onClick={() => setTradeMode('sell')}
              className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold px-6 py-3 rounded-lg text-sm transition whitespace-nowrap shadow cursor-pointer"
            >
              Submit Supplier Manifest
            </a>
          </div>

        </div>
      </section>

      {/* Maritime Freight & Logistics Calculator */}
      <section id="calculator" className="py-20 bg-[#081220] text-white relative overflow-hidden border-b border-[#152C48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1C40F] bg-[#F1C40F]/10 px-3 py-1 rounded-full border border-[#F1C40F]/20">Client Logistics Estimator</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Interactive Freight & Routing Calculator
            </h2>
            <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
              Estimate container allocation, ocean transit lead times, and Incoterms 2020 parameters originating from the Port of Point Lisas.
            </p>
          </div>

          <div className="bg-[#0B192C] border border-[#1E3E62] rounded-2xl p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="calc-division" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Select Product Division</label>
                  <select
                    id="calc-division"
                    value={calcDivision}
                    onChange={(e) => setCalcDivision(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="Industrial Equipment, Food Grade Machinery & Belting">Industrial Equipment & Machinery</option>
                    <option value="Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients">Agricultural Fertilizers & Nutrients</option>
                    <option value="Industrial Lubricants, Greases & Process Chemicals">Industrial Lubricants & Chemicals</option>
                    <option value="Automotive Glass, Technical Spare Parts & Fleet Supplies">Automotive Glass & Technical Parts</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="calc-tonnage" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Estimated Tonnage (Metric Tons)</label>
                  <input
                    type="number"
                    min="1"
                    id="calc-tonnage"
                    value={calcTonnage}
                    onChange={(e) => setCalcTonnage(Number(e.target.value))}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="calc-port" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Destination Port Hub</label>
                  <select
                    id="calc-port"
                    value={calcPort}
                    onChange={(e) => setCalcPort(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
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
                  <label htmlFor="calc-incoterm" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Incoterms 2020 Preference</label>
                  <select
                    id="calc-incoterm"
                    value={calcIncoterm}
                    onChange={(e) => setCalcIncoterm(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="FOB Point Lisas">FOB (Free On Board - Point Lisas)</option>
                    <option value="CIF Destination">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR Port of Discharge">CFR (Cost and Freight)</option>
                    <option value="EXW Point Lisas Warehouse">EXW (Ex Works - Staging Depot)</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#060E18]/80 border border-[#1E3E62] p-3.5 rounded-lg flex items-center justify-between text-xs text-slate-300">
                <span>Origin Terminal: <strong>Port of Point Lisas (T&T)</strong></span>
                <span className="text-emerald-400 font-medium">Standard Feeder Schedule Active</span>
              </div>

            </div>

            {/* Calculated Output Breakdown */}
            <div className="lg:col-span-5 bg-[#060E18] border border-[#1E3E62] rounded-xl p-6 relative">
              <div className="flex items-center justify-between border-b border-[#152C48] pb-3 mb-5">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-[#F1C40F]" />
                  <span>Logistical Estimate</span>
                </span>
                <span className="text-[10px] text-[#F1C40F] font-mono uppercase bg-[#F1C40F]/10 px-2 py-0.5 rounded border border-[#F1C40F]/20">
                  Live Model
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Container Allocation:</span>
                  <strong className="text-white font-mono text-right">{getContainerEstimate()}</strong>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Est. Ocean Transit:</span>
                  <strong className="text-[#F1C40F] font-mono text-right">{getTransitEstimate()}</strong>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#152C48]/60">
                  <span className="text-slate-400">Incoterm Applied:</span>
                  <strong className="text-white text-right">{calcIncoterm}</strong>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Marine Insurance:</span>
                  <span className="text-emerald-400 font-medium text-right">Included in CIF / Optional FOB</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyCalculatorToRfq}
                className="mt-5 w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-2.5 rounded-lg transition text-xs flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{calcApplied ? 'Applied to Trade Desk Form!' : 'Populate Buy RFQ with this Estimate'}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Operational Footprint & Infrastructure */}
      <section id="about" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7950B] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">Operational Footprint</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-3">
              Strategically Anchored in Trinidad & Tobago
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              Operating from corporate offices at <strong>92 Katwaroo Trace, Penal</strong> and staging facilities along the <strong>Port of Point Lisas heavy industrial corridor</strong>, Jel Japan Enterprise Ltd. coordinates global supply lines across CARICOM, South America, North America, and transatlantic routes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">Penal HQ & Point Lisas Staging</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Central corporate command coupled with direct feeder access to the deepwater container berths of Point Lisas Port.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">Pre-Shipment Quality Testing</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Independent inspection through accredited bodies (SGS, Bureau Veritas) ensuring verified specifications prior to seal dispatch.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-5">
                <Ship className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">Multi-Modal Logistics</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                FCL (20ft / 40ft), specialized LCL consolidate, and bulk vessel chartering with end-to-end Bill of Lading tracking.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-5">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">Institutional Trade Settlement</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Institutional documentation supporting Irrevocable Letters of Credit (LC), Telegraphic Transfer (TT), and documentary collections.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Trust, Governance & STOW Compliance Section */}
      <section id="compliance" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7950B] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">Governance & Standards</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-3">
              Quality Assurance & Trade Governance
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              Jel Japan Enterprise Ltd. maintains rigorous international trade governance, ensuring verified cargo purity, safety, and legal enforceability from origin to discharge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-xl shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">STOW-TT Health & Safety Certified</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Adherence to Trinidad & Tobago Safe TO Work (STOW) protocols guaranteeing occupational safety and environmental risk control during all port loading operations.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-xl shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <FileBadge className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">Independent SGS & BV Verification</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Third-party inspection certificates validating weight, chemical assay, and packaging integrity prior to container seal application at origin.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-xl shadow-sm">
              <div className="w-11 h-11 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0B192C] mb-2">Incoterms 2020 Legal Standards</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Standardized contracts under ICC Incoterms 2020 (FOB, CIF, CFR) with complete documentary Bill of Lading and Certificate of Origin authentication.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Commercial Trade Desk Portal: Dual Mode (I Want to BUY / I Want to SELL) */}
      <section id="trade-desk" className="py-20 bg-slate-100/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Header with Dual Trade Mode Switcher */}
            <div className="bg-[#0B192C] px-7 py-7 text-white">
              
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F1C40F] bg-[#F1C40F]/15 px-3 py-1 rounded-full border border-[#F1C40F]/30">
                  Commercial Trade Desk
                </span>
                <span className="text-xs text-slate-300 font-mono flex items-center gap-1.5 bg-[#060E18] px-3 py-1.5 rounded-lg border border-[#1E3E62]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F1C40F]" />
                  <span>Direct Routing: <strong className="text-[#F1C40F]">Corporate Commercial Desk</strong></span>
                </span>
              </div>

              {/* Dual Trade Mode Toggle */}
              <div className="bg-[#060E18] p-1.5 rounded-xl border border-[#1E3E62] max-w-md mb-4 flex">
                <button
                  type="button"
                  id="trade-mode-buy"
                  onClick={() => setTradeMode('buy')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    tradeMode === 'buy'
                      ? 'bg-[#F1C40F] text-[#060E18] shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>I Want to BUY (Quote)</span>
                </button>
                <button
                  type="button"
                  id="trade-mode-sell"
                  onClick={() => setTradeMode('sell')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    tradeMode === 'sell'
                      ? 'bg-[#152C48] text-white shadow border border-[#1E3E62]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4 text-[#F1C40F]" />
                  <span>I Want to SELL to Jel Japan</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {tradeMode === 'buy'
                  ? 'Request Commercial Export Quotation (RFQ)'
                  : 'Supplier Offering / Product Manifest Submission'}
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {tradeMode === 'buy'
                  ? 'Specify commodity volumes, Incoterms, and discharge port. Your formal RFQ will be transmitted directly to our Point Lisas export trade desk.'
                  : 'Submit your inventory, surplus lots, or manufacturing allocations for purchase review by our procurement officers.'}
              </p>
            </div>

            {/* Trade Desk Form Body */}
            <form id="formal-trade-form" onSubmit={handleFormalTradeSubmit} className="p-7 sm:p-9 space-y-6">
              
              {/* Section 1: Entity Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0B192C]" />
                  <span>1. {tradeMode === 'buy' ? 'Purchasing Entity & Authorized Buyer' : 'Supplier / Manufacturer Entity'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="trade-company" className="block text-xs font-medium text-slate-700 mb-1">Company / Entity Name *</label>
                    <input
                      type="text"
                      required
                      id="trade-company"
                      value={tradeCompany}
                      onChange={(e) => setTradeCompany(e.target.value)}
                      placeholder={tradeMode === 'buy' ? 'e.g. Caribbean Industrial Supplies Ltd.' : 'e.g. Nippon Petrochemicals Corp.'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="trade-name" className="block text-xs font-medium text-slate-700 mb-1">Authorized Representative Name *</label>
                    <input
                      type="text"
                      required
                      id="trade-name"
                      value={tradeName}
                      onChange={(e) => setTradeName(e.target.value)}
                      placeholder="e.g. Marcus Thorne, Director"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label htmlFor="trade-email" className="block text-xs font-medium text-slate-700 mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      id="trade-email"
                      value={tradeEmail}
                      onChange={(e) => setTradeEmail(e.target.value)}
                      placeholder="procurement@corporate.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="trade-phone" className="block text-xs font-medium text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      id="trade-phone"
                      value={tradePhone}
                      onChange={(e) => setTradePhone(e.target.value)}
                      placeholder="+1 (868) 000-0000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Commodity Specifications */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#0B192C]" />
                  <span>2. Commodity / Product Specifications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="trade-category" className="block text-xs font-medium text-slate-700 mb-1">Target Product Division *</label>
                    <select
                      id="trade-category"
                      value={tradeCategory}
                      onChange={(e) => setTradeCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    >
                      <option value="Industrial Equipment, Food Grade Machinery & Belting">Industrial Equipment & Food Grade Machinery</option>
                      <option value="Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients">Agricultural Fertilizers (Granular Urea 46% / DAP)</option>
                      <option value="Industrial Lubricants, Greases & Process Chemicals">Industrial Lubricants & Process Chemicals</option>
                      <option value="Automotive Glass, Technical Spare Parts & Fleet Supplies">Automotive Safety Glass & Fleet Spares</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="trade-quantity" className="block text-xs font-medium text-slate-700 mb-1">
                      {tradeMode === 'buy' ? 'Order Volume / Tonnage *' : 'Available Supply Volume / Lot Size *'}
                    </label>
                    <input
                      type="text"
                      required
                      id="trade-quantity"
                      value={tradeQuantity}
                      onChange={(e) => setTradeQuantity(e.target.value)}
                      placeholder={tradeMode === 'buy' ? 'e.g. 50 Metric Tons (2 x 40ft FCL)' : 'e.g. 10,000 MT Vessel Parcel / 5 FCL'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Logistics, Incoterms & Price Target */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Ship className="w-4 h-4 text-[#0B192C]" />
                  <span>3. Logistics, Delivery Terms & Pricing</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="trade-incoterm" className="block text-xs font-medium text-slate-700 mb-1">Incoterms 2020 Preference *</label>
                    <select
                      id="trade-incoterm"
                      value={tradeIncoterm}
                      onChange={(e) => setTradeIncoterm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    >
                      <option value="FOB (Free On Board - Point Lisas)">FOB (Free On Board - Point Lisas)</option>
                      <option value="CIF (Cost, Insurance & Freight - Discharge Port)">CIF (Cost, Insurance & Freight)</option>
                      <option value="CFR (Cost and Freight - Discharge Port)">CFR (Cost and Freight)</option>
                      <option value="EXW / FCA (Staging Depot / Factory)">EXW / FCA (Factory / Staging Depot)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="trade-port" className="block text-xs font-medium text-slate-700 mb-1">
                      {tradeMode === 'buy' ? 'Discharge Port / Destination *' : 'Cargo Staging / Origin Port *'}
                    </label>
                    <input
                      type="text"
                      required
                      id="trade-port"
                      value={tradePortOrOrigin}
                      onChange={(e) => setTradePortOrOrigin(e.target.value)}
                      placeholder={tradeMode === 'buy' ? 'e.g. Port of Miami, USA' : 'e.g. Yokohama / Houston'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="trade-price" className="block text-xs font-medium text-slate-700 mb-1">
                      {tradeMode === 'buy' ? 'Target Budget / Price (Optional)' : 'Asking Price / Terms (USD) *'}
                    </label>
                    <input
                      type="text"
                      id="trade-price"
                      value={tradePriceTarget}
                      onChange={(e) => setTradePriceTarget(e.target.value)}
                      placeholder="e.g. $420 / MT USD"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="trade-notes" className="block text-xs font-medium text-slate-700 mb-1">
                    {tradeMode === 'buy' ? 'Technical Specifications / Additional Requirements' : 'Product Batch Details / Assay / Inspection Certificates'}
                  </label>
                  <textarea
                    id="trade-notes"
                    rows={3}
                    value={tradeNotes}
                    onChange={(e) => setTradeNotes(e.target.value)}
                    placeholder={
                      tradeMode === 'buy'
                        ? 'Enter specific grain sizes, API classifications, conveyor dimensions, or customs requirements...'
                        : 'Enter chemical assay percentages, date of manufacture, SGS certification details, or plant serials...'
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Consent & Submission */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={tradeConsent}
                    onChange={(e) => setTradeConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0B192C] focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I confirm that I am an authorized corporate representative. This transmission will be redirected directly to the <strong>Corporate Commercial Trade Desk</strong> under international trading confidentiality.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="trade-submit-button"
                className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-4 rounded-lg shadow-lg transition flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>
                  {tradeMode === 'buy'
                    ? 'Transmit Formal RFQ (Buy) via Email Client'
                    : 'Transmit Supplier Offer (Sell) via Email Client'}
                </span>
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-[#050B12] text-slate-400 py-16 border-t border-[#152C48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#152C48]">
            
            {/* Column 1: Brand & Model */}
            <div className="space-y-4 md:col-span-2">
              <BrandLogo variant="light" size="md" />
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mt-3">
                Premier Buyer & Merchant Exporter anchored in Trinidad & Tobago. We actively purchase bulk commodities and surplus lots from global manufacturers, while exporting certified industrial consignments across CARICOM, the Americas, and Europe.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <span className="bg-[#0B192C] px-2.5 py-1 rounded border border-[#1E3E62] text-amber-300 font-semibold">
                  Buyer & Merchant Exporter
                </span>
                <span className="bg-[#0B192C] px-2.5 py-1 rounded border border-[#1E3E62] text-slate-300">
                  Port of Point Lisas Gateway
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F1C40F] mb-4">Trade Navigation</h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li><a href="#how-we-trade" className="hover:text-white transition">Buy & Sell Trading Model</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Commodity Divisions</a></li>
                <li><a href="#procurement" className="hover:text-white transition">We Buy (Supplier Off-Take)</a></li>
                <li><a href="#calculator" className="hover:text-white transition">Freight Lead Time Calculator</a></li>
                <li><a href="#trade-desk" onClick={() => setTradeMode('buy')} className="hover:text-white transition">Request Quote (Buy)</a></li>
                <li><a href="#trade-desk" onClick={() => setTradeMode('sell')} className="hover:text-white transition">Sell to Us (Supplier Desk)</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate Contacts & Direct Desk */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F1C40F] mb-4">Corporate Headquarters</h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                  <span>92 Katwaroo Trace, Penal, Trinidad and Tobago</span>
                </div>
                <div className="flex items-start gap-2">
                  <Anchor className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                  <span>Staging Hub: Port of Point Lisas Heavy Industrial Estate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F1C40F] shrink-0" />
                  <a href="#trade-desk" className="text-amber-300 hover:underline text-xs">
                    Commercial Desk: Direct Transmission via Portal
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <p>© 2026 Jel Japan Enterprise Ltd. All rights reserved. Buyer & Merchant Exporter.</p>
            <div className="flex items-center space-x-6">
              <span className="hover:text-slate-100 transition">Confidentiality Protocol</span>
              <span className="hover:text-slate-100 transition">ICC Incoterms 2020 Standards</span>
              <span className="hover:text-slate-100 transition">STOW-TT Health & Safety</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Modal Confirmation Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#0B192C] text-center mb-1">
              {tradeMode === 'buy' ? 'RFQ Formulated & Redirected' : 'Supplier Offer Redirected'}
            </h3>
            <p className="text-slate-600 text-xs text-center mb-5">
              Your transmission has been formulated and dispatched to your email client. If it did not launch automatically, click the button below.
            </p>

            {/* Routing Target Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 text-amber-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Direct Routing Target</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900">Corporate Commercial Trade Desk • Port of Point Lisas</div>
              </div>
            </div>

            {/* Summary Details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Reference ID:</span>
                <strong className="text-[#0B192C] font-mono">{generatedRefId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trade Direction:</span>
                <strong className="text-amber-800 uppercase font-semibold">
                  {tradeMode === 'buy' ? 'Buy from Us (Export Supply)' : 'Sell to Us (Supplier Offer)'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Division:</span>
                <strong className="text-slate-800 truncate max-w-[200px]">{tradeCategory}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Volume / Lot:</span>
                <strong className="text-slate-800">{tradeQuantity}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={tradeMailtoUrl}
                className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-3 px-4 rounded-lg transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Mail className="w-4 h-4" />
                <span>Launch Email Client with Pre-filled Inquiry</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(getTradeSummaryText(generatedRefId));
                  setCopiedTradeSummary(true);
                  setTimeout(() => setCopiedTradeSummary(false), 3000);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedTradeSummary ? 'Copied Summary to Clipboard!' : 'Copy Pre-Formatted Trade Summary'}</span>
              </button>

              <button
                type="button"
                id="modal-ack-btn"
                onClick={() => {
                  setModalOpen(false);
                  setTradeCompany('');
                  setTradeName('');
                  setTradeEmail('');
                  setTradePhone('');
                  setTradeQuantity('');
                  setTradePortOrOrigin('');
                  setTradePriceTarget('');
                  setTradeNotes('');
                  setTradeConsent(false);
                }}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium py-2.5 rounded-lg transition text-xs cursor-pointer"
              >
                Acknowledge & Return to Portal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
