import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';
import { PRODUCTS, ADDONS } from './data';

// Dynamically generate the localized product items from our unified data.ts
const enItems: Record<string, { name: string; desc: string }> = {};
const deItems: Record<string, { name: string; desc: string }> = {};

for (const [id, product] of Object.entries(PRODUCTS)) {
  enItems[id] = {
    name: product.en.name,
    desc: product.en.description
  };
  deItems[id] = {
    name: product.de.name,
    desc: product.de.description
  };
}

const enAddons: Record<string, { name: string; desc: string }> = {};
const deAddons: Record<string, { name: string; desc: string }> = {};

for (const [id, addon] of Object.entries(ADDONS)) {
  enAddons[id] = {
    name: addon.en.name,
    desc: addon.en.description
  };
  deAddons[id] = {
    name: addon.de.name,
    desc: addon.de.description
  };
}

const finalEn = {
  ...enTranslations,
  items: enItems,
  addons: enAddons
};

const finalDe = {
  ...deTranslations,
  items: deItems,
  addons: deAddons
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: finalEn },
      de: { translation: finalDe },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
