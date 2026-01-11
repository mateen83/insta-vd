"use client"

import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import { useTranslation } from "@/components/language-context"

export function Footer() {
    const { t } = useTranslation()

    const socialLinks = [
        {
            icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/mateen_8325/",
        },
        {
            icon: Facebook,
            label: "Facebook",
            href: "https://www.facebook.com/mateen8326",
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/abdul-mateen-5b6197261/",
        },
    ]

    return (
        <footer
            className="mx-auto w-full max-w-7xl border-t border
        rounded-t-3xl border-border/60
        bg-[rgba(255,255,255,0.08)]
        backdrop-blur-lg
        supports-[backdrop-filter]:bg-[rgba(255,255,255,0.05)] bg-card/95"
        >
            {/* Main content row */}
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:justify-between">
                {/* Brand Section */}
                <div className="space-y-3 md:max-w-sm">
                    <div className="inline-flex items-center rounded-full">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                            {t('footer.brand')}
                        </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {t('footer.description')}
                    </p>
                </div>

                {/* Legal Section */}
                <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {t('footer.legal.title')}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                        {t('footer.legal.content')}
                    </p>
                    <Link
                        href="/privacy-policy"
                        className="text-xs text-primary hover:underline transition-all"
                    >
                        {t('privacyPolicy.title')}
                    </Link>
                </div>

                {/* Social Links Section */}
                <div className="flex flex-1 flex-col gap-6 text-sm min-[900px]:flex-row min-[900px]:justify-end">
                    <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {t('footer.follow')}
                        </h3>
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom copyright row */}
            <div className="border-t border-border/60">
                <div className="mx-auto w-full max-w-5xl px-4 py-4">
                    <p className="text-center text-xs text-foreground">
                        © 2025 DownloadTrend By{" "}
                        <a
                            href="https://www.linkedin.com/in/abdul-mateen-5b6197261/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Abdul Mateen
                        </a>{" "}
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
