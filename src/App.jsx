import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
// drei helpers not needed for 2D overlay
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Brain, Atom, Dna, FunctionSquare, Cpu, LineChart, FlaskConical, Github, Linkedin, Mail, Share2, Code2, Boxes, Wrench, Sparkles, Laptop, Megaphone, GraduationCap, School, Medal, Trophy, BadgeCheck, Star, FileText, CheckSquare, Lightbulb, User } from "lucide-react";
// shadcn/ui primitives
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { about, experience as xp, projects as projData, skills as skillData, topSkills, languagesList, certifications } from "@/content/profile";
import Skills from "@/components/Skills";
import ScrollIndicator from "@/components/ScrollIndicator.jsx";
import Testimonials from "@/components/Testimonials.jsx";
import FloatingThemeToggle from "@/components/FloatingThemeToggle.jsx";
import Recommendations from "@/components/Recommendations.jsx";
import FunFactsTicker from "@/components/FunFactsTicker.jsx";
import { Link } from "react-router-dom";

/**
 * Hemen — Living Narrative Portfolio
 * Single-file React app using Tailwind + framer-motion + react-three-fiber.
 * Sections:
 *  - Hero with animated nebula + floating 3D DNA helix
 *  - Skills orbit cards (AI/ML, Math, CS, Bioinformatics, Design)
 *  - AI Studio (chat + embeddings toy) — wire to /api/chat later
 *  - Math Lab (interactive plot) 
 *  - Bio Lab (GC%, translation) 
 *  - Projects & Contact
 *
 * Notes for wiring real AI:
 *  Replace handleChatSend() fetch('/api/chat') with your backend route (OpenAI, Gemini, Friendli, etc.).
 */

// ===== Utility styles =====
const glass = "";
const neonText = "bg-clip-text text-transparent bg-gradient-to-r from-[#9B59B6] via-[#FF6EC7] to-[#E0AA3E]";
// Site background handled globally via CSS gradient; keep transparent here
const nebula = "bg-transparent";

// ===== 3D DNA Helix =====
function DNAHelix({ count = 700, radius = 1.1, length = 12.0 }) {
  const group = useRef();
  const pointsA = useMemo(() => new Float32Array(count * 3), [count]);
  const pointsB = useMemo(() => new Float32Array(count * 3), [count]);

  // Precompute helix coordinates (horizontal axis along X)
  useMemo(() => {
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 10; // number of turns
      const x = (i / count) * length - length / 2; // horizontal span
      const yA = Math.cos(t) * radius;
      const zA = Math.sin(t) * radius;
      const yB = Math.cos(t + Math.PI) * radius;
      const zB = Math.sin(t + Math.PI) * radius;
      pointsA[i * 3 + 0] = x;
      pointsA[i * 3 + 1] = yA;
      pointsA[i * 3 + 2] = zA;
      pointsB[i * 3 + 0] = x;
      pointsB[i * 3 + 1] = yB;
      pointsB[i * 3 + 2] = zB;
    }
  }, [count, radius, length, pointsA, pointsB]);

  // Rungs as line segments
  const rungPositions = useMemo(() => {
    const step = 6;
    const arr = [];
    for (let i = 0; i < count - step; i += step) {
      const ax = pointsA[i * 3 + 0], ay = pointsA[i * 3 + 1], az = pointsA[i * 3 + 2];
      const bx = pointsB[i * 3 + 0], by = pointsB[i * 3 + 1], bz = pointsB[i * 3 + 2];
      arr.push(ax, ay, az, bx, by, bz);
    }
    return new Float32Array(arr);
  }, [count, pointsA, pointsB]);

  // Ambient sparkle particles around the helix
  const sparklePositions = useMemo(() => {
    const N = 700;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // random points in a torus-like volume around helix
      const a = Math.random() * Math.PI * 2;
      const r = radius + 0.6 + Math.random() * 0.8;
      const y = Math.cos(a) * r + (Math.random() - 0.5) * 0.25;
      const z = Math.sin(a) * r + (Math.random() - 0.5) * 0.25;
      const x = (Math.random() - 0.5) * length * 1.2;
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [length, radius]);

  // Static: no useFrame animation — helix is a stable visual anchor

  return (
    <group ref={group}>
      {/* Neon strands as glowing particles (front) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={pointsA} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          sizeAttenuation
          color={new THREE.Color('#ff55dd')}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={pointsB} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          sizeAttenuation
          color={new THREE.Color('#c299ff')}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Soft halo for strands */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={pointsA} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          sizeAttenuation
          color={new THREE.Color('#ff55dd')}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={pointsB} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          sizeAttenuation
          color={new THREE.Color('#c299ff')}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ladder rungs as faint additive lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={rungPositions} count={rungPositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={new THREE.Color('#e3e3ff')} transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Ambient sparkles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={sparklePositions} count={sparklePositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} sizeAttenuation color={new THREE.Color('#ffffff')} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <ambientLight intensity={0.6} />
      <pointLight intensity={18} position={[6, 4, 6]} color={new THREE.Color('#ffb3ff')} />
    </group>
  );
}

function OrbitCard({ title, icon: Icon, children, delay = 0 }) {
  return (
    React.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { delay, type: "spring", stiffness: 120, damping: 18 },
        className: `p-4 rounded-2xl ${glass} max-w-sm`,
      },
      <>
        <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-white/10">
            {React.createElement(Icon, { className: "w-5 h-5" })}
          </div>
          <h4 className="font-semibold">{title}</h4>
        </div>
        <div className="text-muted-foreground text-sm">{children}</div>
      </>
    )
  );
}

// Orbiting skill cards around the helix with depth, fade and scale
// Natural, free-flow motion across the hero area (not circular)
function OrbitSkillsFreeFlow({ groups, total = 18, speed = 0.18, maxVisible = 4 }) {
  const [, setTick] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const floaters = useRef([]); // all chips with positions
  const clusters = useRef([]); // groups
  const tRef = useRef(0); // time

  // Setup viewport listener
  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Initialize clusters and floaters
  useEffect(() => {
    if (!groups?.length) return;
    const G = groups.length;
    clusters.current = groups.map((g, gi) => ({ label: g.label, icon: g.icon, items: g.items }));

    // Allocate floaters per group exactly up to `total`
    const base = Math.floor(total / G);
    const rem = total % G;
    const now = Date.now();
    let idx = 0;
    floaters.current = [];
    const inUse = new Set();
    outer: for (let gi = 0; gi < G; gi++) {
      const per = base + (gi < rem ? 1 : 0);
      for (let k = 0; k < per; k++) {
        const items = clusters.current[gi].items || [];
        let t;
        for (let tries = 0; tries < items.length; tries++) {
          const cand = items[Math.floor(Math.random() * Math.max(1, items.length))] || '';
          if (!inUse.has(cand)) { t = cand; inUse.add(cand); break; }
        }
        if (!t) t = items[Math.floor(Math.random() * Math.max(1, items.length))] || '';
        // spawn at random edge of hero area with gentle inward velocity
        const side = Math.floor(Math.random() * 4);
        const pad = 20;
        const radiusRef = Math.max(260, Math.min(window.innerWidth, window.innerHeight) * 0.35);
        const areaW = radiusRef * 2.2;
        const areaH = radiusRef * 1.6;
        let x, y, vx, vy;
        if (side === 0) { x = -areaW/2 - pad; y = (Math.random()-0.5)*areaH; vx = 0.5 + Math.random()*0.6; vy = (Math.random()-0.5)*0.4; }
        else if (side === 1) { x = areaW/2 + pad; y = (Math.random()-0.5)*areaH; vx = - (0.5 + Math.random()*0.6); vy = (Math.random()-0.5)*0.4; }
        else if (side === 2) { y = -areaH/2 - pad; x = (Math.random()-0.5)*areaW; vy = 0.5 + Math.random()*0.6; vx = (Math.random()-0.5)*0.4; }
        else { y = areaH/2 + pad; x = (Math.random()-0.5)*areaW; vy = - (0.5 + Math.random()*0.6); vx = (Math.random()-0.5)*0.4; }
        floaters.current.push({
          key: `${now}-${gi}-${k}-${Math.random().toString(36).slice(2)}`,
          g: gi,
          x, y, vx, vy,
          s: speed,
          wobble: Math.random() * Math.PI * 2,
          life: 0,
          ttl: 8 + Math.random() * 4, // seconds visible lifecycle
          item: { title: t, icon: groups[gi].icon, cat: groups[gi].label },
        });
        idx++; if (idx >= total) break outer;
      }
    }
  }, [groups, total, speed]);

  // Animation loop: drift + lifecycle
  useEffect(() => {
    let raf;
    const step = () => {
      tRef.current += 0.016; // ~60fps
      const arr = floaters.current;
      const yBias = 20; // gently bias toward a clean central band
      const radiusRef = Math.max(260, Math.min(window.innerWidth, window.innerHeight) * 0.35);
      const maxX = radiusRef * 0.7;
      for (const f of arr) {
        // velocity + gentle noise
        const tt = tRef.current * f.s;
        f.vx += Math.sin(tt + f.wobble) * 0.004;
        f.vy += Math.cos(tt * 0.8 + f.wobble) * 0.003;
        // attract toward central band (consistent path height)
        f.vy += (yBias - f.y) * 0.0016;
        // damping for smooth flow
        f.vx *= 0.99;
        f.vy *= 0.99;
        // clamp velocity
        const maxV = 0.7;
        const mag = Math.hypot(f.vx, f.vy) || 1;
        const scale = Math.min(1, maxV / mag);
        f.vx *= scale; f.vy *= scale;
        // integrate
        f.x += f.vx; f.y += f.vy;
        f.life += 0.016;
        // keep within a narrower horizontal band
        if (Math.abs(f.x) > maxX) f.vx -= Math.sign(f.x) * 0.02;
        // recycle when far off screen
        const boundX = radiusRef * 1.6;
        const boundY = radiusRef * 1.2;
        if (Math.abs(f.x) > boundX || Math.abs(f.y) > boundY || f.life > (f.ttl || 10)) {
          // respawn
          const side = Math.floor(Math.random() * 4);
          const pad = 20;
          const areaW = radiusRef * 2.2;
          const areaH = radiusRef * 1.6;
          if (side === 0) { f.x = -areaW/2 - pad; f.y = (Math.random()-0.5)*areaH; f.vx = 0.6 + Math.random()*0.6; f.vy = (Math.random()-0.5)*0.4; }
          else if (side === 1) { f.x = areaW/2 + pad; f.y = (Math.random()-0.5)*areaH; f.vx = - (0.6 + Math.random()*0.6); f.vy = (Math.random()-0.5)*0.4; }
          else if (side === 2) { f.y = -areaH/2 - pad; f.x = (Math.random()-0.5)*areaW; f.vy = 0.6 + Math.random()*0.6; f.vx = (Math.random()-0.5)*0.4; }
          else { f.y = areaH/2 + pad; f.x = (Math.random()-0.5)*areaW; f.vy = - (0.6 + Math.random()*0.6); f.vx = (Math.random()-0.5)*0.4; }
          f.life = 0;
          f.ttl = 8 + Math.random() * 4;
          // swap to a new unique item from same group (no duplicates showing)
          const items = clusters.current[f.g].items || [];
          const inUse = new Set(floaters.current.map(ff => ff.item?.title).filter(Boolean));
          let t;
          for (let tries = 0; tries < items.length; tries++) {
            const cand = items[Math.floor(Math.random()*Math.max(1, items.length))] || '';
            if (!inUse.has(cand)) { t = cand; break; }
          }
          if (!t) t = items[Math.floor(Math.random()*Math.max(1, items.length))] || '';
          f.item = { title: t, icon: groups[f.g].icon, cat: groups[f.g].label };
        }
      }
      setTick((v) => (v + 1) % 1000000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [groups, speed]);

  // Compute depth by proximity to center (front emphasizes center band)
  const computed = floaters.current.map((f) => {
    const x = f.x, y = f.y;
    const depth = Math.max(0, 1 - Math.min(1, Math.hypot(x, y) / Math.max(260, Math.min(dims.w, dims.h) * 0.35)));
    const ttl = f.ttl || 10;
    const phase = Math.min(1, Math.max(0, f.life / ttl));
    // clarity curve: fade in (0..0.15), clear (..0.7), blur+fade (0.7..1)
    const clarity = phase < 0.15 ? (phase / 0.15) : phase < 0.7 ? 1 : Math.max(0, 1 - (phase - 0.7) / 0.3);
    return { f, x, y, depth, phase, clarity };
  });
  // choose up to maxFront most "ready" chips (high clarity + nearer center)
  // Piano-keys visibility: many cards fade in/out with overlap
  const visibleList = [...computed]
    .filter(c => c.clarity > 0.08 && c.phase < 0.98)
    .sort((a, b) => (b.clarity * 0.7 + b.depth * 0.3) - (a.clarity * 0.7 + a.depth * 0.3))
    .slice(0, maxVisible)
    .map(c => c.f);
  const isVisible = (f) => visibleList.includes(f);

  // Soft repulsion between visible cards to avoid overlap
  const repulse = (list) => {
    const thresh = 200;
    for (let a = 0; a < list.length; a++) {
      for (let b = a + 1; b < list.length; b++) {
        const fa = list[a];
        const fb = list[b];
        const dx = fb.x - fa.x;
        const dy = fb.y - fa.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < thresh) {
          const push = (thresh - d) / thresh * 6; // direct positional nudge
          const nx = dx / d, ny = dy / d;
          fa.f.x -= nx * push; fa.f.y -= ny * push;
          fb.f.x += nx * push; fb.f.y += ny * push;
        }
      }
    }
  };
  repulse(computed.filter(c => isVisible(c.f)));

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {computed.map(({ f, x, y, depth, phase, clarity }) => {
        const scale = 0.95 + depth * 0.32;
        const frontVis = isVisible(f);
        // Always render visible skills above helix; never hide inside it
        const z = frontVis ? 30 : 0;
        // visibility: clear in, then quick, soft blur while fading, then disappear
        const opacity = frontVis ? clarity : 0;
        const blur = frontVis ? (phase < 0.65 ? 0.4 * (1 - depth) : 1.2 + Math.max(0, (phase - 0.65) / 0.35) * 4) : 0;
        const Icon = f.item.icon;
        const palettes = [
          'from-pink-500/30 to-fuchsia-500/30 ring-pink-400/30',
          'from-amber-500/30 to-orange-500/30 ring-amber-400/30',
      'from-violet-500/30 to-fuchsia-500/30 ring-violet-400/30',
          'from-emerald-500/30 to-teal-500/30 ring-emerald-400/30',
        ];
        const pc = palettes[f.g % palettes.length];
        return (
          <div
            key={f.key + f.item.title}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
              zIndex: z,
              opacity,
              filter: `blur(${blur}px)`,
              transition: 'opacity 220ms ease, filter 220ms ease, transform 220ms ease',
            }}
          >
            {frontVis && (
              <div className={`pointer-events-auto transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${pc} ring-1 px-3.5 py-2.5 rounded-2xl w-[260px] border border-white/10 shadow-[0_0_20px_rgba(255,105,180,0.25)] text-slate-900 dark:text-white`}
                   title={f.item.cat}>
                <div className="flex items-center gap-2.5" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>
                  {Icon ? React.createElement(Icon, { className: 'w-5 h-5 text-slate-800 dark:text-white/90' }) : null}
                  <span className="text-[15px] font-extrabold truncate tracking-tight">{f.item.title}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ThinkingVisualizer() {
  const bars = 5;
  return (
    <div className="flex items-end gap-1 h-6 w-24">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0.4, opacity: 0.7 }}
          animate={{ scaleY: [0.4, 1.0, 0.5, 0.9, 0.4], opacity: [0.7, 1, 0.8, 1, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
          className="w-3 origin-bottom rounded-sm"
          style={{ background: 'linear-gradient(180deg, #ff77e1, #ffb36b, #a56dff)' }}
        />
      ))}
    </div>
  );
}

// Removed 3D billboards/trails to keep previous 2D skills overlay

// ===== AI Studio (Chat) =====
function AIStudio() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi Hemen! I can reason about math, code, and biology. Ask me anything ✨" }]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [demoMode, setDemoMode] = useState(true);
  const [thinking, setThinking] = useState(false);

  const handleChatSend = async () => {
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");

    // Demo: locally fabricate thoughtful responses; replace with real fetch() later
    if (demoMode) {
      setThinking(true);
      const canned =
        text.toLowerCase().includes("gc content")
          ? "GC content is (G+C)/N. Provide a sequence and I’ll compute it in the Bio Lab below."
          : text.toLowerCase().includes("curl")
          ? "For F = (P,Q,R), curl F = (R_y - Q_z, P_z - R_x, Q_x - P_y). Want a visual? Try the Math Lab graph."
          : "I’d approach this with retrieval + a reasoning model. I can also sketch code snippets on demand ✍️";
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: canned }]);
        setThinking(false);
      }, 500);
      return;
    }

    try {
      setThinking(true);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: next }),
      });
      if (!res.ok) throw new Error("Chat API failed");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "(no response)" }]);
      setDemoMode(false);
    } catch {
      toast.error("Chat error. Using demo mode.");
      setDemoMode(true);
    }
    setThinking(false);
  };

  return (
    <section id="ai" className="relative py-24">
          <div className="mx-auto w-full px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <Card className={`h-full ${glass}`}> 
            <CardHeader>
              <CardTitle className="title-gradient">AI Studio</CardTitle>
              <CardDescription className="text-muted-foreground">Chat across code, math, and bio. (Wire to your model later.)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Label>Model</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className={`w-56 ${glass}`}>
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o-mini">OpenAI GPT-4o mini</SelectItem>
                    <SelectItem value="gemini-1.5-pro">Google Gemini 1.5 Pro</SelectItem>
                    <SelectItem value="llama-3.1-70b">Llama 3.1 70B</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="ml-auto">{demoMode ? "Demo" : "Live"}</Badge>
              </div>
              <div className={`rounded-2xl p-4 h-64 sm:h-72 md:h-80 overflow-auto space-y-3 glass-card`}>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`px-3 py-2 rounded-xl max-w-[80%] border ${m.role === "user" ? "bg-white/95 text-slate-900 border-[rgba(106,64,200,0.20)] dark:bg-white/80" : "bg-[rgba(106,64,200,0.06)] dark:bg-purple-950/40 border-[rgba(106,64,200,0.22)] dark:border-white/10"}`}>
                      <p className="whitespace-pre-wrap text-sm text-foreground">{m.content}</p>
                    </div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex justify-start">
                    <div className={`px-3 py-2 rounded-xl max-w-[80%] bg-[rgba(106,64,200,0.06)] dark:bg-purple-950/40 border border-[rgba(106,64,200,0.22)] dark:border-white/10`}> 
                      <ThinkingVisualizer />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about code, math, or biology…" className={`glass-card text-foreground placeholder:text-slate-500 dark:placeholder:text-white/60`} />
                <Button onClick={handleChatSend} className="btn-primary-purple">Send</Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Tip: toggle demo/live by hitting the Chat endpoint.</div>
            </CardContent>
          </Card>

          <Card className={`h-full ${glass}`}>
            <CardHeader>
              <CardTitle className="title-gradient">Embeddings Toy</CardTitle>
              <CardDescription className="text-muted-foreground">Paste notes; I’ll compute cosine similarity locally.</CardDescription>
            </CardHeader>
            <CardContent>
              <EmbeddingsToy />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function EmbeddingsToy() {
  const [a, setA] = useState("AI tutors help students learn calculus.");
  const [b, setB] = useState("Machine learning can teach math concepts interactively.");
  const sim = useMemo(() => cosineSim(textToVec(a), textToVec(b)), [a, b]);
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-3">
        <Textarea className={glass} value={a} onChange={(e) => setA(e.target.value)} />
        <Textarea className={glass} value={b} onChange={(e) => setB(e.target.value)} />
      </div>
      <div className="mt-3">Cosine similarity: <span className="font-mono">{sim.toFixed(3)}</span></div>
      <p className="text-xs text-muted-foreground mt-1">(Toy hashing vectorizer; replace with real embeddings later.)</p>
    </div>
  );
}

function textToVec(t) {
  const tokens = t.toLowerCase().match(/[a-z]+/g) ?? [];
  const dim = 256;
  const v = new Array(dim).fill(0);
  tokens.forEach((tok) => {
    let h = 0;
    for (let i = 0; i < tok.length; i++) h = (h * 131 + tok.charCodeAt(i)) >>> 0;
    v[h % dim] += 1;
  });
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / norm);
}
function cosineSim(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

// ===== Math Lab =====
function MathLab() {
  const [a, setA] = useState(1.0);
  const [b, setB] = useState(0.0);
  const [freq, setFreq] = useState([1]);
  const points = useMemo(() => {
    const out = [];
    for (let x = -10; x <= 10; x += 0.1) {
      const y = a * Math.sin((freq[0] || 1) * x) + b * Math.cos(0.5 * x);
      out.push({ x, y });
    }
    return out;
  }, [a, b, freq]);

  return (
    <section id="math" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className={`${glass} col-span-2`}>
            <CardHeader>
              <CardTitle className="title-gradient">Math Lab — Signal Builder</CardTitle>
              <CardDescription className="text-muted-foreground">y = a·sin(f·x) + b·cos(0.5x)</CardDescription>
            </CardHeader>
            <CardContent>
              <Plot points={points} />
            </CardContent>
          </Card>
          <Card className={`${glass}`}>
            <CardHeader>
              <CardTitle className="title-gradient">Parameters</CardTitle>
              <CardDescription className="text-muted-foreground">Drag sliders to explore dynamics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>a (sin amplitude): {a.toFixed(2)}</Label>
                <Slider value={[a]} min={-2} max={2} step={0.01} onValueChange={(v)=>setA(v)} />
              </div>
              <div>
                <Label>b (cos amplitude): {b.toFixed(2)}</Label>
                <Slider value={[b]} min={-2} max={2} step={0.01} onValueChange={(v)=>setB(v)} />
              </div>
              <div>
                <Label>f (frequency): {freq[0]}</Label>
                <Slider value={freq} min={1} max={6} step={1} onValueChange={setFreq} />
              </div>
              <p className="text-xs text-muted-foreground">Idea: extend with Fourier synthesis or vector fields.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Plot({ points }) {
  // Minimal canvas plot to avoid extra deps
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);
    ctx.clearRect(0, 0, w, h);
    // axes
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    // plot
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const scaleX = w / (20);
    const scaleY = h / 4;
    points.forEach((p, i) => {
      const cx = w / 2 + p.x * scaleX;
      const cy = h / 2 - p.y * scaleY;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.strokeStyle = "#ffd1f7";
    ctx.stroke();
  }, [points]);
  return <canvas ref={ref} className="w-full h-[360px] rounded-xl bg-black/30" />;
}

// ===== Bio Lab =====
function BioLab() {
  const [seq, setSeq] = useState("ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG");
  const cleaned = useMemo(() => (seq.toUpperCase().replace(/[^ACGT]/g, "")), [seq]);
  const gc = useMemo(() => {
    const g = (cleaned.match(/G/g) || []).length;
    const c = (cleaned.match(/C/g) || []).length;
    return cleaned.length ? ((g + c) / cleaned.length) * 100 : 0;
  }, [cleaned]);
  const protein = useMemo(() => translate(cleaned), [cleaned]);

  return (
    <section id="bio" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        <Card className={`${glass}`}>
          <CardHeader>
            <CardTitle className="title-gradient">Bio Lab — Quick Tools</CardTitle>
            <CardDescription className="text-muted-foreground">Compute GC% and translate DNA → protein.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={seq} onChange={(e)=>setSeq(e.target.value)} className={`${glass} font-mono`} rows={6} />
            <div className="flex items-center gap-3">
              <Badge>Length: {cleaned.length}</Badge>
              <Badge>GC%: {gc.toFixed(1)}%</Badge>
            </div>
            <div>
              <Label>Protein</Label>
              <Textarea readOnly value={protein} className={`${glass} font-mono`} rows={4} />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="title-gradient">Ideas</CardTitle>
            <CardDescription className="text-foreground">Future: BLAST mini, motif finder, microscopy VLM demo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-[#e0e0e0]">
            <ul className="list-disc ml-5 space-y-1">
              <li>Upload FASTA → summarize with an LLM + domain glossary.</li>
              <li>Microscopy image → caption via VLM; compare metrics.</li>
              <li>Pathway visualizer with interactive graph.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

const CODON = {
  TTT:"F",TTC:"F",TTA:"L",TTG:"L",TCT:"S",TCC:"S",TCA:"S",TCG:"S",TAT:"Y",TAC:"Y",TAA:"*",TAG:"*",TGT:"C",TGC:"C",TGA:"*",TGG:"W",
  CTT:"L",CTC:"L",CTA:"L",CTG:"L",CCT:"P",CCC:"P",CCA:"P",CCG:"P",CAT:"H",CAC:"H",CAA:"Q",CAG:"Q",CGT:"R",CGC:"R",CGA:"R",CGG:"R",
  ATT:"I",ATC:"I",ATA:"I",ATG:"M",ACT:"T",ACC:"T",ACA:"T",ACG:"T",AAT:"N",AAC:"N",AAA:"K",AAG:"K",AGT:"S",AGC:"S",AGA:"R",AGG:"R",
  GTT:"V",GTC:"V",GTA:"V",GTG:"V",GCT:"A",GCC:"A",GCA:"A",GCG:"A",GAT:"D",GAC:"D",GAA:"E",GAG:"E",GGT:"G",GGC:"G",GGA:"G",GGG:"G"
};
function translate(dna) {
  let out = "";
  for (let i=0;i<dna.length;i+=3){
    const codon = dna.slice(i,i+3);
    if (codon.length<3) break;
    out += CODON[codon] || "X";
  }
  return out;
}

// ===== Projects & Contact =====
export function Projects() {
  const top = projData.filter(p => p.top).slice(0, 4)
  const pool = (top.length ? top : projData.slice(0, 4))
  const aiItems = pool.map(p => ({
    title: p.title,
    icon: Brain,
    blurb: p.summary,
    tags: p.tech,
    link: (p.links && p.links[0] && p.links[0].href) || '#',
  }));

  const renderCards = (items) => {
    const [expanded, setExpanded] = React.useState(null)
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map(({ title, icon: Icon, blurb, tags, link }, i) => (
              React.createElement(
                motion.div,
                {
                  key: i,
                  className: `group relative p-8 glass-card text-[#e0e0e0] cursor-pointer`,
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  onClick: () => setExpanded(expanded === i ? null : i),
                },
                <>
                <div className="mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 grid place-items-center">
                    {/* Simple icon thumbnails per project */}
                    {title.toLowerCase().includes('research') ? <FileText className="w-8 h-8 neon-icon"/> : title.toLowerCase().includes('stock') ? <LineChart className="w-8 h-8 neon-icon"/> : title.toLowerCase().includes('to-do') || title.toLowerCase().includes('to-do') ? <CheckSquare className="w-8 h-8 neon-icon"/> : <Brain className="w-8 h-8 neon-icon"/>}
                  </div>
                </div>
                 <div className="flex items-center gap-4 mb-3">
                   {React.createElement(Icon, { className: "w-7 h-7 neon-icon" })}
                   <h3 className="text-2xl font-extrabold"><span className="title-gradient">{title}</span></h3>
                 </div>
                <p className="text-lg text-foreground">{blurb}</p>
                <div className="mt-5 flex gap-2 flex-wrap">
                  {tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                {expanded === i && (
                  <div className="mt-6 text-base text-foreground">
                  <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-5 py-3 btn-outline-purple font-bold text-base">
                      <Github className="w-4 h-4"/> View on GitHub
                    </a>
                  </div>
                )}
                </>
              )
            ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/projects"><Button className="btn-primary-purple text-base px-6 py-3">View All Projects</Button></Link>
        </div>
      </div>
    )
  };

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className={`title-bounce-anchor font-hand text-3xl sm:text-4xl md:text-5xl ${neonText} mb-4 sm:mb-6`}>Projects</h2>
        {React.createElement(motion.div, { initial:{opacity:0, y:24}, whileInView:{opacity:1, y:0}, viewport:{once:true}, transition:{duration:0.5} }, (
          renderCards(aiItems)
        ))}
      </div>
    </section>
  );
}

// ===== Experience =====
export function Experience() {
  const accent = '#a970ff'
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className={`title-bounce-anchor font-hand text-3xl sm:text-4xl md:text-5xl ${neonText} mb-4 sm:mb-6`}>Experience</h2>
        <div className="relative">
          {React.createElement(motion.div, {
            initial: { height: 0, opacity: 0 },
            whileInView: { height: '100%', opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.8, ease: 'easeOut' },
            className: 'absolute left-4 sm:left-6 top-0 w-[3px] rounded-full',
            style: { background: `linear-gradient(${accent}, rgba(169,112,255,0.0))` }
          })}

          {React.createElement(motion.div, { initial:{opacity:0, y:24}, whileInView:{opacity:1, y:0}, viewport:{once:true}, transition:{duration:0.5}}, (
            <div className="pl-10 sm:pl-12">
            {xp.map((e, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute left-3.5 sm:left-5 top-2 w-3.5 h-3.5 rounded-full" style={{ background: accent, boxShadow: '0 0 18px rgba(169,112,255,0.6)' }} />
                {React.createElement(motion.div, {
                  initial:{opacity:0, x:-16},
                  whileInView:{opacity:1, x:0},
                  viewport:{once:true},
                  transition:{duration:0.45, delay: i*0.08},
                  className: 'p-8 glass-card'
                }, (
                  <>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-2xl font-extrabold flex items-center gap-4">
                        {e.role.toLowerCase().includes('ai/ml') ? <Brain className="w-6 h-6 neon-icon"/> : e.role.toLowerCase().includes('engineer') ? <Laptop className="w-6 h-6 neon-icon"/> : <Megaphone className="w-6 h-6 neon-icon"/>}
                        <span className="title-gradient">{e.role} · {e.company}</span>
                      </h3>
                      <span className="text-base text-foreground">{e.period}</span>
                    </div>
                    <ul className="mt-4 list-disc ml-8 text-lg text-foreground space-y-2.5">
                      {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </>
                ))}
              </div>
            ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const items = [
    {
      title: "Bachelor's Degree",
      subtitle: 'Mathematics & Computer Science',
      org: 'Portland State University Honors College',
      year: 'Expected Graduation: Dec 2025',
      details:
        'I am pursuing a double major in Mathematics and Computer Science at the prestigious Portland State University.',
      icon: GraduationCap,
    },
    {
      title: "Associate's Degree",
      subtitle: 'Computer Science',
      org: 'Portland Community College',
      year: '2022 – 2023',
      details:
        'Through the Early College High School Program at PCC, I’ve achieved sophomore standing at university level while still in high school.',
      icon: School,
    },
    {
      title: 'High School Diploma',
      subtitle: 'Southridge High School',
      org: 'Southridge High School',
      year: '2021 – 2023',
      details:
        'Graduated with honors, completing a rigorous academic program that prepared me for advanced studies in mathematics and computer science.',
      icon: School,
    },
  ]
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className={`title-bounce-anchor font-hand text-3xl sm:text-4xl md:text-5xl ${neonText} mb-4 sm:mb-6`}>Education</h2>
        {React.createElement(motion.div, { initial:{opacity:0, y:24}, whileInView:{opacity:1, y:0}, viewport:{once:true}, transition:{duration:0.5} }, (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {items.map((it, i)=> (
              <div key={i} className="flashcard select-none">
                {/* Front face */}
                <div className="flashcard-front glass-card p-7 text-center">
                  <div className="flex flex-col items-center gap-2">
                    {React.createElement(it.icon, { className: 'w-8 h-8 neon-icon' })}
                    <h3 className="text-lg font-semibold title-gradient">{it.title}</h3>
                    <p className="text-base text-foreground">{it.subtitle}</p>
                    {it.org && <p className="text-sm text-foreground/80">{it.org}</p>}
                  </div>
                </div>
                {/* Back face — details only */}
                <div className="flashcard-back glass-card p-7 text-center overflow-auto">
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-base text-foreground leading-relaxed">{it.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function HelixScene() {
  // Respect user motion preferences
  const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = React.useState(false)
    React.useEffect(() => {
      if (typeof window === 'undefined' || !window.matchMedia) return
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const onChange = () => setReduced(mq.matches)
      setReduced(mq.matches)
      if (mq.addEventListener) mq.addEventListener('change', onChange)
      else mq.addListener(onChange)
      return () => { if (mq.removeEventListener) mq.removeEventListener('change', onChange); else mq.removeListener(onChange) }
    }, [])
    return reduced
  }
  // Detect Tailwind dark mode by observing the <html> class list
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
  const HelixPoints = ({ mode, count }) => {
    // two strands as points
    const radius = 1.6;
    const length = Math.PI * 10; // ~5 turns
    const positionsA = new Float32Array(count * 3);
    const positionsB = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * length;
      const x1 = Math.cos(t) * radius;
      const y1 = Math.sin(t) * radius;
      const z = (i / count) * 10 - 5; // height ~10 units
      const x2 = Math.cos(t + Math.PI) * radius;
      const y2 = Math.sin(t + Math.PI) * radius;
      positionsA.set([x1, y1, z], i * 3);
      positionsB.set([x2, y2, z], i * 3);
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
        {/* rungs */}
        <lineSegments>
          <bufferGeometry>
            {(() => {
              const step = 24;
              const segs = [];
              for (let i = 0; i < count - step; i += step) {
                const t = (i / count) * length;
                const z = (i / count) * 10 - 5;
                segs.push(
                  Math.cos(t) * radius, Math.sin(t) * radius, z,
                  Math.cos(t + Math.PI) * radius, Math.sin(t + Math.PI) * radius, z
                );
              }
              return <bufferAttribute attach="attributes-position" array={new Float32Array(segs)} count={segs.length / 3} itemSize={3} />
            })()}
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={mode === 'light' ? '#000000' : '#ffffff'} transparent opacity={0.35} />
        </lineSegments>
      </group>
    );
  };

  const Sparkles = ({ mode, n }) => {
    const ref = React.useRef()
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.4 + Math.random() * 1.1;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      const z = (Math.random() - 0.5) * 12;
      arr.set([x, y, z], i * 3);
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
          <bufferAttribute attach="attributes-position" array={arr} count={n} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} transparent opacity={0.8} depthWrite={false} color={mode === 'light' ? '#000000' : '#ffffff'} />
      </points>
    );
  };

  const Orbiters = ({ mode }) => {
    const ref = React.useRef();
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      if (!ref.current) return;
      ref.current.children.forEach((m, i) => {
        const a = t * (0.4 + i * 0.08) + i;
        const r = 2.8 + i * 0.18;
        m.position.set(Math.cos(a) * r, Math.sin(a) * r, Math.sin(a * 0.7) * 2.5);
        m.rotation.x = a; m.rotation.y = a * 0.5;
      });
    });
    return (
      <group ref={ref}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i}>
            <icosahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#ff8de1" emissive="#ff8de1" emissiveIntensity={0.4} metalness={0.2} roughness={0.4} />
          </mesh>
        ))}
      </group>
    );
  };

  const Rotator = ({ children }) => {
    const g = React.useRef();
    useFrame(() => { if (g.current) g.current.rotation.y += 0.002; });
    return <group ref={g}>{children}</group>;
  };

  const mode = useThemeMode()
  const reduceMotion = usePrefersReducedMotion()
  const isSmall = typeof window !== 'undefined' ? window.innerWidth < 640 : false
  const helixCount = isSmall ? 750 : 1000
  const sparkCount = isSmall ? 400 : 600
  if (reduceMotion) return null
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={0.6} color="#ffb6f2" />
      <Rotator>
        <HelixPoints mode={mode} count={helixCount} />
        <Sparkles mode={mode} n={sparkCount} />
        <Orbiters mode={mode} />
      </Rotator>
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.25} luminanceSmoothing={0.9} radius={0.7} />
      </EffectComposer>
    </Canvas>
  );
}

// FloatingSymbols removed per request
/*function FloatingSymbols({ count = 16 }) {
  const SYMBOLS = ['∑','π','∫','√','{}','λ','<>','A','T','G','C','⚛️','🧪']
  const rand = (a,b)=> a + Math.random()*(b-a)
  const containerRef = React.useRef(null)
  const [anchors, setAnchors] = React.useState([])

  const measureAnchors = React.useCallback(() => {
    const cont = containerRef.current
    if (!cont) return
    const contRect = cont.getBoundingClientRect()
    const els = Array.from(document.querySelectorAll('.hero-box'))
    const pts = els.map(el => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width/2 - contRect.left
      const cy = r.top + r.height/2 - contRect.top
      return { x: cx, y: cy }
    })
    if (pts.length) setAnchors(pts)
  }, [])

  React.useEffect(() => {
    measureAnchors()
    window.addEventListener('resize', measureAnchors)
    const id = setTimeout(measureAnchors, 50)
    return () => { window.removeEventListener('resize', measureAnchors); clearTimeout(id) }
  }, [measureAnchors])

  const items = React.useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      s: SYMBOLS[Math.floor(Math.random()*SYMBOLS.length)],
      size: rand(16, 22),
      depth: rand(0.7, 1.0),
      delay: rand(0, 1.5),
    }))
  ), [count])

  const [offY, setOffY] = React.useState(0)
  React.useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY || 0
      const y = Math.max(-18, Math.min(18, sy * 0.03))
      setOffY(y)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const Symbol = ({ s, size, depth, delay }) => {
    const controls = useAnimation()
    const elRef = React.useRef(null)
    const run = React.useCallback(async () => {
      if (!anchors.length || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // pick two different anchors to bounce between
      let a = Math.floor(Math.random()*anchors.length)
      let b = (a + 1) % anchors.length
      for (;;) {
        const jx = rand(-18, 18), jy = rand(-12, 12)
        await controls.start({
          x: anchors[a].x + jx - rect.width*0.02,
          y: anchors[a].y + jy,
          scale: [1, 1.12, 1],
          rotate: [0, rand(-20,20), 0],
          opacity: [0.85*depth, 1*depth, 0.9*depth],
          transition: { type:'spring', stiffness: 220, damping: 18 }
        })
        ;[a,b] = [b,a]
      }
    }, [anchors, controls])

    React.useEffect(() => {
      const id = setTimeout(run, delay*1000)
      return () => clearTimeout(id)
    }, [run, delay])

    return (
      <motion.div
        ref={elRef}
        initial={{ x: rand(40, 140), y: rand(40, 140), opacity: 0.9*depth }}
        animate={controls}
        style={{ fontSize: size*depth, filter:`blur(${(1-depth)*0.8}px)` }}
        className="symbol-theme absolute"
      >
        {s}
      </motion.div>
    )
  }

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-25" style={{ transform:`translateY(${offY}px)` }}>
      {items.map(({ id, s, size, depth, delay }) => (
        <Symbol key={id} s={s} size={size} depth={depth} delay={delay} />
      ))}
    </div>
  )
}*/

export function Coursework() {
  const cs = [
    'CS 350: Algorithms & Complexity',
    'CS 486: Intro to Database Management Systems',
    'CS 302: Programming Methods and Software Implementation',
    'CS 314: Elementary Software Engineering',
    'CS 333: Intro to Operating Systems',
    'CS 163: Data Structures',
    'CS 201: Computer Systems Programming',
    'CS 250: Discrete Structures I',
    'CS 251: Discrete Structures II',
    'CS 305: Social, Ethical & Legal Implications of Computing',
    'CS 358: Principles of Programming Languages',
    'CS 410P: Joy of Coding - Java & Android',
    'CS 445: Machine Learning',
  ]
  const math = [
    'MTH 254: Calculus IV',
    'MTH 343: Applied Linear Algebra',
    'MTH 346: Number Theory',
    'MTH 410: Quantum Algorithms for Data Science and Machine Learning',
    'MTH 311: Intro to Math Analysis I',
    'MTH 344: Intro to Group Theory & Applications',
    'MTH 256: Applied Differential Equations',
    'MTH 255: Calculus V',
    'MTH 410: Quantum Algorithms for Data Science & ML II',
  ]
  return (
    <section id="coursework" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className={`title-bounce-anchor font-hand text-3xl sm:text-4xl md:text-5xl ${neonText} mb-4 sm:mb-6`}>Relevant Coursework</h2>
        {React.createElement(motion.div, { initial:{opacity:0, y:24}, whileInView:{opacity:1, y:0}, viewport:{once:true}, transition:{duration:0.5}}, (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Computer Science column */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold title-gradient mb-3">Computer Science</h3>
              <div className="flex flex-wrap gap-2">
                {cs.map((c, idx) => (
                  React.createElement(motion.span, {
                    key: c,
                    initial: { opacity: 0, y: 8, scale: 0.98 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.35, delay: idx * 0.05 },
                    className: 'course-chip chip-animate',
                    style: { '--chip-delay': `${idx * 0.12}s` }
                  }, <span className={`${idx % 4 === 0 ? 'chip-float' : ''}`}>{c}</span>)
                ))}
              </div>
            </div>
            {/* Mathematics column */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold title-gradient mb-3">Mathematics</h3>
              <div className="flex flex-wrap gap-2">
                {math.map((c, idx) => (
                  React.createElement(motion.span, {
                    key: c,
                    initial: { opacity: 0, y: 8, scale: 0.98 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.35, delay: idx * 0.05 },
                    className: 'course-chip chip-animate',
                    style: { '--chip-delay': `${idx * 0.12}s` }
                  }, <span className={`${idx % 5 === 0 ? 'chip-float' : ''}`}>{c}</span>)
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Awards() {
  const items = [
    { t:'Honors Laurels Scholarship', org:'Portland State University Honors College', date:'August 2023', desc:'Awarded the prestigious Honors Laurels Scholarship, recognizing outstanding academic performance and commitment to excellence.', icon: Medal },
    { t:'Tuition-Free Degree Award', org:'Portland State University Honors College', date:'August 2023', desc:'Provides a tuition-free education, granted for academic excellence and leadership potential.', icon: Trophy },
    { t:'National Honors Society Certificate', org:'National Honors Society', date:'November 2022', desc:'Recognized for exemplary academic achievement and community service.', icon: BadgeCheck },
    { t:"President’s List", org:'Portland Community College', date:'August 2022', desc:'Maintained a perfect academic record with exceptional discipline and dedication.', icon: Star },
    { t:"President’s List", org:'Portland Community College', date:'June 2022', desc:'Maintained academic excellence; recognized for outstanding performance.', icon: Star },
    { t:"Dean’s List", org:'Portland Community College', date:'April 2022', desc:'High GPA while balancing academic rigor and extracurriculars.', icon: Star },
  ]
  return (
    <section id="awards" className="relative py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <h2 className={`title-bounce-anchor font-hand text-3xl sm:text-4xl md:text-5xl ${neonText} mb-6`}>Awards</h2>
        {React.createElement(motion.div, { initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5}}, (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(({t, org, date, desc, icon:Icon}, idx)=> (
              <div key={`${t}-${idx}`} className="flex flex-col items-center text-center p-8 glass-card min-h-[280px]">
                <div className="mb-4">
                  {React.createElement(Icon, { className: 'w-10 h-10 neon-icon' })}
                </div>
                <h3 className="text-2xl font-bold leading-tight mb-1 title-gradient">{t}</h3>
                <div className="text-base font-medium mb-2 text-foreground">{org} · {date}</div>
                <p className="text-base text-foreground">{desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className={`relative overflow-hidden glass-card p-6`}>
          {/* Ambient glow ring */}
          <div className="pointer-events-none absolute -inset-24 opacity-30 blur-3xl" style={{ background:'radial-gradient(600px 400px at 80% 20%, rgba(231,76,60,0.15), transparent 60%), radial-gradient(500px 300px at 20% 80%, rgba(155,89,182,0.18), transparent 60%)' }} />
          <CardHeader className="relative">
            <CardTitle className="font-hand text-3xl title-gradient">Let’s build together</CardTitle>
            <CardDescription className="text-muted-foreground">Email, phone, and links — quick and simple.</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            {React.createElement(motion.div, { initial:{opacity:0,y:18}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5}}, (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {label:'Email', value:'hemenly@gmail.com', href:'mailto:hemenly@gmail.com', copy:true, icon:Mail, glow:'rgba(231,76,60,0.6)'},
                  {label:'LinkedIn', value:'linkedin.com/in/hemen-babis', href:'https://www.linkedin.com/in/hemen-babis', copy:false, icon:Linkedin, glow:'rgba(10,102,194,0.7)'},
                  {label:'Github', value:'github.com/hemen-babis', href:'https://github.com/hemen-babis', copy:false, icon:Github, glow:'rgba(155,89,182,0.6)'},
                ].map(({label,value,href,copy,icon:Icon,glow}, idx) => (
                  React.createElement(motion.a, {
                    key: label,
                    href,
                    target: href.startsWith('http') ? '_blank' : undefined,
                    rel: href.startsWith('http') ? 'noreferrer' : undefined,
                    onClick: async (e) => {
                      if (copy) {
                        e.preventDefault()
                        try {
                          await navigator.clipboard.writeText(value)
                          toast.success(`${label} copied to clipboard`)
                        } catch {
                          toast.error('Copy failed — try again')
                        }
                      }
                    },
                    className: 'group relative overflow-hidden glass-card p-4 flex items-center gap-3 transition hover:-translate-y-1',
                    whileHover: { boxShadow: `0 0 22px ${glow}` },
                    whileTap: { scale: 0.98 },
                  }, (
                    <>
                      <div className="relative">
                        <span className="absolute -inset-2 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition" style={{ background: glow }} />
                        {React.createElement(Icon, { className: 'relative w-6 h-6 neon-icon' })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
                        <div className="text-sm truncate">{value}</div>
                      </div>
                    </>
                  ))
                ))}
              </div>
            ))}
            
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className={`inline-flex items-center gap-2 px-4 py-2 btn-outline-purple`}
                onClick={(e)=>{
                  e.preventDefault();
                  fetch('/Hemen_Babis_Resume.pdf', { method: 'HEAD' })
                    .then(r=>{ if(r.ok) window.open('/Hemen_Babis_Resume.pdf','_blank'); else toast.error('Resume not available yet.') })
                    .catch(()=> toast.error('Resume not available yet.'))
                }}
              >
                <Share2 className="w-4 h-4"/> Resume
              </a>
            </div>
          </CardContent>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon(props){ return <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/></svg> }

function CourseBox({ title, items, className }){
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 50) // auto-drop with animation
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`course-box ${open ? 'show' : ''} ${className || ''}`}>
      <div
        className="cursor-pointer"
        onClick={()=>setOpen(v=>!v)}
        role="button"
        aria-expanded={open}
        aria-label={`${open ? 'Hide' : 'Show'} ${title}`}
      >
        <h3 className="course-header">{title}</h3>
        <small className="opacity-80">{open ? 'Hide' : 'Show'}</small>
      </div>
      <ul className="course-list">
        {items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

// ===== Main App =====
export default function App() {
  // Hero parallax (imperative, no React re-render) + independent skills flow
  const helixRef = useRef(null)
  const haloRef = useRef(null)
  useEffect(() => {
    let ticking = false
    const applyParallax = () => {
      const sy = window.scrollY || 0
      if (helixRef.current) helixRef.current.style.transform = `translateY(${(sy * -0.04).toFixed(2)}px)`
      if (haloRef.current) haloRef.current.style.transform = `translateY(${(sy * -0.03).toFixed(2)}px)`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(applyParallax)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    applyParallax()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`min-h-screen text-foreground ${nebula} relative overflow-x-hidden`}> 
      <ScrollProgressBar />
      <CursorGlow />
      <GlobalParticles />
      <FloatingThemeToggle />
      <Toaster richColors position="top-center" />
      {/* Background gradient handled globally; removed extra blobs for consistency */}

      {/* Nav is provided by page layout */}

      {/* Hero */}
      <section className="relative pt-0">
        {/* DNA Helix 3D Canvas layered in front of background */}
        <div className="relative w-full h-screen min-h-[520px] overflow-hidden">
          <div ref={helixRef} className="absolute inset-0 z-10 will-change-transform">
            <HelixScene />
          </div>
          {/* Halo + vignette + subtle center scrim to keep text readable */}
          <div ref={haloRef} className="pointer-events-none absolute inset-0 z-[15] will-change-transform" style={{ transform: "translateY(0px)" }}>
            {/* Light mode: very subtle halo; Dark mode: stronger */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(168,85,247,0.06),transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_50%_45%,rgba(168,85,247,0.14),transparent_60%)]" />
            {/* Center and edge scrims only in dark mode to aid contrast */}
            <div className="hidden dark:block absolute inset-0" style={{ background: 'radial-gradient(44% 36% at 50% 48%, rgba(0,0,0,0.26), transparent 80%)' }} />
            <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.42)_100%)]" />
          </div>
          {/* Background particles for depth */}
          <MoleculesOverlay count={4} />

          

          {/* Floating skill/facts overlay (classic flow with fade) */}
          <div className="absolute inset-0 z-30">
            {(() => {
              const facts = [
                'She/Her',
                'Applied AI/ML Intern — VLMs',
                'Gen AI Engineer',
                'CS + Math @ PSU Honors (GPA 3.8)',
                'Freelancer — Web + Visual',
                'San Francisco, CA ↔ Portland, OR',
                '1,783 followers · 500+ connections',
                'Open to SWE / AI / Data internships',
                'Amharic & English',
                'Honors Laurels Scholarship (PSU Honors)',
                'Tuition‑Free Degree Award (PSU Honors)',
                'Rewriting the Code member',
                'American Red Cross — Supervisor (alum)',
                'Social Media Manager — John’s Repentance',
              ]
              const groups = [
                { label: 'Fun facts', icon: Sparkles, items: facts },
              ];
              return <HeroSkillsFlowLanes groups={groups} lanes={3} perLane={3} speed={0.09} />;
            })()}
          </div>

          {/* Photo lives in navbar next to the name */}

          {/* Accent molecules removed to keep hero clean */}
        </div>

        {/* Intro split: Left (name + buttons), Right (photo above About) */}
        <div className="mx-auto w-full px-4 sm:px-6 mt-8 sm:mt-10 relative z-20 grid md:grid-cols-2 gap-8 items-start">
          {/* Floating symbols removed per request */}
          <div className="relative">
            {/* Subtle dots background just behind the name area */}
            <div className="absolute inset-0 -z-10 dots-bg opacity-70" />
            <div className="inline-block rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-lg px-4 py-4 sm:px-5 sm:py-5 shadow-[0_6px_24px_rgba(0,0,0,0.15)] border border-white/60 dark:border-white/20">
              <h1 className={`font-hand font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight ${neonText} title-stroke shimmer-text`} style={{ textShadow: '0 1px 8px rgba(0,0,0,0.45), 0 0 18px rgba(169,112,255,0.35)' }}>Hemen — AI/ML, CS, Math, Bioinformatics</h1>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a href="#projects"><Button className="btn-primary-purple w-full sm:w-auto hover-ring">See Work</Button></a>
                <a href="https://www.linkedin.com/in/hemen-babis" target="_blank" rel="noreferrer"><Button className="btn-outline-purple w-full sm:w-auto hover-ring">Hire Me</Button></a>
              </div>
              <FunFactsTicker facts={[
                'She/Her',
                'Applied AI/ML Intern',
                'Gen AI Engineer',
                'CS + Math @ PSU Honors (GPA 3.8)',
                'Freelancer — Web + Visual',
                'Amharic + English',
                'Portland ↔ SF',
                '1,783 followers · 500+ connections',
                'Open to SWE/AI/Data internships',
              ]} />
            </div>
            {/* removed floating keywords per revert */}
          </div>
          <div className="relative">
            <div className="mb-4 flex justify-end pr-6 sm:pr-10">
              <img
                src="/me.jpg"
                alt="Hemen photo"
                className="relative w-96 sm:w-[32rem] h-auto object-cover"
              />
            </div>
            {/* In-hero About to the right (under photo) */}
            <div className="relative">
              <div className="p-5 glass-card">
               <h2 className={`title-bounce-anchor font-hand text-2xl mb-2 title-gradient`}>About</h2>
               <p className="text-base text-foreground whitespace-pre-wrap">{about}</p>
              </div>
            </div>
          </div>
          {/* Articles/About dock: inline on mobile, pinned on tablet+ */}
          <div className="relative sm:absolute sm:left-6 md:left-10 lg:left-14 sm:bottom-0 left-0 p-4 rounded-lg glass-card w-fit mt-4 sm:mt-0">
            <div className="flex items-center justify-center gap-5 text-center">
              <a href="/articles" className="group flex flex-col items-center justify-center px-4 py-3 rounded-md hover:bg-white/10 transition">
                <FileText className="w-9 h-9 neon-icon transition-transform group-hover:scale-110" />
                <span className="mt-1 text-sm font-semibold title-gradient">Articles</span>
              </a>
              <a href="/about" className="group flex flex-col items-center justify-center px-4 py-3 rounded-md hover:bg-white/10 transition">
                <User className="w-9 h-9 neon-icon transition-transform group-hover:scale-110" />
                <span className="mt-1 text-sm font-semibold title-gradient">About Me</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* About section removed (content shown in-hero on the right) */}

      {/* Skills */}
      <Skills />

      {/* Projects (scroll-triggered animation) */}
      <Projects />

      {/* Experience and Education (animated) */}
      {React.createElement(motion.div, { initial:{opacity:0,y:20}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5}}, <Experience />)}
      {React.createElement(motion.div, { initial:{opacity:0,y:20}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5, delay:0.05}}, <Education />)}
      {React.createElement(motion.div, { initial:{opacity:0,y:20}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5, delay:0.1}}, <Coursework />)}
      {React.createElement(motion.div, { initial:{opacity:0,y:20}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5, delay:0.15}}, <Awards />)}
      <Recommendations />
      <Testimonials />
      <Contact />

      {/* Footer is provided by page layout */}
    </div>
  );
}
function ResponsiveHelix() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onR = () => setW(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  // Map viewport width to helix parameters
  // Larger helix across the banner
  const length = w < 480 ? 16.0 : w < 1024 ? 20.0 : 24.0;
  const radius = w < 480 ? 1.4 : w < 1024 ? 1.6 : 1.8;
  const count = w < 480 ? 700 : w < 1024 ? 900 : 1100;
  return <DNAHelix length={length} radius={radius} count={count} />;
}

function MoleculesOverlay({ count = 4 }) {
  const tRef = useRef(0);
  const [, setTick] = useState(0);
  useEffect(() => {
    let raf;
    const step = () => { tRef.current += 0.01; setTick((v)=> (v+1)%1e6); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  const t = tRef.current;
  const dots = Array.from({ length: count }).map((_, i) => {
    const a = t * (0.1 + i * 0.02) + i * (Math.PI * 0.6);
    const rx = 160 + i * 10;
    const ry = 90 + i * 8;
    const x = Math.cos(a) * rx;
    const y = Math.sin(a) * ry * 0.9;
    return { i, x, y };
  });
  return (
    <div className="pointer-events-none absolute inset-0 z-[13]">
      {dots.map(({ i, x, y }) => (
        <div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
             style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
          <div className="w-2.5 h-2.5 rounded-full bg-pink-400/70 shadow-[0_0_16px_rgba(255,105,180,0.45)]" />
        </div>
      ))}
    </div>
  );
}

// Removed CenterLogo per design feedback

// Removed old HeroSkillsBoard implementation (unused)

function HeroSkillsSpotlight({ groups, intervalMs = 2000 }) {
  const pool = useMemo(() => {
    const arr = [];
    groups.forEach(g => {
      (g.items || []).forEach(t => arr.push({ title: t, icon: g.icon, cat: g.label }));
    });
    return arr;
  }, [groups]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  useEffect(() => {
    if (!pool.length) return;
    const id = setInterval(() => {
      setI((v) => (v + 1) % pool.length);
      setJ((v) => (v + 1) % pool.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [pool.length, intervalMs]);
  const a = pool[i];
  const b = pool.length > 1 ? pool[j] : null;

  const CardSpot = ({ item, delay = 0 }) => {
    if (!item) return null;
    const Icon = item.icon;
    return (
      React.createElement(motion.div, {
        key: item.title + delay,
        initial: { opacity: 0, y: 12, filter: 'blur(8px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -12, filter: 'blur(10px)' },
        transition: { duration: 0.35, delay: delay },
        className: `pointer-events-auto ${glass} dark:bg-black/80 bg-black/70 ring-1 ring-pink-400/20 backdrop-blur-sm px-4 py-2.5 rounded-2xl w-[260px] border border-white/15 shadow-[0_6px_28px_rgba(255,105,180,0.18)] text-white`
      },
        <div className="flex items-center gap-2.5">
          {Icon ? React.createElement(Icon, { className: 'w-5 h-5 text-pink-200' }) : null}
          <span className="text-[15px] font-semibold truncate tracking-tight">{item.title}</span>
        </div>
      )
    );
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-10">
      <div className="flex flex-col sm:flex-row gap-3">
        <CardSpot item={a} />
        <CardSpot item={b} delay={0.12} />
      </div>
    </div>
  );
}

function HeroSkillsTicker({ groups, visible = 3, stepMs = 1600 }) {
  const pool = useMemo(() => {
    const arr = [];
    groups.forEach(g => (g.items || []).forEach(t => arr.push({ title: t, icon: g.icon, cat: g.label })));
    return arr;
  }, [groups]);
  const [cursor, setCursor] = useState(0);
  const [items, setItems] = useState(() => pool.slice(0, visible).map((it, idx) => ({ ...it, _id: `${Date.now()}-${idx}` })));

  useEffect(() => {
    if (!pool.length) return;
    const id = setInterval(() => {
      setItems((prev) => {
        const active = new Set(prev.map(p => p.title));
        // find next unique item that isn't currently shown
        let nextIdx = cursor;
        let next;
        for (let tries = 0; tries < pool.length; tries++) {
          const cand = pool[nextIdx % pool.length];
          nextIdx++;
          if (!active.has(cand.title)) { next = cand; break; }
        }
        if (!next) next = pool[(cursor + 1) % pool.length];
        setCursor(nextIdx);
        const sliced = prev.slice(1);
        return [...sliced, { ...next, _id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }];
      });
    }, stepMs);
    return () => clearInterval(id);
  }, [pool, stepMs, cursor]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 flex items-end justify-center">
      <div className="pointer-events-auto flex flex-row gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((it, i) => {
            const Icon = it.icon;
            const palettes = [
              'from-pink-500/30 to-fuchsia-500/30 ring-pink-400/30',
              'from-amber-500/30 to-orange-500/30 ring-amber-400/30',
      'from-violet-500/30 to-fuchsia-500/30 ring-violet-400/30',
              'from-emerald-500/30 to-teal-500/30 ring-emerald-400/30',
            ];
            const pc = palettes[i % palettes.length];
            return (
              <motion.div
                key={it._id}
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(10px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className={`transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${pc} ring-1 px-3.5 py-2.5 rounded-2xl w-[240px] border border-white/10 shadow-[0_0_20px_rgba(255,105,180,0.25)] text-slate-900 dark:text-white`}
                     title={it.cat}
                >
                  <div className="flex items-center gap-2.5" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>
                    {Icon ? React.createElement(Icon, { className: 'w-5 h-5 text-slate-800 dark:text-white/90' }) : null}
                    <span className="text-[15px] font-extrabold truncate tracking-tight">{it.title}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScrollProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const ratio = max > 0 ? (h.scrollTop / max) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${ratio})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100]">
      <div ref={ref} className="h-full origin-left" style={{ background: 'linear-gradient(90deg,#9B59B6,#E74C3C,#F1C40F)', transform: 'scaleX(0)' }} />
    </div>
  )
}

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    let x = window.innerWidth/2, y = window.innerHeight/2
    let tx = x, ty = y
    let raf
    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      if (ref.current) ref.current.style.transform = `translate(${x-150}px, ${y-150}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div ref={ref} className="pointer-events-none fixed z-[90] w-[300px] h-[300px] rounded-full" style={{ filter:'blur(60px)', background:'radial-gradient(circle, rgba(231,76,60,0.18) 0%, rgba(155,89,182,0.16) 40%, transparent 70%)' }} />
  )
}

function GlobalParticles({ count=8 }){
  const [tick, setTick] = useState(0)
  const parts = useRef([])
  useEffect(()=>{
    const arr = Array.from({length:count}).map(()=>({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      a: Math.random()*Math.PI*2,
      s: 0.2 + Math.random()*0.4,
    }))
    parts.current = arr
    let raf
    const loop = () => { setTick(v=>(v+1)%1e6); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return ()=> cancelAnimationFrame(raf)
  },[count])
  const t = tick
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {parts.current.map((p,i)=>{
        const x = p.x + Math.sin((t*0.01+p.a)*p.s)*30
        const y = p.y + Math.cos((t*0.008+p.a)*p.s)*20
        return (
          <div key={i} className="absolute w-2 h-2 rounded-full" style={{ left:x, top:y, background:'rgba(255,255,255,0.12)', boxShadow:'0 0 16px rgba(231,76,60,0.25)' }} />
        )
      })}
    </div>
  )
}

function HeroSkillsFlowLanes({ groups, lanes = 3, perLane = 2, speed = 0.08 }) {
  const dims = useRef({ w: typeof window !== 'undefined' ? window.innerWidth : 1200, h: typeof window !== 'undefined' ? window.innerHeight : 800 })
  useEffect(() => {
    const onR = () => (dims.current = { w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])

  const pool = useMemo(() => {
    const arr = []
    groups.forEach(g => (g.items || []).forEach(t => arr.push({ title: t, icon: g.icon, cat: g.label })))
    return arr
  }, [groups])

  // Create lanes with items
  const lanesRef = useRef([])
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!pool.length) return
    const now = Date.now()
    const active = new Set()
    lanesRef.current = Array.from({ length: lanes }).map((_, li) => {
      const items = []
      for (let k = 0; k < perLane; k++) {
        let pick
        for (let tries = 0; tries < pool.length; tries++) {
          const cand = pool[Math.floor(Math.random() * pool.length)]
          if (!active.has(cand.title)) { pick = cand; active.add(cand.title); break }
        }
        if (!pick) pick = pool[Math.floor(Math.random() * pool.length)]
        // t in [0,1], spread across lane
        items.push({
          key: `${now}-${li}-${k}-${Math.random().toString(36).slice(2)}`,
          item: pick,
          t: (k / perLane) * 0.9, // stagger along the path
          dir: li % 2 === 0 ? 1 : -1, // alternate directions per lane
          s: speed, // consistent timing across items
        })
      }
      return { items, li }
    })
  }, [pool, lanes, perLane, speed])

  useEffect(() => {
    let raf
    const loop = () => {
      const W = Math.max(800, dims.current.w)
      // advance items along lanes with consistent timing
      lanesRef.current.forEach((lane, li) => {
        const minGap = dims.current.w < 640 ? 0.32 : 0.22 // wider spacing on small screens
        lane.items.sort((a,b)=>a.t-b.t)
        for (let i=0;i<lane.items.length;i++){
          const it = lane.items[i]
          // constant step for smooth, consistent flow
          const dt = it.s * 0.0055
          it.t += dt * it.dir
          // spacing (repel) within lane
          if (i>0){
            const prev = lane.items[i-1]
            if (it.t - prev.t < minGap) it.t = prev.t + minGap
          }
          // recycle at ends with unique pick
          if (it.t > 1.05 || it.t < -0.05){
            it.t = it.dir>0 ? -0.02 : 1.02
            // choose unique across all lanes
            const shown = new Set()
            lanesRef.current.forEach(L=>L.items.forEach(p=>shown.add(p.item.title)))
            let pick
            for (let tries=0; tries<pool.length; tries++){
              const cand = pool[Math.floor(Math.random()*pool.length)]
              if (!shown.has(cand.title)){ pick = cand; break }
            }
            if (!pick) pick = pool[Math.floor(Math.random()*pool.length)]
            it.item = pick
          }
        }
      })
      setTick(v => (v+1)%1e6)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [pool])

  const renderItem = (li, it) => {
    const W = Math.max(800, dims.current.w)
    const sep = dims.current.w < 640 ? 170 : 140
    const offsetY = dims.current.w < 640 ? -90 : -120 // lift lanes so some cross near top of image
    const laneY = offsetY + (li - (lanes-1)/2) * sep
    // path: larger arc across hero to reach further sides
    const x = (it.t - 0.5) * (W * 0.9)
    const arc = Math.sin(it.t * Math.PI) * 28 + Math.sin(it.t * 6.28 + li * 0.6) * 8
    const y = laneY + arc
    const phase = it.dir>0 ? it.t : 1 - it.t
    const clarity = phase < 0.15 ? (phase/0.15) : phase > 0.85 ? (1 - (phase-0.85)/0.15) : 1
    const scale = dims.current.w < 640 ? 1 : 1.05 + Math.sin(it.t * Math.PI) * 0.08
    const Icon = it.item.icon
    const palettes = [
      'from-pink-500/30 to-fuchsia-500/30 ring-pink-400/30',
      'from-amber-500/30 to-orange-500/30 ring-amber-400/30',
      'from-violet-500/30 to-fuchsia-500/30 ring-violet-400/30',
      'from-emerald-500/30 to-teal-500/30 ring-emerald-400/30',
    ]
    const pc = palettes[li % palettes.length]
    return (
      <div key={it.key} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
           style={{ transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale.toFixed(3)})`, opacity: clarity }}>
        <div className={`transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${pc} ring-1 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl w-[230px] sm:w-[280px] border border-white/10 shadow-[0_0_24px_rgba(169,112,255,0.3)] text-slate-900 dark:text-white neon-breath hue-cycle`}
             title={it.item.cat}>
          <div className="flex items-center gap-2 sm:gap-3" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>
            {Icon ? React.createElement(Icon, { className: 'w-5 h-5 sm:w-6 sm:h-6 text-slate-800 dark:text-white/90' }) : null}
            <span className="text-[14px] sm:text-[16px] font-extrabold truncate tracking-tight">{it.item.title}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {lanesRef.current.map((lane) => lane.items.map(it => renderItem(lane.li, it)))}
    </div>
  )
}

function HeroSkillsDrops({ groups, maxActive = 10, spawnMs = 650, riseSpeed = 0.25 }) {
  const pool = useMemo(() => {
    const out = []
    groups.forEach(g => (g.items || []).forEach(t => out.push({ title: t, icon: g.icon, cat: g.label })))
    return out
  }, [groups])

  const activeRef = useRef([])
  const [, setTick] = useState(0)

  // spawn timer
  useEffect(() => {
    const id = setInterval(() => {
      if (!pool.length) return
      // dedupe: skip if too many
      if (activeRef.current.length >= maxActive) return
      const shown = new Set(activeRef.current.map(d => d.item.title))
      let pick
      for (let tries = 0; tries < pool.length; tries++) {
        const cand = pool[Math.floor(Math.random() * pool.length)]
        if (!shown.has(cand.title)) { pick = cand; break }
      }
      if (!pick) pick = pool[Math.floor(Math.random() * pool.length)]
      const now = Date.now()
      // choose a source: top, bottom, left, right
      const sources = ['bottom','top','left','right']
      const source = sources[Math.floor(Math.random()*sources.length)]
      const columns = [-220, -120, 0, 120, 220]
      const col = columns[Math.floor(Math.random() * columns.length)]
      const rand = (a,b)=> a + Math.random()*(b-a)
      activeRef.current.push({
        key: `${now}-${Math.random().toString(36).slice(2)}`,
        item: pick,
        t: 0,
        source,
        x0: source==='left' ? -280 + rand(-20,20) : source==='right' ? 280 + rand(-20,20) : col + rand(-18,18),
        y0: source==='top' ? -220 + rand(-30,30) : source==='bottom' ? 200 + rand(-30,30) : rand(-120,120),
        jitter: (Math.random()-0.5)*0.5,
        s: riseSpeed * (0.9 + Math.random()*0.3),
      })
    }, spawnMs)
    return () => clearInterval(id)
  }, [pool, maxActive, spawnMs, riseSpeed])

  // animate
  useEffect(() => {
    let raf
    const loop = () => {
      const arr = activeRef.current
      for (let i=arr.length-1;i>=0;i--){
        const d = arr[i]
        d.t += d.s * 0.012
        if (d.t >= 1.02) { arr.splice(i,1); continue }
      }
      setTick(v => (v+1)%1e6)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const renderDrop = (d, idx) => {
    // paths by source
    let px, py
    if (d.source === 'top' || d.source === 'bottom') {
      const dirY = d.source === 'top' ? 1 : -1
      px = d.x0 + Math.sin(d.t * Math.PI) * 28 + Math.sin(d.t * 6.28 + d.jitter) * 8
      py = d.y0 + dirY * d.t * 380
    } else {
      const dirX = d.source === 'left' ? 1 : -1
      px = d.x0 + dirX * d.t * 520 + Math.sin(d.t * 6.28 + d.jitter) * 8
      py = d.y0 + Math.sin(d.t * Math.PI) * 20
    }
    const phase = d.t
    const opacity = phase < 0.15 ? (phase/0.15) : phase > 0.85 ? 1 - (phase-0.85)/0.15 : 1
    const scale = 1.03 + Math.min(1, phase*1.2) * 0.08
    const Icon = d.item.icon
    const palettes = [
      'from-pink-500/30 to-fuchsia-500/30 ring-pink-400/30',
      'from-amber-500/30 to-orange-500/30 ring-amber-400/30',
      'from-violet-500/30 to-fuchsia-500/30 ring-violet-400/30',
      'from-emerald-500/30 to-teal-500/30 ring-emerald-400/30',
    ]
    const pc = palettes[idx % palettes.length]
    return (
      <div key={d.key} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
           style={{ transform:`translate(calc(-50% + ${px}px), calc(-50% + ${py}px)) scale(${scale})`, opacity }}>
        <div className={`transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${pc} ring-1 px-4 py-3 rounded-2xl w-[280px] border border-white/10 shadow-[0_0_24px_rgba(169,112,255,0.3)] text-slate-900 dark:text-white`}
             title={d.item.cat}>
          <div className="flex items-center gap-3" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>
            {Icon ? React.createElement(Icon, { className: 'w-6 h-6 text-slate-800 dark:text-white/90' }) : null}
            <span className="text-[16px] font-extrabold truncate tracking-tight">{d.item.title}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {activeRef.current.map((d, idx) => renderDrop(d, idx))}
    </div>
  )
}

// Clean fade carousel for skills — 1-2 visible, center aligned
function HeroSkillsFadeCarousel({ groups, concurrent = 2, duration = 3000 }) {
  const pool = useMemo(() => {
    const out = []
    groups.forEach(g => (g.items || []).forEach(t => out.push({ title: t, icon: g.icon, cat: g.label })))
    return out
  }, [groups])

  const [i, setI] = useState(0)
  useEffect(() => {
    if (!pool.length) return
    const id = setInterval(() => setI(v => (v + concurrent) % pool.length), duration)
    return () => clearInterval(id)
  }, [pool.length, concurrent, duration])

  const visible = []
  for (let k = 0; k < Math.min(concurrent, pool.length); k++) {
    visible.push(pool[(i + k) % pool.length])
  }

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <AnimatePresence>
          {visible.map((it, idx) => {
            const Icon = it.icon
            return (
              <motion.div key={`${it.title}-${i}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.6 }}
                className="pointer-events-auto">
                <div className="rounded-2xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/10 backdrop-blur-sm text-slate-900 dark:text-white px-4 py-2 shadow-[0_0_18px_rgba(169,112,255,0.25)]">
                  <div className="flex items-center gap-2.5" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}>
                    {Icon ? React.createElement(Icon, { className: 'w-5 h-5 text-slate-800 dark:text-white/90' }) : null}
                    <span className="text-[15px] font-extrabold tracking-tight">{it.title}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
