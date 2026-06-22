/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRODUCTS, ADDONS } from '../data';
import { Category } from '../types';

export const DURATIONS = [
  { id: "1day", days: 1, labelKey: "equipment.pricing.durations.1day" },
  { id: "2days", days: 2, labelKey: "equipment.pricing.durations.2days" },
  { id: "1week", days: 7, labelKey: "equipment.pricing.durations.1week" }
];

export const getDurations = () => DURATIONS;

// Helper to find representative product in a category
const getProductForCategory = (category: Category) => {
  return Object.values(PRODUCTS).find(p => p.category === category && !p.hide) || 
         Object.values(PRODUCTS).find(p => p.category === category);
};

export const getPriceForDuration = (category: Category, durationId: string): number => {
  const days = DURATIONS.find(d => d.id === durationId)?.days || 0;
  const product = getProductForCategory(category);
  if (!product) return 0;

  const found = product.pricing.find(p => {
    if (p.unit === 'd') return p.duration === days;
    if (p.unit === 'w') return p.duration * 7 === days;
    return false;
  });
  return found ? found.price : 0;
};

// Product-specific price lookup
export const getProductPriceForDuration = (productId: string, durationId: string): number => {
  const days = DURATIONS.find(d => d.id === durationId)?.days || 0;
  const product = PRODUCTS[productId];
  if (!product) return 0;

  const found = product.pricing.find(p => {
    if (p.unit === 'd') return p.duration === days;
    if (p.unit === 'w') return p.duration * 7 === days;
    return false;
  });
  return found ? found.price : 0;
};

export const getStartingPrice = (category: Category): number => {
  const product = getProductForCategory(category);
  if (product && product.pricing.length > 0) {
    return product.pricing[0].price;
  }
  return 0;
};

export const getProductStartingPrice = (productId: string): number => {
  const product = PRODUCTS[productId];
  if (product && product.pricing.length > 0) {
    return product.pricing[0].price;
  }
  return 0;
};

export const getDailyComparison = (category: Category): number => {
  const product = getProductForCategory(category);
  return product ? product.dailyComparison : 0;
};

export const getProductDailyComparison = (productId: string): number => {
  const product = PRODUCTS[productId];
  return product ? product.dailyComparison : 0;
};

// Addon-specific price lookup
export const getAddOnPriceForDuration = (addOnId: string, durationId: string): number => {
  const days = DURATIONS.find(d => d.id === durationId)?.days || 0;
  const addon = ADDONS[addOnId];
  if (!addon) return 0;

  const found = addon.pricing.find(p => {
    if (p.unit === 'd') return p.duration === days;
    if (p.unit === 'w') return p.duration * 7 === days;
    return false;
  });
  return found ? found.price : 0;
};

export const getAddOnStartingPrice = (addOnId: string): number => {
  const addon = ADDONS[addOnId];
  if (addon && addon.pricing.length > 0) {
    return addon.pricing[0].price;
  }
  return 0;
};

export const getAddOnDailyComparison = (addOnId: string): number => {
  const addon = ADDONS[addOnId];
  return addon ? addon.dailyComparison : 0;
};
