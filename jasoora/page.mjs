import { androidDownloadUrl } from './config.mjs';
import { copy, downloadUrl, sharedContent } from './content.mjs';

const destination = downloadUrl(androidDownloadUrl);
const content = sharedContent(window.location.search);
const languageButton = document.getElementById('language');
let language = 'ar';

function render() {
  const text = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = text.pageTitle;
  for (const id of ['eyebrow', 'title', 'download', 'unavailable', 'installed', 'note', 'privacy']) {
    document.getElementById(id).textContent = text[id];
  }
  document.getElementById('description').textContent = content ? text.description : text.genericDescription;
  document.getElementById('status').textContent = destination ? text.ready : text.pending;
  const download = document.getElementById('download');
  download.hidden = !destination;
  if (destination) download.href = destination;
  document.getElementById('unavailable').hidden = Boolean(destination);
  languageButton.textContent = language === 'ar' ? 'English' : 'العربية';
  languageButton.lang = language === 'ar' ? 'en' : 'ar';
  languageButton.hidden = false;
}

languageButton.addEventListener('click', () => {
  language = language === 'ar' ? 'en' : 'ar';
  render();
});
render();
