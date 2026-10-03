import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Old Jekyll URLs -> new locations, so existing links and search results keep working.
const redirects = {
  // pages
  '/code-data': '/projects/',
  '/dentalmind': '/projects/#dentalmind',
  '/links': '/certificates/',
  '/courses': '/certificates/',
  '/friends': '/gallery/friends/',
  '/hobbies': '/gallery/nature-and-hiking/',
  // posts
  '/Post-Newidea-copy-5': '/blog/nlp-lab-internship/',
  '/Post-Newidea-copy-6': '/blog/project-iridium/',
  '/Post-Multimodal-Sentiment-Analysis-Project(Persian-3classes)': '/blog/persian-multimodal-sentiment-analysis/',
  '/Post-Osmium-Project-Tasks': '/blog/osmium-cell-localization/',
  '/Post-pysychological': '/blog/psychological-health-chatbot/',
  '/Post-speech': '/blog/wav2vec2-persian-speech-emotion/',
  '/Post-FTTNAS': '/blog/ftt-nas-review/',
  '/Post-backdoorBench': '/blog/understanding-backdoorbench/',
  '/Post-online-detection-lab': '/blog/backdoor-detection-lab/',
  '/Post-dental-vlm': '/blog/dental-xray-vision-language-models/',
  '/Post-bait-weakness-zoo': '/blog/bait-weakness-zoo/',
  '/Post-palimpsest': '/blog/field-based-view-of-llm-backdoors/',
  '/Post-devigen': '/blog/devign-reproduction/',
  '/Post-llm-backdoor-scanner': '/blog/auditing-llm-backdoors/',
  '/Post-bellows-leakage': '/blog/backdoor-step-function-to-ramp/',
  '/ai-security/large-language-models/research/The-Sentinels-Dilemma-copy': '/blog/the-sentinels-dilemma/',
  '/Post-online-backdoor-detector': '/blog/watchdog-for-backdoored-lora/',
  '/MECP-GAP': '/blog/mecp-gap/',
  // early personal posts, now unlisted drafts
  '/Post-Newidea': '/blog/',
  '/Post-Newidea-copy': '/blog/',
  '/Post-Newidea-copy-2': '/blog/',
  '/Post-Newidea-copy-3': '/blog/',
  '/Post-Newidea-copy-4': '/blog/',
};

export default defineConfig({
  site: 'https://www.amirrezavishteh.ir',
  trailingSlash: 'ignore',
  redirects,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
