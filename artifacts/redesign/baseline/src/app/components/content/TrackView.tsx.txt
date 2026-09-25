'use client';

import { useEffect } from 'react';
import { track, type AnalyticsEvent, type EventProps } from '@/lib/analytics';

/**
 * Fires one funnel event on mount and renders nothing.
 *
 * It exists so that a page needing a single view event does not have to become
 * a client component to get it. That distinction is worth a file: the case
 * study and service pages read large localised content modules, and marking
 * them `'use client'` for the sake of one `useEffect` shipped every locale's
 * prose to every visitor.
 *
 * The props are the analytics module's narrow `EventProps`, so nothing a
 * visitor typed can be passed through here even by accident.
 */
export default function TrackView({ event, props }: { event: AnalyticsEvent; props?: EventProps }) {
  useEffect(() => {
    track(event, props);
    // `props` is a fresh object literal on each render; serialising it keeps the
    // effect from re-firing while still reacting to a genuine change.
  }, [event, JSON.stringify(props ?? {})]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
