import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function HeroCanvas() {
  const useThemeMode = () => {
    const getDark = () => {
      if (typeof document === 'undefined') return false
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true
      return document.documentElement.classList.contains('dark')
    }
    const [mode, setMode] = React.useState(getDark() ? 'dark' : 'light')
    React.useEffect(() => {
      const root = document.documentElement
      const obs = new MutationObserver(() => setMode(root.classList.contains('dark') ? 'dark' : 'light'))
      obs.observe(root, { attributes: true, attributeFilter: ['class'] })
      return () => obs.disconnect()
    }, [])
    return mode
  }

  const HelixPoints = ({ mode }) => {
    const count = 1000
    const radius = 1.6
    const length = Math.PI * 10
    const positionsA = new Float32Array(count * 3)
    const positionsB = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = (i / count) * length
      const x1 = Math.cos(t) * radius
      const y1 = Math.sin(t) * radius
      const z = (i / count) * 10 - 5
      const x2 = Math.cos(t + Math.PI) * radius
      const y2 = Math.sin(t + Math.PI) * radius
      positionsA.set([x1, y1, z], i * 3)
      positionsB.set([x2, y2, z], i * 3)
    }
    return (
      <group>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={count} array={positionsA} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.06} sizeAttenuation color="#ff6ec7" transparent opacity={mode === 'dark' ? 0.85 : 0.95} depthWrite={false} />
        </points>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={count} array={positionsB} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.06} sizeAttenuation color="#c299ff" transparent opacity={mode === 'dark' ? 0.85 : 0.95} depthWrite={false} />
        </points>
        <lineSegments>
          <bufferGeometry>
            {(() => {
              const step = 24
              const segs = []
              for (let i = 0; i < count - step; i += step) {
                const t = (i / count) * length
                const z = (i / count) * 10 - 5
                segs.push(
                  Math.cos(t) * radius, Math.sin(t) * radius, z,
                  Math.cos(t + Math.PI) * radius, Math.sin(t + Math.PI) * radius, z
                )
              }
              return <bufferAttribute attach="attributes-position" array={new Float32Array(segs)} count={segs.length / 3} itemSize={3} />
            })()}
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={mode === 'light' ? '#000000' : '#ffffff'} transparent opacity={0.35} />
        </lineSegments>
      </group>
    )
  }

  const Sparkles = ({ mode }) => {
    const ref = React.useRef()
    const N = 600
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 2.4 + Math.random() * 1.1
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      const z = (Math.random() - 0.5) * 12
      arr.set([x, y, z], i * 3)
    }
    React.useEffect(() => {
      if (ref.current && ref.current.material) {
        ref.current.material.color = new THREE.Color(mode === 'light' ? '#000000' : '#ffffff')
        ref.current.material.needsUpdate = true
      }
    }, [mode])
    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={arr} count={N} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} transparent opacity={0.8} depthWrite={false} color={mode === 'light' ? '#000000' : '#ffffff'} />
      </points>
    )
  }

  const Orbiters = () => {
    const ref = React.useRef()
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime()
      if (!ref.current) return
      ref.current.children.forEach((m, i) => {
        const a = t * (0.4 + i * 0.08) + i
        const r = 2.8 + i * 0.18
        m.position.set(Math.cos(a) * r, Math.sin(a) * r, Math.sin(a * 0.7) * 2.5)
        m.rotation.x = a; m.rotation.y = a * 0.5
      })
    })
    return (
      <group ref={ref}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i}>
            <icosahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#ff8de1" emissive="#ff8de1" emissiveIntensity={0.4} metalness={0.2} roughness={0.4} />
          </mesh>
        ))}
      </group>
    )
  }

  const mode = useThemeMode()
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={0.6} color="#ffb6f2" />
      <group>
        <HelixPoints mode={mode} />
        <Sparkles mode={mode} />
        <Orbiters />
      </group>
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} radius={0.8} />
      </EffectComposer>
    </Canvas>
  )
}

