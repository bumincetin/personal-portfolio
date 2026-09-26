'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/translations';
import { getExperienceCopy } from '@/lib/experience-copy';
import { getLibraryUI } from '@/lib/content/library-ui';
import { composeInquiry, outlookHref, type ConversationAnswers } from '@/lib/contact/draft';
import { mailtoHref, whatsappHref } from '@/lib/profile';

const topicKeys = ['document-intelligence', 'forecasting', 'reporting', 'cross-border', 'other'];

/** Both presentations edit this single in-memory draft. No persistence or POST. */
export default function ContactConversation({ locale }: { locale: Locale }) {
  const c = getExperienceCopy(locale);
  const ui = getLibraryUI(locale);
  const [mode, setMode] = useState<'simple'|'guided'>('simple');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ConversationAnswers>({ name: '', company: '', topic: 4, idea: '', timing: 3 });
  const [editedDraft, setEditedDraft] = useState<string|null>(null);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const generated = composeInquiry(locale, answers);
  const draft = editedDraft ?? generated;
  const valid = !!(editedDraft ?? answers.idea).trim();
  const email = mailtoHref(c.subject, draft);
  const wa = whatsappHref(draft);
  const long = Math.max(email.length, wa.length) > 2000;

  useEffect(() => {
    const index = topicKeys.indexOf(new URLSearchParams(location.search).get('topic') ?? '');
    if (index >= 0) setAnswers(a => ({ ...a, topic: index }));
  }, []);
  useEffect(() => {
    if (moved.current) { titleRef.current?.focus({ preventScroll: true }); moved.current = false; }
  }, [step]);
  const update = <K extends keyof ConversationAnswers>(key: K, value: ConversationAnswers[K]) => {
    setAnswers(a => ({ ...a, [key]: value })); setError(''); setCopyStatus('');
  };
  const move = (next: number) => { moved.current = true; setError(''); setStep(next); };
  const validate = () => {
    if (valid) return true;
    setError(ui.messageRequired); messageRef.current?.focus(); return false;
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === 'simple') { validate(); return; }
    if (step === 2 && !validate()) return;
    move(Math.min(4, step + 1));
  };
  const copy = async () => {
    if (!validate()) return;
    try { await navigator.clipboard.writeText(draft); setCopyStatus(c.copied); }
    catch {
      setCopyStatus(c.copyFailed);
      const preview = draftRef.current?.closest('details');
      if (preview) preview.open = true;
      draftRef.current?.focus(); draftRef.current?.select();
    }
  };
  const nameFields = <div className="composer-identity">
    <div><label htmlFor="conversation-name">{c.name} <span>({c.optional})</span></label><input id="conversation-name" name="name" autoComplete="name" value={answers.name} onChange={e => update('name', e.target.value)} maxLength={80} /></div>
    <div><label htmlFor="conversation-company">{c.company} <span>({c.optional})</span></label><input id="conversation-company" name="organization" autoComplete="organization" value={answers.company} onChange={e => update('company', e.target.value)} maxLength={100} /></div>
  </div>;
  const ideaField = <><label htmlFor="conversation-idea">{c.messageLabel}</label><textarea ref={messageRef} id="conversation-idea" name="idea" rows={5} maxLength={900} value={answers.idea} onChange={e => update('idea', e.target.value)} placeholder={c.ideaPlaceholder} aria-invalid={!!error} aria-describedby={error ? 'conversation-error' : undefined} required /></>;
  const destinations = <>
    {long ? <p className="conversation-small" role="status">{ui.longDraft}</p> : <div className="conversation-delivery">
      <a className="conversation-primary" href={email} onClick={e => { if (!validate()) e.preventDefault(); }}>{ui.email} <span aria-hidden="true">↗</span></a>
      <a className="conversation-secondary" href={wa} target="_blank" rel="noreferrer" onClick={e => { if (!validate()) e.preventDefault(); }}>{ui.whatsapp} <span aria-hidden="true">↗</span></a>
    </div>}
    <div className="conversation-alternatives"><button type="button" onClick={copy}>{c.copy}</button>{!long && <a href={outlookHref(c.subject, draft)} target="_blank" rel="noreferrer" onClick={e => { if (!validate()) e.preventDefault(); }}>{ui.outlook} ↗</a>}</div>
    <p className="conversation-status" role="status">{copyStatus}</p><p className="conversation-small">{c.sendNote} {ui.copyFallback}</p>
  </>;
  const review = <div className="conversation-review"><label htmlFor="conversation-draft">{c.messageLabel}</label><textarea ref={draftRef} id="conversation-draft" rows={9} maxLength={3000} value={draft} onChange={e => { setEditedDraft(e.target.value); setCopyStatus(''); }} />{editedDraft !== null && <button type="button" className="conversation-back" onClick={() => setEditedDraft(null)}>{ui.regenerate}</button>}</div>;

  return <section className="contact-composer" aria-label={ui.simple}>
    <div className="composer-mode" role="group" aria-label={c.guide}>
      <button type="button" data-contact-simple aria-pressed={mode === 'simple'} onClick={() => setMode('simple')}>{ui.simple}</button>
      <button type="button" data-contact-guided aria-pressed={mode === 'guided'} onClick={() => setMode('guided')}>{ui.guided}</button>
    </div>
    <div className="conversation-panel">
      {mode === 'simple' ? <form onSubmit={submit}>
        <div className="conversation-fields">{ideaField}
          <details className="composer-options"><summary>{answers.topic === 4 ? ui.optionalDetails : `${c.topics[answers.topic]} · ${c.optional}`}</summary>{nameFields}<div className="composer-identity">
            <div><label htmlFor="conversation-topic">{ui.topic}</label><select id="conversation-topic" value={answers.topic} onChange={e => update('topic', Number(e.target.value))}>{c.topics.map((topic,i) => <option key={topic} value={i}>{topic}</option>)}</select></div>
            <div><label htmlFor="conversation-timing">{ui.timing}</label><select id="conversation-timing" value={answers.timing} onChange={e => update('timing', Number(e.target.value))}>{c.timings.map((timing,i) => <option key={timing} value={i}>{timing}</option>)}</select></div>
          </div></details>
        </div>
        {error && <p id="conversation-error" role="alert" className="conversation-error">{error}</p>}
        {destinations}
        <details className="composer-preview" open={editedDraft !== null || long || undefined}><summary>{c.review}</summary>{review}</details>
      </form> : <>
        <ol className="conversation-progress" aria-label={c.guide}>{c.steps.map((label,i) => <li key={label} data-active={i === step} data-complete={i < step} aria-current={i === step ? 'step' : undefined}><span>{i+1}</span><span>{label}</span></li>)}</ol>
        <h2 ref={titleRef} tabIndex={-1}>{step < 4 ? c.questions[step] : c.previewTitle}</h2>
        {step < 4 ? <form onSubmit={submit} noValidate>
          <p className="conversation-hint">{c.hints[step]}</p>
          <div className="conversation-fields">
            {step === 0 && nameFields}
            {step === 1 && <fieldset><legend>{ui.topic} ({c.optional})</legend><div className="conversation-options">{c.topics.map((topic,i) => <label key={topic} className="conversation-option"><input type="radio" name="topic" value={topicKeys[i]} checked={answers.topic === i} onChange={() => update('topic', i)}/><span>{topic}</span></label>)}</div></fieldset>}
            {step === 2 && ideaField}
            {step === 3 && <fieldset><legend>{ui.timing} ({c.optional})</legend><div className="conversation-options">{c.timings.map((timing,i) => <label key={timing} className="conversation-option"><input type="radio" name="timing" value={i} checked={answers.timing === i} onChange={() => update('timing', i)}/><span>{timing}</span></label>)}</div></fieldset>}
          </div>
          {error && <p id="conversation-error" role="alert" className="conversation-error">{error}</p>}
          <div className="conversation-actions">{step > 0 && <button type="button" className="conversation-back" onClick={() => move(step-1)}>{c.back}</button>}<button type="submit" className="conversation-primary">{step === 3 ? c.review : c.next} <span aria-hidden="true">→</span></button></div>
        </form> : <>{review}{destinations}<button type="button" className="conversation-back" onClick={() => move(0)}>{c.edit}</button></>}
      </>}
      <p className="conversation-privacy">{c.privacy}</p>
    </div>
  </section>;
}
