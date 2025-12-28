'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import {
    type Locale,
    SUPPORTED_LOCALES,
    getInitialLocale,
    saveLocale,
    isRTL,
} from '@/lib/i18n'

// Import all translation files
import en from '@/locales/en/common.json'

// Type for nested translation objects
type TranslationValue = string | { [key: string]: TranslationValue }
type Translations = { [key: string]: TranslationValue }

// Translation files map - loaded dynamically
const translationFiles: Record<Locale, Translations> = {
    'en': en,
    'es': en, // Fallback to English until translations are added
    'zh-CN': en,
    'hi': en,
    'ar': en,
    'fr': en,
    'pt-BR': en,
    'ru': en,
    'de': en,
    'ja': en,
    'tr': en,
    'vi': en,
    'th': en,
    'id': en,
}

// Context type
interface LanguageContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string, params?: Record<string, string | number>) => string
    isRTL: boolean
    supportedLocales: readonly Locale[]
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
    locale: 'en',
    setLocale: () => { },
    t: (key) => key,
    isRTL: false,
    supportedLocales: SUPPORTED_LOCALES,
})

/**
 * Get nested value from object using dot notation
 * e.g., getValue(obj, 'header.nav.howItWorks')
 */
function getValue(obj: Translations, path: string): string {
    const keys = path.split('.')
    let current: TranslationValue = obj

    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key]
        } else {
            return path // Return key if not found
        }
    }

    return typeof current === 'string' ? current : path
}

/**
 * Replace {{param}} placeholders with values
 */
function interpolate(str: string, params?: Record<string, string | number>): string {
    if (!params) return str

    return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        return params[key]?.toString() ?? `{{${key}}}`
    })
}

interface LanguageProviderProps {
    children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [locale, setLocaleState] = useState<Locale>('en')
    const [mounted, setMounted] = useState(false)
    const [translations, setTranslations] = useState<Translations>(en)

    // Initialize locale on mount
    useEffect(() => {
        const initialLocale = getInitialLocale()
        setLocaleState(initialLocale)
        setMounted(true)
    }, [])

    // Load translations when locale changes
    useEffect(() => {
        const loadTranslations = async () => {
            try {
                // Dynamic import for non-English locales
                let loadedTranslations: Translations

                switch (locale) {
                    case 'es':
                        loadedTranslations = (await import('@/locales/es/common.json')).default
                        break
                    case 'zh-CN':
                        loadedTranslations = (await import('@/locales/zh-CN/common.json')).default
                        break
                    case 'hi':
                        loadedTranslations = (await import('@/locales/hi/common.json')).default
                        break
                    case 'ar':
                        loadedTranslations = (await import('@/locales/ar/common.json')).default
                        break
                    case 'fr':
                        loadedTranslations = (await import('@/locales/fr/common.json')).default
                        break
                    case 'pt-BR':
                        loadedTranslations = (await import('@/locales/pt-BR/common.json')).default
                        break
                    case 'ru':
                        loadedTranslations = (await import('@/locales/ru/common.json')).default
                        break
                    case 'de':
                        loadedTranslations = (await import('@/locales/de/common.json')).default
                        break
                    case 'ja':
                        loadedTranslations = (await import('@/locales/ja/common.json')).default
                        break
                    case 'tr':
                        loadedTranslations = (await import('@/locales/tr/common.json')).default
                        break
                    case 'vi':
                        loadedTranslations = (await import('@/locales/vi/common.json')).default
                        break
                    case 'th':
                        loadedTranslations = (await import('@/locales/th/common.json')).default
                        break
                    case 'id':
                        loadedTranslations = (await import('@/locales/id/common.json')).default
                        break
                    default:
                        loadedTranslations = en
                }

                setTranslations(loadedTranslations)
            } catch {
                // Fallback to English if loading fails
                setTranslations(en)
            }
        }

        loadTranslations()
    }, [locale])

    // Update HTML attributes when locale changes
    useEffect(() => {
        if (!mounted) return

        const html = document.documentElement
        html.lang = locale
        html.dir = isRTL(locale) ? 'rtl' : 'ltr'
    }, [locale, mounted])

    // Set locale and persist to localStorage
    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale)
        saveLocale(newLocale)
    }, [])

    // Translation function
    const t = useCallback((key: string, params?: Record<string, string | number>): string => {
        const value = getValue(translations, key)
        return interpolate(value, params)
    }, [translations])

    const contextValue = useMemo(() => ({
        locale,
        setLocale,
        t,
        isRTL: isRTL(locale),
        supportedLocales: SUPPORTED_LOCALES,
    }), [locale, setLocale, t])

    // Prevent hydration mismatch by rendering children only after mount
    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ ...contextValue, locale: 'en', isRTL: false }}>
                {children}
            </LanguageContext.Provider>
        )
    }

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    )
}

/**
 * Hook to access language context
 */
export function useTranslation() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider')
    }
    return context
}
