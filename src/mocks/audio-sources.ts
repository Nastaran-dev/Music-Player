import { AUDIO_PUBLIC_DIR } from "@/constants/audio";

const audioFile = (fileName: string): string =>
  `${AUDIO_PUBLIC_DIR}/${fileName}`;

export const audioSources: Readonly<Record<string, string>> = {
  "track-001": "https://cdn.rapidfile.cc/KJKlBATiph/ShodiNouram.mp3",
  "track-002": "https://cdn.rapidfile.cc/or7pH6EKZo/Azizam.mp3",
  "track-003": "https://cdn.rapidfile.cc/4zCc7RuTKF/MageMishe.mp3",
  "track-004": "https://cdn.rapidfile.cc/m7zte3hFB4/BehetGholMidam.mp3",
  "track-005": "https://cdn.rapidfile.cc/FOZhXTAbZQ/Nadaramet.mp3",
  "track-006": "https://cdn.rapidfile.cc/unX6HscDeS/TaghvimeMochaleh.mp3",
  "track-007": "https://cdn.rapidfile.cc/tDp4reEZcj/Pol.mp3",
  "track-008": "https://cdn.rapidfile.cc/avVMxOsJGL/MaraBebakhsh.mp3",
  "track-009": "https://cdn.rapidfile.cc/Dl7b9BdbBT/RoozhayeBigharari.mp3",
  "track-010": "https://cdn.rapidfile.cc/kODd1hVT6F/SetareMishi.mp3",
  "track-011": "https://cdn.rapidfile.cc/lLjA0LC3uR/ZakhmKari.mp3",
  "track-012": "https://cdn.rapidfile.cc/3mbQscvGyX/KojayeInShahri.mp3",
  "track-013": "https://cdn.rapidfile.cc/VBeM2LQXHg/GhameTo.mp3",
  "track-014": "https://cdn.rapidfile.cc/XJHLIESWoj/MadaramIran.mp3",
  "track-015": "https://cdn.rapidfile.cc/Bx7BYMaELN/Lalaei.mp3",
  "track-016": "https://cdn.rapidfile.cc/bQHt6ayJjL/Setareh.mp3",
  "track-017": "https://cdn.rapidfile.cc/DLeTHJCNve/AlamatSoal.mp3",
  "track-018": "https://cdn.rapidfile.cc/bT3AzHy8gU/YeKariKon.mp3",
  "track-019": "https://cdn.rapidfile.cc/MoCgQSEq4u/BeKiBegam.mp3",
  "track-020": "https://cdn.rapidfile.cc/hUThoSmSMd/Ghoroor.mp3",
  "track-021": "https://cdn.rapidfile.cc/qWJEzNZpx9/AddiNi.mp3",
  "track-022": "https://cdn.rapidfile.cc/F39Ef5QU9M/HarighSabz.mp3",
  "track-023": "https://cdn.rapidfile.cc/A8k9t8TvHP/AkharinBar.mp3",
  "track-024": "https://cdn.rapidfile.cc/SLxMFxdU9r/NafasNafas.mp3",
  "track-025": "https://cdn.rapidfile.cc/ivHtTAy7Zx/ManHastam.mp3",
  "track-026": "https://cdn.rapidfile.cc/KTjEWO6aSZ/Mojrem.mp3",
  "track-027": "https://cdn.rapidfile.cc/pEwoBOocQk/KhodamoDaramKe.mp3",
  "track-028": "https://cdn.rapidfile.cc/iIKA34lehl/BamdadeKhomar.mp3",
  "track-029": "https://cdn.rapidfile.cc/3MljCFs3OZ/Koli.mp3",
  "track-030": "https://cdn.rapidfile.cc/X58ElyAakN/Gandomgoon.mp3",
  "track-031": "https://cdn.rapidfile.cc/qK36VMP768/BiBiGol.mp3",
  "track-032": "https://cdn.rapidfile.cc/IaoO6bhCzG/Paricheh.mp3",
  "track-033": "https://cdn.rapidfile.cc/Z9S4mOogxx/Khaleg.mp3",
  "track-034": "https://cdn.rapidfile.cc/dfhgs4aLMg/BaTo.mp3",
  "track-035": "https://cdn.rapidfile.cc/FMuNDSnVsX/BenshinTamashayatKonam.mp3",
  "track-036": "https://cdn.rapidfile.cc/XVfxVqzBuo/Shab.mp3",
  "track-037": "https://cdn.rapidfile.cc/pZAXRNHnr3/RazePenhoon.mp3",
  "track-038": "https://cdn.rapidfile.cc/ttfGD6mXro/TanhaEshgheMan.mp3",
  "track-039": "https://cdn.rapidfile.cc/L9tdojQF76/AvazeGhoo.mp3",
  "track-040": "https://cdn.rapidfile.cc/F8ScBXRnHI/ElaheyeNaz.mp3",
};

export function getAudioUrl(trackId: string): string | null {
  return audioSources[trackId] ?? null;
}

export { audioFile };
