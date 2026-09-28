// BuildMart Product Catalog Data
const products = [
  {
    id: "prod-001",
    name: "UltraTech Super Premium Cement (50kg)",
    category: "Cement & Concrete",
    brand: "UltraTech",
    price: 395,
    unit: "bag",
    inStock: 850,
    moq: 10,
    bulkDiscount: { minQty: 50, discountPercent: 8 },
    rating: 4.9,
    reviewsCount: 312,
    badge: "Best Seller",
    description: "High-performance Portland Pozzolana Cement (PPC) engineered with micro-fine particles for dense, crack-resistant concrete slabs and foundations.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Grade": "PPC 53 Equivalent",
      "Weight": "50 kg / bag",
      "Setting Time": "Initial: 45 min, Final: 280 min",
      "Standard Compliance": "IS 1489 Part 1",
      "Storage": "Keep dry, elevated off ground"
    }
  },
  {
    id: "prod-002",
    name: "Tata Tiscon 550D TMT Steel Rebar (12mm)",
    category: "Steel & Structural",
    brand: "Tata Steel",
    price: 68500,
    unit: "ton",
    inStock: 45,
    moq: 1,
    bulkDiscount: { minQty: 5, discountPercent: 5 },
    rating: 4.95,
    reviewsCount: 184,
    badge: "Contractor Pick",
    description: "Super ductile earthquake-resistant thermo-mechanically treated rebar. High yield strength ideal for critical load-bearing columns and beams.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Diameter": "12 mm",
      "Length": "12 meters / rod",
      "Yield Strength": "550 N/mm² minimum",
      "Elongation": "16% minimum",
      "Certification": "BIS IS 1786:2008"
    }
  },
  {
    id: "prod-003",
    name: "Red Kiln-Fired Structural Clay Bricks (Class 1)",
    category: "Bricks & Masonry",
    brand: "Bharat Brickworks",
    price: 9.50,
    unit: "piece",
    inStock: 25000,
    moq: 1000,
    bulkDiscount: { minQty: 5000, discountPercent: 10 },
    rating: 4.7,
    reviewsCount: 96,
    badge: "Direct from Kiln",
    description: "Machine-moulded, deep kiln-fired solid red clay bricks offering high compressive strength and low water absorption for exterior load-bearing walls.",
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Dimensions": "9 x 4.25 x 2.75 inches",
      "Compressive Strength": "> 10.5 N/mm²",
      "Water Absorption": "< 15% by weight",
      "Color": "Deep Terracotta Red"
    }
  },
  {
    id: "prod-004",
    name: "Washed River Sand (Coarse Grade for Concreting)",
    category: "Aggregates & Sand",
    brand: "BuildMart Bulk Supply",
    price: 1850,
    unit: "ton",
    inStock: 300,
    moq: 5,
    bulkDiscount: { minQty: 20, discountPercent: 7 },
    rating: 4.8,
    reviewsCount: 142,
    badge: "Triple Washed",
    description: "Naturally sourced, zero-silt triple washed coarse river sand (Zone II) ideal for plastering, mortar, and heavy structural concrete mixing.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Zone": "Zone II (Coarse)",
      "Silt Content": "Less than 2.5%",
      "Specific Gravity": "2.65",
      "Moisture": "Dry screen tested"
    }
  },
  {
    id: "prod-005",
    name: "Dr. Fixit Fastflex Waterproofing Membrane (12kg)",
    category: "Paints & Waterproofing",
    brand: "Dr. Fixit",
    price: 2450,
    unit: "bucket",
    inStock: 120,
    moq: 1,
    bulkDiscount: { minQty: 10, discountPercent: 12 },
    rating: 4.85,
    reviewsCount: 220,
    badge: "10-Year Warranty",
    description: "Two-component polymer modified elastomeric waterproofing coating for terrace slabs, sunken bathrooms, and water retention tanks.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Coverage": "1.5 kg/sq.m in two coats",
      "Elongation at Break": "120%",
      "Pot Life": "45 minutes at 30°C",
      "Application": "Brush or roller"
    }
  },
  {
    id: "prod-006",
    name: "Supreme Schedule 40 PVC Drainage Pipe (110mm x 6m)",
    category: "Pipes & Plumbing",
    brand: "Supreme Industries",
    price: 820,
    unit: "piece",
    inStock: 420,
    moq: 5,
    bulkDiscount: { minQty: 30, discountPercent: 8 },
    rating: 4.75,
    reviewsCount: 78,
    badge: "UV Stabilized",
    description: "Lead-free, heavy-duty rigid PVC pipe designed for subterranean wastewater drainage and soil-waste-rainwater (SWR) building stacks.",
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Outer Diameter": "110 mm (4 inch)",
      "Length": "6 Meters (20 ft)",
      "Pressure Rating": "Class 3 (6 kgf/cm²)",
      "Joint Type": "Solvent cement socket joint"
    }
  },
  {
    id: "prod-007",
    name: "Kajaria Glazed Vitrified Floor Tiles - Calacatta Gold (60x120cm)",
    category: "Tiles & Flooring",
    brand: "Kajaria",
    price: 78,
    unit: "sq.ft",
    inStock: 4800,
    moq: 100,
    bulkDiscount: { minQty: 500, discountPercent: 12 },
    rating: 4.9,
    reviewsCount: 165,
    badge: "Luxury Finish",
    description: "Premium large-format vitrified marble finish tiles with nano-polished surface, stain resistance, and high breaking strength.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Tile Size": "600 x 1200 mm (2x4 ft)",
      "Thickness": "9 mm",
      "Pieces / Box": "2 pieces (15.5 sq.ft)",
      "Surface Finish": "High Gloss Polished",
      "Stain Resistance": "Class 5"
    }
  },
  {
    id: "prod-008",
    name: "Bosch Professional Rotary Hammer Drill GBH 2-26 DRE",
    category: "Tools & Equipment",
    brand: "Bosch",
    price: 8990,
    unit: "piece",
    inStock: 65,
    moq: 1,
    bulkDiscount: { minQty: 3, discountPercent: 6 },
    rating: 4.92,
    reviewsCount: 410,
    badge: "Industrial Grade",
    description: "800W fast drilling speed SDS-plus rotary hammer with rotation stop for chiselling into reinforced concrete and solid masonry.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Rated Power": "800 W",
      "Impact Energy": "2.7 Joules",
      "Drilling Dia Concrete": "4 - 26 mm",
      "Weight": "2.8 kg",
      "Warranty": "1 Year Manufacturer"
    }
  },
  {
    id: "prod-009",
    name: "Birla White Wall Care Putty (40kg)",
    category: "Paints & Waterproofing",
    brand: "Birla White",
    price: 920,
    unit: "bag",
    inStock: 350,
    moq: 4,
    bulkDiscount: { minQty: 25, discountPercent: 10 },
    rating: 4.8,
    reviewsCount: 198,
    badge: "Extra Smooth",
    description: "White cement-based polymer enhanced water resistant putty that provides a mirror-smooth finish for plaster walls prior to painting.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Coverage": "14 - 16 sq.ft / kg (2 coats)",
      "Pot Life": "2 - 2.5 hours",
      "Whiteness Index": "> 94% Hunter",
      "Weight": "40 kg"
    }
  },
  {
    id: "prod-010",
    name: "ACC Suraksha Power+ Concrete Cement (50kg)",
    category: "Cement & Concrete",
    brand: "ACC",
    price: 390,
    unit: "bag",
    inStock: 600,
    moq: 10,
    bulkDiscount: { minQty: 50, discountPercent: 8 },
    rating: 4.85,
    reviewsCount: 215,
    badge: "Engineered for Slabs",
    description: "Engineered with water-repellent active silicates for rust prevention on steel reinforcement and extended structure durability.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Grade": "PPC Composite",
      "Water Repellence": "Active Hydrophobic Shield",
      "Net Weight": "50 kg",
      "Standards": "IS 455 / IS 1489"
    }
  },
  {
    id: "prod-011",
    name: "Crushed Blue Granite Aggregate (20mm Metal)",
    category: "Aggregates & Sand",
    brand: "BuildMart Bulk Supply",
    price: 1450,
    unit: "ton",
    inStock: 500,
    moq: 5,
    bulkDiscount: { minQty: 20, discountPercent: 6 },
    rating: 4.78,
    reviewsCount: 110,
    badge: "Crusher Direct",
    description: "Machine-crushed angular hard blue metal granite aggregates (20mm nominal size) for high compressive RCC columns, slabs, and footings.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Nominal Size": "20 mm",
      "Flakiness Index": "< 25%",
      "Crushing Value": "< 24%",
      "Delivery Mode": "10-wheel tipper truck"
    }
  },
  {
    id: "prod-012",
    name: "DeWalt 20V MAX Cordless Impact Driver Kit",
    category: "Tools & Equipment",
    brand: "DeWalt",
    price: 14800,
    unit: "piece",
    inStock: 30,
    moq: 1,
    bulkDiscount: { minQty: 2, discountPercent: 5 },
    rating: 4.96,
    reviewsCount: 175,
    badge: "Pro Contractor",
    description: "Brushless motor delivering 205 Nm of torque with 3-speed settings, 2x 4.0Ah XR Li-Ion batteries, charger, and heavy-duty TSTAK case.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    specifications: {
      "Voltage": "20V Max",
      "Max Torque": "205 Nm",
      "No Load Speed": "0-1000 / 2800 / 3250 RPM",
      "Weight": "1.34 kg (tool only)"
    }
  }
];

module.exports = products;
