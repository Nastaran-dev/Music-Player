import { AudioEngine } from "./audio-engine";

export { AudioEngine, type EngineSnapshot } from "./audio-engine";

const globalForEngine = globalThis as typeof globalThis & {
  __vybeAudioEngine?: AudioEngine;
};

export function getAudioEngine(): AudioEngine | null {
  if (typeof window === "undefined") return null;
  globalForEngine.__vybeAudioEngine ??= new AudioEngine();
  return globalForEngine.__vybeAudioEngine;
}
