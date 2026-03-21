"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene } from "three";
import { useThree, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = useMemo(() => ({
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  }), [globeConfig]);

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      import("three-globe").then((mod) => {
        const ThreeGlobe = mod.default;
        globeRef.current = new ThreeGlobe();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!groupRef.current) return;
        (groupRef.current as any).add(globeRef.current);
        setIsInitialized(true);
      });
    }
  }, []);

  // Build material
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const mumbai = { lat: 19.076, lng: 72.8777, color: "#3b82f6" };
    // Reuse this object instead of creating new ones in loops
    const filteredPoints = [
      {
        size: defaultProps.pointSize,
        order: 1,
        color: mumbai.color,
        lat: mumbai.lat,
        lng: mumbai.lng,
      },
    ];

    globeRef.current
      .globeImageUrl("/assets/earth-blue-marble.webp")
      .bumpImageUrl("/assets/earth-topology.webp")
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData([])
      .arcDashLength(0)
      .arcDashGap(0)
      .arcDashAnimateTime(() => 0);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e: any) => e.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    // Initial ring
    globeRef.current
      .ringsData([mumbai])
      .ringColor(() => mumbai.color)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) /
        Math.max(1, defaultProps.rings)
      );
  }, [isInitialized, defaultProps]);

  // Optimized Interval Loop - Reuse object
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    // Define static object outside interval
    const ringData = [{ lat: 19.076, lng: 72.8777, color: "#3b82f6" }];

    const interval = setInterval(() => {
      globeRef.current!.ringsData(ringData);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInitialized]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size.width, size.height]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(
    globeConfig.autoRotate
  );

  const canvasStyle = {
    width: "100%",
    height: "100%",
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    cursor: isHovering ? (isDragging ? "grabbing" : "grab") : "default",
  };

  const handlePointerEnter = () => {
    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={canvasStyle}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        shadows={false}
        scene={scene}
        camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, cameraZ] }}
      >
        <WebGLRendererConfig />
        <ambientLight color={globeConfig.ambientLight} intensity={0.8} />
        <directionalLight
          color={globeConfig.directionalLeftLight}
          position={[-400, 100, 400]}
        />
        <directionalLight
          color={globeConfig.directionalTopLight}
          position={[-200, 500, 200]}
        />
        <pointLight
          color={globeConfig.pointLight}
          position={[-200, 500, 200]}
          intensity={1.2}
        />
        <Globe {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={cameraZ}
          maxDistance={cameraZ}
          autoRotateSpeed={globeConfig.autoRotateSpeed}
          autoRotate={autoRotateEnabled}
          onStart={() => {
            setIsDragging(true);
            setAutoRotateEnabled(false);
          }}
          onEnd={() => {
            setIsDragging(false);
            setAutoRotateEnabled(true);
          }}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
