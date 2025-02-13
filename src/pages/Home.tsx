import { useState, useEffect } from "react";
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
  const [showButtons, setShowButtons] = useState(true);
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

  const handleToggleButtons = () => setShowButtons(prev => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
        handleToggleButtons();
      }
    };

    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;

    const handleClick = () => {
      clickCount++;
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 400);
      } else if (clickCount === 3) {
        handleToggleButtons();
        clickCount = 0;
        clearTimeout(clickTimer);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      clearTimeout(clickTimer);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden dark:bg-black">
      <div className="flex flex-col items-center gap-2">
        <div className={`xl:hidden absolute z-10 top-4 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild
            >
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
            <DropdownMenu.Content 
                className="min-w-[200px] bg-background rounded-md p-2 shadow-md"
                align="center"
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
        
        <div className={`hidden absolute z-10 left-4 top-4 xl:flex xl:flex-col xl:items-center xl:gap-2 transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <LanguageSwitcher />
          <Controls 
            autoRotate={autoRotate} 
            onToggleAutoRotate={() => setAutoRotate(!autoRotate)} 
          />
          <Button
            variant="outline"
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="w-40 flex items-center justify-center gap-2 text-black dark:text-white hover:bg-black/70"
          >
            <div className="relative w-4 h-4">
              <Sun className="h-4 w-4 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span>{t('controls.theme')}</span>
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setShowInfoOnClick(!showInfoOnClick)}
            className="w-40 text-black dark:text-white hover:bg-black/70"
          >
            {t('controls.infoOnClick')}: {showInfoOnClick ? t('controls.on') : t('controls.off')}
          </Button>
          <Button
            variant={isCompareMode ? "secondary" : "outline"}
            onClick={toggleCompareMode}
            className="w-40 text-black dark:text-white hover:bg-black/70"
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
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-10 text-black dark:text-white transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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