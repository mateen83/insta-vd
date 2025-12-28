/**
 * i18n Configuration and Utilities
 * 
 * This file contains language configuration, detection logic,
 * and utility functions for internationalization.
 */

// Supported language codes
export const SUPPORTED_LOCALES = [
    'en',      // English (default)
    'es',      // Spanish
    'zh-CN',   // Mandarin Chinese (Simplified)
    'hi',      // Hindi
    'ar',      // Arabic (RTL)
    'fr',      // French
    'pt-BR',   // Portuguese (Brazil)
    'ru',      // Russian
    'de',      // German
    'ja',      // Japanese
    'tr',      // Turkish
    'vi',      // Vietnamese
    'th',      // Thai
    'id',      // Indonesian
] as const

export type Locale = typeof SUPPORTED_LOCALES[number]

// Language display names (in their native language)
export const LANGUAGE_NAMES: Record<Locale, string> = {
    'en': 'English',
    'es': 'Español',
    'zh-CN': '中文',
    'hi': 'हिन्दी',
    'ar': 'العربية',
    'fr': 'Français',
    'pt-BR': 'Português',
    'ru': 'Русский',
    'de': 'Deutsch',
    'ja': '日本語',
    'tr': 'Türkçe',
    'vi': 'Tiếng Việt',
    'th': 'ไทย',
    'id': 'Indonesia',
}

// RTL languages
export const RTL_LOCALES: Locale[] = ['ar']

/**
 * Check if a locale uses RTL direction
 */
export function isRTL(locale: Locale): boolean {
    return RTL_LOCALES.includes(locale)
}

// Browser language to locale mapping
const BROWSER_LANG_MAP: Record<string, Locale> = {
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'es': 'es',
    'es-ES': 'es',
    'es-MX': 'es',
    'es-AR': 'es',
    'zh': 'zh-CN',
    'zh-CN': 'zh-CN',
    'zh-Hans': 'zh-CN',
    'hi': 'hi',
    'hi-IN': 'hi',
    'ar': 'ar',
    'ar-SA': 'ar',
    'ar-EG': 'ar',
    'ar-AE': 'ar',
    'fr': 'fr',
    'fr-FR': 'fr',
    'fr-CA': 'fr',
    'pt': 'pt-BR',
    'pt-BR': 'pt-BR',
    'pt-PT': 'pt-BR',
    'ru': 'ru',
    'ru-RU': 'ru',
    'de': 'de',
    'de-DE': 'de',
    'de-AT': 'de',
    'de-CH': 'de',
    'ja': 'ja',
    'ja-JP': 'ja',
    'tr': 'tr',
    'tr-TR': 'tr',
    'vi': 'vi',
    'vi-VN': 'vi',
    'th': 'th',
    'th-TH': 'th',
    'id': 'id',
    'id-ID': 'id',
}

/**
 * Detect user's preferred language from browser settings
 * Returns the best matching supported locale or 'en' as fallback
 */
export function detectBrowserLanguage(): Locale {
    if (typeof window === 'undefined') return 'en'

    // Get browser languages in order of preference
    const browserLangs = navigator.languages || [navigator.language]

    for (const lang of browserLangs) {
        // Try exact match first
        if (BROWSER_LANG_MAP[lang]) {
            return BROWSER_LANG_MAP[lang]
        }
        // Try base language (e.g., 'en' from 'en-US')
        const baseLang = lang.split('-')[0]
        if (BROWSER_LANG_MAP[baseLang]) {
            return BROWSER_LANG_MAP[baseLang]
        }
    }

    return 'en' // Default fallback
}

// LocalStorage key for persisted language preference
export const LOCALE_STORAGE_KEY = 'preferred-locale'

/**
 * Get saved locale from localStorage
 */
export function getSavedLocale(): Locale | null {
    if (typeof window === 'undefined') return null

    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && SUPPORTED_LOCALES.includes(saved as Locale)) {
        return saved as Locale
    }
    return null
}

/**
 * Save locale to localStorage
 */
export function saveLocale(locale: Locale): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}

/**
 * Get the initial locale on app load
 * Priority: 1. Saved preference, 2. Browser detection, 3. English fallback
 */
export function getInitialLocale(): Locale {
    const saved = getSavedLocale()
    if (saved) return saved

    return detectBrowserLanguage()
}
