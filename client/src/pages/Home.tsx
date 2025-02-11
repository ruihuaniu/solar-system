import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SolarSystem from "@/components/SolarSystem";
import PlanetInfo from "@/components/PlanetInfo";
import PlanetComparison from "@/components/PlanetComparison";
import Controls from "@/components/Controls";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import type { Planet } from "@/lib/types";
import { planets } from "@/lib/planets";

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(planets[2]);
  const [comparisonPlanet, setComparisonPlanet] = useState<Planet | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [showInfoOnClick, setShowInfoOnClick] = useState(true);
  const { t } = useTranslation();

  const handlePlanetSelect = (planet: Planet) => {
    if (isCompareMode && selectedPlanet !== planet) {
      setComparisonPlanet(planet);
      if (showInfoOnClick) setIsDrawerOpen(true);
    } else {
      setSelectedPlanet(planet);
      if (showInfoOnClick) setIsDrawerOpen(true);
    }
  };

  const toggleCompareMode = () => {
    setIsCompareMode(!isCompareMode);
    setComparisonPlanet(null);
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <LanguageSwitcher />
        <Controls 
          autoRotate={autoRotate} 
          onToggleAutoRotate={() => setAutoRotate(!autoRotate)} 
        />
        <Button
          variant={showInfoOnClick ? "default" : "outline"}
          onClick={() => setShowInfoOnClick(!showInfoOnClick)}
          className="w-40"
        >
          {t('controls.infoOnClick')}: {showInfoOnClick ? t('controls.on') : t('controls.off')}
        </Button>
        <Button
          variant={isCompareMode ? "secondary" : "outline"}
          onClick={toggleCompareMode}
          className="w-40"
        >
          {isCompareMode ? t('controls.cancelCompare') : t('controls.comparePlanets')}
        </Button>
      </div>

      <Canvas camera={{ position: [0, 20, 25], fov: 60 }}>
        <SolarSystem
          selectedPlanet={selectedPlanet}
          onSelectPlanet={handlePlanetSelect}
          autoRotate={autoRotate}
        />
      </Canvas>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10"
          >
            {isCompareMode 
              ? comparisonPlanet 
                ? t('controls.viewComparison')
                : t('controls.selectSecondPlanet')
              : t('controls.planetInfo')
            }
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="h-[80vh]">
            {isCompareMode && comparisonPlanet ? (
              <PlanetComparison planets={[selectedPlanet, comparisonPlanet]} />
            ) : (
              <PlanetInfo planet={selectedPlanet} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}