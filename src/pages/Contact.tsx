/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-serif mb-8">{t('contact.title')}</h1>
          <p className="text-xl text-brand-gray font-light leading-relaxed mb-12">
            {t('contact.description')}
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[var(--nav-bg)] rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-border">
                <Mail className="text-brand-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('contact.info.email')}</h4>
                <p className="text-brand-deep font-medium">webmaster@rentnshred.de</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[var(--nav-bg)] rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-border">
                <Phone className="text-brand-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('contact.info.phone')}</h4>
                <p className="text-brand-deep font-medium">+49 1520 8181603 (WhatsApp)</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[var(--nav-bg)] rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-brand-border">
                <MapPin className="text-brand-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('contact.info.basecamp')}</h4>
                <p className="text-brand-deep font-medium">Lindwurmstrasse 100, 80337, Munich</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--card-bg)] p-10 rounded-3xl shadow-xl border border-brand-border transition-colors duration-300"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-2">{t('contact.labels.firstName')}</label>
                  <input required type="text" className="w-full bg-brand-bg/50 border border-brand-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-colors text-brand-deep" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-2">{t('contact.labels.lastName')}</label>
                  <input required type="text" className="w-full bg-brand-bg/50 border border-brand-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-colors text-brand-deep" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-2">{t('contact.labels.email')}</label>
                <input required type="email" className="w-full bg-brand-bg/50 border border-brand-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-colors text-brand-deep" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-2">{t('contact.labels.message')}</label>
                <textarea required rows={5} className="w-full bg-brand-bg/50 border border-brand-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none text-brand-deep"></textarea>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3">
                {t('contact.submit')}
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif mb-4">{t('contact.success')}</h3>
              <p className="text-brand-gray font-light">
                {t('contact.successMsg')}
              </p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="mt-8 text-xs uppercase tracking-widest font-bold text-brand-primary underline"
              >
                {t('contact.sendAnother')}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
