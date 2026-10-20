import { androidDownloadUrl } from './config.mjs';
import { androidAppIntent, copy, downloadUrl, sharedContent } from './content.mjs?v=20261020-brand';

const destination = downloadUrl(androidDownloadUrl);
const content = sharedContent(window.location.search);
const appIntent = /Android/i.test(window.navigator?.userAgent ?? '')
  ? androidAppIntent(window.location.search)
  : null;
const languageButton = document.getElementById('language');
let language = 'ar';

function render() {
  const text = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = text.pageTitle;
  for (const id of ['eyebrow', 'title', 'download', 'unavailable', 'note', 'privacy']) {
    document.getElementById(id).textContent = text[id];
  }
  document.getElementById('description').textContent = content ? text.description : text.genericDescription;
  document.getElementById('status').textContent = destination ? text.ready : text.pending;
  const download = document.getElementById('download');
  download.hidden = !destination;
  if (destination) download.href = destination;
  document.getElementById('unavailable').hidden = Boolean(destination);
  const openApp = document.getElementById('open-app');
  openApp.textContent = text.openApp;
  openApp.hidden = !appIntent;
  if (appIntent) openApp.href = appIntent;
  document.getElementById('installed').textContent = appIntent ? text.openHint : text.installed;
  languageButton.textContent = language === 'ar' ? 'English' : 'العربية';
  languageButton.lang = language === 'ar' ? 'en' : 'ar';
  languageButton.hidden = false;
}

languageButton.addEventListener('click', () => {
  language = language === 'ar' ? 'en' : 'ar';
  render();
});
render();

// A browser may require a user gesture; the rendered button remains available.
// The fallback marker prevents reopening the intent when the app is unavailable.
if (appIntent && content && !new URLSearchParams(window.location.search).has('appLinkFallback')) {
  try {
    window.location.replace(appIntent);
  } catch {
    // Keep the page usable when external navigation is blocked.
  }
}
