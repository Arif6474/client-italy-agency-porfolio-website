"use client";

import { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface LocationNode {
  name: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  z: number;
}

const LOCATIONS = [
  { name: "Venezia", lat: 45.4408, lon: 12.3155 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
  { name: "Vancouver", lat: 49.2827, lon: -123.1207 },
  { name: "McMurdo", lat: -77.8460, lon: 166.6605 },
];

const CONNECTIONS = [
  [0, 3], // Venezia -> London
  [0, 7], // Venezia -> Cairo
  [7, 6], // Cairo -> Cape Town
  [6, 5], // Cape Town -> São Paulo
  [5, 8], // São Paulo -> Buenos Aires
  [8, 1], // Buenos Aires -> New York
  [1, 3], // New York -> London
  [1, 9], // New York -> Vancouver
  [9, 2], // Vancouver -> Tokyo
  [2, 4], // Tokyo -> Sydney
  [4, 10], // Sydney -> McMurdo
  [10, 8], // McMurdo -> Buenos Aires
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ isDragging: false, x: 0, y: 0, speedX: 0, speedY: 0 });
  const rotationRef = useRef({ angleX: 0.35, angleY: 0 });

  const radius = 135;
  const numDots = 380;
  const [points, setPoints] = useState<Point3D[]>([]);
  const [nodes, setNodes] = useState<LocationNode[]>([]);

  // 1. Convert Lat/Lon to Spherical Coordinates on mounting
  useEffect(() => {
    // Generate Fibonacci Sphere dots
    const generatedPoints: Point3D[] = [];
    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numDots);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      generatedPoints.push({
        x: Math.cos(theta) * Math.sin(phi) * radius,
        y: Math.sin(phi) * Math.sin(theta) * radius,
        z: Math.cos(phi) * radius,
      });
    }

    // Convert Location Cities
    const generatedNodes = LOCATIONS.map((loc) => {
      const latRad = (loc.lat * Math.PI) / 180;
      const lonRad = (loc.lon * Math.PI) / 180;
      return {
        ...loc,
        x: radius * Math.cos(latRad) * Math.sin(lonRad),
        y: radius * Math.sin(latRad),
        z: radius * Math.cos(latRad) * Math.cos(lonRad),
      };
    });

    const handle = requestAnimationFrame(() => {
      setPoints(generatedPoints);
      setNodes(generatedNodes);
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  // 2. High-Performance Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const project = (x: number, y: number, z: number, cx: number, cy: number) => {
      const cameraDistance = 380;
      const scale = cameraDistance / (cameraDistance - z);
      return {
        x: cx + x * scale,
        y: cy - y * scale, // invert canvas vertical coordinates direction
        scale,
      };
    };

    const rotate = (p: Point3D, angleX: number, angleY: number) => {
      // Y-axis rotation
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;

      // X-axis rotation
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const rot = rotationRef.current;
      const ptr = pointerRef.current;

      // Add spin velocity/drag damping
      if (!ptr.isDragging) {
        rot.angleY += 0.0028 + ptr.speedY;
        rot.angleX += ptr.speedX;
        ptr.speedX *= 0.94; // inertia decay
        ptr.speedY *= 0.94;
      } else {
        rot.angleY += ptr.speedY;
        rot.angleX += ptr.speedX;
      }

      // Keep pitch angles inside normal limits
      rot.angleX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rot.angleX));

      // A. Sort points by Z depth so we render background dots first
      const rotatedPoints = points.map((p) => ({
        orig: p,
        rot: rotate(p, rot.angleX, rot.angleY),
      }));

      // B. Draw dots
      rotatedPoints.forEach(({ rot: rp }) => {
        const { x: px, y: py, scale } = project(rp.x, rp.y, rp.z, cx, cy);

        // Check Z depth for opacity shading
        const zRatio = (rp.z + radius) / (2 * radius); // 0 (back) to 1 (front)
        const opacity = 0.06 + 0.38 * zRatio;
        const dotSize = 0.75 + 1.2 * scale;

        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // C. Rotate Locations
      const rotatedNodes = nodes.map((node) => ({
        ...node,
        rot: rotate(node, rot.angleX, rot.angleY),
      }));

      // D. Draw Connections & Arcs
      const timeFactor = (Date.now() / 2400) % 1; // Particle progress loops every 2.4s

      CONNECTIONS.forEach(([startIdx, endIdx]) => {
        const nodeA = rotatedNodes[startIdx];
        const nodeB = rotatedNodes[endIdx];
        if (!nodeA || !nodeB) return;

        const pA = project(nodeA.rot.x, nodeA.rot.y, nodeA.rot.z, cx, cy);
        const pB = project(nodeB.rot.x, nodeB.rot.y, nodeB.rot.z, cx, cy);

        // 3D Midpoint + outward extrusion for Bezier arc curve height
        const midX = (nodeA.rot.x + nodeB.rot.x) / 2;
        const midY = (nodeA.rot.y + nodeB.rot.y) / 2;
        const midZ = (nodeA.rot.z + nodeB.rot.z) / 2;
        const midDist = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
        const arcHeight = radius * 0.45;

        const ctrlRot = {
          x: (midX / midDist) * (radius + arcHeight),
          y: (midY / midDist) * (radius + arcHeight),
          z: (midZ / midDist) * (radius + arcHeight),
        };
        const pCtrl = project(ctrlRot.x, ctrlRot.y, ctrlRot.z, cx, cy);

        // Draw Arc Line (fades on the back of the globe)
        const avgZ = (nodeA.rot.z + nodeB.rot.z) / 2;
        const arcRatio = (avgZ + radius) / (2 * radius);
        if (arcRatio > 0.1) {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.quadraticCurveTo(pCtrl.x, pCtrl.y, pB.x, pB.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * arcRatio})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Animated Traveling Neon Particle
          const t = timeFactor;
          const u = 1 - t;
          // Bezier Quadratic Interpolation
          const pX = u * u * pA.x + 2 * u * t * pCtrl.x + t * t * pB.x;
          const pY = u * u * pA.y + 2 * u * t * pCtrl.y + t * t * pB.y;

          ctx.beginPath();
          ctx.arc(pX, pY, 2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(251, 191, 36, ${0.85 * arcRatio})`; // Amber/Gold trace
          ctx.shadowColor = "rgba(251, 191, 36, 0.6)";
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow blurring
        }
      });

      // E. Draw pulsing location city dots
      rotatedNodes.forEach((node) => {
        const { x: px, y: py } = project(node.rot.x, node.rot.y, node.rot.z, cx, cy);

        const zRatio = (node.rot.z + radius) / (2 * radius);
        if (zRatio > 0.25) {
          // Pulse halo animation
          const pulse = (Date.now() / 1000) % 2; // loops every 2s
          const maxRadius = 8;
          const pulseRadius = pulse * (maxRadius / 2);
          const pulseAlpha = 0.5 * (1 - pulse / 2) * zRatio;

          // Drawing Halo ring
          ctx.beginPath();
          ctx.arc(px, py, pulseRadius, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(251, 191, 36, ${pulseAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Center solid dot
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(251, 191, 36, ${zRatio * 0.9})`;
          ctx.fill();

          // City Label Tag
          ctx.font = "bold 9px monospace";
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * zRatio})`;
          ctx.fillText(node.name, px + 7, py + 3);
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [points, nodes]);

  // 3. User Drag Interactivity
  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ptr = pointerRef.current;
    ptr.isDragging = true;
    ptr.x = e.clientX;
    ptr.y = e.clientY;
    ptr.speedX = 0;
    ptr.speedY = 0;
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ptr = pointerRef.current;
    if (!ptr.isDragging) return;

    const deltaX = e.clientX - ptr.x;
    const deltaY = e.clientY - ptr.y;

    ptr.x = e.clientX;
    ptr.y = e.clientY;

    ptr.speedY = deltaX * 0.005;
    ptr.speedX = -deltaY * 0.005;
  };

  const handlePointerUpOrLeave = () => {
    pointerRef.current.isDragging = false;
  };

  return (
    <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center pointer-events-auto select-none">
      {/* Absolute faint background ring to frame the sphere */}
      <div className="absolute w-[270px] h-[270px] md:w-[330px] md:h-[330px] rounded-full border border-dashed border-neutral-900/40 pointer-events-none select-none z-0 animate-[spin_60s_linear_infinite]" />

      <canvas
        ref={canvasRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUpOrLeave}
        onMouseLeave={handlePointerUpOrLeave}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
