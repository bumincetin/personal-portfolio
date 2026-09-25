'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/translations';
import type { LibraryUI } from '@/lib/content/library-ui';
import { experience } from '../experience/director/experience-director';

export default function ShelfLauncher({ locale, copy }: { locale: Locale; copy: Pick<LibraryUI, 'activate'|'exit'|'pause'|'play'|'shelfLoading'|'shelfFailed'> }) {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('');
  const [Shelf, setShelf] = useState<typeof import('./Shelf').default | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const fail = useCallback((message: string) => { setStatus(message); setActive(false); }, []);
  useEffect(() => {
    if (!active || Shelf) return;
    let cancelled = false;
    import('./Shelf').then(module => { if (!cancelled) setShelf(() => module.default); })
      .catch(() => { if (!cancelled) fail(copy.shelfFailed); });
    return () => { cancelled = true; };
  }, [active, Shelf, fail, copy.shelfFailed]);
  useEffect(() => {
    if (!active) return;
    const modal = dialog.current;
    const restoreFocus = trigger.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const unlock = experience.lock('library', true);
    modal?.showModal();
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      unlock();
      restoreFocus?.focus({ preventScroll: true });
    };
  }, [active]);
  return <>
    <button ref={trigger} type="button" className="library-button library-button-secondary" data-enter-shelf onClick={() => { setStatus(''); setActive(true); }}>{copy.activate} <span aria-hidden="true">↗</span></button>
    <p role="status" className="library-status">{status}</p>
    {active && <dialog className="library-dialog" ref={dialog} aria-label={copy.activate} onCancel={() => setActive(false)}>
      <div className="immersive-toolbar">
        <button type="button" data-exit-shelf onClick={() => setActive(false)}>{copy.exit} <span aria-hidden="true">×</span></button>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? copy.play : copy.pause}</button>
      </div>
      <p className="immersive-loading" role="status">{copy.shelfLoading}</p>
      {Shelf && <Shelf locale={locale} readHref={`/${locale}/front-matter`} onFailure={fail} paused={paused} />}
    </dialog>}
  </>;
}
