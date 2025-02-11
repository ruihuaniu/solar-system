import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ControlsProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

export default function Controls({ autoRotate, onToggleAutoRotate }: ControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 scale-75 md:scale-100">
      <Button
        variant="secondary"
        size="lg"
        className="bg-black/50 hover:bg-black/70"
        onClick={onToggleAutoRotate}
      >
        {autoRotate ? <Pause className="mr-2" /> : <Play className="mr-2" />}
        {autoRotate ? t('controls.pauseRotation') : t('controls.startRotation')}
      </Button>
    </div>
  );
}