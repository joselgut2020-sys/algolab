import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  breadthFirstSteps,
  depthFirstSteps,
  graphAdjacency,
  graphEdges,
  graphNodes,
  type GraphEdge,
  type GraphTraversalStep,
} from "../algorithms/graphTraversal";
import "./GraphVisualizer.css";

type Traversal = "bfs" | "dfs";

const graphNodeById = new Map(graphNodes.map((node) => [node.id, node]));

function edgeKey(edge: GraphEdge): string {
  return [...edge].sort().join(":");
}

function GraphVisualizer() {
  const [traversal, setTraversal] = useState<Traversal>("bfs");
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

  const steps = useMemo<GraphTraversalStep[]>(
    () => traversal === "bfs"
      ? breadthFirstSteps(graphAdjacency, "A")
      : depthFirstSteps(graphAdjacency, "A"),
    [traversal],
  );
  const step = steps[stepIndex];
  const completed = stepIndex === steps.length - 1;
  const isAnimating = isPlaying && !completed;
  const visited = new Set(step.visited);
  const frontier = new Set(step.frontier);
  const activeEdgeKey = step.activeEdge ? edgeKey(step.activeEdge) : null;

  useEffect(() => {
    if (!isAnimating) return;

    const timer = window.setTimeout(() => {
      setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    }, speed);

    return () => window.clearTimeout(timer);
  }, [isAnimating, speed, stepIndex, steps.length]);

  function changeTraversal(event: ChangeEvent<HTMLSelectElement>) {
    setTraversal(event.target.value as Traversal);
    setStepIndex(0);
    setIsPlaying(false);
  }

  function togglePlayback() {
    if (isAnimating) {
      setIsPlaying(false);
      return;
    }

    if (completed) setStepIndex(0);
    setIsPlaying(true);
  }

  function reset() {
    setIsPlaying(false);
    setStepIndex(0);
  }

  return (
    <section className="graph-module" aria-labelledby="graph-title">
      <header className="graph-header">
        <div>
          <p className="graph-eyebrow">Módulo de grafos</p>
          <h2 id="graph-title">Recorridos BFS y DFS</h2>
          <p className="graph-description">
            Un grafo representa elementos como nodos y sus relaciones como aristas.
            Este ejemplo es no dirigido: cada conexión se puede recorrer en ambos sentidos.
          </p>
        </div>
        <label className="graph-selector" htmlFor="graph-traversal">
          Recorrido
          <select id="graph-traversal" value={traversal} onChange={changeTraversal}>
            <option value="bfs">BFS · por niveles</option>
            <option value="dfs">DFS · en profundidad</option>
          </select>
        </label>
      </header>

      <div className="graph-layout">
        <div className="graph-canvas-wrap">
          <svg
            className="graph-canvas"
            viewBox="0 0 480 320"
            role="img"
            aria-label={`Grafo de seis nodos. Recorrido ${traversal === "bfs" ? "BFS" : "DFS"}.`}
          >
            {graphEdges.map(([from, to]) => {
              const start = graphNodeById.get(from)!;
              const end = graphNodeById.get(to)!;
              const active = activeEdgeKey === edgeKey([from, to]);

              return (
                <line
                  key={`${from}-${to}`}
                  className={`graph-edge${active ? " active" : ""}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                />
              );
            })}
            {graphNodes.map(({ id, x, y }) => {
              const current = step.current === id;
              const isVisited = visited.has(id);
              const isFrontier = frontier.has(id);
              const stateClass = current
                ? "current"
                : isFrontier
                  ? "frontier"
                  : isVisited
                    ? "visited"
                    : "unvisited";

              return (
                <g key={id} className={`graph-node ${stateClass}`}>
                  <circle cx={x} cy={y} r="25" />
                  <text x={x} y={y} dy="0.35em">{id}</text>
                </g>
              );
            })}
          </svg>
          <div className="graph-legend" aria-label="Leyenda del grafo">
            <span><i className="legend-dot current" />Nodo actual</span>
            <span><i className="legend-dot frontier" />Frontera</span>
            <span><i className="legend-dot visited" />Descubierto</span>
          </div>
        </div>

        <aside className="adjacency-panel" aria-labelledby="adjacency-title">
          <h3 id="adjacency-title">Lista de adyacencia</h3>
          <p>Cada nodo enumera sus vecinos.</p>
          <ul>
            {Object.entries(graphAdjacency).map(([node, neighbors]) => (
              <li key={node} className={visited.has(node) ? "discovered" : undefined}>
                <code>{node}</code><span>→</span><span>{neighbors.join(", ")}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="graph-status" aria-live="polite">
        <p>
          {traversal === "bfs"
            ? "BFS usa una cola FIFO para explorar primero los vecinos más cercanos."
            : "DFS usa una pila de llamadas para avanzar por una rama antes de retroceder."}
        </p>
        <p><strong>Orden de visita:</strong> {step.order.join(" → ") || "Aún no iniciado"}</p>
        <p><strong>Paso:</strong> {stepIndex} / {steps.length - 1}</p>
      </div>

      <div className="graph-controls">
        <button onClick={togglePlayback}>
          {isAnimating ? "⏸ Pausar" : "▶ Reproducir"}
        </button>
        <button
          onClick={() => setStepIndex((index) => Math.min(index + 1, steps.length - 1))}
          disabled={isAnimating || completed}
        >
          Siguiente paso
        </button>
        <button onClick={reset}>Reiniciar</button>
        <label htmlFor="graph-speed">Velocidad</label>
        <input
          id="graph-speed"
          type="range"
          min="250"
          max="1500"
          step="50"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
        />
        <span>{speed} ms</span>
      </div>

      <p className="graph-complexity">
        El recorrido teórico cuesta <strong>O(V + E)</strong> con lista de adyacencia. Guardar las instantáneas
        para la animación requiere trabajo y memoria adicionales.
      </p>
    </section>
  );
}

export default GraphVisualizer;
