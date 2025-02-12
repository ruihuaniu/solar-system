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
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Moon, Sun, Menu } from "lucide-react"; 

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
    <div className="relative h-screen w-screen bg-background overflow-hidden dark:bg-black">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="xl:hidden ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
            <DropdownMenu.Content 
                className="min-w-[200px] bg-background rounded-md p-2 shadow-md"
                align="end"
                sideOffset={5}
              >
                <DropdownMenu.Item className="outline-none flex justify-center w-full text-black dark:text-white">
                  <LanguageSwitcher />
                </DropdownMenu.Item>
                <DropdownMenu.Item className="outline-none flex justify-center w-full text-black dark:text-white">
                  <Controls 
                    autoRotate={autoRotate} 
                    onToggleAutoRotate={() => setAutoRotate(!autoRotate)} 
                  />
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                  className="px-2 py-1.5 outline-none cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm text-center w-full flex items-center justify-center gap-2 relative text-black dark:text-white"
                  onSelect={() => document.documentElement.classList.toggle('dark')}
                >
                  <div className="relative w-4 h-4">
                    <Sun className="h-4 w-4 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </div>
                  <span>{t('controls.theme')}</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                  className="px-2 py-1.5 outline-none cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm text-center w-full text-black dark:text-white"
                  onSelect={() => setShowInfoOnClick(!showInfoOnClick)}
                >
                  {t('controls.infoOnClick')}: {showInfoOnClick ? t('controls.on') : t('controls.off')}
                </DropdownMenu.Item>
                <DropdownMenu.Item 
                  className="px-2 py-1.5 outline-none cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm text-center w-full text-black dark:text-white"
                  onSelect={toggleCompareMode}
                >
                  {isCompareMode ? t('controls.cancelCompare') : t('controls.comparePlanets')}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        
        <div className="hidden xl:flex xl:flex-col xl:items-center xl:gap-2">
          <LanguageSwitcher />
          <Controls 
            autoRotate={autoRotate} 
            onToggleAutoRotate={() => setAutoRotate(!autoRotate)} 
          />
          <Button
            variant="outline"
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="w-40 flex items-center justify-center gap-2 text-black dark:text-white"
          >
            <div className="relative w-4 h-4">
              <Sun className="h-4 w-4 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span>{t('controls.theme')}</span>
          </Button>
          <Button
            variant={showInfoOnClick ? "default" : "outline"}
            onClick={() => setShowInfoOnClick(!showInfoOnClick)}
            className="w-40 text-black dark:text-white"
          >
            {t('controls.infoOnClick')}: {showInfoOnClick ? t('controls.on') : t('controls.off')}
          </Button>
          <Button
            variant={isCompareMode ? "secondary" : "outline"}
            onClick={toggleCompareMode}
            className="w-40 text-black dark:text-white"
          >
            {isCompareMode ? t('controls.cancelCompare') : t('controls.comparePlanets')}
          </Button>
        </div>
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