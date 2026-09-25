export default function ExperienceIcon({ name = 'arrow' }: { name?: 'arrow' | 'external' | 'back' | 'down' | 'close' | 'menu' }) {
  const paths = { arrow: 'M4 12h16m-6-6 6 6-6 6', external: 'M6 18 18 6M6 6h12v12', back: 'M20 12H4m6-6-6 6 6 6', down: 'M12 4v16m-6-6 6 6 6-6', close: 'm6 6 12 12M6 18 18 6', menu: 'M4 8h16M4 16h16' };
  return <svg className="experience-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" aria-hidden="true"><path d={paths[name]} /></svg>;
}
