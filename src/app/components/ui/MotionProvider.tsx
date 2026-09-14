'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 400, damping: 32 }}>{children}</MotionConfig>;
}
