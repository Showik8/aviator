function playSound(src, vol = 3) {
  const audio = new Audio(src);

  // Optional: preload and set basic config
  audio.preload = "auto";
  audio.volume = 0 + "." + vol;

  // Try to play the sound
  audio.play().catch((error) => {
    console.error("ხმის დაკვრის შეცდომა:", error);
  });
}

export default playSound;
