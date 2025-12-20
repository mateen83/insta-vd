"use client"

import { Download, ExternalLink, Play, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile, toBlobURL } from "@ffmpeg/util"

interface VideoResultProps {
  data: {
    thumbnail?: string
    video_url?: string
    quality?: string
    duration?: string
  }
}

export function VideoResult({ data }: VideoResultProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloadingMp3, setDownloadingMp3] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ffmpegRef = useRef(new FFmpeg())
  const messageRef = useRef<HTMLParagraphElement | null>(null)

  const load = async () => {
    const baseURL = '/ffmpeg'
    const ffmpeg = ffmpegRef.current
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message
      console.log(message)
    })
    // Load FFmpeg core files from self-hosted location
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })
    setLoaded(true)
  }


  useEffect(() => {
    load()
  }, [])

  const handleDownload = async (format: 'mp4' | 'mp3' = 'mp4') => {
    const isMP3 = format === 'mp3'
    if (!data.video_url) return

    if (isMP3) {
      setDownloadingMp3(true)
    } else {
      setDownloading(true)
    }
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout

      // Always request MP4 from proxy
      const response = await fetch("/api/proxy-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data.video_url, format: 'mp4' }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Download failed: ${response.status} - ${errorText}`)
      }

      let blob = await response.blob()

      if (blob.size === 0) {
        throw new Error("Downloaded file is empty")
      }

      if (isMP3) {
        if (!loaded) {
          await load()
        }
        const ffmpeg = ffmpegRef.current
        await ffmpeg.writeFile('input.mp4', await fetchFile(blob))
        await ffmpeg.exec(['-i', 'input.mp4', '-q:a', '0', '-map', 'a', 'output.mp3'])
        const data = await ffmpeg.readFile('output.mp3')
        blob = new Blob([data], { type: 'audio/mpeg' })
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url

      // Get file extension based on format
      const extension = isMP3 ? 'mp3' : 'mp4'
      const prefix = isMP3 ? 'instagram-audio' : 'instagram-video'

      a.download = `${prefix}-${Date.now()}.${extension}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download error:", error)

      // Show user-friendly error message
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          alert("Download timed out. Please try again.")
        } else {
          alert(`Download failed: ${error.message}`)
        }
      } else {
        alert("Download failed Please try again.")
      }
    } finally {
      if (isMP3) {
        setDownloadingMp3(false)
      } else {
        setDownloading(false)
      }
    }
  }

  return (
    <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border">
      <div className="flex flex-col sm:flex-col gap-4">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-120 h-70 sm:h-80 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          {data.video_url ? (
            <>
              <video
                src={`/api/proxy-download?url=${encodeURIComponent(data.video_url)}`}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </>
          ) : data.thumbnail ? (
            <>
              <img
                src={data.thumbnail || "/placeholder.svg"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Video Ready</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {data.quality && (
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">{data.quality}</span>
              )}
              {data.duration && <span className="px-2 py-1 rounded bg-muted">{data.duration}</span>}
              <span className="px-2 py-1 rounded bg-muted">MP4</span>
              <span className="px-2 py-1 rounded bg-muted">MP3</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex gap-2">
              <Button
                onClick={() => handleDownload('mp4')}
                disabled={downloading || !data.video_url}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {downloading ? (
                  "Downloading..."
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download MP4
                  </>
                )}
              </Button>
              {data.video_url && (
                <Button variant="outline" size="icon" asChild className="border-border hover:bg-secondary bg-transparent">
                  <a href={data.video_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
            <Button
              onClick={() => handleDownload('mp3')}
              disabled={downloadingMp3 || !data.video_url}
              variant="outline"
              className="w-full border-primary/50 hover:bg-primary/10 text-foreground"
            >
              {downloadingMp3 ? (
                "Converting & Downloading..."
              ) : (
                <>
                  <Music className="w-4 h-4 mr-2" />
                  Download MP3 (Audio Only)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
