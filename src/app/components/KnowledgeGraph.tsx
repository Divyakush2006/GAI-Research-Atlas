import { useEffect, useRef, useCallback, useState } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type { GraphData, GraphNode, GraphEdge } from '../types/atlas';

const NODE_COLORS: Record<string, string> = {
  topic: '#F16A24',
  paper: '#3B82F6',
  repository: '#22C55E',
  dataset: '#A855F7',
  model: '#14B8A6',
};

const EDGE_COLORS: Record<string, string> = {
  contains: '#F16A24',
  implemented_by: '#22C55E',
  uses: '#A855F7',
  model: '#14B8A6',
};

const NODE_RADIUS: Record<string, number> = {
  topic: 28,
  paper: 10,
  repository: 10,
  dataset: 8,
  model: 8,
};

interface ForceNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
  radius: number;
}

interface ForceEdge extends GraphEdge {
  source: ForceNode;
  target: ForceNode;
}

interface KnowledgeGraphProps {
  topic: string;
  data: GraphData;
}

export function KnowledgeGraph({ topic, data }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<ForceNode[]>([]);
  const edgesRef = useRef<ForceEdge[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, down: false, dragNode: null as ForceNode | null, offsetX: 0, offsetY: 0 });
  const hoverRef = useRef<ForceNode | null>(null);
  const viewRef = useRef({ x: 0, y: 0, scale: 1 });
  const timeRef = useRef(0);

  const [hoveredNode, setHoveredNode] = useState<ForceNode | null>(null);
  const [_, forceUpdate] = useState(0);

  // Initialize force layout
  useEffect(() => {
    const nodes: ForceNode[] = data.nodes.map((n) => ({
      ...n,
      x: Math.random() * 600 - 300,
      y: Math.random() * 600 - 300,
      vx: 0,
      vy: 0,
      radius: NODE_RADIUS[n.type] ?? 8,
    }));

    const nodeMap = new Map<string, ForceNode>();
    nodes.forEach((n) => nodeMap.set(n.id, n));

    const center = nodes.find((n) => n.type === 'topic');
    if (center) {
      center.x = 0;
      center.y = 0;
      center.fx = 0;
      center.fy = 0;
    }

    const edges: ForceEdge[] = data.edges
      .filter((e) => nodeMap.has(e.source) && nodeMap.has(e.target))
      .map((e) => ({
        ...e,
        source: nodeMap.get(e.source)!,
        target: nodeMap.get(e.target)!,
      }));

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, [data]);

  // Force simulation
  const simulate = useCallback(() => {
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    const center = nodes.find((n) => n.type === 'topic');
    const centerX = center?.x ?? 0;
    const centerY = center?.y ?? 0;

    const repulsionStrength = 8000;
    const attractionStrength = 0.005;
    const centeringStrength = 0.01;
    const damping = 0.85;
    const minVelocity = 0.01;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = repulsionStrength / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        if (!a.fx) { a.vx -= fx; a.vy -= fy }
        if (!b.fx) { b.vx += fx; b.vy += fy }
      }
    }

    for (const edge of edges) {
      const dx = edge.target.x - edge.source.x;
      const dy = edge.target.y - edge.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = dist * attractionStrength;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      if (!edge.source.fx) { edge.source.vx += fx; edge.source.vy += fy }
      if (!edge.target.fx) { edge.target.vx -= fx; edge.target.vy -= fy }
    }

    for (const node of nodes) {
      if (!node.fx) {
        node.vx += (centerX - node.x) * centeringStrength;
        node.vy += (centerY - node.y) * centeringStrength;
      }
    }

    let totalMovement = 0;
    for (const node of nodes) {
      if (!node.fx) {
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
        totalMovement += Math.abs(node.vx) + Math.abs(node.vy);
      }
    }

    return totalMovement > minVelocity;
  }, []);

  // Render
  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current = timestamp / 1000;
    const t = timeRef.current;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const { x: vx, y: vy, scale } = viewRef.current;

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#F7F4F0';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#E8E3DC';
    const gridSize = 40 * scale;
    const offsetX = (vx % gridSize + gridSize) % gridSize;
    const offsetY = (vy % gridSize + gridSize) % gridSize;
    for (let gx = offsetX; gx < W; gx += gridSize) {
      for (let gy = offsetY; gy < H; gy += gridSize) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(scale, scale);
    ctx.translate(vx / scale, vy / scale);

    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    const hovered = hoverRef.current;

    const connectedIds = new Set<string>();
    if (hovered) {
      connectedIds.add(hovered.id);
      for (const edge of edges) {
        if (edge.source.id === hovered.id) connectedIds.add(edge.target.id);
        if (edge.target.id === hovered.id) connectedIds.add(edge.source.id);
      }
    }

    for (const edge of edges) {
      const sx = edge.source.x;
      const sy = edge.source.y;
      const tx = edge.target.x;
      const ty = edge.target.y;

      const isConnected = !hovered || connectedIds.has(edge.source.id) && connectedIds.has(edge.target.id);
      const alpha = isConnected ? 0.4 : 0.06;

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = (EDGE_COLORS[edge.relation] ?? '#B0A99F') + Math.round(alpha * 255).toString(16).padStart(2, '0');
      ctx.lineWidth = isConnected ? 1.5 : 0.5;
      ctx.stroke();

      if (isConnected && scale > 0.6) {
        const mx = (sx + tx) / 2;
        const my = (sy + ty) / 2;
        ctx.fillStyle = `rgba(61,55,48,${alpha * 0.8})`;
        ctx.font = '8px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(edge.relation, mx, my - 4);
      }

      if (isConnected) {
        const progress = (t * 0.3 + (edge.source.x + edge.source.y) * 0.01) % 1;
        const dx = sx + (tx - sx) * progress;
        const dy = sy + (ty - sy) * progress;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = (EDGE_COLORS[edge.relation] ?? '#F16A24') + '80';
        ctx.fill();
      }
    }

    for (const node of nodes) {
      const isHovered = hovered?.id === node.id;
      const isConnected = !hovered || connectedIds.has(node.id);
      const pulse = Math.sin(t * 2 + (node.x + node.y) * 0.05) * 0.3 + 0.7;
      const alpha = isConnected ? 1 : 0.15;
      const radius = node.radius;

      if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 10 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = (NODE_COLORS[node.type] ?? '#F16A24') + '20';
        ctx.fill();
      }

      const color = NODE_COLORS[node.type] ?? '#7A7169';
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

      if (node.type === 'topic') {
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, color);
        ctx.fillStyle = grad;
        ctx.fill();
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (node.type !== 'topic') {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (node.type === 'topic' || (isConnected && scale > 0.5)) {
        const labelSize = node.type === 'topic' ? 9 : 7;
        const labelY = node.type === 'topic' ? node.y + radius + 14 : node.y + radius + 10;

        ctx.fillStyle = isHovered ? '#F16A24' : (isConnected ? '#3D3730' : '#D5CFC6');
        ctx.font = `${node.type === 'topic' ? 'bold ' : ''}${labelSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        if (node.type === 'topic') {
          const words = node.label.split(' ');
          if (words.length <= 2) {
            ctx.fillText(node.label, node.x, labelY);
          } else {
            const mid = Math.ceil(words.length / 2);
            ctx.fillText(words.slice(0, mid).join(' '), node.x, labelY);
            ctx.fillText(words.slice(mid).join(' '), node.x, labelY + 12);
          }
        } else {
          const text = node.label.length > 30 ? node.label.slice(0, 28) + '...' : node.label;
          ctx.fillText(text, node.x, labelY);
        }
      }
    }

    ctx.restore();
  }, []);

  // Animation loop
  useEffect(() => {
    let running = true;
    let settled = false;

    const loop = (timestamp: number) => {
      if (!running) return;
      if (!settled) {
        settled = !simulate();
      }
      render(timestamp);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [simulate, render]);

  const getCanvasPoint = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const { x: vx, y: vy, scale } = viewRef.current;
    return {
      x: (px - rect.width / 2) / scale - vx / scale,
      y: (py - rect.height / 2) / scale - vy / scale,
    };
  }, []);

  const findNode = useCallback((x: number, y: number) => {
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = n.x - x;
      const dy = n.y - y;
      if (dx * dx + dy * dy <= (n.radius + 6) * (n.radius + 6)) {
        return n;
      }
    }
    return null;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const pt = getCanvasPoint(e.clientX, e.clientY);
    const node = findNode(pt.x, pt.y);
    if (node) {
      mouseRef.current.dragNode = node;
      mouseRef.current.offsetX = pt.x - node.x;
      mouseRef.current.offsetY = pt.y - node.y;
      node.fx = node.x;
      node.fy = node.y;
    }
    mouseRef.current.down = true;
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, [getCanvasPoint, findNode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const pt = getCanvasPoint(e.clientX, e.clientY);
    const dragNode = mouseRef.current.dragNode;

    if (dragNode) {
      dragNode.x = pt.x - mouseRef.current.offsetX;
      dragNode.y = pt.y - mouseRef.current.offsetY;
      dragNode.fx = dragNode.x;
      dragNode.fy = dragNode.y;
      return;
    }

    if (mouseRef.current.down) {
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      viewRef.current.x += dx;
      viewRef.current.y += dy;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      return;
    }

    const node = findNode(pt.x, pt.y);
    hoverRef.current = node;
    setHoveredNode(node);
    document.body.style.cursor = node ? 'pointer' : 'default';

    if (node) {
      forceUpdate((n) => n + 1);
    }
  }, [getCanvasPoint, findNode]);

  const handleMouseUp = useCallback(() => {
    const dragNode = mouseRef.current.dragNode;
    if (dragNode) {
      delete dragNode.fx;
      delete dragNode.fy;
    }
    mouseRef.current.down = false;
    mouseRef.current.dragNode = null;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const dragNode = mouseRef.current.dragNode;
    if (dragNode) return;
    const pt = getCanvasPoint(e.clientX, e.clientY);
    const node = findNode(pt.x, pt.y);
    if (node && node.url) {
      window.open(node.url, '_blank', 'noopener,noreferrer');
    }
  }, [getCanvasPoint, findNode]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = 1 - Math.sign(e.deltaY) * 0.0112;
    viewRef.current.scale = Math.min(3, Math.max(0.2, viewRef.current.scale * factor));
  }, []);

  const handleZoomIn = useCallback(() => {
    viewRef.current.scale = Math.min(3, viewRef.current.scale * 1.3);
  }, []);

  const handleZoomOut = useCallback(() => {
    viewRef.current.scale = Math.max(0.2, viewRef.current.scale * 0.7);
  }, []);

  const handleReset = useCallback(() => {
    viewRef.current = { x: 0, y: 0, scale: 1 };
    const nodes = nodesRef.current;
    const center = nodes.find((n) => n.type === 'topic');
    if (center) {
      center.x = 0;
      center.y = 0;
      center.fx = 0;
      center.fy = 0;
    }
    for (const n of nodes) {
      if (n.type !== 'topic') {
        delete n.fx;
        delete n.fy;
      }
    }
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener('wheel', prevent, { passive: false });
    return () => el.removeEventListener('wheel', prevent);
  }, []);

  const nodeTypes = ['paper', 'repository', 'dataset', 'model'] as const;
  const typeCounts: Record<string, number> = {};
  for (const n of data.nodes) {
    typeCounts[n.type] = (typeCounts[n.type] ?? 0) + 1;
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8E3DC] overflow-hidden">
      <div className="p-5 border-b border-[#F0EDE8] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FFF4EC' }}>
            <Network className="w-4 h-4" style={{ color: '#F16A24' }} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#0D0D0D]">Knowledge Graph</h3>
            <p className="text-xs text-[#7A7169]">{data.nodes.length} nodes, {data.edges.length} edges</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleZoomIn} className="p-2 rounded-lg hover:bg-[#F7F4F0] transition-colors text-[#7A7169] hover:text-[#0D0D0D]" title="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleZoomOut} className="p-2 rounded-lg hover:bg-[#F7F4F0] transition-colors text-[#7A7169] hover:text-[#0D0D0D]" title="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={handleReset} className="p-2 rounded-lg hover:bg-[#F7F4F0] transition-colors text-[#7A7169] hover:text-[#0D0D0D]" title="Reset view">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex">
        <div ref={containerRef} className="relative flex-1" style={{ height: 480 }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleClick}
            onWheel={handleWheel}
          />

          {hoveredNode && (
            <div className="absolute pointer-events-none px-3 py-2 rounded-xl bg-white border border-[#E8E3DC] shadow-lg"
              style={{ bottom: 12, left: '50%', transform: 'translateX(-50%)', maxWidth: 320 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: NODE_COLORS[hoveredNode.type] ?? '#7A7169' }} />
                <div>
                  <p className="text-xs font-semibold text-[#0D0D0D] leading-snug line-clamp-2">{hoveredNode.label}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: NODE_COLORS[hoveredNode.type] ?? '#7A7169' }}>
                      {hoveredNode.type}
                    </span>
                    {hoveredNode.url && <span className="text-[10px] text-[#B0A99F]">Click to open</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-48 flex-shrink-0 border-l border-[#E8E3DC] p-4 bg-[#FAFAF8]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7169] mb-3">Legend</p>
          <div className="space-y-2.5">
            {(['topic', ...nodeTypes] as const).map((type) => (
              <div key={type} className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: NODE_COLORS[type] ?? '#7A7169' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#3D3730] capitalize">{type}</p>
                  <p className="text-[10px] text-[#B0A99F]">{typeCounts[type] ?? 0}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#E8E3DC]">
            <p className="text-[10px] text-[#B0A99F] leading-relaxed">
              Drag nodes to rearrange · Scroll to zoom · Click a node with a link to open
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}