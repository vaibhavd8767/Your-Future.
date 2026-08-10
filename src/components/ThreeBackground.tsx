import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  intensity?: 'subtle' | 'vibrant';
  interactive?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  intensity = 'subtle',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.03);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry 1: Particles Field
    const particleCount = intensity === 'vibrant' ? 250 : 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Crimson accent (#991b1b) and warm slate palette
    const colorRed = new THREE.Color(0x991b1b);
    const colorAmber = new THREE.Color(0xd97706);
    const colorSlate = new THREE.Color(0x64748b);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const mixedColor = Math.random() > 0.4 ? colorRed : Math.random() > 0.5 ? colorAmber : colorSlate;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: intensity === 'vibrant' ? 0.7 : 0.45,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Geometry 2: Floating 3D Wireframe Icosahedrons
    const shapeGroup = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
      const size = Math.random() * 1.5 + 0.8;
      const polyGeo = new THREE.IcosahedronGeometry(size, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x991b1b : 0xcbd5e1,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });

      const polyMesh = new THREE.Mesh(polyGeo, wireMat);
      polyMesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );
      polyMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      shapeGroup.add(polyMesh);
    }

    scene.add(shapeGroup);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particle cloud gently
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.x += 0.0003;

      // Animate wireframe shapes
      shapeGroup.children.forEach((child, index) => {
        child.rotation.x += 0.002 * (index + 1);
        child.rotation.y += 0.003 * (index + 1);
      });

      // Camera lerp mouse target
      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [intensity, interactive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
