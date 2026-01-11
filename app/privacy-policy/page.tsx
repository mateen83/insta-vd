'use client'

import { useTranslation } from "@/components/language-context"
import { Shield, Lock, Eye, FileText, AlertCircle, Mail, Globe, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
    const { t } = useTranslation()

    return (
        <main className="min-h-screen bg-background flex flex-col pt-24">
            <Header />

            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm md:p-12">
                    <header className="mb-12 border-b border-border/40 pb-8">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
                            {t('privacyPolicy.title')}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {t('privacyPolicy.effectiveDate')}
                        </p>
                    </header>

                    <div className="space-y-12">
                        <section className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {t('privacyPolicy.intro')}
                            </p>
                        </section>

                        <section className="grid gap-8">
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section1.title')}</h2>
                                </div>
                                <div className="space-y-3 pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section1.content1')}</p>
                                    <ul className="list-disc space-y-2 text-muted-foreground pl-4">
                                        <li>{t('privacyPolicy.section1.content2')}</li>
                                        <li>{t('privacyPolicy.section1.content3')}</li>
                                        <li>{t('privacyPolicy.section1.content4')}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section2.title')}</h2>
                                </div>
                                <div className="space-y-3 pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section2.content1')}</p>
                                    <ul className="list-disc space-y-2 text-muted-foreground pl-4">
                                        <li>{t('privacyPolicy.section2.content2')}</li>
                                        <li>{t('privacyPolicy.section2.content3')}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Eye className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section3.title')}</h2>
                                </div>
                                <div className="pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section3.content')}</p>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Shield className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section4.title')}</h2>
                                </div>
                                <div className="space-y-3 pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section4.content')}</p>
                                    <ul className="list-disc space-y-2 text-muted-foreground pl-4">
                                        <li>{t('privacyPolicy.section4.item1')}</li>
                                        <li>{t('privacyPolicy.section4.item2')}</li>
                                        <li>{t('privacyPolicy.section4.item3')}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <AlertCircle className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section5.title')}</h2>
                                </div>
                                <div className="space-y-2 pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section5.content1')}</p>
                                    <p className="text-muted-foreground">{t('privacyPolicy.section5.content2')}</p>
                                    <p className="text-muted-foreground">{t('privacyPolicy.section5.content3')}</p>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Globe className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section6.title')}</h2>
                                </div>
                                <div className="pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section6.content')}</p>
                                </div>
                            </div>

                            {/* Section 7 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <UserMinusIcon className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section7.title')}</h2>
                                </div>
                                <div className="pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section7.content')}</p>
                                </div>
                            </div>

                            {/* Section 8 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section8.title')}</h2>
                                </div>
                                <div className="pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section8.content')}</p>
                                </div>
                            </div>

                            {/* Section 9 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{t('privacyPolicy.section9.title')}</h2>
                                </div>
                                <div className="space-y-2 pl-11">
                                    <p className="text-muted-foreground">{t('privacyPolicy.section9.content')}</p>
                                    <p className="text-muted-foreground font-medium">{t('privacyPolicy.section9.email')}</p>
                                    <p className="text-muted-foreground font-medium">{t('privacyPolicy.section9.website')}</p>
                                    <p className="text-xs text-muted-foreground italic mt-2">{t('privacyPolicy.section9.responseTime')}</p>
                                </div>
                            </div>
                        </section>

                        <footer className="mt-12 pt-8 border-t border-border/40">
                            <div className="rounded-2xl bg-muted/30 p-6">
                                <h3 className="text-sm font-semibold text-foreground mb-2">{t('privacyPolicy.disclaimer.title')}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t('privacyPolicy.disclaimer.content')}
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

function UserMinusIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
    )
}
