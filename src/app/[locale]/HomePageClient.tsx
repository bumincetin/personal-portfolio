'use client';

import { useMemo } from 'react';
import { getTranslation, type Locale } from '@/lib/translations';
import { getStory } from '@/lib/story';
import StoryHero from '../sections/story/StoryHero';
import StoryIndex from '../sections/story/StoryIndex';
import Chapter from '../sections/story/Chapter';
import Epilogue from '../sections/story/Epilogue';

/**
 * The home page is one story: an overture, five chapters that walk the
 * consultant's background in order -- each one ending in the service it
 * became and the work it produced -- and an epilogue that lists the practice
 * as it stands today. The footer (in the locale layout) is the contact.
 */
export default function HomePageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);
  const story = useMemo(() => getStory(locale), [locale]);

  // Stable identity: the rail re-measures the page whenever this changes.
  const index = useMemo(
    () => [
      ...story.chapters.map((chapter, i) => ({ id: `chapter-${i + 1}`, numeral: chapter.numeral, title: chapter.kicker })),
      { id: 'today', numeral: '§', title: story.index.epilogue },
    ],
    [story],
  );

  return (
    <main>
      <StoryHero story={story} t={t} locale={locale} />
      <StoryIndex label={story.index.label} entries={index} />
      {story.chapters.map((chapter, i) => (
        <Chapter key={chapter.numeral} chapter={chapter} index={i} locale={locale} labels={story.labels} />
      ))}
      <Epilogue story={story} t={t} locale={locale} />
    </main>
  );
}
