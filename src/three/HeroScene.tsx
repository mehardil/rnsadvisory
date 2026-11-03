import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

function Globe() {
  const group = useRef<THREE.Group>(null)
  const { pointer, viewport, camera } = useThree()

  useFrame((state, delta) => {
    if (!group.current) return
    const scroll = typeof window !== 'undefined' ? window.scrollY / Math.max(1, window.innerHeight) : 0
    group.current.rotation.y += delta * 0.09
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.18 + Math.min(scroll, 1.5) * 0.12,
      0.03,
    )
    const scale = Math.min(1, viewport.width / 9.5)
    group.current.scale.setScalar(scale)
    camera.position.z = 6 - Math.min(scroll, 1.5) * 0.5
    camera.position.y = -Math.min(scroll, 1.5) * 0.25
    void state
  })

  const particles = useMemo(() => {
    const count = 900
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.15 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return positions
  }, [])

  return (
    <group ref={group} position={[0.55, 0.02, 0]}>
      {/* Inner sphere occludes the back of the wireframe for depth */}
      <mesh>
        <sphereGeometry args={[1.83, 48, 48]} />
        <meshStandardMaterial color="#08152d" roughness={0.5} metalness={0.4} emissive="#0b1d3d" emissiveIntensity={0.35} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.9, 4]} />
        <meshBasicMaterial color="#6b98f5" wireframe transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.55, 0.004, 8, 180]} />
        <meshBasicMaterial color="#F0DFAF" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.4, 0.4]}>
        <torusGeometry args={[2.9, 0.003, 8, 180]} />
        <meshBasicMaterial color="#C9A24B" transparent opacity={0.4} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#E8D6A0"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating glass geometry */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh position={[2.55, 1.25, 0.6]} rotation={[0.4, 0.8, 0.2]}>
          <octahedronGeometry args={[0.46, 0]} />
          <meshPhysicalMaterial
            color="#E8D6A0"
            metalness={0.95}
            roughness={0.18}
            transparent
            opacity={0.92}
            emissive="#C9A24B"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh position={[-2.5, -1.1, 0.8]} rotation={[0.2, 0.4, 0.6]}>
          <dodecahedronGeometry args={[0.36, 0]} />
          <meshPhysicalMaterial color="#6f9cff" metalness={0.9} roughness={0.2} transparent opacity={0.85} emissive="#1F4FD8" emissiveIntensity={0.25} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.9} floatIntensity={0.8}>
        <mesh position={[1.9, -1.6, 1.2]} rotation={[0.6, 0.3, 0.2]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshPhysicalMaterial color="#F7F5EF" metalness={0.7} roughness={0.12} transparent opacity={0.75} emissive="#E8D6A0" emissiveIntensity={0.18} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1}>
        <mesh position={[-2.1, 1.7, -0.4]} rotation={[0.3, 0.9, 0.1]}>
          <torusKnotGeometry args={[0.22, 0.06, 90, 12]} />
          <meshPhysicalMaterial color="#C9A24B" metalness={1} roughness={0.22} transparent opacity={0.95} emissive="#C9A24B" emissiveIntensity={0.28} />
        </mesh>
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#060f22', 8, 18]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} color="#cfe0ff" />
      <pointLight position={[-5, -2, 3]} intensity={18} color="#C9A24B" distance={14} />
      <Globe />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.22} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion()
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
