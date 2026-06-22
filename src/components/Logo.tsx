/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3">
      <div className={`${className} relative flex items-center justify-center overflow-hidden`}>
        <img 
          src="/store/logo_no_txt.png" 
          alt={t('common.brandName')} 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-sans text-[20px] font-semibold tracking-[-0.5px] text-brand-deep leading-none">
          {t('common.brandName')}
        </span>
        <span className="text-[12px] font-semibold text-brand-accent uppercase tracking-widest mt-0.5 leading-none">
          {t('common.tagline')}
        </span>
      </div>
    </div>
  );
};

