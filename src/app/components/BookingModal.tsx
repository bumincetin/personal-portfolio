'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Check, ArrowRight, Envelope as Mail, Clock, WarningCircle as AlertCircle, Copy } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Locale, type TranslationType } from '@/lib/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  t: TranslationType;
  selectedService?: string;
}

interface FormErrors {
  service?: string;
  date?: string;
  time?: string;
  email?: string;
  name?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  locale, 
  t,
  selectedService: initialService 
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedService, setSelectedService] = useState(initialService || 'financial-analytics');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [copied, setCopied] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Defensive check for translations with fallback
  const booking = t?.methodologyPage?.booking || {
    title: 'Schedule a Consultation',
    desc: 'Select a service and provide your details to request a meeting.',
    selectService: 'Select Service',
    yourDetails: 'Your Details',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    selectDate: 'Preferred Date',
    selectTime: 'Preferred Time',
    confirm: 'Request Meeting',
    close: 'Close',
    success: 'Request Sent',
    successDesc: 'Your consultation request has been sent. I will get back to you shortly to confirm the meeting time.',
    loading: 'Sending Request...',
  };

  const services = [
    { 
      id: 'financial-analytics', 
      name: t?.methodologyPage?.section1?.title || 'Financial Analytics & Modeling',
    },
    { 
      id: 'ai-nlp', 
      name: t?.methodologyPage?.section2?.title || 'AI & Machine Learning Solutions',
    },
    { 
      id: 'business-intelligence', 
      name: t?.methodologyPage?.section3?.title || 'Business Intelligence & Dashboards',
    },
    { 
      id: 'financial-consultancy', 
      name: t?.methodologyPage?.section4?.title || 'Financial Consultancy',
    },
  ];

  // Generate time slots (9 AM to 6 PM)
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!selectedService) newErrors.service = 'Service required';
    if (!date) newErrors.date = 'Date required';
    if (!time) newErrors.time = 'Time required';
    if (!email) newErrors.email = 'Email required';
    if (!name) newErrors.name = 'Name required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getServiceName = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    return service?.name || serviceId;
  };

  const generateEmailContent = (): string => {
    const serviceName = getServiceName(selectedService);
    let formattedDate = '';
    if (date) {
      try {
        formattedDate = new Date(date + 'T00:00:00').toLocaleDateString(
          locale === 'tr' ? 'tr-TR' : locale === 'it' ? 'it-IT' : 'en-US', 
          {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        );
      } catch (e) {
        formattedDate = date;
      }
    }
    
    // English text
    const englishText = `Hello Bumin,

I would like to schedule a consultation meeting for the following service:

Service: ${serviceName}
Preferred Date: ${formattedDate}
Preferred Time: ${time}

My Details:
Name: ${name}
Email: ${email}

I look forward to hearing from you to confirm the meeting time.

Best regards,
${name}

---

`;

    // Turkish text
    const turkishText = `Merhaba Bumin,

Aşağıdaki hizmet için bir danışmanlık görüşmesi planlamak istiyorum:

Hizmet: ${serviceName}
Tercih Edilen Tarih: ${formattedDate}
Tercih Edilen Saat: ${time}

Bilgilerim:
Ad: ${name}
E-posta: ${email}

Görüşme zamanını onaylamak için sizden haber almayı dört gözle bekliyorum.

Saygılarımla,
${name}`;

    return englishText + turkishText;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check
    if (honeypot) {
      console.log('Spam detected via honeypot');
      setStep('success');
      return;
    }
    
    if (!validate()) return;
    
    // Generate mailto link with pre-filled email
    const subject = encodeURIComponent(
      locale === 'tr' 
        ? `Görüşme Talebi - ${getServiceName(selectedService)}`
        : locale === 'it'
        ? `Richiesta Incontro - ${getServiceName(selectedService)}`
        : `Consultation Request - ${getServiceName(selectedService)}`
    );
    
    const body = encodeURIComponent(generateEmailContent());
    const mailtoLink = `mailto:cetinbumink@gmail.com?subject=${subject}&body=${body}`;
    
    // Store email content for fallback options
    setEmailContent(generateEmailContent());
    setEmailSubject(
      locale === 'tr' 
        ? `Görüşme Talebi - ${getServiceName(selectedService)}`
        : locale === 'it'
        ? `Richiesta Incontro - ${getServiceName(selectedService)}`
        : `Consultation Request - ${getServiceName(selectedService)}`
    );
    
    // Try to open email client immediately (mailto)
    // Note: mailto links only work if user has a default email client configured
    // Many users (especially on mobile or without email clients) will need webmail options
    // We show the success screen with multiple options so everyone can send the email
    try {
      window.location.href = mailtoLink;
      // Show success screen after attempting to open email client
      // This gives users options even if mailto didn't work
      setTimeout(() => {
        setStep('success');
      }, 500);
    } catch (error) {
      console.error('Failed to open email client:', error);
      // Show success screen with webmail options
      setStep('success');
    }
  };

  const copyEmailToClipboard = async () => {
    const fullEmail = `To: cetinbumink@gmail.com\nSubject: ${emailSubject}\n\n${emailContent}`;
    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const openEmailManually = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:cetinbumink@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const openGmail = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailContent);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=cetinbumink@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailLink, '_blank');
  };

  const openOutlook = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailContent);
    const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=cetinbumink@gmail.com&subject=${subject}&body=${body}`;
    window.open(outlookLink, '_blank');
  };

  const openYandex = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailContent);
    const yandexLink = `https://mail.yandex.com/compose?to=cetinbumink@gmail.com&subject=${subject}&body=${body}`;
    window.open(yandexLink, '_blank');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('form');
      setDate('');
      setTime('');
      setEmail('');
      setName('');
      setHoneypot('');
      setErrors({});
      setEmailContent('');
      setEmailSubject('');
      setCopied(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center"
          style={{
            padding: 'clamp(0.5rem, 2vw, 1.5rem)',
            paddingTop: 'max(clamp(0.5rem, 2vw, 1.5rem), env(safe-area-inset-top))',
            paddingBottom: 'max(clamp(0.5rem, 2vw, 1.5rem), env(safe-area-inset-bottom))',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/40" 
            onClick={handleClose} 
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-cream w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-border"
            style={{
              maxHeight: 'min(92dvh, calc(100vh - 2rem))',
            }}
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              aria-label="Close booking modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal active:bg-charcoal/15 sm:hover:bg-charcoal/10 transition-all z-20"
            >
              <X size={20} />
            </button>

            {step === 'form' && (
              <div 
                className="p-5 sm:p-8 md:p-12 overflow-y-auto flex-1 min-h-0 overscroll-contain" 
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <div className="mb-6 sm:mb-8 pr-8 sm:pr-0">
                  <h2 id="booking-modal-title" className="font-serif text-2xl sm:text-3xl text-charcoal mb-2">
                    {booking.title}
                  </h2>
                  <p className="font-mono text-sm text-muted">{booking.desc}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot field */}
                  <div className="absolute -left-[9999px] aria-hidden" aria-hidden="true">
                    <label htmlFor="website">Website (leave empty)</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  {/* Services */}
                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-4">
                      {booking.selectService}
                    </label>
                    <div className="space-y-3">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedService(s.id)}
                          className={`w-full p-5 rounded-xl text-left transition-all ${
                            selectedService === s.id 
                              ? 'bg-charcoal text-cream border-2 border-charcoal' 
                              : 'bg-white text-charcoal border border-border hover:border-charcoal/30'
                          }`}
                        >
                          <span className="font-serif text-sm font-medium">{s.name}</span>
                        </button>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-xs text-accent mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-4">
                      {booking.yourDetails}
                    </label>
                    <div className="space-y-3">
                      <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={booking.yourName}
                        className={`w-full bg-white border rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-accent transition-colors placeholder:text-muted ${
                          errors.name ? 'border-accent' : 'border-border'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-accent">{errors.name}</p>
                      )}
                      <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder={booking.emailAddress} 
                        className={`w-full bg-white border rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-accent transition-colors placeholder:text-muted ${
                          errors.email ? 'border-accent' : 'border-border'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-accent">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-4 break-words">
                        {booking.selectDate}
                      </label>
                      <input 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full bg-white border rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-accent transition-colors ${
                          errors.date ? 'border-accent' : 'border-border'
                        }`}
                      />
                      {errors.date && (
                        <p className="text-xs text-accent mt-1">{errors.date}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-mono text-[10px] sm:text-xs text-muted uppercase tracking-[0.05em] sm:tracking-wider block mb-4 break-words leading-tight">
                        {booking.selectTime}
                      </label>
                      <div className="relative">
                        <select
                          value={time}
                          onChange={e => setTime(e.target.value)}
                          className={`w-full bg-white border rounded-xl px-5 py-4 pr-12 font-mono text-sm outline-none focus:border-accent transition-colors appearance-none ${
                            errors.time ? 'border-accent' : 'border-border'
                          }`}
                        >
                          <option value="">{booking.selectTime}</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-muted pointer-events-none" size={16} />
                      </div>
                      {errors.time && (
                        <p className="text-xs text-accent mt-1">{errors.time}</p>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-charcoal text-cream hover:bg-navy"
                  >
                    {booking.confirm}
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            )}

            {step === 'success' && (
              <div className="p-6 sm:p-8 md:p-12 text-center flex-1 flex flex-col min-h-0 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-accent" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-2">{booking.success}</h3>
                <p className="font-mono text-xs sm:text-sm text-muted mb-6 max-w-sm mx-auto">
                  {locale === 'tr' 
                    ? 'E-postanızı göndermek için aşağıdaki seçeneklerden birini kullanın:'
                    : locale === 'it'
                    ? 'Usa una delle opzioni seguenti per inviare la tua email:'
                    : 'Choose one of the options below to send your email:'}
                </p>
                
                <div className="w-full space-y-2.5 mb-4">
                  {/* Gmail */}
                  <button 
                    onClick={openGmail}
                    className="w-full bg-[#EA4335] text-white rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-[#C5221F] transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    {locale === 'tr' ? 'Gmail ile Gönder' : locale === 'it' ? 'Invia con Gmail' : 'Send with Gmail'}
                  </button>
                  
                  {/* Outlook */}
                  <button 
                    onClick={openOutlook}
                    className="w-full bg-[#0078D4] text-white rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-[#005A9E] transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    {locale === 'tr' ? 'Outlook ile Gönder' : locale === 'it' ? 'Invia con Outlook' : 'Send with Outlook'}
                  </button>
                  
                  {/* Yandex */}
                  <button 
                    onClick={openYandex}
                    className="w-full bg-[#FC3F1D] text-white rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-[#D32F1A] transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    {locale === 'tr' ? 'Yandex ile Gönder' : locale === 'it' ? 'Invia con Yandex' : 'Send with Yandex'}
                  </button>
                  
                  {/* Default Email Client */}
                  <button 
                    onClick={openEmailManually}
                    className="w-full border-2 border-charcoal text-charcoal rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    {locale === 'tr' ? 'Varsayılan E-posta İstemcisi' : locale === 'it' ? 'Client Email Predefinito' : 'Default Email Client'}
                  </button>
                  
                  {/* Copy to Clipboard */}
                  <button 
                    onClick={copyEmailToClipboard}
                    className="w-full border border-border text-charcoal rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-surface-alt transition-all flex items-center justify-center gap-2"
                  >
                    <Copy size={16} />
                    {copied 
                      ? (locale === 'tr' ? '✓ Kopyalandı!' : locale === 'it' ? '✓ Copiato!' : '✓ Copied!')
                      : (locale === 'tr' ? 'E-postayı Kopyala' : locale === 'it' ? 'Copia Email' : 'Copy Email Content')
                    }
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-surface-alt rounded-xl border border-border">
                  <p className="font-mono text-[10px] text-muted mb-2">
                    {locale === 'tr' 
                      ? 'E-posta Adresi:'
                      : locale === 'it'
                      ? 'Indirizzo Email:'
                      : 'Email Address:'}
                  </p>
                  <p className="font-mono text-xs text-charcoal break-all">cetinbumink@gmail.com</p>
                </div>
                
                <button 
                  onClick={handleClose} 
                  className="w-full mt-4 border border-border rounded-xl py-3 font-mono text-xs uppercase tracking-wider text-muted hover:text-charcoal transition-all"
                >
                  {booking.close}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
