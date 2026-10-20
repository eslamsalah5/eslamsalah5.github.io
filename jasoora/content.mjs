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

export const copy = {
  ar: {
    eyebrow: 'حكايتك تبدأ هنا',
    title: 'كمّل الحكاية\nعلى جاسورا.',
    description: 'نزّل تطبيق جاسورا لقراءة هذا العمل، واكتشف روايات وقصصًا تستحق وقتك.',
    genericDescription: 'نزّل تطبيق جاسورا، واكتشف روايات وقصصًا تستحق وقتك.',
    download: 'تنزيل جاسورا لأندرويد ↓',
    unavailable: 'التنزيل غير متاح بعد',
    pending: 'سنضيف رابط التنزيل الرسمي هنا عند توفره.',
    ready: 'رابط التنزيل الرسمي لتطبيق جاسورا.',
    installed: 'التطبيق عندك بالفعل؟ افتح الرابط من الرسالة، وتأكد إن فتح الروابط مدعوم ومفعّل لجاسورا في إعدادات أندرويد.',
    note: 'بعد تثبيت التطبيق، اضغط على رابط العمل مرة تانية.',
    privacy: 'سياسة الخصوصية',
    pageTitle: 'اقرأ على جاسورا | Jasoora',
  },
  en: {
    eyebrow: 'YOUR NEXT STORY STARTS HERE',
    title: 'Continue the story\non Jasoora.',
    description: 'Download Jasoora to read this work and discover novels and short stories worth your time.',
    genericDescription: 'Download Jasoora and discover novels and short stories worth your time.',
    download: 'Download Jasoora for Android ↓',
    unavailable: 'Download not available yet',
    pending: 'The official download link will appear here when available.',
    ready: 'The official Jasoora app download link.',
    installed: 'Already have the app? Open the link from your message and make sure opening supported links is enabled for Jasoora in Android settings.',
    note: 'After installing the app, tap the shared link again.',
    privacy: 'Privacy policy',
    pageTitle: 'Read on Jasoora',
  },
};
