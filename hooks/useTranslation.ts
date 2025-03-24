import { useCallback } from 'react';
import i18n from '@/i18n/i18n';

/**
 * Hook for using translations
 * @returns Translation function
 */
export function useTranslation() {
  /**
   * Translate a key
   * @param key Translation key
   * @param options Translation options
   * @returns Translated string
   */
  const t = useCallback((key: string, options?: Record<string, any>) => {
    return i18n.t(key, options);
  }, []);

  /**
   * Set the locale
   * @param locale Locale to set
   */
  const setLocale = useCallback((locale: string) => {
    i18n.locale = locale;
  }, []);

  /**
   * Get the current locale
   * @returns Current locale
   */
  const getLocale = useCallback(() => {
    return i18n.locale;
  }, []);

  return { t, setLocale, getLocale };
} 