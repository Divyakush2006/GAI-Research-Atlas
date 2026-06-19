import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Network, Lock } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'topic' | 'category' | 'item';
  angle: number;
  pulseOffset: number;
}

interface Edge {
  from: string;
  to: string;
}

function buildGraph(topic: string): { nodes: Node[]; edges: Edge[] } {
  const cx = 0.5;
  const cy = 0.5;

  const categories = ['Papers', 'Repositories', 'Resources', 'Models', 'Datasets'];
  const catRadius = 0.28;
  const itemRadius = 0.42;

  const nodes: Node[] = [
    { id: 'topic', label: topic, x: cx, y: cy, type: 'topic', angle: 0, pulseOffset: 0 },
  ];
  const edges: Edge[] = [];

  const angleStep = (2 * Math.PI) / categories.length;
  categories.forEach((cat, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const catId = `cat-${i}`;
    nodes.push({
      id: catId,
      label: cat,
      x: cx + catRadius * Math.cos(angle),
      y: cy + catRadius * Math.sin(angle),
      type: 'category',
      angle,
      pulseOffset: i * 0.3,
    });
    edges.push({ from: 'topic', to: catId });

    // 2 items per category
    for (let j = 0; j < 2; j++) {
      const spread = 0.18;
      const itemAngle = angle + (j - 0.5) * spread;
      const itemId = `item-${i}-${j}`;
      nodes.push({
        id: itemId,
        label: '',
        x: cx + itemRadius * Math.cos(itemAngle),
        y: cy + itemRadius * Math.sin(itemAngle),
        type: 'item',
        angle: itemAngle,
        pulseOffset: i * 0.3 + j * 0.15,
      });
      edges.push({ from: catId, to: itemId });
    }
  });

  return { nodes, edges };
}

interface KnowledgeGraphPlaceholderProps {
  topic: string;
}

export function KnowledgeGraphPlaceholder({ topic }: KnowledgeGraphPlaceholderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [hovered, setHovered] = useState<string | null>(null);

  const { nodes, edges } = buildGraph(topic);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const getPos = (node: Node) => ({
      x: node.x * canvas.offsetWidth,
      y: node.y * canvas.offsetHeight,
    });

    const draw = (timestamp: number) => {
      timeRef.current = timestamp / 1000;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw edges
      edges.forEach((edge) => {
        const from = nodes.find((n) => n.id === edge.from)!;
        const to = nodes.find((n) => n.id === edge.to)!;
        const fp = getPos(from);
        const tp = getPos(to);

        ctx.beginPath();
        ctx.moveTo(fp.x, fp.y);
        ctx.lineTo(tp.x, tp.y);

        const alpha = 0.12 + 0.06 * Math.sin(t * 1.2 + from.pulseOffset);
        ctx.strokeStyle = `rgba(241,106,36,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animated dot along edge
        const progress = (t * 0.4 + from.pulseOffset) % 1;
        const dotX = fp.x + (tp.x - fp.x) * progress;
        const dotY = fp.y + (tp.y - fp.y) * progress;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,106,36,0.5)`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pos = getPos(node);
        const pulse = Math.sin(t * 1.5 + node.pulseOffset) * 0.5 + 0.5;

        if (node.type === 'topic') {
          // Outer glow ring
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 30 + pulse * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241,106,36,${0.06 + pulse * 0.04})`;
          ctx.fill();

          // Main circle
          const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 22);
          grad.addColorStop(0, '#F16A24');
          grad.addColorStop(1, '#F16A24');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Label
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 9px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const words = node.label.split(' ');
          if (words.length === 1) {
            ctx.fillText(node.label, pos.x, pos.y);
          } else {
            ctx.fillText(words[0], pos.x, pos.y - 6);
            ctx.fillText(words.slice(1).join(' '), pos.x, pos.y + 6);
          }
        } else if (node.type === 'category') {
          // Glow
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 16 + pulse * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241,106,36,${0.08 + pulse * 0.04})`;
          ctx.fill();

          // Circle
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#F16A24';
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();

          // Label
          ctx.fillStyle = '#F16A24';
          ctx.font = 'bold 8px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, pos.x, pos.y);
        } else {
          // Item dot
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 5 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241,106,36,${0.1 + pulse * 0.08})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#E8E3DC';
          ctx.strokeStyle = '#F5D4C0';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [topic]);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E3DC] overflow-hidden">
      <div className="p-5 border-b border-[#F0EDE8] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: '#FFF4EC' }}
          >
            <Network className="w-4 h-4" style={{ color: '#F16A24' }} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#0D0D0D]">Knowledge Graph</h3>
            <p className="text-xs text-[#7A7169]">Research relationship map</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E3DC] bg-[#F7F4F0]">
          <Lock className="w-3 h-3 text-[#7A7169]" />
          <span className="text-xs font-medium text-[#7A7169]">Full version coming soon</span>
        </div>
      </div>

      <div className="relative" style={{ height: 380 }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseMove={() => setHovered(null)}
        />

        {/* Coming soon overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5D4C0] bg-white/90"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: '#F16A24' }}
            />
            <span className="text-xs font-medium text-[#3D3730]">
              Interactive graph visualization — backend integration in progress
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
