
const placeSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
const winSound = new Audio('data:audio/wav;base64,UklGRkoAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSAgAAAAAP//9/8AAAAAABQAGgAfACgALQAyADcAOwBB//8=');
const drawSound = new Audio('data:audio/wav;base64,UklGRkoAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSBAAAAAP//9/8BAAAAAAAAADsANwAyAC0AKAAfABoAFAAAAAA=');

const playSound = (audio: HTMLAudioElement) => {
  // Browsers may block autoplay until the user interacts with the page.
  // The first click on the board counts as user interaction.
  audio.currentTime = 0;
  audio.play().catch(error => console.error("Error playing sound:", error));
};

export const playPlaceSound = () => playSound(placeSound);
export const playWinSound = () => playSound(winSound);
export const playDrawSound = () => playSound(drawSound);
