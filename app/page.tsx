'use client'

import Image from "next/image"
import { VideoDownloader } from "@/components/video-downloader"
import { Link2, Eye, Download, Zap, MonitorPlay, KeyRound, Shield, Instagram, Facebook, Youtube, Twitter } from "lucide-react"
import { useTranslation } from "@/components/language-context"


export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col" id="top">
      {/* Hero + core downloader UI (existing logic, unchanged) */}
      <div id="video-downloader-hero">
        <VideoDownloader />
      </div>

      {/* New marketing / information sections below the hero */}
      <SupportedPlatformsSection />
      <HowItWorksSection />
      <WorksOnAnyDeviceSection />
      <WhyChooseSection />
      <UsageTipsSection />
      <ContactSection />
      <FaqSection />
      <AppFooterSection />
    </main>
  )
}

function SectionWrapper({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className="w-full border-t border-border/40 bg-background scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm md:p-8">
          {children}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="mb-8 text-center md:mb-10">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-muted-foreground md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  )
}
function HowItWorksSection() {
  const { t } = useTranslation()

  return (
    <div
      id="how-it-works"
      className="relative overflow-hidden
    bg-[radial-gradient(900px_420px_at_50%_45%,rgba(236,72,153,0.14),rgba(0,0,0,0)_60%)]
    before:content-[''] before:absolute before:inset-0 before:pointer-events-none
    before:bg-[radial-gradient(520px_520px_at_18%_55%,rgba(168,85,247,0.12),rgba(0,0,0,0)_70%)]
    after:content-[''] after:absolute after:inset-0 after:pointer-events-none
    after:bg-[radial-gradient(560px_560px_at_82%_55%,rgba(236,72,153,0.10),rgba(0,0,0,0)_75%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('howItWorks.eyebrow')}
          title={t('howItWorks.title')}
          subtitle={t('howItWorks.subtitle')}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: t('howItWorks.step1.step'),
              title: t('howItWorks.step1.title'),
              description: t('howItWorks.step1.description'),
              icon: Link2,
            },
            {
              step: t('howItWorks.step2.step'),
              title: t('howItWorks.step2.title'),
              description: t('howItWorks.step2.description'),
              icon: Eye,
            },
            {
              step: t('howItWorks.step3.step'),
              title: t('howItWorks.step3.title'),
              description: t('howItWorks.step3.description'),
              icon: Download,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
              aria-label={item.title}
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
                aria-hidden="true"
              >
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {item.step}
              </p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#video-downloader-hero"
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-primary/20"
          >
            {t('howItWorks.tryItNow')}
          </a>
        </div>
      </SectionWrapper>
    </div>
  );
}

function SupportedPlatformsSection() {
  const { t } = useTranslation()

  const platforms = [
    {
      name: t('platforms.instagram.name'),
      description: t('platforms.instagram.description'),
      status: t('platforms.instagram.status'),
      icon: Instagram,
      isLive: true,
    },
    {
      name: t('platforms.facebook.name'),
      description: t('platforms.facebook.description'),
      status: t('platforms.facebook.status'),
      icon: Facebook,
      isLive: false,
    },
    {
      name: t('platforms.youtube.name'),
      description: t('platforms.youtube.description'),
      status: t('platforms.youtube.status'),
      icon: Youtube,
      isLive: false,
    },
  ]

  return (
    <div
      id="supported-platforms"
      className="relative overflow-hidden
      bg-[radial-gradient(900px_420px_at_50%_45%,rgba(59,130,246,0.12),rgba(0,0,0,0)_60%)]
      before:content-[''] before:absolute before:inset-0 before:pointer-events-none
      before:bg-[radial-gradient(520px_520px_at_18%_55%,rgba(99,102,241,0.10),rgba(0,0,0,0)_70%)]
      after:content-[''] after:absolute after:inset-0 after:pointer-events-none
      after:bg-[radial-gradient(560px_560px_at_82%_55%,rgba(168,85,247,0.08),rgba(0,0,0,0)_75%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('platforms.eyebrow')}
          title={t('platforms.title')}
          subtitle={t('platforms.subtitle')}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <div
              key={p.name.toLowerCase()}
              className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card p-5"
            >
              <div>
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" role="img" aria-label={`${p.name} icon`} />
                </div>
                <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${p.isLive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t('platforms.footer')}
        </p>
      </SectionWrapper>
    </div>
  )
}

function WhyChooseSection() {
  const { t } = useTranslation()

  const benefits = [
    {
      title: t('whyChoose.fast.title'),
      description: t('whyChoose.fast.description'),
      icon: Zap,
    },
    {
      title: t('whyChoose.quality.title'),
      description: t('whyChoose.quality.description'),
      icon: MonitorPlay,
    },
    {
      title: t('whyChoose.noLogin.title'),
      description: t('whyChoose.noLogin.description'),
      icon: KeyRound,
    },
    {
      title: t('whyChoose.privacy.title'),
      description: t('whyChoose.privacy.description'),
      icon: Shield,
    },
  ];

  return (
    <div
      id="why-choose"
      className="relative overflow-hidden
        bg-[radial-gradient(900px_420px_at_50%_45%,rgba(236,72,153,0.13),rgba(255,255,255,0.03)_62%)]
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(560px_560px_at_18%_55%,rgba(168,85,247,0.11),rgba(0,0,0,0)_72%)]
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-[radial-gradient(620px_620px_at_82%_55%,rgba(236,72,153,0.09),rgba(255,255,255,0.02)_76%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('whyChoose.eyebrow')}
          title={t('whyChoose.title')}
          subtitle={t('whyChoose.subtitle')}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-5"
              aria-label={b.title}
            >
              <div
                className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                aria-hidden="true"
              >
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground md:text-base">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          {t('whyChoose.footer')}
        </div>
      </SectionWrapper>
    </div>
  );
}

function WorksOnAnyDeviceSection() {
  const { t } = useTranslation()

  return (
    <div
      id="works-anywhere"
      className="relative overflow-hidden
        bg-[radial-gradient(900px_420px_at_50%_45%,rgba(236,72,153,0.12),rgba(255,255,255,0.03)_62%)]
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(560px_560px_at_18%_55%,rgba(168,85,247,0.10),rgba(0,0,0,0)_72%)]
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-[radial-gradient(620px_620px_at_82%_55%,rgba(236,72,153,0.08),rgba(255,255,255,0.02)_76%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('worksAnywhere.eyebrow')}
          title={t('worksAnywhere.title')}
          subtitle={t('worksAnywhere.subtitle')}
        />

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5 text-left">
            <p className="text-sm text-muted-foreground">
              {t('worksAnywhere.description')}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                t('worksAnywhere.features.mobile'),
                t('worksAnywhere.features.noApp'),
                t('worksAnywhere.features.saveDirect'),
                t('worksAnywhere.features.share'),
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90"
                aria-label={t('worksAnywhere.openOnPhone')}
              >
                {t('worksAnywhere.openOnPhone')}
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-foreground"
                aria-label={t('worksAnywhere.copyLink')}
              >
                {t('worksAnywhere.copyLink')}
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/70 bg-card">
              <Image
                src="/img.webp"
                alt={t('worksAnywhere.imageAlt')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border/60 bg-card/80 p-4 text-center text-xs text-muted-foreground">
          {t('worksAnywhere.footer')}
        </div>
      </SectionWrapper>
    </div>
  );
}
function UsageTipsSection() {
  const { t } = useTranslation()

  const tips = [
    {
      title: t('usageTips.saveOwn.title'),
      description: t('usageTips.saveOwn.description'),
    },
    {
      title: t('usageTips.offline.title'),
      description: t('usageTips.offline.description'),
    },
    {
      title: t('usageTips.share.title'),
      description: t('usageTips.share.description'),
    },
    {
      title: t('usageTips.library.title'),
      description: t('usageTips.library.description'),
    },
  ];

  return (
    <div
      id="usage-tips"
      className="relative overflow-hidden
        bg-[radial-gradient(900px_420px_at_20%_35%,rgba(236,72,153,0.12),rgba(255,255,255,0.03)_62%)]
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(560px_560px_at_75%_25%,rgba(168,85,247,0.11),rgba(0,0,0,0)_72%)]
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-[radial-gradient(620px_620px_at_55%_80%,rgba(236,72,153,0.08),rgba(255,255,255,0.02)_76%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('usageTips.eyebrow')}
          title={t('usageTips.title')}
          subtitle={t('usageTips.subtitle')}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="h-full rounded-2xl border border-border/60 bg-slate-650/60 p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-foreground md:text-base">{tip.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t('usageTips.footer')}
        </p>
      </SectionWrapper>
    </div>
  );
}

function ContactSection() {
  const { t } = useTranslation()

  return (
    <div
      id="contact"
      className="relative overflow-hidden rounded-3xl
        bg-[radial-gradient(900px_420px_at_80%_30%,rgba(20,184,166,0.12),rgba(0,0,0,0)_62%)]
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(560px_560px_at_20%_35%,rgba(99,102,241,0.10),rgba(0,0,0,0)_72%)]
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-[radial-gradient(620px_620px_at_50%_90%,rgba(59,130,246,0.07),rgba(0,0,0,0)_76%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
          <form
            className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-5 md:p-6"
            aria-label="Contact form"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                  {t('contact.form.name')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder={t('contact.form.namePlaceholder')}
                  aria-label={t('contact.form.name')}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                  {t('contact.form.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder={t('contact.form.emailPlaceholder')}
                  aria-label={t('contact.form.email')}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                {t('contact.form.message')}
              </label>
              <textarea
                id="contact-message"
                rows={4}
                className="w-full resize-none rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder={t('contact.form.messagePlaceholder')}
                aria-label={t('contact.form.message')}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {t('contact.form.send')}
              </button>
              <p className="text-xs text-muted-foreground">
                {t('contact.form.responseTime')}
              </p>
            </div>
          </form>

          <div className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-5 text-sm text-muted-foreground">
            <h3 className="text-sm font-semibold text-foreground">{t('contact.info.title')}</h3>
            <p>
              {t('contact.info.description')}
            </p>
            <p className="text-xs">
              {t('contact.info.privacy')}
            </p>
            <p className="text-xs">
              {t('contact.info.support')}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function FaqSection() {
  const { t } = useTranslation()

  const faqs = [
    {
      q: t('faq.questions.free.q'),
      a: t('faq.questions.free.a'),
    },
    {
      q: t('faq.questions.limits.q'),
      a: t('faq.questions.limits.a'),
    },
    {
      q: t('faq.questions.software.q'),
      a: t('faq.questions.software.a'),
    },
    {
      q: t('faq.questions.mobile.q'),
      a: t('faq.questions.mobile.a'),
    },
    {
      q: t('faq.questions.private.q'),
      a: t('faq.questions.private.a'),
    },
    {
      q: t('faq.questions.storage.q'),
      a: t('faq.questions.storage.a'),
    },
  ];

  return (

    <div
      id="faq"
      className="relative overflow-hidden
        bg-[radial-gradient(900px_420px_at_25%_30%,rgba(236,72,153,0.11),rgba(255,255,255,0.03)_62%)]
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[radial-gradient(560px_560px_at_85%_35%,rgba(168,85,247,0.10),rgba(0,0,0,0)_72%)]
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-[radial-gradient(620px_620px_at_50%_90%,rgba(236,72,153,0.07),rgba(255,255,255,0.02)_76%)]"
    >
      <SectionWrapper>
        <SectionHeader
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
        />

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-border/70 bg-card/60 px-4 py-3 text-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-medium text-foreground">{item.q}</span>
                <span className="text-xs text-muted-foreground group-open:hidden">{t('faq.show')}</span>
                <span className="hidden text-xs text-muted-foreground group-open:inline">{t('faq.hide')}</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          {t('faq.disclaimer')}
        </p>

        {/* <p className="mt-2 text-xs text-muted-foreground">
          {t('faq.contactPrompt')} <a href="#contact" className="underline text-foreground">{t('faq.contactLink')}</a> {t('faq.contactSuffix')}
        </p> */}
      </SectionWrapper>
    </div>
  );
}

function AppFooterSection() {
  const { t } = useTranslation()

  return (
    <footer
      className="mx-auto w-full max-w-7xl border-t border
    rounded-t-3xl border-border/60
    bg-[rgba(255,255,255,0.08)]
    backdrop-blur-lg
    supports-[backdrop-filter]:bg-[rgba(255,255,255,0.05)]    bg-card/95"
    >

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:justify-between  ">
        <div className="space-y-3 md:max-w-sm">
          <div className="inline-flex items-center rounded-full ">
            {/* <span className="h-2 w-2 rounded-full " /> */}
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {t('footer.brand')}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('footer.description')}
          </p>
        </div>


        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t('footer.legal.title')}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t('footer.legal.content')}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-6 text-sm min-[900px]:flex-row min-[900px]:justify-end">

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t('footer.follow')}
            </h3>
            <div className="flex gap-2">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
                { icon: Twitter, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
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

      {/* Bottom copyright row (no extra styling added) */}
      <div className="border-t border-border/60">
        <div className="mx-auto w-full max-w-5xl px-4 py-4">
          <p className="text-center text-xs text-foreground">
            {t('footer.copyright')}{" "}
            <a
              href="https://www.linkedin.com/in/abdul-mateen-5b6197261/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Abdul Mateen
            </a>
            {t('footer.allRights')}
          </p>
        </div>
      </div>

    </footer>
  )
}
