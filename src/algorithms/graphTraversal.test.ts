import { describe, expect, test } from "vitest";
import {
  breadthFirstSteps,
  createAdjacencyList,
  depthFirstSteps,
  graphAdjacency,
  graphEdges,
  graphNodes,
} from "./graphTraversal";

describe("lista de adyacencia", () => {
  test("representa cada arista no dirigida en ambas direcciones", () => {
    for (const [from, to] of graphEdges) {
      expect(graphAdjacency[from]).toContain(to);
      expect(graphAdjacency[to]).toContain(from);
    }
  });

  test("incluye nodos aislados aunque no tengan aristas", () => {
    const adjacency = createAdjacencyList(
      [{ id: "X", x: 0, y: 0 }, { id: "Y", x: 1, y: 1 }],
      [],
    );

    expect(adjacency).toEqual({ X: [], Y: [] });
  });
});

describe("recorridos del grafo de ejemplo", () => {
  test("BFS visita primero por niveles", () => {
    const steps = breadthFirstSteps(graphAdjacency, "A");

    expect(steps.at(-1)?.order).toEqual(["A", "B", "C", "D", "E", "F"]);
  });

  test("DFS profundiza antes de retroceder", () => {
    const steps = depthFirstSteps(graphAdjacency, "A");

    expect(steps.at(-1)?.order).toEqual(["A", "B", "D", "E", "C", "F"]);
  });

  test.each([
    ["BFS", breadthFirstSteps],
    ["DFS", depthFirstSteps],
  ] as const)("%s visita cada nodo alcanzable una sola vez", (_name, traverse) => {
    const order = traverse(graphAdjacency, "A").at(-1)?.order ?? [];

    expect(order).toHaveLength(graphNodes.length);
    expect(new Set(order).size).toBe(order.length);
  });

  test("devuelve un recorrido vacío si el nodo inicial no existe", () => {
    expect(breadthFirstSteps(graphAdjacency, "Z").at(-1)?.order).toEqual([]);
    expect(depthFirstSteps(graphAdjacency, "Z").at(-1)?.order).toEqual([]);
  });
});
