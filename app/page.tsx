import Image from "next/image"
import { VideoDownloader } from "@/components/video-downloader"
import { Link2, Eye, Download, Zap, MonitorPlay, KeyRound, Shield, Instagram, Facebook, Youtube, Twitter } from "lucide-react"


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
          eyebrow="How it works"
          title="How It Works"
          subtitle="Download Instagram videos, Reels, photos, and MP3 audio in three simple steps."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: "Step 1",
              title: "Paste Link",
              description:
                "Copy the Instagram video, Reel, photo, or MP3 audio URL and paste it into the box at the top of the page.",
              icon: Link2,
            },
            {
              step: "Step 2",
              title: "Preview & Choose Quality",
              description:
                "We fetch the content and display available quality options for videos, photos, and audio when supported.",
              icon: Eye,
            },
            {
              step: "Step 3",
              title: "Download Instantly",
              description:
                "Click the download button to save the MP4 video or MP3 audio file directly to your device.",
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
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-primary/20"
          >
            Try it now
          </a>
        </div>
      </SectionWrapper>
    </div>
  );
}

function SupportedPlatformsSection() {
  const platforms = [
    {
      name: "Instagram",
      description:
        "Download public Instagram videos, reels, IGTV, and audio (MP3) instantly and in HD.",
      status: "Live",
      icon: Instagram,
    },
    {
      name: "Facebook",
      description:
        "Facebook video downloader support is coming soon, including Shorts and full-length videos.",
      status: "Coming soon",
      icon: Facebook,
    },
    {
      name: "YouTube",
      description:
        "YouTube video downloader support is coming soon for Shorts and full-length videos.",
      status: "Coming soon",
      icon: Youtube,
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
          eyebrow="Platforms"
          title="Supported Platforms"
          subtitle="Download videos, reels, and audio from popular social platforms quickly and securely."
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
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    p.status === "Live" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Bookmark this page or check back soon to download videos, reels, and MP3 audio from more platforms as they are added.
        </p>
      </SectionWrapper>
    </div>
  )
}

function WhyChooseSection() {
  const benefits = [
    {
      title: "Fast & Reliable Instagram Video & Audio Downloads",
      description:
        "Download Instagram videos, Reels, photos, and MP3 audio in seconds. Our infrastructure ensures smooth, high-speed downloads even for longer HD clips.",
      icon: Zap,
    },
    {
      title: "Original Quality Preservation",
      description:
        "Keep your videos and audio in their original resolution and clarity whenever Instagram allows, including HD and 4K content.",
      icon: MonitorPlay,
    },
    {
      title: "No Login Required",
      description:
        "Download Instagram content securely without signing in. Just paste the video, Reel, or audio link and start downloading instantly.",
      icon: KeyRound,
    },
    {
      title: "Privacy-Friendly & Secure",
      description:
        "We do not store your downloads or track the links you paste, ensuring your Instagram activity stays private.",
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
          eyebrow="Benefits"
          title="Why Choose Our Instagram Downloader?"
          subtitle="Fast, secure, and high-quality downloads for videos, Reels, photos, and MP3 audio."
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
          Curious about privacy details? Check the FAQ section below for a concise overview of our secure Instagram video, Reel, photo, and MP3 audio download process.
        </div>
      </SectionWrapper>
    </div>
  );
}

function WorksOnAnyDeviceSection() {
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
          eyebrow="Compatibility"
          title="Download Instagram Videos & MP3 Audio on Any Device"
          subtitle="Use our downloader on your phone, tablet, or desktop for smooth playback and fast downloads."
        />

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5 text-left">
            <p className="text-sm text-muted-foreground">
              All downloads are available as MP4 videos or MP3 audio files. Save them to your camera roll, laptop, or cloud storage and enjoy anytime.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Mobile-friendly interface for quick video and audio downloads on the go.",
                "No app installation required — everything works in your browser.",
                "Save directly to device storage or your preferred folder.",
                "Easily share downloaded clips or audio to messaging apps or teams with a tap.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90"
                aria-label="Open downloader on your phone"
              >
                Open on your phone
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-foreground"
                aria-label="Copy link to share downloader"
              >
                Copy link to share
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/70 bg-card">
              <Image
                src="/img.webp"
                alt="Preview of Instagram video and MP3 audio downloads on desktop, tablet, and mobile devices"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border/60 bg-card/80 p-4 text-center text-xs text-muted-foreground">
          Preview how your Instagram video and MP3 audio downloads look across desktop, tablet, and mobile devices — the same simple interface everywhere.
        </div>
      </SectionWrapper>
    </div>
  );
}
function UsageTipsSection() {
  const tips = [
    {
      title: "Save Your Own Reels & Videos",
      description:
        "Download your own Instagram or Facebook videos, Reels, photos, and MP3 audio for editing, archiving, or reposting on other platforms.",
    },
    {
      title: "Offline Viewing Anytime",
      description:
        "Keep tutorials, workout videos, Reels, or music offline so you can watch or listen without using mobile data.",
    },
    {
      title: "Share With Friends & Teams",
      description:
        "Collect reference clips, Reels, videos, or MP3 audio for campaigns, design inspiration, or content brainstorms in one shared folder.",
    },
    {
      title: "Content Inspiration & Library",
      description:
        "Create a personal library of videos, Reels, photos, and MP3 audio clips to inspire your next post, marketing idea, or creative project.",
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
          eyebrow="Use Cases"
          title="Smart Ways to Use Our Instagram Downloader"
          subtitle="Discover creative ways to download Instagram videos, Reels, photos, and MP3 audio for personal or professional use."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((t) => (
            <div
              key={t.title}
              className="h-full rounded-2xl border border-border/60 bg-slate-650/60 p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-foreground md:text-base">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Always respect creators&apos; copyrights and platform terms while downloading Instagram videos, Reels, photos, or MP3 audio.
        </p>
      </SectionWrapper>
    </div>
  );
}

function ContactSection() {
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
          eyebrow="Contact"
          title="Get in Touch with Our Instagram Downloader Team"
          subtitle="Have questions, feedback, or business inquiries about our Video, Reels, Story, or Photo Downloader? Send us a message and we’ll respond quickly."
        />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
          <form
            className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-5 md:p-6"
            aria-label="Contact form for Instagram Video, Reels, Story, and Photo Downloader"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="Your full name"
                  aria-label="Enter your name for Instagram downloader support"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="you@example.com"
                  aria-label="Enter your email for Instagram downloader support"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                className="w-full resize-none rounded-lg border border-input bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Write your question or feedback about Instagram Video, Reels, Story, or Photo Downloader…"
                aria-label="Message content for Instagram downloader support"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Send Message
              </button>
              <p className="text-xs text-muted-foreground">
                We typically reply within 1–2 business days.
              </p>
            </div>
          </form>

          <div className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-5 text-sm text-muted-foreground">
            <h3 className="text-sm font-semibold text-foreground">Support & Feedback for Instagram Downloader</h3>
            <p>
              Use this contact form for questions, feature requests, or business partnerships related to our Video Downloader, Reels Downloader, Story Saver, Highlights Downloader, or Photo Downloader. For technical issues, include the URL or platform details.
            </p>
            <p className="text-xs">
              Never share passwords or sensitive personal information. We do not request social media login credentials.
            </p>
            <p className="text-xs">
              Our support team typically responds within 24–48 hours. Provide clear details for faster assistance with Instagram video, Reels, or story downloads.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function FaqSection() {
  const faqs = [
    {
      q: "Is the Instagram Video Downloader free to use?",
      a: "Yes. Our Instagram Video Downloader is completely free. There are no hidden charges, and you can download as many Instagram videos, Reels, stories, photos, or MP3 audio as you want.",
    },
    {
      q: "Are there any limits on the number of downloads?",
      a: "No. You can use our Instagram downloader to save unlimited videos, Reels, photos, stories, highlights, and audio files. Download as much as you need, completely free.",
    },
    {
      q: "Do I need to install any software to download Instagram videos?",
      a: "No. This Instagram Video Downloader is web-based, so you don't need to install any apps. Just copy the URL of the video, paste it into our tool, and click 'Download'.",
    },
    {
      q: "Can I download Instagram videos on my smartphone?",
      a: "Yes. Our Instagram Video Downloader works on mobile, tablet, and desktop browsers. Simply copy the video, Reels, or story URL, paste it into our tool, and download instantly.",
    },
    {
      q: "Can I download private Instagram videos?",
      a: "No. Only publicly accessible videos, Reels, stories, highlights, and photos are supported. Private content cannot be downloaded due to Instagram restrictions.",
    },
    {
      q: "Do you store my videos or links?",
      a: "No. We respect your privacy. Downloaded files and URLs are never stored beyond the time needed to process your request.",
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
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers about downloading Instagram videos, Reels, stories, highlights, photos, and MP3 audio."
        />

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-border/70 bg-card/60 px-4 py-3 text-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-medium text-foreground">{item.q}</span>
                <span className="text-xs text-muted-foreground group-open:hidden">Show</span>
                <span className="hidden text-xs text-muted-foreground group-open:inline">Hide</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          This site is not affiliated with Instagram, Facebook, or Meta Platforms, Inc. Always follow platform rules and local laws while using our free Instagram downloader.
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Still have questions? <a href="#contact" className="underline">Contact us</a> for help downloading Instagram videos, Reels, stories, photos, or MP3 audio.
        </p>
      </SectionWrapper>
    </div>
  );
}

function AppFooterSection() {
  return (
    <footer
      className="mx-auto w-full max-w-7xl border-t border-border/60 border border-white/20
    rounded-t-3xl
    bg-[rgba(255,255,255,0.08)]
    backdrop-blur-lg
    supports-[backdrop-filter]:bg-[rgba(255,255,255,0.05)]"
    >

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 md:max-w-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Social Video Downloader
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            This tool was built to make it easier to save and organize your favorite public videos
            from social platforms.
          </p>
        </div>

      
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Legal
            </h3>
            <p className="text-xs text-muted-foreground">
              This site is not affiliated with Instagram, Facebook, or Meta Platforms, Inc. Please
              respect copyrights and platform terms.
            </p>
          </div>
  <div className="flex flex-1 flex-col gap-6 text-sm min-[900px]:flex-row min-[900px]:justify-end">
         
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Follow
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
    <p className="text-center text-xs text-muted-foreground">
      © 2025 Social Video Downloader By{" "}
      <a
        href="https://www.linkedin.com/in/abdul-mateen-5b6197261/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:underline"
      >
        Abdul Mateen
      </a>
      . All rights reserved.
    </p>
  </div>
</div>

    </footer>
  )
}
