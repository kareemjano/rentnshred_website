/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Snowboard' | 'Surfboard' | 'Skateboard' | 'Inline Skates' | 'Boat';

export interface Equipment {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  hide?: boolean;
  specs: {
    size: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
    material?: string;
    weight?: string;
    volume?: string;
  };
  addOns?: string[];
  deposit?: number;
}

export interface PricingTier {
  id: string;
  days: number;
  labelKey: string;
}

export interface CategoryPricing {
  [durationId: string]: number;
  dailyComparison: number;
}

export interface PricingConfig {
  durations: PricingTier[];
  basePricing: {
    [category in Category]: CategoryPricing;
  };
}
