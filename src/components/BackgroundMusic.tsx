import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/audio/space-ambient.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        
        const playAudio = () => {
            audioRef.current?.play().catch(console.error);
            setIsPlaying(true);
            document.removeEventListener("click", playAudio);
            document.removeEventListener("keydown", playAudio);
          };
      
          document.addEventListener("click", playAudio);
          document.addEventListener("keydown", playAudio);
      

        return () => {
            document.removeEventListener("click", playAudio);
            document.removeEventListener("keydown", playAudio);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 z-50"
            onClick={togglePlay}
            title={isPlaying ? "Mute Music" : "Play Music"}
        >
            {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
    );
};

export default BackgroundMusic;
