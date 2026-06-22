/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Legal: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const path = location.pathname;

  const getLegalContent = () => {
    switch (path) {
      case '/impressum':
        return {
          title: t('legal.pages.impressum.title'),
          subtitle: t('legal.pages.impressum.subtitle'),
          body: (
            <div className="space-y-6 text-brand-gray font-light">
              <section>
                <h3 className="text-xl font-serif text-brand-deep mb-3 italic">{t('legal.pages.impressum.headers.details')}</h3>
                <p className="whitespace-pre-line">{t('legal.pages.impressum.content.details')}</p>
              </section>
              <section>
                <h3 className="text-xl font-serif text-brand-deep mb-3 italic">{t('legal.pages.impressum.headers.represented')}</h3>
                <p className="whitespace-pre-line">{t('legal.pages.impressum.content.represented')}</p>
              </section>
              <section>
                <h3 className="text-xl font-serif text-brand-deep mb-3 italic">{t('legal.pages.impressum.headers.contact')}</h3>
                <p className="whitespace-pre-line">{t('legal.pages.impressum.content.contact')}</p>
              </section>
              <section>
                <h3 className="text-xl font-serif text-brand-deep mb-3 italic">{t('legal.pages.impressum.headers.vat')}</h3>
                <p className="whitespace-pre-line">{t('legal.pages.impressum.content.vat')}</p>
              </section>
            </div>
          )
        };
      case '/privacy':
        return {
          title: t('legal.pages.privacy.title'),
          subtitle: t('legal.pages.privacy.subtitle'),
          body: (
            <div className="space-y-6 text-brand-gray font-light">
              <p>{t('legal.pages.privacy.intro')}</p>
              {(t('legal.pages.privacy.sections', { returnObjects: true }) as any[]).map((section: any, idx: number) => (
                <section key={idx}>
                  <h3 className="text-xl font-serif text-brand-deep mb-3 italic">{section.header}</h3>
                  <p>{section.text}</p>
                </section>
              ))}
            </div>
          )
        };
      case '/terms':
        return {
          title: t('legal.pages.terms.title'),
          subtitle: t('legal.pages.terms.subtitle'),
          body: (
            <div className="space-y-6 text-brand-gray font-light">
              <p>{t('legal.pages.terms.intro')}</p>
              {(t('legal.pages.terms.sections', { returnObjects: true }) as any[]).map((section: any, idx: number) => (
                <section key={idx}>
                  <h3 className="text-xl font-serif text-brand-deep mb-3 italic">{section.header}</h3>
                  <p>{section.text}</p>
                </section>
              ))}
            </div>
          )
        };
      default:
        return { title: 'Legal', subtitle: 'Compliance', body: null };
    }
  };

  const content = getLegalContent();

  return (
    <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto">
      <header className="mb-12 border-b border-brand-deep/5 pb-8">
        <h1 className="text-5xl font-serif mb-2">{content.title}</h1>
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-primary/40 italic">{content.subtitle}</p>
      </header>
      {content.body}
    </div>
  );
};
