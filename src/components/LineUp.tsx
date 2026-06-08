import { useState, useEffect, useRef, useCallback } from 'react';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerMuteButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerVolumeRange,
} from '@/components/video';



const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-aeonik font-bold text-white tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[10px] md:text-xs font-blauer text-white/70 tracking-[0.2em] mt-2 font-bold">
      {label}
    </span>
  </div>
);


const VIDEO_SOURCE = '/assets/video.mp4';

const VIDEO_POSTER = '/assets/capa_rios2026.webp';

const LineUp = () => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [hasFinished, setHasFinished] = useState(false);


  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);


  const handlePlayPauseClick = useCallback(() => {
    const videoElement = videoElementRef.current || videoContainerRef.current?.querySelector('video');
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  }, []);


  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const videoElement = container.querySelector('video');
    if (!videoElement) return;

    videoElementRef.current = videoElement;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, []);


  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const videoElement = container.querySelector('video');
        if (!videoElement) return;


        if (!entry.isIntersecting && !videoElement.paused) {
          videoElement.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);


  useEffect(() => {

    const targetDate = new Date('2026-06-18T19:00:00').getTime();
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('countdown-section');
    if (section) observer.observe(section);

    const interval = setInterval(() => {
      if (!isVisible) return;

      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!hasFinished) {
          setHasFinished(true);
          triggerConfetti();
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (section) observer.unobserve(section);
    };
  }, [hasFinished]);


  const triggerConfetti = useCallback(async () => {
    const { default: confetti } = await import('canvas-confetti');
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const confettiInterval = setInterval(function () {
      const remaining = animationEnd - Date.now();

      if (remaining <= 0) {
        return clearInterval(confettiInterval);
      }

      const particleCount = 50 * (remaining / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  return (
    <section className="bg-rvl-creme-bg py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">


        <div
          ref={videoContainerRef}
          className="w-full aspect-video relative"
        >
          <VideoPlayer className="overflow-hidden rounded-lg border">
            <VideoPlayerContent
              crossOrigin=""
              poster={VIDEO_POSTER}
              preload="none"
              playsInline
              slot="media"
              src={VIDEO_SOURCE}
            />
            <VideoPlayerControlBar>
              <VideoPlayerPlayButton />
              <VideoPlayerSeekBackwardButton />
              <VideoPlayerSeekForwardButton />
              <VideoPlayerTimeRange />
              <VideoPlayerTimeDisplay showDuration />
              <VideoPlayerMuteButton />
              <VideoPlayerVolumeRange />
            </VideoPlayerControlBar>
          </VideoPlayer>


          <button
            onClick={handlePlayPauseClick}
            className={`absolute inset-0 flex items-center justify-center group transition-opacity duration-300 ${
              isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
            }`}
            aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">

              <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                isPlaying
                  ? 'border-white/30 group-hover:border-white/60'
                  : 'border-white/60 group-hover:border-white'
              }`}></div>


              <div className={`absolute inset-2 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-white/10 group-hover:bg-white/20'
                  : 'bg-white/20 group-hover:bg-white/30'
              }`}></div>


              <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
                isPlaying
                  ? 'bg-white/0 group-hover:bg-white/10'
                  : 'bg-white/20 group-hover:bg-white/30'
              }`}></div>


              <div className="relative z-10 text-white fill-white">
                {isPlaying ? (

                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (

                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>


        <div id="countdown-section" className="mt-16 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden bg-rvl-escuro">

          <div className="hero-gradient absolute inset-0 opacity-60"></div>


          <div className="hero-noise absolute inset-0 opacity-10 pointer-events-none"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <CountdownItem value={timeLeft.days} label="DIAS" />
            <CountdownItem value={timeLeft.hours} label="HORAS" />
            <CountdownItem value={timeLeft.minutes} label="MINS" />
            <CountdownItem value={timeLeft.seconds} label="SEGS" />
          </div>


          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default LineUp;
