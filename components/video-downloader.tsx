"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Download,
  Instagram,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Video,
  FileVideo,
  Menu,
  X,
  ArrowUp,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { VideoResult } from "@/components/video-result"
import { useTranslation } from "@/components/language-context"
import { LanguageSwitcher, LanguageSwitcherCompact } from "@/components/language-switcher"

interface VideoData {
  success: boolean
  thumbnail?: string
  video_url?: string
  quality?: string
  duration?: string
  error?: string
}

export function VideoDownloader() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  const navItems = [
    { label: t('header.nav.howItWorks'), href: "#how-it-works" },
    { label: t('header.nav.platforms'), href: "#supported-platforms" },
    { label: t('header.nav.benefits'), href: "#why-choose" },
    { label: t('header.nav.faq'), href: "#faq" },
    { label: t('header.nav.compatibility'), href: "#works-anywhere" },
    { label: t('header.nav.useCases'), href: "#usage-tips" },
    { label: t('header.nav.contact'), href: "#contact" }

  ]

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const validateInstagramUrl = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/,
      /^https?:\/\/(www\.)?instagram\.com\/reel\/[\w-]+\/?/,
      /^https?:\/\/(www\.)?instagram\.com\/tv\/[\w-]+\/?/,
      /^https?:\/\/(www\.)?instagram\.com\/reels\/[\w-]+\/?/,
    ]
    return patterns.some((pattern) => pattern.test(url))
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setVideoData(null)

    if (!url.trim()) {
      setError("Please enter an Instagram URL")
      return
    }

    if (!validateInstagramUrl(url)) {
      setError("Invalid Instagram URL. Please enter a valid video, reel, or IGTV link.")
      return
    }

    setLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || `Server error: ${response.status}`)
        return
      }

      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Failed to fetch video. Please try again.")
        return
      }

      if (!data.video_url) {
        setError("No video found. This might be an image post or the video is unavailable.")
        return
      }

      setVideoData(data)
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setError("Request timed out. Please try again.")
        } else {
          setError("Network error. Please check your connection and try again.")
        }
      } else {
        setError("Unable to connect to server. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text && validateInstagramUrl(text)) {
        setUrl(text)
        setError(null)
      }
    } catch {
      // Clipboard access denied
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center px-4 pb-10 pt-4 md:pt-6 md:pb-14 relative overflow-hidden
  bg-[radial-gradient(1200px_600px_at_50%_50%,rgba(165,142,251,0.2),rgba(0,0,0,0)_60%)]
  before:content-[''] before:absolute before:inset-0 before:-z-10
  before:bg-[radial-gradient(520px_520px_at_15%_50%,rgba(236,72,153,0.18),rgba(0,0,0,0)_70%)]
  after:content-[''] after:absolute after:inset-0 after:-z-10
  after:bg-[radial-gradient(560px_560px_at_85%_50%,rgba(251,146,60,0.16),rgba(168,85,247,0.08)_35%,rgba(0,0,0,0)_75%)]">



      {/* Hero navigation / header */}
      <header className="fixed inset-x-0 top-5 z-40 pl-[15px] pr-[15px] ">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 
  rounded-3xl border border-border/60

  backdrop-blur-lg 
  
  px-4 py-3  bg-card/95">


          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground tracking-tight">
                {t('header.siteName')}
              </p>
              <p className="text-xs text-muted-foreground">{t('header.platform')}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-muted-foreground min-[900px]:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="hover:text-primary transition cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />
            {/* Theme Toggle Button */}
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
            <a
              href="#video-downloader-hero"
              onClick={(e) => handleSmoothScroll(e, '#video-downloader-hero')}
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground cursor-pointer"
            >
              {t('header.downloadNow')}
            </a>
          </div>

          <div className="flex items-center gap-2 min-[900px]:hidden">
            {/* Language Switcher (Mobile) */}
            <LanguageSwitcherCompact />
            {/* Theme Toggle Button (Mobile) */}
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
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-foreground cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#video-downloader-hero"
              onClick={(e) => handleSmoothScroll(e, '#video-downloader-hero')}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground cursor-pointer"
            >
              {t('header.downloadNow')}
            </a>
          </div>
        )}
      </header>

      {/* Hero copy */}
      <div className="mt-24 mb-10 text-center md:mt-28">
        <div className="mb-5 flex items-center justify-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Instagram
              className="h-8 w-8 text-primary"
              role="img"
              aria-label="Instagram video, reels and MP3 audio downloader"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground tracking-tight md:text-3xl lg:text-4xl">
          {t('hero.title')}
        </h1>

        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          {t('hero.subtitle')}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {t('hero.description')}
        </p>
      </div>


      {/* Main Card */}
      <Card className="w-full max-w-xl bg-card border-border shadow-xl">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-foreground">
                {t('downloader.urlLabel')}
              </label>
              <div className="relative">
                <Input
                  id="url"
                  type="text"
                  placeholder={t('downloader.placeholder')}
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    setError(null)
                  }}
                  onPaste={handlePaste}
                  className="h-12 pl-4 pr-20 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:text-primary/80 px-2 py-1 rounded transition-colors"
                >
                  {t('downloader.paste')}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('downloader.processing')}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  {t('downloader.downloadVideo')}
                </>
              )}
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Success Result */}
          {videoData && videoData.success && <VideoResult data={videoData} />}
        </CardContent>
      </Card>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 gap-6 w-full max-w-3xl md:grid-cols-3">
        <FeatureCard
          icon={<Video className="w-5 h-5" role="img" aria-label="Instagram video and reels downloader support" />}
          title={t('features.instagram.title')}
          description={t('features.instagram.description')}
        />

        <FeatureCard
          icon={<CheckCircle2 className="w-5 h-5" role="img" aria-label="High quality Instagram video downloader" />}
          title={t('features.quality.title')}
          description={t('features.quality.description')}
        />

        <FeatureCard
          icon={<FileVideo className="w-5 h-5" role="img" aria-label="Fast and secure Instagram downloader" />}
          title={t('features.fast.title')}
          description={t('features.fast.description')}
        />
      </div>

      {/* Footer */}
      <footer className="mt-16 flex justify-center">
  <div className="max-w-3xl rounded-lg  border-border bg-card  px-6 py-4 text-center text-sm text-muted-foreground shadow-sm">
    <p className="flex flex-col sm:flex-row justify-center gap-1">
      <span>{t('heroFooter.line1')}</span>
    </p>
  </div>
</footer>




      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label={t('accessibility.scrollToTop')}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card/50 border border-border/50">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <h2 className="font-medium text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    
  )
}
