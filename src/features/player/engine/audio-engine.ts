import type { PlayerStatus } from "../types";

export interface EngineSnapshot {
  status: PlayerStatus;
  currentTime: number;
  duration: number;
  error: string | null;
}

type SnapshotListener = (snapshot: EngineSnapshot) => void;

const MEDIA_ERROR_MESSAGES: Record<number, string> = {
  1: "Playback was aborted.",
  2: "A network error interrupted playback.",
  3: "This audio file could not be decoded.",
  4: "The audio file could not be loaded or its format is not supported.",
};

const INITIAL_SNAPSHOT: EngineSnapshot = {
  status: "idle",
  currentTime: 0,
  duration: 0,
  error: null,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);


export class AudioEngine {
  private readonly audio: HTMLAudioElement;
  private snapshot: EngineSnapshot = INITIAL_SNAPSHOT;
  private readonly listeners = new Set<SnapshotListener>();
  private readonly endedListeners = new Set<() => void>();
  private readonly detach: Array<() => void> = [];

  constructor(audio: HTMLAudioElement = new Audio()) {
    this.audio = audio;
    this.audio.preload = "metadata";
    this.bindEvents();
  }

  getSnapshot(): EngineSnapshot {
    return this.snapshot;
  }

  subscribe(listener: SnapshotListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  onEnded(listener: () => void): () => void {
    this.endedListeners.add(listener);
    return () => this.endedListeners.delete(listener);
  }

  load(src: string, options: { autoplay?: boolean } = {}): void {
    this.update({ status: "loading", currentTime: 0, duration: 0, error: null });
    this.audio.src = src;
    this.audio.load();
    if (options.autoplay) void this.play();
  }

  async play(): Promise<void> {
    if (!this.audio.src) return;
    try {
      await this.audio.play();
    } catch (error) {
      
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        
        this.update({ status: "paused" });
        return;
      }
      this.update({ status: "error", error: "Playback could not be started." });
    }
  }

  pause(): void {
    this.audio.pause();
  }


  stop(): void {
    this.audio.pause();
    this.audio.removeAttribute("src");
    this.audio.load();
    this.update({ ...INITIAL_SNAPSHOT });
  }

  seek(seconds: number): void {
    const max = Number.isFinite(this.audio.duration) ? this.audio.duration : Infinity;
    const target = clamp(seconds, 0, max);
    this.audio.currentTime = target;
    this.update({ currentTime: target });
  }


  setVolume(volume: number): void {
    this.audio.volume = clamp(volume, 0, 1);
  }

  setMuted(muted: boolean): void {
    this.audio.muted = muted;
  }


  destroy(): void {
    this.detach.forEach((off) => off());
    this.detach.length = 0;
    this.listeners.clear();
    this.endedListeners.clear();
    this.stop();
  }

  private bindEvents(): void {
    const on = (type: string, handler: () => void) => {
      this.audio.addEventListener(type, handler);
      this.detach.push(() => this.audio.removeEventListener(type, handler));
    };

    const syncDuration = () => {
      if (Number.isFinite(this.audio.duration)) {
        this.update({ duration: this.audio.duration });
      }
    };

    on("loadedmetadata", syncDuration);
    on("durationchange", syncDuration);
    on("timeupdate", () => this.update({ currentTime: this.audio.currentTime }));
    on("play", () => {
      if (this.snapshot.status === "error") return;
      this.update({
        status: this.audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA ? "playing" : "loading",
      });
    });
    on("playing", () => this.update({ status: "playing", error: null }));
    on("waiting", () => {
      if (!this.audio.paused) this.update({ status: "loading" });
    });
    on("pause", () => {
      if (this.audio.ended) return;
      if (this.snapshot.status === "error" || this.snapshot.status === "idle") return;
      this.update({ status: "paused" });
    });
    on("ended", () => {
      this.update({ status: "paused" });
      this.endedListeners.forEach((listener) => listener());
    });
    on("error", () => {
      // Clearing the source (stop) can raise a spurious error event: ignore it.
      if (!this.audio.getAttribute("src")) return;
      const code = this.audio.error?.code ?? 0;
      this.update({
        status: "error",
        error: MEDIA_ERROR_MESSAGES[code] ?? "Playback failed.",
      });
    });
  }

  private update(partial: Partial<EngineSnapshot>): void {
    const next = { ...this.snapshot, ...partial };
    const changed = (Object.keys(next) as Array<keyof EngineSnapshot>).some(
      (key) => next[key] !== this.snapshot[key],
    );
    if (!changed) return;
    this.snapshot = next;
    this.listeners.forEach((listener) => listener(next));
  }
}
