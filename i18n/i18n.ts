import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en } from './translations/en';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { de } from './translations/de';
import { ja } from './translations/ja';

// Create i18n instance
const i18n = new I18n({
  en,
  es,
  fr,
  de,
  ja,
});

// Set the locale to the device's locale
i18n.locale = Localization.locale;

// Set fallback locale
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n; 