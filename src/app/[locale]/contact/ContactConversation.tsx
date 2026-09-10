'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Copy, Mail, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import { getExperienceCopy } from '@/lib/experience-copy';
import { composeInquiry, outlookHref, type ConversationAnswers } from '@/lib/contact/draft';
import { mailtoHref, whatsappHref } from '@/lib/profile';
import NeuronBook from './NeuronBook';

const topicKeys = ['document-intelligence', 'forecasting', 'reporting', 'cross-border', 'other'];
export default function ContactConversation({ locale }: { locale: Locale }) {
  const c = getExperienceCopy(locale);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ConversationAnswers>({ name: '', company: '', topic: 4, idea: '', timing: 3 });
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [mobile, setMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const direction = useRef(1);
  const moved = useRef(false);
  useEffect(() => {
    if (!moved.current) return;
    const timer = window.setTimeout(() => {
      titleRef.current?.focus({ preventScroll: true });
      titleRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      moved.current = false;
    }, reduced ? 50 : 500);
    return () => window.clearTimeout(timer);
  }, [step, reduced]);
  useEffect(() => {
    const topic = new URLSearchParams(location.search).get('topic');
    const index = topicKeys.indexOf(topic ?? '');
    if (index >= 0) setAnswers(a => ({ ...a, topic: index }));
    setMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  }, []);
  const update = <K extends keyof ConversationAnswers>(key: K, value: ConversationAnswers[K]) => { setAnswers(a => ({ ...a, [key]: value })); setError(''); };
  const move = (next: number) => { direction.current = next > step ? 1 : -1; moved.current = true; setError(''); setCopyStatus(''); setStep(next); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 0 && !answers.name.trim()) { setError(c.nameError); document.getElementById('conversation-name')?.focus(); return; }
    if (step === 2 && answers.idea.trim().length < 20) { setError(c.ideaError); document.getElementById('conversation-idea')?.focus(); return; }
    if (step === 3) setDraft(composeInquiry(locale, answers));
    move(step + 1);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(draft); setCopyStatus(c.copied); } catch { setCopyStatus(c.copyFailed); } };
  return <section className="conversation-layout" aria-label={c.guide}>
    <div className="conversation-sculpture"><div className="guide-label"><span aria-hidden="true" />{c.guide}<span className="guide-count">0{Math.min(step + 1, 4)} / 04</span></div><NeuronBook step={step} copy={c} /></div>
    <div className="conversation-panel">
      <ol className="conversation-progress" aria-label={c.guide}>{c.steps.map((label, i) => <li key={label} data-active={i === step} data-complete={i < step} aria-current={i === step ? 'step' : undefined}><span>{i < step ? <Check size={13} /> : `0${i + 1}`}</span><span>{label}</span></li>)}</ol>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 1, x: reduced ? 0 : direction.current * 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: reduced ? 0 : direction.current * -12 }} transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}>
          {step < 4 ? <form onSubmit={submit} noValidate>
            <p className="conversation-step">{c.step} {step + 1} {c.of} 4</p>
            <h2 ref={titleRef} tabIndex={-1}>{c.questions[step]}</h2><p className="conversation-hint">{c.hints[step]}</p>
            <div className="conversation-fields">
              {step === 0 && <><label htmlFor="conversation-name">{c.name}</label><input id="conversation-name" name="name" autoComplete="name" value={answers.name} onChange={e => update('name', e.target.value)} maxLength={80} placeholder={c.namePlaceholder} aria-invalid={!!error} aria-describedby={error ? 'conversation-error' : undefined} required /><label htmlFor="conversation-company">{c.company} <span>({c.optional})</span></label><input id="conversation-company" name="organization" autoComplete="organization" value={answers.company} onChange={e => update('company', e.target.value)} maxLength={100} /></>}
              {step === 1 && <fieldset><legend className="sr-only">{c.questions[1]}</legend><div className="conversation-options">{c.topics.map((topic, i) => <label key={topic} className="conversation-option"><input type="radio" name="topic" value={topicKeys[i]} checked={answers.topic === i} onChange={() => update('topic', i)} /><span>{topic}</span><ArrowRight size={16} aria-hidden="true" /></label>)}</div></fieldset>}
              {step === 2 && <><label htmlFor="conversation-idea">{c.idea}</label><textarea id="conversation-idea" name="idea" rows={5} maxLength={900} value={answers.idea} onChange={e => update('idea', e.target.value)} placeholder={c.ideaPlaceholder} aria-invalid={!!error} aria-describedby={error ? 'conversation-error' : undefined} required /><p className="conversation-character-count">{answers.idea.length} / 900</p></>}
              {step === 3 && <fieldset><legend className="sr-only">{c.questions[3]}</legend><div className="conversation-options">{c.timings.map((timing, i) => <label key={timing} className="conversation-option"><input type="radio" name="timing" value={i} checked={answers.timing === i} onChange={() => update('timing', i)} /><span>{timing}</span><ArrowRight size={16} aria-hidden="true" /></label>)}</div></fieldset>}
            </div>
            {error && <p id="conversation-error" role="alert" className="conversation-error">{error}</p>}
            <div className="conversation-actions">{step > 0 && <button type="button" className="conversation-back" onClick={() => move(step - 1)}><ArrowLeft size={16} />{c.back}</button>}<button type="submit" className="conversation-primary">{step === 3 ? c.review : c.next}<ArrowRight size={17} /></button></div>
          </form> : <div className="conversation-review">
            <p className="conversation-step">{c.review}</p><h2 ref={titleRef} tabIndex={-1}>{c.previewTitle}</h2><p className="conversation-hint">{c.previewHint}</p>
            <label htmlFor="conversation-draft">{c.messageLabel}</label><textarea id="conversation-draft" rows={10} maxLength={1800} value={draft} onChange={e => { setDraft(e.target.value); setCopyStatus(''); }} />
            <div className="conversation-delivery"><a className="conversation-primary" href={whatsappHref(draft)} target="_blank" rel="noreferrer"><MessageCircle size={18} />{c.whatsapp}<ArrowRight size={16} /></a><a className="conversation-secondary" href={mobile ? outlookHref(c.subject, draft, true) : mailtoHref(c.subject, draft)}><Mail size={18} />{mobile ? c.outlook : c.email}</a></div>
            <div className="conversation-alternatives"><a href={outlookHref(c.subject, draft)} target="_blank" rel="noreferrer">{c.outlookWeb} ↗</a><button type="button" onClick={copy}><Copy size={14} />{c.copy}</button></div>
            <p className="conversation-status" role="status">{copyStatus}</p><p className="conversation-small">{c.sendNote} {!mobile && c.mailHint}</p>
            <button type="button" className="conversation-back" onClick={() => move(0)}><ArrowLeft size={16} />{c.edit}</button>
          </div>}
        </motion.div>
      </AnimatePresence>
      <p className="conversation-privacy">{c.privacy}</p>
    </div>
  </section>;
}
