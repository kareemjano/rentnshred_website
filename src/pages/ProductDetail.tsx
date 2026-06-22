/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { EQUIPMENT, ADDONS } from '../data';
import { 
  ChevronLeft, Info, Calendar, Ruler, Award, ShieldCheck, TrendingDown, Coins,
  Share2, Copy, Check, MessageCircle, Send, Mail, ExternalLink, X 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  getDurations, 
  getProductPriceForDuration, 
  getProductDailyComparison, 
  getProductStartingPrice, 
  getAddOnPriceForDuration, 
  getAddOnDailyComparison 
} from '../lib/pricing';

export const ProductDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const durations = getDurations();
  const [selectedDuration, setSelectedDuration] = React.useState(durations[0].id);
  const [selectedAddOns, setSelectedAddOns] = React.useState<string[]>([]);
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = EQUIPMENT.find((p) => p.id === id && !p.hide);

  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  
  const [isReserveModalOpen, setIsReserveModalOpen] = React.useState(false);
  const [reserveTab, setReserveTab] = React.useState<'kleinanzeigen' | 'direct'>('kleinanzeigen');
  
  const [formData, setFormData] = React.useState({
    dateFrom: '',
    name: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  React.useEffect(() => {
    setSelectedAddOns([]);
    setFormSubmitted(false);
    setShowShareMenu(false);
    setFormData({
      dateFrom: '',
      name: '',
      notes: '',
    });
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-serif mb-4">{t('equipment.productNotFound')}</h2>
        <Link to="/equipment" className="btn-primary">{t('equipment.backToCollection')}</Link>
      </div>
    );
  }

  const basePrice = getProductPriceForDuration(product.id, selectedDuration);
  const addonsPrice = selectedAddOns.reduce((sum, addonId) => sum + getAddOnPriceForDuration(addonId, selectedDuration), 0);
  const totalPrice = basePrice + addonsPrice;

  const baseComp = getProductDailyComparison(product.id);
  const addonsComp = selectedAddOns.reduce((sum, addonId) => sum + getAddOnDailyComparison(addonId), 0);
  const durationDays = durations.find(d => d.id === selectedDuration)?.days || 0;
  const totalTypicalCost = (baseComp + addonsComp) * durationDays;
  const totalSaved = totalTypicalCost - totalPrice;

  const isDe = i18n.language === 'de';
  const shareUrl = window.location.href;
  const productName = t(`items.${product.id}.name`);
  
  const shareText = isDe 
    ? `Schau dir das ${productName} auf RentNShred an: ${shareUrl}`
    : `Check out the ${productName} on RentNShred: ${shareUrl}`;

  const shareEmailSubject = isDe
    ? `Ausrüstungsempfehlung von RentNShred: ${productName}`
    : `RentNShred Recommended Gear: ${productName}`;

  const shareEmailBody = isDe
    ? `Hallo,\n\nich habe diese großartige Sportausrüstung auf RentNShred gefunden:\n\n${productName}\n\nDu kannst dir die Details hier ansehen: ${shareUrl}\n\nViele Grüße!`
    : `Hello,\n\nI found this awesome sports equipment rental on RentNShred:\n\n${productName}\n\nYou can view details and book it here: ${shareUrl}\n\nBest regards!`;

  const durationText = durations.find(d => d.id === selectedDuration)?.days + " " + (durations.find(d => d.id === selectedDuration)?.days === 1 ? t('equipment.day') : t('equipment.days'));
  const activeDurationLabel = t(durations.find(d => d.id === selectedDuration)?.labelKey || '');

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dateFrom || !formData.name) {
      return;
    }

    const addonNames = selectedAddOns.map(id => {
      const addon = ADDONS[id];
      if (!addon) return id;
      return `- ${t(`addons.${addon.id}.name`)}`;
    }).join('\n');

    const whatsAppMessage = isDe
      ? `Hallo RentNShred Team,\n\nich möchte gerne die folgende Ausrüstung reservieren:\n\n` +
        `🛹 *Ausrüstung*: ${productName}\n` +
        `⏱️ *Gewählte Dauer*: ${activeDurationLabel} (${durationText})\n` +
        `💰 *Gesamtpreis*: €${totalPrice} (zzgl. €${product.deposit || 0} Kaution)\n\n` +
        `*Reservierungs-Details*:\n` +
        `👤 *Name*: ${formData.name}\n` +
        `📅 *Mietbeginn*: ${formData.dateFrom}\n\n` +
        `${selectedAddOns.length > 0 ? `➕ *Ausgewählte Extras*:\n${addonNames}\n\n` : ''}` +
        `📝 *Zusätzliche Anmerkungen*:\n${formData.notes || 'Keine'}`
      : `Hello RentNShred Team,\n\nI would like to request a reservation for the following gear:\n\n` +
        `🛹 *Equipment*: ${productName}\n` +
        `⏱️ *Selected Duration*: ${activeDurationLabel} (${durationText})\n` +
        `💰 *Total Price*: €${totalPrice} (plus €${product.deposit || 0} refundable deposit)\n\n` +
        `*Reservation Details*:\n` +
        `👤 *Name*: ${formData.name}\n` +
        `📅 *Rental Start*: ${formData.dateFrom}\n\n` +
        `${selectedAddOns.length > 0 ? `➕ *Selected Add-ons*:\n${addonNames}\n\n` : ''}` +
        `📝 *Additional Notes / Special Requests*:\n${formData.notes || 'None'}`;

    const whatsAppUrl = `https://wa.me/4915208181603?text=${encodeURIComponent(whatsAppMessage)}`;
    window.open(whatsAppUrl, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-subtle hover:text-brand-deep transition-colors mb-12"
      >
        <ChevronLeft className="w-4 h-4" />
        {t('equipment.backToResults')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-xl border border-brand-border"
        >
          <img
            src={product.image}
            alt={t(`items.${product.id}.name`)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="bg-[var(--nav-bg)]/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold text-brand-deep shadow-sm">
              {t(`homepage.categories.${product.category.toLowerCase().replace(' ', '')}`)}
            </span>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-serif mb-6">{t(`items.${product.id}.name`)}</h1>
          
          <div className="mb-10 p-6 bg-brand-bg rounded-2xl border border-brand-border">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-4">
              {t('equipment.pricing.selectDuration')}
            </h4>
            
            <div className="flex p-1 bg-[var(--nav-bg)] rounded-lg border border-brand-border mb-6">
              {durations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDuration(d.id)}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest rounded-md transition-all ${
                    selectedDuration === d.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-brand-subtle hover:text-brand-deep'
                  }`}
                >
                  {t(d.labelKey)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif text-brand-primary">
                  €{totalPrice}
                </span>
                <span className="text-brand-subtle font-light uppercase tracking-widest text-xs">
                  {t('equipment.totalFor')} {durations.find(d => d.id === selectedDuration)?.days} {durations.find(d => d.id === selectedDuration)?.days === 1 ? t('equipment.day') : t('equipment.days')}
                </span>
              </div>

              {product.deposit !== undefined && (
                <div className="text-[11px] text-brand-subtle font-medium mt-0.5">
                  <span>+ €{product.deposit} {t('equipment.specs.deposit')}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-2 py-2 px-3 bg-[var(--nav-bg)] border border-brand-primary/10 rounded-lg w-fit">
                <TrendingDown className="w-3 h-3 text-brand-primary" />
                <span className="text-[11px] text-brand-primary font-medium tracking-tight">
                  {t('equipment.youSave')} €{totalSaved} {t('common.compareAgainst')} {t('equipment.typicalCost')}
                </span>
              </div>
            </div>

            {product.addOns && product.addOns.length > 0 && (
              <div className="mt-8 pt-6 border-t border-brand-border/60">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">
                  {t('equipment.addOnsTitle')}
                </h4>
                <p className="text-[11px] text-brand-subtle mb-4">
                  {t('equipment.addOnsDescription')}
                </p>
                <div className="flex flex-col gap-2.5">
                  {product.addOns.map((addOnId) => {
                    const addon = ADDONS[addOnId];
                    if (!addon) return null;
                    const isSelected = selectedAddOns.includes(addOnId);
                    const addOnPrice = getAddOnPriceForDuration(addOnId, selectedDuration);

                    return (
                      <button
                        key={addOnId}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
                          } else {
                            setSelectedAddOns([...selectedAddOns, addOnId]);
                          }
                        }}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                          isSelected
                            ? 'bg-brand-primary/5 border-brand-primary/40 shadow-sm'
                            : 'bg-[var(--nav-bg)] border-brand-border/60 hover:border-brand-primary/25'
                        }`}
                      >
                        {/* Custom Checkbox */}
                        <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                          isSelected 
                            ? 'bg-brand-primary border-brand-primary text-white' 
                            : 'border-brand-subtle bg-white'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        {/* Image Frame Placeholder / Image */}
                        <div className="w-24 h-24 bg-white dark:bg-black/20 border border-brand-border/60 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-1">
                          {addon.image ? (
                            <img 
                              src={addon.image} 
                              alt={t(`addons.${addon.id}.name`)} 
                              className="w-full h-full object-contain" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full bg-brand-primary/5 flex items-center justify-center">
                              <span className="text-[10px] font-medium text-brand-subtle uppercase tracking-wider">Plus</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h5 className="text-xs font-semibold text-brand-deep">
                                {t(`addons.${addon.id}.name`)}
                              </h5>
                              {t(`addons.${addon.id}.desc`) && (
                                <p className="text-[10px] text-brand-subtle mt-0.5 max-w-md leading-relaxed">
                                  {t(`addons.${addon.id}.desc`)}
                                </p>
                              )}
                              
                              {/* Display specifications if they exist */}
                              {addon.specs && (
                                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                  {addon.specs.size && (
                                    <span className="inline-flex text-[9px] bg-brand-primary/5 text-brand-primary font-medium tracking-tight px-1.5 py-0.5 rounded">
                                      {t('equipment.specs.size')}: {addon.specs.size}
                                    </span>
                                  )}
                                  {addon.specs.material && (
                                    <span className="inline-flex text-[9px] bg-brand-primary/5 text-brand-primary font-medium tracking-tight px-1.5 py-0.5 rounded">
                                      {t('equipment.specs.material')}: {addon.specs.material}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <span className="text-xs font-semibold text-brand-primary shrink-0 whitespace-nowrap">
                              +€{addOnPrice}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <p className="text-brand-gray text-lg font-light leading-relaxed mb-10">
            {t(`items.${product.id}.desc`)}
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12 border-t border-brand-border pt-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--nav-bg)] border border-brand-border flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300">
                <Ruler className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('equipment.specs.size')}</h4>
                <p className="text-brand-deep font-medium">{product.specs.size}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--nav-bg)] border border-brand-border flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300">
                <Award className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('equipment.specs.level')}</h4>
                <p className="text-brand-deep font-medium">{t(`levels.${product.specs.skillLevel}`)}</p>
              </div>
            </div>

            {product.specs.material && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--nav-bg)] border border-brand-border flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300">
                  <Info className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('equipment.specs.material')}</h4>
                  <p className="text-brand-deep font-medium">{product.specs.material}</p>
                </div>
              </div>
            )}

            {product.deposit !== undefined && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--nav-bg)] border border-brand-border flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300">
                  <Coins className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('equipment.specs.deposit')}</h4>
                  <p className="text-brand-deep font-medium">€{product.deposit}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--nav-bg)] border border-brand-border flex items-center justify-center rounded-lg shrink-0 transition-colors duration-300">
                <Calendar className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle mb-1">{t('equipment.specs.availability')}</h4>
                <p className="text-brand-deep font-medium italic">{t('equipment.specs.instantBooking')}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative">
            <button 
              onClick={() => setIsReserveModalOpen(true)}
              className="btn-primary flex-1 py-4 text-lg flex items-center justify-center gap-2 font-serif font-medium transition-transform active:scale-[0.98]"
            >
              {t('equipment.rentNow')}
            </button>
            
            <div className="relative flex">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="btn-secondary flex items-center justify-center gap-2 py-4 px-6 w-full sm:w-auto transition-transform active:scale-[0.98]"
              >
                <Share2 className="w-5 h-5 text-brand-primary" />
                <span>{t('equipment.shareGear')}</span>
              </button>

              {showShareMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mt-2 mb-2 sm:mb-0 w-64 bg-[var(--nav-bg)] border border-brand-border rounded-2xl shadow-xl p-3 z-20 flex flex-col gap-1 text-left"
                  >
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-subtle px-3 py-1.5 border-b border-brand-border mb-1">
                      {t('equipment.share.title')}
                    </div>
                    
                    {/* Copy Link */}
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 w-full px-3 py-2 text-xs rounded-xl hover:bg-brand-primary/5 text-left text-brand-deep transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-semibold text-emerald-600">{t('equipment.share.copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-brand-primary shrink-0" />
                          <span>{t('equipment.share.copy')}</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full px-3 py-2 text-xs rounded-xl hover:bg-brand-primary/5 text-left text-brand-deep transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t('equipment.share.whatsapp')}</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href={`https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full px-3 py-2 text-xs rounded-xl hover:bg-brand-primary/5 text-left text-brand-deep transition-colors"
                    >
                      <Send className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{t('equipment.share.telegram')}</span>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:?subject=${encodeURIComponent(shareEmailSubject)}&body=${encodeURIComponent(shareEmailBody)}`}
                      className="flex items-center gap-3 w-full px-3 py-2 text-xs rounded-xl hover:bg-brand-primary/5 text-left text-brand-deep transition-colors"
                    >
                      <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>{t('equipment.share.email')}</span>
                    </a>
                  </motion.div>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-brand-primary/5 rounded-xl flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-brand-primary shrink-0" />
            <p className="text-xs text-brand-primary font-medium leading-relaxed">
              {t('equipment.insurance')}
            </p>
          </div>
        </motion.div>
      </div>

      <section className="mt-24 border-t border-brand-border pt-16">
        <h2 className="text-3xl font-serif mb-12">{t('equipment.similar')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {EQUIPMENT.filter(e => !e.hide && e.id !== product.id && e.category === product.category).slice(0, 4).map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="group">
              <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 border border-brand-border">
                <img src={item.image} alt={t(`items.${item.id}.name`)} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <h4 className="font-serif text-lg group-hover:text-brand-primary transition-colors tracking-tight">{t(`items.${item.id}.name`)}</h4>
              <p className="text-brand-primary text-sm font-medium">{t('equipment.fromPrice')} €{getProductStartingPrice(item.id)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Reservation Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsReserveModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-[var(--nav-bg)] border border-brand-border rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-left"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-brand-border/60 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-serif text-brand-deep font-semibold">
                  {t('equipment.reserve.modalTitle')}
                </h3>
                <p className="text-xs text-brand-subtle mt-1.5 max-w-md">
                  {t('equipment.reserve.modalSubtitle')}
                </p>
              </div>
              <button 
                onClick={() => setIsReserveModalOpen(false)}
                className="w-10 h-10 bg-brand-bg hover:bg-brand-primary/10 border border-brand-border rounded-xl flex items-center justify-center text-brand-subtle hover:text-brand-deep transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex bg-brand-bg border-b border-brand-border/60 p-1.5">
              <button
                onClick={() => setReserveTab('kleinanzeigen')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                  reserveTab === 'kleinanzeigen'
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-brand-subtle hover:text-brand-deep'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                {t('equipment.reserve.tabKleinanzeigen')}
              </button>
              <button
                onClick={() => setReserveTab('direct')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                  reserveTab === 'direct'
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-brand-subtle hover:text-brand-deep'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                {t('equipment.reserve.tabDirect')}
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto p-6 flex-1">
              {reserveTab === 'kleinanzeigen' ? (
                <div className="flex flex-col gap-6 py-2">
                  <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-5">
                    <h4 className="font-serif text-lg text-brand-primary font-medium mb-2">
                      {t('equipment.reserve.kleinanzeigenTitle')}
                    </h4>
                    <p className="text-sm text-brand-deep/80 leading-relaxed mb-4">
                      {t('equipment.reserve.kleinanzeigenDesc')}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-brand-deep font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{t('equipment.reserve.kleinanzeigenFeature1')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-brand-deep font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{t('equipment.reserve.kleinanzeigenFeature2')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-brand-deep font-medium font-semibold">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{t('equipment.reserve.kleinanzeigenFeature3')}</span>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="https://www.kleinanzeigen.de/s-bestandsliste.html?userId=159446165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-4 text-center text-sm font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-brand-primary/10"
                  >
                    <span>{t('equipment.reserve.kleinanzeigenCTA')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleDirectSubmit} className="flex flex-col gap-5 py-2">
                  <div>
                    <h4 className="font-serif text-lg text-brand-deep font-medium mb-1">
                      {t('equipment.reserve.directTitle')}
                    </h4>
                    <p className="text-xs text-brand-subtle leading-relaxed">
                      {t('equipment.reserve.directDesc')}
                    </p>
                  </div>

                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center"
                    >
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-lg text-emerald-700 font-semibold mb-1">
                        {t('equipment.reserve.form.success')}
                      </h4>
                      <p className="text-xs text-emerald-600 leading-relaxed max-w-sm mx-auto">
                        {t('equipment.reserve.form.successDesc')}
                      </p>
                      
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="mt-4 text-xs font-semibold text-brand-primary hover:underline bg-transparent border-none outline-none cursor-pointer"
                      >
                        {isDe ? "Anderes Formular senden" : "Edit Details / Send Again"}
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      {/* Form Inputs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-subtle mb-1.5">
                            {t('equipment.reserve.form.dateFrom')} *
                          </label>
                          <input 
                            type="date" 
                            required
                            value={formData.dateFrom}
                            onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                            className="w-full px-4 py-3 text-xs bg-white dark:bg-black/20 border border-brand-border rounded-xl focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/40 font-medium text-brand-deep"
                          />
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-subtle mb-1.5">
                            {t('equipment.reserve.form.fullName')} *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder={isDe ? "z.B. Max Mustermann" : "e.g., John Doe"}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 text-xs bg-white dark:bg-black/20 border border-brand-border rounded-xl focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/40 font-medium text-brand-deep"
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-subtle mb-1.5">
                          {t('equipment.reserve.form.notes')}
                        </label>
                        <textarea 
                          rows={3}
                          placeholder={t('equipment.reserve.form.notesPlaceholder')}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3 text-xs bg-white dark:bg-black/20 border border-brand-border rounded-xl focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/40 resize-none font-medium leading-relaxed text-brand-deep"
                        />
                      </div>

                      {/* Live Calculation Panel */}
                      <div className="p-4 bg-[var(--nav-bg)] border border-brand-border rounded-2xl flex flex-col gap-1.5 select-none">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-semibold text-brand-deep">{productName} ({activeDurationLabel})</span>
                          <span className="text-xs font-bold text-brand-primary">€{basePrice}</span>
                        </div>
                        {selectedAddOns.length > 0 && (
                          <div className="text-[11px] text-brand-subtle flex flex-col gap-0.5 ml-2 border-l border-brand-border/60 pl-2">
                            {selectedAddOns.map(addOnId => {
                              const addon = ADDONS[addOnId];
                              if (!addon) return null;
                              return (
                                <div key={addOnId} className="flex justify-between items-center">
                                  <span>+ {t(`addons.${addon.id}.name`)}</span>
                                  <span>€{getAddOnPriceForDuration(addOnId, selectedDuration)}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div className="pt-2 border-t border-brand-border/60 flex justify-between items-baseline mt-1">
                          <span className="text-xs font-bold text-brand-deep">{isDe ? "Gesamtbetrag" : "Total to Book"}</span>
                          <div className="text-right">
                            <span className="text-sm font-bold text-brand-primary">€{totalPrice}</span>
                            {product.deposit !== undefined && (
                              <p className="text-[10px] text-brand-subtle mt-0.5">
                                + €{product.deposit} {t('equipment.specs.deposit')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      <button 
                        type="submit"
                        className="btn-primary py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-brand-primary/10"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t('equipment.reserve.form.submit')}</span>
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
