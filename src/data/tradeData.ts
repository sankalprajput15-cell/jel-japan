import { CommodityDivision, PortRoute, ProcurementCategory } from '../types';

export const COMMODITY_DIVISIONS: CommodityDivision[] = [
  {
    id: 'div1',
    category: 'div1',
    categoryLabel: 'Machinery & Equipment',
    title: 'Industrial Equipment, Food Grade Machinery & Belting',
    hsCode: 'HS 8438 / 3926 / 8422',
    stockStatus: 'Active Buy & Sell Division',
    description:
      'High-precision stainless steel food processing machinery, automated bottling & packaging lines, heavy-duty industrial conveyor belting, and vulcanized rollers engineered for severe processing environments.',
    origin: 'Japan, Germany & South Korea',
    packaging: '20ft / 40ft FCL & ISPM-15 Wooden Crates',
    minOrder: '1 Metric Ton / 1 Production Unit',
    keySpecs: [
      'AISI 304 & 316 Stainless Contact Surfaces',
      'Food Grade FDA & CE Machinery Compliance',
      'High-Tensile Multi-Ply Polyester Belting',
      'Complete Technical Manuals & Spares Support',
    ],
    weBuySpec:
      'We BUY surplus factory equipment, complete bottling lines, food plant decommissions, virgin multi-ply conveyor rolls, and OEM industrial machinery from certified manufacturers.',
    weSellSpec:
      'We EXPORT reconditioned & brand-new turn-key machinery, customized conveyor assemblies, and certified plant spares with installation manuals across CARICOM & Latin America.',
  },
  {
    id: 'div2',
    category: 'div2',
    categoryLabel: 'Agricultural Nutrients',
    title: 'Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients',
    hsCode: 'HS 3102 / 3105 / 2834',
    stockStatus: 'Active Buy & Sell Division',
    description:
      'Point Lisas petrochemical corridor synthesized Granular Urea (46% N), DAP, MAP, and specialty micronutrient blends packaged for commercial agro-estates and regional distributor networks.',
    origin: 'Trinidad & Tobago (Point Lisas Industrial Estate)',
    packaging: '50kg Woven Polypropylene Bags & 1,000kg Jumbo FIBC Big Bags',
    minOrder: '24 Metric Tons (1 x 20ft FCL) / Breakbulk',
    keySpecs: [
      'Nitrogen: 46% min (Prilled / Granular Urea)',
      'Biuret: 1.0% max | Moisture: 0.5% max',
      'Anti-caking conditioned for tropical transit',
      'Certificate of Analysis (COA) per batch included',
    ],
    weBuySpec:
      'We BUY bulk urea allocations, synthetic nitrogen compounds, raw phosphate rock, and potash from petrochemical plants, mines, and international trading houses with LC / Cash terms.',
    weSellSpec:
      'We EXPORT 50kg bagged and 1,000kg bulk FIBC fertilizers, containerized FCL or chartered breakbulk vessels directly to agricultural cooperatives, distributors, and governments.',
  },
  {
    id: 'div3',
    category: 'div3',
    categoryLabel: 'Lubricants & Chemicals',
    title: 'Industrial Lubricants, Greases & Process Chemicals',
    hsCode: 'HS 2710 / 3403 / 2814',
    stockStatus: 'Active Buy & Sell Division',
    description:
      'Heavy-duty diesel engine oils, ISO VG hydraulic fluids, extreme pressure gear oils, synthetic compressor lubricants, and high-temp lithium complex greases tailored for maritime and energy fleets.',
    origin: 'United States, Japan & Trinidad',
    packaging: '208L (55 Gallon) Steel Drums & 1,000L Intermediate Bulk Containers (IBC)',
    minOrder: '4 Drums / 1 IBC Tote / 20ft Mixed FCL',
    keySpecs: [
      'API CK-4 / CI-4 / SN Heavy-Duty Certifications',
      'ISO Cleanliness Codes: 16/14/11 or cleaner',
      'Operating Temperature Range: -25°C to +180°C',
      'MSDS & REACH Compliant Safety Documentation',
    ],
    weBuySpec:
      'We BUY virgin Group I/II/III base oils, chemical feedstocks, industrial additive packages, and packaged drum inventory from blenders and petrochemical refineries.',
    weSellSpec:
      'We EXPORT finished API-licensed lubricants, marine grade turbine oils, hydraulic drums, and IBC totes to commercial fleets, offshore rigs, and logistics operators.',
  },
  {
    id: 'div4',
    category: 'div4',
    categoryLabel: 'Automotive & Technical',
    title: 'Automotive Glass, Technical Spare Parts & Fleet Supplies',
    hsCode: 'HS 7007 / 8708 / 4016',
    stockStatus: 'Active Buy & Sell Division',
    description:
      'OEM & premium aftermarket laminated windshields, tempered curved side glass, suspension assemblies, commercial filter kits, and heavy commercial vehicle wear components.',
    origin: 'Japan, Taiwan & North America',
    packaging: 'Custom Plywood Export Crating with Cushioning',
    minOrder: '1 Wooden Crate / 25 Units mixed assortment',
    keySpecs: [
      'DOT / ECE R43 Safety Glass Certification',
      'High Optical Clarity & UV-Resistant Interlayer',
      'Customized VIN-Matched Fleet Supply Contracts',
      'Zero-Breakage Transit Guarantee with Marine Insurance',
    ],
    weBuySpec:
      'We BUY containerized automotive glass lots, surplus OEM replacement parts, commercial vehicle suspensions, and Japanese commercial spare inventories directly from manufacturers.',
    weSellSpec:
      'We EXPORT securely crated automotive safety glass assortments, commercial transport spares, and fleet replenishment consignments throughout the Caribbean basin.',
  },
];

export const PROCUREMENT_WANTED: ProcurementCategory[] = [
  {
    id: 'proc-1',
    title: 'Agricultural Commodities & Chemical Fertilizers',
    description:
      'Actively purchasing Granular Urea (46% Nitrogen), DAP (18-46-0), NPK granular complexes, and soil conditioner compounds. Direct mill and petrochemical off-take.',
    preferredTerms: 'FOB Origin / CIF Port of Point Lisas / EXW Factory',
    volumeNeeded: 'Minimum 500 MT to 25,000 MT Vessel Parcels',
    specs: ['Nitrogen 46% min', 'Standard moisture < 0.5%', 'Anti-caking treated', 'Batch COA inspection'],
  },
  {
    id: 'proc-2',
    title: 'Base Oils, Finished Lubricants & Specialty Solvents',
    description:
      'Purchasing Group II and Group III paraffinic base oils, heavy-duty engine oil drum lots, and industrial glycols for regional blending and redistribution.',
    preferredTerms: 'Flexi-Tanks / ISO Tanks / 208L Steel Drummed FCL',
    volumeNeeded: '1 to 10 FCL Containers / Monthly Supply Contracts',
    specs: ['API CI-4/CK-4 standards', 'ISO VG 46/68 viscosity', 'Certificate of origin', 'Full SDS documentation'],
  },
  {
    id: 'proc-3',
    title: 'Industrial Machinery & Surplus Production Lines',
    description:
      'Seeking food processing equipment, commercial conveyor belting, bottling lines, stainless steel jacketed mixing tanks, and packaging automation machinery.',
    preferredTerms: 'Ex-Works / FOB Port of Origin / As-is, Where-is with Inspection',
    volumeNeeded: 'Single production units to complete turnkey plant inventory',
    specs: ['AISI 304/316 contact surfaces', 'CE / UL / ISO documentation', 'Detailed maintenance logbooks'],
  },
  {
    id: 'proc-4',
    title: 'Automotive Safety Glass & Fleet Replacements',
    description:
      'Procuring laminated windshields, tempered curved side glass, and heavy commercial truck replacement parts from certified glass manufacturers.',
    preferredTerms: 'FOB Port of Origin / CIF Port of Point Lisas',
    volumeNeeded: '20ft / 40ft FCL Specialized Export Wooden Crates',
    specs: ['DOT / ECE R43 certified', 'Optical grade PVB interlayer', 'Export crated & strapped'],
  },
];

export const PORT_ROUTES: PortRoute[] = [
  {
    portName: 'Port of Point Lisas',
    country: 'Trinidad & Tobago',
    corridor: 'Origin Terminal Hub',
    transitDays: '0 Days (Loading Port)',
    departureFrequency: 'Daily Feeder & Bulk Berthing',
    recommendedIncoterm: 'FOB / EXW / FAS',
  },
  {
    portName: 'Port of Kingston',
    country: 'Jamaica',
    corridor: 'Northern CARICOM Hub',
    transitDays: '3 - 5 Business Days',
    departureFrequency: 'Twice Weekly Sailings',
    recommendedIncoterm: 'CIF / CFR Kingston',
  },
  {
    portName: 'Port of Bridgetown',
    country: 'Barbados',
    corridor: 'Eastern Caribbean Hub',
    transitDays: '2 - 3 Business Days',
    departureFrequency: '3x Weekly Feeder Sailings',
    recommendedIncoterm: 'CIF Bridgetown',
  },
  {
    portName: 'Port of Georgetown',
    country: 'Guyana',
    corridor: 'South American Energy Corridor',
    transitDays: '3 - 4 Business Days',
    departureFrequency: 'Weekly Scheduled Barge & Container',
    recommendedIncoterm: 'CIF / DAP Georgetown',
  },
  {
    portName: 'Port of Rotterdam',
    country: 'Netherlands',
    corridor: 'European Transatlantic Gateway',
    transitDays: '18 - 22 Business Days',
    departureFrequency: 'Weekly Transatlantic Service',
    recommendedIncoterm: 'CIF / CFR Rotterdam',
  },
  {
    portName: 'Port of Houston',
    country: 'United States',
    corridor: 'US Gulf Coast Energy Corridor',
    transitDays: '7 - 10 Business Days',
    departureFrequency: 'Weekly Direct Container Call',
    recommendedIncoterm: 'CIF Houston / FOB Pt. Lisas',
  },
  {
    portName: 'Port of Yokohama',
    country: 'Japan',
    corridor: 'Asia-Pacific Transpacific Corridor',
    transitDays: '35 - 42 Business Days',
    departureFrequency: 'Bi-Weekly Global Ocean Service',
    recommendedIncoterm: 'CIF Yokohama / CFR',
  },
];

export const INCOTERMS_INFO = [
  {
    code: 'FOB (Free On Board)',
    title: 'Free On Board (Port of Point Lisas)',
    desc: 'Seller fulfills obligation when goods pass ship rail at Point Lisas. Buyer handles ocean freight, marine insurance, and import clearance.',
    bestFor: 'Buyers with established ocean freight carrier contracts and global maritime insurance.',
  },
  {
    code: 'CIF (Cost, Insurance & Freight)',
    title: 'Cost, Insurance & Freight (Discharge Port)',
    desc: 'Jel Japan Enterprise covers all export documentation, terminal handling, ocean freight, and primary marine cargo insurance to designated destination port.',
    bestFor: 'Regional distributors seeking turn-key port-to-port logistics with guaranteed cargo cover.',
  },
  {
    code: 'CFR (Cost & Freight)',
    title: 'Cost and Freight (Discharge Port)',
    desc: 'Seller pays for carriage of goods up to named port of destination. Buyer procures own marine transit insurance policy from point of vessel loading.',
    bestFor: 'Importers holding blanket global marine cargo policies with their domestic underwriters.',
  },
  {
    code: 'EXW / FCA (Factory / Port Gateway)',
    title: 'Ex Works / Free Carrier (Point Lisas Warehouse)',
    desc: 'Buyer assumes all transport risks and logistics directly from our Point Lisas bonded export staging facility.',
    bestFor: 'Domestic Caribbean freight forwarders consolidating multiple client consignments.',
  },
];
