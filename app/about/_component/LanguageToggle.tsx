'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

const LangToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = useMemo(() => {
    const lang = searchParams.get('lang');
    return lang === 'zh' ? 'zh' : 'en'; 
  }, [searchParams]);

  const setLang = (lang: 'en' | 'zh') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="fixed scale-75 top-48 right-0 z-50 flex items-center gap-2 bg-black/30 text-white rounded-full px-3 py-1 shadow-md">
      <button
        onClick={() => setLang('en')}
        className={`px-2 hover:bg-white/60 hover:text-black/60 rounded cursor-none ${current === 'en' ? 'bg-white text-black' : 'text-white/80'}`}
      >
        EN
      </button>
      <span className="text-white/50">|</span>
      <button
        onClick={() => setLang('zh')}
        className={`px-2 hover:bg-white/60 hover:text-black/60 rounded cursor-none ${current === 'zh' ? 'bg-white text-black' : 'text-white/80'}`}
      >
        中文
      </button>
    </div>
  );
};

export default LangToggle;