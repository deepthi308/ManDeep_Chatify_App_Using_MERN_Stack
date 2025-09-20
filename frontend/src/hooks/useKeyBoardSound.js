const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyBoardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomNumber = Math.floor(Math.random() * keyStrokeSounds.length);
    const randomSound = keyStrokeSounds[randomNumber];
    randomSound.currentTime = 0; // This is for better UX
    randomSound.play().catch((error) => {
      console.log("Audio play failed: ", error);
    });
  };

  return {
    playRandomKeyStrokeSound,
  };
}

export default useKeyBoardSound;
