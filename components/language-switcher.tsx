'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useTranslation } from '@/components/language-context'
import { LANGUAGE_NAMES, type Locale } from '@/lib/i18n'

/**
 * Language Switcher Dropdown Component
 * 
 * Displays current language and allows switching between supported languages.
 * Matches the existing header button styling.
 */
export function LanguageSwitcher() {
    const { locale, setLocale, supportedLocales, t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    const handleSelect = (newLocale: Locale) => {
        setLocale(newLocale)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                aria-label={t('accessibility.selectLanguage')}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{LANGUAGE_NAMES[locale]}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg overflow-hidden"
                    role="listbox"
                    aria-label="Select language"
                >
                    <div className="max-h-80 overflow-y-auto py-1">
                        {supportedLocales.map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                role="option"
                                aria-selected={locale === lang}
                                onClick={() => handleSelect(lang)}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer
                  ${locale === lang
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-foreground hover:bg-muted'
                                    }`}
                            >
                                <span>{LANGUAGE_NAMES[lang]}</span>
                                {locale === lang && <Check className="h-4 w-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * Compact Language Switcher for mobile
 * Shows only the globe icon, with current language in dropdown
 */
export function LanguageSwitcherCompact() {
    const { locale, setLocale, supportedLocales, t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (newLocale: Locale) => {
        setLocale(newLocale)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-xl border border-border p-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                aria-label={t('accessibility.selectLanguage')}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <Globe className="h-5 w-5" />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg overflow-hidden"
                    role="listbox"
                    aria-label="Select language"
                >
                    <div className="max-h-80 overflow-y-auto py-1">
                        {supportedLocales.map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                role="option"
                                aria-selected={locale === lang}
                                onClick={() => handleSelect(lang)}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer
                  ${locale === lang
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-foreground hover:bg-muted'
                                    }`}
                            >
                                <span>{LANGUAGE_NAMES[lang]}</span>
                                {locale === lang && <Check className="h-4 w-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
