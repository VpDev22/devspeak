import { useEffect, useState } from 'react';

// Hash routing keeps the app a plain static site (works on Cloudflare Pages without rewrites).

const parse = () => location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);

export function useRoute(): string[] {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo(0, 0); };
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const href = (...parts: string[]) => '#/' + parts.map(encodeURIComponent).join('/');
export const go = (...parts: string[]) => { location.hash = href(...parts); };
