"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useTranslation } from "@/components/language-context"
import { LanguageSwitcher, LanguageSwitcherCompact } from "@/components/language-switcher"

interface HeaderProps {
    isHomePage?: boolean
}

export function Header({ isHomePage = false }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const { t } = useTranslation()

    const navItems = [
        { label: t('header.nav.howItWorks'), href: "/#how-it-works" },
        { label: t('header.nav.benefits'), href: "/#why-choose" },
        { label: t('header.nav.compatibility'), href: "/#works-anywhere" },
        { label: t('header.nav.contact'), href: "/#contact" }
    ]

    // Prevent hydration mismatch for theme
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isHomePage) return // Allow normal navigation if not on home page

        if (href.startsWith('/#')) {
            e.preventDefault()
            const targetId = href.replace('/#', '')
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            setMenuOpen(false)
        }
    }

    return (
        <header className="fixed inset-x-0 top-5 z-40 pl-[15px] pr-[15px]">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 
        rounded-3xl border border-border/60
        backdrop-blur-lg 
        px-4 py-3 bg-card/95"
            >
                <Link href="/" className="flex items-center gap-3">
                    <div>
                        <p className="text-sm font-semibold text-foreground tracking-tight">
                            {t('header.siteName')}
                        </p>
                        <p className="text-xs text-muted-foreground">{t('header.platform')}</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-5 text-sm text-muted-foreground min-[900px]:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleSmoothScroll(e as any, item.href)}
                            className="hover:text-primary transition cursor-pointer"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <LanguageSwitcher />
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="inline-flex items-center justify-center rounded-xl border border-border p-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        aria-label={mounted && theme === 'dark' ? t('accessibility.switchToLight') : t('accessibility.switchToDark')}
                    >
                        {mounted && theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>
                    <Link
                        href="/#video-downloader-hero"
                        onClick={(e) => handleSmoothScroll(e as any, '/#video-downloader-hero')}
                        className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground cursor-pointer"
                    >
                        {t('header.downloadNow')}
                    </Link>
                </div>

                <div className="flex items-center gap-2 min-[900px]:hidden">
                    <LanguageSwitcherCompact />
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="inline-flex items-center justify-center rounded-xl border border-border p-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label={mounted && theme === 'dark' ? t('accessibility.switchToLight') : t('accessibility.switchToDark')}
                    >
                        {mounted && theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-border p-2 text-foreground"
                        aria-label={t('accessibility.toggleMenu')}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="mx-auto mt-2 flex w-full max-w-5xl flex-col gap-2 rounded-2xl border border-border/60 bg-card/95 p-4 text-sm text-muted-foreground min-[900px]:hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleSmoothScroll(e as any, item.href)}
                            className="rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-foreground cursor-pointer"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/#video-downloader-hero"
                        onClick={(e) => handleSmoothScroll(e as any, '/#video-downloader-hero')}
                        className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground cursor-pointer"
                    >
                        {t('header.downloadNow')}
                    </Link>
                </div>
            )}
        </header>
    )
}
