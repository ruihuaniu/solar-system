import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import type { Planet } from '@/lib/types';

interface PlanetComparisonProps {
  planets: [Planet, Planet];
}

export default function PlanetComparison({ planets: [planet1, planet2] }: PlanetComparisonProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'zh';

  return (
    <ScrollArea className="h-full p-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Planet Names */}
        <h2 className="text-2xl font-bold text-purple-400">{t(`planet.names.${planet1.name}`)}</h2>
        <h2 className="text-2xl font-bold text-purple-400">{t(`planet.names.${planet2.name}`)}</h2>

        <Separator className="bg-gray-800 col-span-2" />

        {/* Quick Facts Comparison */}
        <div className="col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-purple-400">{t('planet.quickFacts')}</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Distance from Sun */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.distanceFromSun')}</p>
              <p className="text-lg">{planet1.distanceFromSunKm} {t('planet.km')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.distanceFromSun')}</p>
              <p className="text-lg">{planet2.distanceFromSunKm} {t('planet.km')}</p>
            </div>

            {/* Orbital Period */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.orbitalPeriod')}</p>
              <p className="text-lg">{planet1.orbitalPeriod} {t('planet.earthDays')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.orbitalPeriod')}</p>
              <p className="text-lg">{planet2.orbitalPeriod} {t('planet.earthDays')}</p>
            </div>

            {/* Temperature */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.surfaceTemp')}</p>
              <p className="text-lg">{planet1.averageTemp}°C</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.surfaceTemp')}</p>
              <p className="text-lg">{planet2.averageTemp}°C</p>
            </div>

            {/* Diameter */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.diameter')}</p>
              <p className="text-lg">{planet1.diameter} {t('planet.km')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{t('planet.diameter')}</p>
              <p className="text-lg">{planet2.diameter} {t('planet.km')}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 col-span-2" />

        {/* Descriptions */}
        <div className="space-y-2">
          <p className="text-gray-300">{planet1.description[currentLang]}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300">{planet2.description[currentLang]}</p>
        </div>
      </div>
    </ScrollArea>
  );
}