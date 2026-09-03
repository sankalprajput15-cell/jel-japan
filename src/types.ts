export interface CommodityDivision {
  id: string;
  category: 'div1' | 'div2' | 'div3' | 'div4';
  categoryLabel: string;
  title: string;
  hsCode: string;
  stockStatus: string;
  description: string;
  origin: string;
  packaging: string;
  minOrder: string;
  keySpecs: string[];
  weBuySpec: string;
  weSellSpec: string;
}

export interface ProcurementCategory {
  id: string;
  title: string;
  description: string;
  preferredTerms: string;
  volumeNeeded: string;
  specs: string[];
}

export interface PortRoute {
  portName: string;
  country: string;
  corridor: string;
  transitDays: string;
  departureFrequency: string;
  recommendedIncoterm: string;
}

export interface TradeInquiryData {
  tradeType: 'buy' | 'sell'; // 'buy' = client wants to buy from Jel Japan; 'sell' = supplier wants to sell to Jel Japan
  company: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  incoterm: string;
  port: string;
  priceTarget?: string;
  notes: string;
  consent: boolean;
}

