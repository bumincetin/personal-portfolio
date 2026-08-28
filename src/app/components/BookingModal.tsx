'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Mail, Clock, Copy, Check, MessageCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Locale, type TranslationType } from '@/lib/translations';

/**
 * Consultation request dialog.
 *
 * Rendered through a portal onto <body>. It used to mount inline wherever its
 * trigger lived, and `position: fixed` is measured against the nearest
 * ancestor with a filter/backdrop-filter/transform -- so from the footer
 * (backdrop-blur) the dialog was boxed into the footer and clipped, and from
 * any card with a hover transform it would have followed the card.
 *
 * There is no mail server: the form composes a message and hands it to the
 * visitor's own channel (mail app, webmail, WhatsApp, clipboard). The second
 * step says exactly that -- nothing is "sent" until they press send -- rather
 * than announcing a request that never left the browser.
 */

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  t: TranslationType;
  selectedService?: string;
}

interface FormErrors {
  date?: string;
  time?: string;
  email?: string;
  name?: string;
}

const RECIPIENT = 'cetinbumink@gmail.com';
const WHATSAPP = '393481705207';

const COPY = {
  en: {
    readyTitle: 'Your request is ready',
    readyDesc: 'Nothing has been sent yet. The message below is pre-filled — choose how to deliver it and press send there.',
    mailApp: 'Open in your email app',
    gmail: 'Send with Gmail',
    outlook: 'Send with Outlook',
    whatsapp: 'Send via WhatsApp',
    copy: 'Copy the message',
    copied: 'Copied',
    recipient: 'Sends to',
    preview: 'Message',
    required: 'Required',
    invalidEmail: 'Enter a valid email address',
    subject: 'Consultation request',
  },
  tr: {
    readyTitle: 'Talebiniz hazır',
    readyDesc: 'Henüz hiçbir şey gönderilmedi. Aşağıdaki mesaj hazırlandı — nasıl ileteceğinizi seçin ve orada gönder’e basın.',
    mailApp: 'E-posta uygulamasında aç',
    gmail: 'Gmail ile gönder',
    outlook: 'Outlook ile gönder',
    whatsapp: 'WhatsApp ile gönder',
    copy: 'Mesajı kopyala',
    copied: 'Kopyalandı',
    recipient: 'Alıcı',
    preview: 'Mesaj',
    required: 'Zorunlu',
    invalidEmail: 'Geçerli bir e-posta adresi girin',
    subject: 'Görüşme talebi',
  },
  it: {
    readyTitle: 'La tua richiesta è pronta',
    readyDesc: 'Non è ancora stato inviato nulla. Il messaggio qui sotto è già compilato — scegli come recapitarlo e premi invia lì.',
    mailApp: 'Apri nell’app di posta',
    gmail: 'Invia con Gmail',
    outlook: 'Invia con Outlook',
    whatsapp: 'Invia via WhatsApp',
    copy: 'Copia il messaggio',
    copied: 'Copiato',
    recipient: 'Destinatario',
    preview: 'Messaggio',
    required: 'Obbligatorio',
    invalidEmail: 'Inserisci un indirizzo email valido',
    subject: 'Richiesta di consulenza',
  },
} as const;

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => `${String(9 + i).padStart(2, '0')}:00`);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, locale, t, selectedService: initialService }) => {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<'form' | 'send'>('form');
  const [service, setService] = useState(initialService || 'financial-analytics');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const copy = COPY[locale] ?? COPY.en;
  const booking = t.methodologyPage.booking;

  const services = [
    { id: 'financial-analytics', name: t.methodologyPage.section1.title },
    { id: 'ai-nlp', name: t.methodologyPage.section2.title },
    { id: 'business-intelligence', name: t.methodologyPage.section3.title },
    { id: 'financial-consultancy', name: t.methodologyPage.section4.title },
  ];

  // Portals need the document; render nothing on the server.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  // Scroll lock + Escape + initial focus, all scoped to the open state and
  // restoring whatever was there before (the navbar's mobile sheet also
  // locks the body, so this must not blindly clear it).
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const focusTimer = setTimeout(() => panelRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const serviceName = services.find((s) => s.id === service)?.name ?? service;

  const formattedDate = (() => {
    if (!date) return '';
    try {
      return new Date(`${date}T00:00:00`).toLocaleDateString(
        locale === 'tr' ? 'tr-TR' : locale === 'it' ? 'it-IT' : 'en-GB',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      );
    } catch {
      return date;
    }
  })();

  const subject = `${copy.subject} — ${serviceName}`;

  const message = (() => {
    const en = `Hello Bumin,

I would like to schedule a consultation for the following service:

Service: ${serviceName}
Preferred date: ${formattedDate}
Preferred time: ${time}

Name: ${name}
Email: ${email}

Looking forward to confirming a time.

Best regards,
${name}`;
    const tr = `Merhaba Bumin,

Aşağıdaki hizmet için bir danışmanlık görüşmesi planlamak istiyorum:

Hizmet: ${serviceName}
Tercih edilen tarih: ${formattedDate}
Tercih edilen saat: ${time}

Ad: ${name}
E-posta: ${email}

Görüşme zamanını onaylamak için sizden haber bekliyorum.

Saygılarımla,
${name}`;
    const it = `Buongiorno Bumin,

vorrei fissare una consulenza per il seguente servizio:

Servizio: ${serviceName}
Data preferita: ${formattedDate}
Orario preferito: ${time}

Nome: ${name}
Email: ${email}

Resto in attesa di una conferma dell’orario.

Cordiali saluti,
${name}`;
    return locale === 'tr' ? tr : locale === 'it' ? it : en;
  })();

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = copy.required;
    if (!email.trim()) next.email = copy.required;
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = copy.invalidEmail;
    if (!date) next.date = copy.required;
    if (!time) next.time = copy.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${RECIPIENT}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`${subject}\n\n${message}`)}`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Honeypot: bots fill the hidden field; give them the next screen and nothing else.
    if (honeypot) {
      setStep('send');
      return;
    }
    if (!validate()) return;
    setStep('send');
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${RECIPIENT}\nSubject: ${subject}\n\n${message}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the preview below is selectable.
    }
  };

  const handleClose = useCallback(() => {
    onClose();
    // Reset once the exit animation has played, so the form does not flash back.
    setTimeout(() => {
      setStep('form');
      setDate('');
      setTime('');
      setEmail('');
      setName('');
      setHoneypot('');
      setErrors({});
      setCopied(false);
    }, 300);
  }, [onClose]);

  if (!mounted) return null;

  const field =
    'w-full rounded-editorial border bg-surface px-4 py-3.5 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-muted-light focus:border-accent';
  const fieldBorder = (error?: string) => (error ? 'border-negative' : 'border-border');
  const secondaryAction =
    'flex w-full items-center justify-center gap-2.5 rounded-editorial border border-border bg-surface px-4 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-accent hover:text-accent';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-editorial border border-border bg-cream shadow-card-hover outline-none"
            style={{ maxHeight: 'min(92dvh, calc(100vh - 1.5rem))' }}
          >
            {/* Brass hairline along the top edge. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--c-brass) / 0.7), transparent)' }}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={handleClose}
              aria-label={booking.close}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-charcoal"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            {step === 'form' && (
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-9">
                <div className="mb-7 pr-12">
                  <span className="mb-3 block font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-light">
                    {t.nav.contact}
                  </span>
                  <h2 id="booking-modal-title" className="font-display text-3xl font-light text-charcoal">
                    {booking.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm text-muted">{booking.desc}</p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="booking-website">Website</label>
                    <input
                      type="text"
                      id="booking-website"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Service */}
                  <fieldset>
                    <legend className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      {booking.selectService}
                    </legend>
                    <div className="divide-y divide-border border-y border-border">
                      {services.map((s, index) => {
                        const active = service === s.id;
                        return (
                          <label
                            key={s.id}
                            className={`flex cursor-pointer items-center gap-4 px-1 py-3 transition-colors ${
                              active ? 'text-charcoal' : 'text-muted hover:text-charcoal'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={s.id}
                              checked={active}
                              onChange={() => setService(s.id)}
                              className="sr-only"
                            />
                            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-accent">0{index + 1}</span>
                            <span className="flex-1 font-sans text-sm">{s.name}</span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-all ${
                                active ? 'bg-accent shadow-glow' : 'bg-border-dark'
                              }`}
                              aria-hidden="true"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Details */}
                  <div>
                    <span className="mb-3 block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      {booking.yourDetails}
                    </span>
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={booking.yourName}
                          aria-label={booking.yourName}
                          aria-invalid={!!errors.name}
                          className={`${field} ${fieldBorder(errors.name)}`}
                        />
                        {errors.name && <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-negative">{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={booking.emailAddress}
                          aria-label={booking.emailAddress}
                          aria-invalid={!!errors.email}
                          className={`${field} ${fieldBorder(errors.email)}`}
                        />
                        {errors.email && <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-negative">{errors.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Date & time */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-date" className="mb-3 block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                        {booking.selectDate}
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        aria-invalid={!!errors.date}
                        className={`${field} ${fieldBorder(errors.date)} [color-scheme:inherit]`}
                      />
                      {errors.date && <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-negative">{errors.date}</p>}
                    </div>
                    <div>
                      <label htmlFor="booking-time" className="mb-3 block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                        {booking.selectTime}
                      </label>
                      <div className="relative">
                        <select
                          id="booking-time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          aria-invalid={!!errors.time}
                          className={`${field} ${fieldBorder(errors.time)} appearance-none pr-11`}
                        >
                          <option value="">—</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <Clock className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-light" size={15} strokeWidth={1.5} />
                      </div>
                      {errors.time && <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-negative">{errors.time}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2.5 rounded-editorial bg-accent px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-accent-hover"
                  >
                    {booking.confirm}
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            )}

            {step === 'send' && (
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-9">
                <div className="mb-6 pr-12">
                  <span className="mb-3 block font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-light">
                    {t.nav.contact} · 2/2
                  </span>
                  <h2 id="booking-modal-title" className="font-display text-3xl font-light text-charcoal">
                    {copy.readyTitle}
                  </h2>
                  <p className="mt-2 font-sans text-sm text-muted">{copy.readyDesc}</p>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={mailto}
                    className="flex w-full items-center justify-center gap-2.5 rounded-editorial bg-accent px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-accent-hover"
                  >
                    <Mail size={15} strokeWidth={1.5} />
                    {copy.mailApp}
                  </a>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <a href={gmail} target="_blank" rel="noreferrer" className={secondaryAction}>
                      <ExternalLink size={14} strokeWidth={1.5} />
                      {copy.gmail}
                    </a>
                    <a href={outlook} target="_blank" rel="noreferrer" className={secondaryAction}>
                      <ExternalLink size={14} strokeWidth={1.5} />
                      {copy.outlook}
                    </a>
                  </div>
                  <a href={whatsapp} target="_blank" rel="noreferrer" className={secondaryAction}>
                    <MessageCircle size={14} strokeWidth={1.5} />
                    {copy.whatsapp}
                  </a>
                  <button type="button" onClick={copyMessage} className={secondaryAction}>
                    {copied ? <Check size={14} strokeWidth={1.5} className="text-positive" /> : <Copy size={14} strokeWidth={1.5} />}
                    {copied ? copy.copied : copy.copy}
                  </button>
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <div className="flex items-baseline justify-between gap-4 font-mono text-[0.625rem] uppercase tracking-[0.16em]">
                    <span className="text-muted-light">{copy.recipient}</span>
                    <span className="select-all text-charcoal normal-case tracking-normal">{RECIPIENT}</span>
                  </div>
                  <details className="group mt-4">
                    <summary className="cursor-pointer list-none font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-light transition-colors hover:text-charcoal">
                      {copy.preview} <span className="inline-block transition-transform group-open:rotate-90">›</span>
                    </summary>
                    <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-editorial border border-border bg-surface p-4 font-sans text-xs leading-relaxed text-muted">
                      {message}
                    </pre>
                  </details>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-5 w-full py-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-charcoal"
                >
                  {booking.close}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
