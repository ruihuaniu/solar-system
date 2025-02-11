import { useRef, useCallback } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { planets } from "@/lib/planets";
import type { Planet } from "@/lib/types";

interface PlanetProps {
  planet: Planet;
  distance: number;
  isSelected: boolean;
  onSelect: (planet: Planet) => void;
  autoRotate: boolean;
}

function Planet({
  planet,
  distance,
  isSelected,
  onSelect,
  autoRotate,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, planet.texture);
  const ringTexture =
    planet.name === "Saturn"
      ? useLoader(THREE.TextureLoader, "/textures/2k_saturn_ring_alpha.png")
      : null;
  const moons = planet.moons || [];

  const isMobile = window.innerWidth < 768;

  useFrame(() => {
    if (autoRotate && meshRef.current && orbitRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
      orbitRef.current.rotation.y += planet.orbitSpeed;
    }
    // Adjust camera position for mobile
    if (isMobile && meshRef.current) {
      const scale = 1.5;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  const { camera } = useThree();

  const handleClick = useCallback((e: THREE.Event) => {
    e.stopPropagation();
    onSelect(planet);

    // Calculate position for camera
    const planetPosition = new THREE.Vector3();
    if (meshRef.current) {
      meshRef.current.getWorldPosition(planetPosition);
    }

    // Add offset for better view
    const offset = planet.size * 3;
    const cameraTarget = new THREE.Vector3(
      planetPosition.x,
      planetPosition.y + offset / 2,
      planetPosition.z + offset
    );

    // Animate camera position
    const duration = 1000; // 1 second
    const startPos = camera.position.clone();
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Smooth easing
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      camera.position.lerpVectors(startPos, cameraTarget, eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [camera, onSelect, planet]);

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[distance, 0, 0]}
        onClick={handleClick}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive={isSelected ? "white" : "black"}
          emissiveIntensity={isSelected ? 0.2 : 0}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      {planet.name === "Saturn" && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]} position={[distance, 0, 0]}>
          <ringGeometry args={[3, 5, 64]} />
          <meshStandardMaterial
            map={ringTexture}
            transparent={true}
            opacity={1}
            side={THREE.DoubleSide}
            emissive="#FFFFFF"
            emissiveIntensity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      )}
      {moons.map((moon, index) => (
        <group
          key={index}
          rotation={[0, (2 * Math.PI * index) / moons.length, 0]}
        >
          <mesh position={[distance + moon.distance, 0, 0]}>
            <sphereGeometry args={[moon.size, 16, 16]} />
            <meshStandardMaterial
              map={useLoader(THREE.TextureLoader, moon.texture)}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

interface SolarSystemProps {
  selectedPlanet: Planet;
  onSelectPlanet: (planet: Planet) => void;
  autoRotate: boolean;
}

export default function SolarSystem({
  selectedPlanet,
  onSelectPlanet,
  autoRotate,
}: SolarSystemProps) {
  const sunTexture = useLoader(THREE.TextureLoader, "/textures/2k_sun.jpg");
  const { camera } = useThree();

  const handleSunClick = () => {
    // Reset camera to initial position
    const duration = 1000;
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(0, 20, 25);
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Smooth easing
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      camera.position.lerpVectors(startPos, endPos, eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[0, 0, 0]}
        intensity={50}
        color="#FDB813"
        distance={100}
        decay={1}
      />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} />

      {/* Sun */}
      <mesh position={[0, 0, 0]} onClick={handleSunClick}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial map={sunTexture} color="#FDB813" />
      </mesh>

      {/* Asteroid Belt */}
      <group rotation={[Math.PI / 8, 0, 0]}>
        {Array.from({ length: 200 }).map((_, i) => {
          const angle = (i / 200) * Math.PI * 2;
          const radius = 18 + Math.random() * 2; // Between Mars and Jupiter
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 2;
          const asteroidTextures = [
            "/textures/2k_asteroid_1.jpg",
            "/textures/2k_asteroid_2.jpg",
            "/textures/2k_asteroid_3.jpg",
            "/textures/2k_asteroid_4.jpg",
          ];
          const randomTexture = useLoader(
            THREE.TextureLoader,
            asteroidTextures[
              Math.floor(Math.random() * asteroidTextures.length)
            ],
          );
          return (
            <mesh
              key={i}
              position={[x, y, z]}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
              ]}
              scale={[
                0.08 + Math.random() * 0.08,
                0.06 + Math.random() * 0.08,
                0.07 + Math.random() * 0.08,
              ]}
            >
              <icosahedronGeometry args={[1, Math.floor(Math.random() * 2)]} />
              <meshStandardMaterial
                map={randomTexture}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {planets.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          distance={planet.distanceFromSun}
          isSelected={selectedPlanet.name === planet.name}
          onSelect={onSelectPlanet}
          autoRotate={autoRotate}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={0.2}
        maxDistance={100}
        minDistance={5}
      />
    </>
  );
}