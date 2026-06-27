/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Equipment } from './types';

// Parameter to show or hide the About page
export const SHOW_ABOUT_PAGE = false;

// Parameter to hide the Contact page
export const HIDE_CONTACT_PAGE = true;

export interface ProductLocaleData {
  name: string;
  description: string;
}

export interface ProductPricing {
  duration: number;
  unit: 'd' | 'w' | 'm' | 'y';
  price: number;
}

export interface Product {
  id: string;
  category: Category;
  image: string;
  hide?: boolean;
  specs: {
    size: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
    material?: string;
    weight?: string;
    volume?: string;
  };
  en: ProductLocaleData;
  de: ProductLocaleData;
  pricing: ProductPricing[];
  dailyComparison: number;
  addOns?: string[];
  deposit?: number;
}

export interface AddOn {
  id: string;
  image?: string;
  en: ProductLocaleData;
  de: ProductLocaleData;
  pricing: ProductPricing[];
  dailyComparison: number;
  specs: {
    size: string;
    material?: string;
  }
}

export const ADDONS: Record<string, AddOn> = {
  'neoprene54-quick-1': {
    id: 'neoprene54-quick-1',
    image: '/store/quiksilver-wetsuit.png',
    specs: {
      size: 'MS (172-177cm, 65-75kg)',
    },
    en: {
      name: 'Neoprene 5/4/3 Quiksilver Wetsuit Chest Zip',
      description: 'Keeps you warm while still having full range of motion. Suitable for cold waters.',
    },
    de: {
      name: 'Quiksilver Neoprenanzug 5/4/3 Chest-Zip',
      description: 'Hält dich warm und bietet gleichzeitig volle Bewegungsfreiheit. Ideal für kaltes Wasser.',
    },
    pricing: [
      { duration: 1, unit: 'd', price: 15 },
      { duration: 2, unit: 'd', price: 25 },
      { duration: 1, unit: 'w', price: 45 },
    ],
    dailyComparison: 35,
  },
  'neoprene2-summer-1': {
    id: 'neoprene2-summer-1',
    image: '/store/cressi-wetsuit.jpeg',
    specs: {
      size: 'S (164-173cm, 60-68kg)',
    },
    en: {
      name: 'Neoprene 2.5 Cressi Wetsuit Back-Zip',
      description: 'Ideal for the hot days and having that summer vibes.',
    },
    de: {
      name: 'Cressi Neoprenanzug 2.5 Back-Zip',
      description: 'Ideal für heiße Tage und echte Sommer-Vibes.',
    },
    pricing: [
      { duration: 1, unit: 'd', price: 5 },
      { duration: 2, unit: 'd', price: 10 },
      { duration: 1, unit: 'w', price: 25 },
    ],
    dailyComparison: 10,
  },
}

export const PRODUCTS: Record<string, Product> = {
  'sb-01': {
    id: 'sb-01',
    category: 'Snowboard',
    image: '/store/snowboard1.png',
    hide: true,
    specs: {
      size: '156cm',
      skillLevel: 'Intermediate',
      material: 'Carbon Fiber & Poplar Core',
      weight: '2.8kg'
    },
    en: {
      name: 'Alpine Peak Snowboard',
      description: 'An all-mountain versatile board designed for smooth carving and effortless turns in deep powder.'
    },
    de: {
      name: 'Alpine Peak Snowboard',
      description: 'Ein vielseitiges All-Mountain-Board für geschmeidiges Carving und mühelose Schwünge im Tiefschnee.'
    },
    pricing: [
      { duration: 1, unit: 'd', price: 15 },
      { duration: 2, unit: 'd', price: 25 },
      { duration: 1, unit: 'w', price: 45 }
    ],
    dailyComparison: 35,
    deposit: 100
  },
  'boot-01': {
    id: 'boot-01',
    category: 'Water Sports',
    image: '/store/schlauchboot1_2.png',
    hide: false,
    specs: {
      size: '2 People',
      skillLevel: 'Beginner'
    },
    addOns: ['neoprene54-quick-1', 'neoprene2-summer-1'],
    en: {
      name: 'Explorer Inflatable Boat',
      description: "The boat is suitable for 2 people. It's a great choice for an Isar River tour."
    },
    de: {
      name: 'Explorer Schlauchboot',
      description: 'Das Boot ist für 2 Personen geeignet. Es ist eine tolle Wahl für eine Isar-Flusstour.'
    },
    pricing: [
      { duration: 1, unit: 'd', price: 15 },
      { duration: 2, unit: 'd', price: 25 },
      { duration: 1, unit: 'w', price: 45 }
    ],
    dailyComparison: 35,
    deposit: 50
  },
  'surf-01': {
    id: 'surf-01',
    category: 'Water Sports',
    image: '/store/surfboard1.png',
    hide: false,
    specs: {
      size: '7"',
      skillLevel: 'Beginner',
      volume: '60 Liters'
    },
    addOns: ['neoprene54-quick-1', 'neoprene2-summer-1'],
    en: {
      name: 'Olian 7" Surfboard',
      description: "A stable Surfboard perfect for Munich's E2 wave."
    },
    de: {
      name: 'Olian 7" Surfbrett',
      description: 'Ein stabiles Surfbrett, ideal für die Münchner E2-Welle.'
    },
    pricing: [
      { duration: 1, unit: 'd', price: 15 },
      { duration: 2, unit: 'd', price: 25 },
      { duration: 1, unit: 'w', price: 45 }
    ],
    dailyComparison: 35,
    deposit: 100
  },
  'skate-01': {
    id: 'skate-01',
    category: 'Skateboard',
    image: '/store/skateboard1.png',
    hide: false,
    specs: {
      size: "27.5\" (70cm) 8.26\" (21cm)",
      skillLevel: 'Beginner',
      weight: "2.24kg"
    },
    addOns: ['helmet-01'],
    en: {
      name: 'Cruiser Yamba 500 Palm Wood',
      description: 'A sleek cruiser designed for smooth rides and tight turns through city streets.'
    },
    de: {
      name: 'Cruiser Yamba 500 Palm Wood',
      description: 'Ein schicker Cruiser für geschmeidige Fahrten und enge Kurven durch die Straßen der Stadt.'
    },
    pricing: [
      { duration: 1, unit: 'd', price: 10 },
      { duration: 2, unit: 'd', price: 15 },
      { duration: 1, unit: 'w', price: 30 }
    ],
    dailyComparison: 20,
    deposit: 50
  },
  'skate-02': {
    id: 'skate-02',
    category: 'Skateboard',
    image: '/store/skateboard2.png',
    hide: false,
    specs: {
      size: "30.2\" (78.2cm) 8.7\" (22.2cm)",
      skillLevel: 'Beginner',
      weight: "2.24kg"
    },
    addOns: ['helmet-01'],
    en: {
      name: 'Cruiser Yamba 900 Tiger',
      description: 'A mix of a cruiser and a skateboard. Great for the city but its also possible to do some tricks with it.'
    },
    de: {
      name: 'Cruiser Yamba 900 Tiger',
      description: 'Eine Mischung aus Cruiser und Skateboard. Ideal für die Stadt, aber man kann damit auch einige Tricks machen.'
    },
    pricing: [
      { duration: 1, unit: 'd', price: 10 },
      { duration: 2, unit: 'd', price: 15 },
      { duration: 1, unit: 'w', price: 30 }
    ],
    dailyComparison: 20,
    deposit: 50
  },
};



export const EQUIPMENT: Equipment[] = Object.entries(PRODUCTS).map(([id, product]) => ({
  id,
  name: product.en.name,
  category: product.category,
  description: product.en.description,
  image: product.image,
  hide: product.hide,
  specs: product.specs,
  addOns: product.addOns,
  deposit: product.deposit
}));
