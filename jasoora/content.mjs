export function downloadUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function sharedContent(search) {
  const params = new URLSearchParams(search);
  const novels = params.getAll('novel');
  const oneShots = params.getAll('oneShot');
  if ((novels.length > 0) === (oneShots.length > 0)) return null;
  const values = novels.length ? novels : oneShots;
  if (values.length !== 1 || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(values[0])) return null;
  return { type: novels.length ? 'novel' : 'oneShot', id: values[0] };
}

export function androidAppIntent(search) {
  const content = sharedContent(search);
  if (!content && search) return null;
  const query = content ? `?${new URLSearchParams({ [content.type]: content.id })}` : '';
  const page = `https://eslamsalah5.github.io/jasoora/${query}`;
  const fallback = content ? `${page}&appLinkFallback=1` : page;
  return `intent://${page.slice('https://'.length)}#Intent;scheme=https;package=com.jasoora.app;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
}

export const copy = {
  ar: {
    eyebrow: 'حكايتك تبدأ هنا',
    title: 'كمّل الحكاية\nعلى جاسورا.',
    description: 'افتح هذا العمل على تطبيق جاسورا، واكتشف روايات وقصصًا تستحق وقتك.',
    genericDescription: 'نزّل تطبيق جاسورا، واكتشف روايات وقصصًا تستحق وقتك.',
    download: 'تنزيل جاسورا لأندرويد ↓',
    unavailable: 'التنزيل غير متاح بعد',
    pending: 'سنضيف رابط التنزيل الرسمي هنا عند توفره.',
    ready: 'رابط التنزيل الرسمي لتطبيق جاسورا.',
    openApp: 'فتح في التطبيق',
    openHint: 'التطبيق عندك بالفعل؟ اضغط «فتح في التطبيق». لو الزر ما استجابش، افتح الصفحة في Chrome وجرب تاني.',
    installed: 'التطبيق عندك بالفعل؟ افتح رابط العمل على موبايل أندرويد.',
    note: 'بعد تثبيت التطبيق، اضغط على رابط العمل مرة تانية.',
    privacy: 'سياسة الخصوصية',
    pageTitle: 'اقرأ على جاسورا | Jasoora',
  },
  en: {
    eyebrow: 'YOUR NEXT STORY STARTS HERE',
    title: 'Continue the story\non Jasoora.',
    description: 'Open this work in Jasoora and discover novels and short stories worth your time.',
    genericDescription: 'Download Jasoora and discover novels and short stories worth your time.',
    download: 'Download Jasoora for Android ↓',
    unavailable: 'Download not available yet',
    pending: 'The official download link will appear here when available.',
    ready: 'The official Jasoora app download link.',
    openApp: 'Open in app',
    openHint: 'Already have Jasoora? Tap “Open in app”. If nothing happens, open this page in Chrome and try again.',
    installed: 'Already have Jasoora? Open the shared link on your Android phone.',
    note: 'After installing the app, tap the shared link again.',
    privacy: 'Privacy policy',
    pageTitle: 'Read on Jasoora',
  },
};
