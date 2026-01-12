'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Check, ArrowRight, Mail, Clock, AlertCircle, Copy } from 'lucide-react';
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
    
    // Open email client immediately
    try {
      window.location.href = mailtoLink;
      // Show success message after opening email client
      setTimeout(() => {
        setStep('success');
      }, 300);
    } catch (error) {
      console.error('Failed to open email client:', error);
      // Still show success, but user can manually copy email
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
                      <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-4">
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
                      <label className="font-mono text-xs text-muted uppercase tracking-wider block mb-4">
                        {booking.selectTime}
                      </label>
                      <div className="relative">
                        <select
                          value={time}
                          onChange={e => setTime(e.target.value)}
                          className={`w-full bg-white border rounded-xl px-5 py-4 font-mono text-sm outline-none focus:border-accent transition-colors appearance-none ${
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
              <div className="p-8 md:p-12 text-center flex-1 flex flex-col items-center justify-center min-h-0 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Mail size={28} className="text-accent" />
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-3">{booking.success}</h3>
                <p className="font-mono text-sm text-muted mb-6 max-w-sm mx-auto">{booking.successDesc}</p>
                
                <div className="w-full space-y-3 mb-6">
                  <button 
                    onClick={openEmailManually}
                    className="w-full bg-charcoal text-cream rounded-xl py-4 font-mono text-xs uppercase tracking-wider hover:bg-navy transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    {locale === 'tr' ? 'E-postayı Aç' : locale === 'it' ? 'Apri Email' : 'Open Email'}
                  </button>
                  
                  <button 
                    onClick={copyEmailToClipboard}
                    className="w-full border border-charcoal rounded-xl py-4 font-mono text-xs uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-all flex items-center justify-center gap-2"
                  >
                    <Copy size={16} />
                    {copied 
                      ? (locale === 'tr' ? 'Kopyalandı!' : locale === 'it' ? 'Copiato!' : 'Copied!')
                      : (locale === 'tr' ? 'E-postayı Kopyala' : locale === 'it' ? 'Copia Email' : 'Copy Email')
                    }
                  </button>
                </div>
                
                <button 
                  onClick={handleClose} 
                  className="w-full border border-border rounded-xl py-3 font-mono text-xs uppercase tracking-wider text-muted hover:text-charcoal transition-all"
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
