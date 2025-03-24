import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en } from './translations/en';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { de } from './translations/de';
import { ja } from './translations/ja';
import { zh } from './translations/zh';
import { ru } from './translations/ru';
import { ar } from './translations/ar';
import { hi } from './translations/hi';
import { id } from './translations/id';
import { pt } from './translations/pt';
import { sw } from './translations/sw';
import { tr } from './translations/tr';
import { nl } from './translations/nl';
import { no } from './translations/no';
import { ko } from './translations/ko';

// Create i18n instance
const i18n = new I18n({
  en,
  es,
  fr,
  de,
  ja,
  zh,
  ru,
  ar,
  hi,
  id,
  pt,
  sw,
  tr,
  nl,
  no,
  ko
});

// Set the locale to the device's locale
i18n.locale = Localization.locale;

// Set fallback locale
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n; 