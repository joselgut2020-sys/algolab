export type GraphNode = {
  id: string;
  x: number;
  y: number;
};

export type GraphEdge = readonly [string, string];
export type GraphAdjacencyList = Record<string, string[]>;

export type GraphTraversalStep = {
  visited: string[];
  frontier: string[];
  current: string | null;
  activeEdge: GraphEdge | null;
  order: string[];
};

export const graphNodes: GraphNode[] = [
  { id: "A", x: 90, y: 160 },
  { id: "B", x: 220, y: 70 },
  { id: "C", x: 220, y: 250 },
  { id: "D", x: 390, y: 70 },
  { id: "E", x: 390, y: 160 },
  { id: "F", x: 390, y: 250 },
];

export const graphEdges: GraphEdge[] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["B", "E"],
  ["C", "E"],
  ["C", "F"],
  ["E", "F"],
];

export function createAdjacencyList(
  nodes: GraphNode[],
  edges: GraphEdge[],
): GraphAdjacencyList {
  const adjacency: GraphAdjacencyList = Object.fromEntries(
    nodes.map(({ id }) => [id, []]),
  );

  for (const [from, to] of edges) {
    adjacency[from]?.push(to);
    adjacency[to]?.push(from);
  }

  return adjacency;
}

export const graphAdjacency = createAdjacencyList(graphNodes, graphEdges);

function createStep(
  visited: Set<string>,
  frontier: string[],
  current: string | null,
  activeEdge: GraphEdge | null,
  order: string[],
): GraphTraversalStep {
  return {
    visited: [...visited],
    frontier: [...frontier],
    current,
    activeEdge,
    order: [...order],
  };
}

export function breadthFirstSteps(
  adjacency: GraphAdjacencyList,
  start: string,
): GraphTraversalStep[] {
  const visited = new Set<string>();
  const queue: string[] = [];
  const order: string[] = [];

  if (!adjacency[start]) {
    return [createStep(visited, queue, null, null, order)];
  }

  visited.add(start);
  queue.push(start);
  let queueIndex = 0;
  const steps = [createStep(visited, queue, null, null, order)];

  while (queueIndex < queue.length) {
    const current = queue[queueIndex++];
    const frontier = queue.slice(queueIndex);
    order.push(current);
    steps.push(createStep(visited, frontier, current, null, order));

    for (const neighbor of adjacency[current]) {
      const edge: GraphEdge = [current, neighbor];
      steps.push(createStep(visited, frontier, current, edge, order));

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        frontier.push(neighbor);
        steps.push(createStep(visited, frontier, current, edge, order));
      }
    }
  }

  steps.push(createStep(visited, [], null, null, order));
  return steps;
}

export function depthFirstSteps(
  adjacency: GraphAdjacencyList,
  start: string,
): GraphTraversalStep[] {
  const visited = new Set<string>();
  const path: string[] = [];
  const order: string[] = [];
  const steps = [createStep(visited, path, null, null, order)];

  function visit(current: string): void {
    visited.add(current);
    path.push(current);
    order.push(current);
    steps.push(createStep(visited, path, current, null, order));

    for (const neighbor of adjacency[current]) {
      const edge: GraphEdge = [current, neighbor];
      steps.push(createStep(visited, path, current, edge, order));

      if (!visited.has(neighbor)) {
        visit(neighbor);
      }
    }

    path.pop();
    steps.push(createStep(visited, path, path.at(-1) ?? null, null, order));
  }

  if (adjacency[start]) visit(start);
  return steps;
}
