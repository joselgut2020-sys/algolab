import { describe, expect, test } from "vitest";
import { bubbleSort } from "./bubbleSort";
import { sortingAlgorithms } from "./sortingAlgorithms";

const casos = [
  { nombre: "desordenado", entrada: [5, 2, 8, 1, 3], esperado: [1, 2, 3, 5, 8] },
  { nombre: "con negativos", entrada: [0, -4, 7, -1], esperado: [-4, -1, 0, 7] },
  { nombre: "con duplicados", entrada: [3, 1, 3, 2, 1], esperado: [1, 1, 2, 3, 3] },
  { nombre: "vacío", entrada: [], esperado: [] },
  { nombre: "un elemento", entrada: [42], esperado: [42] },
];

for (const algoritmo of Object.values(sortingAlgorithms)) {
  describe(algoritmo.name, () => {
    test.each(casos)("ordena correctamente un arreglo $nombre", ({ entrada, esperado }) => {
      const pasos = algoritmo.buildSteps(entrada);

      expect(pasos.at(-1)?.array).toEqual(esperado);
    });

    test("conserva el arreglo recibido", () => {
      const entrada = [4, 2, 7, 1];
      const copiaOriginal = [...entrada];

      algoritmo.buildSteps(entrada);

      expect(entrada).toEqual(copiaOriginal);
    });

    test("mantiene contadores crecientes y métricas separadas", () => {
      const pasos = algoritmo.buildSteps([4, 1, 3, 2]);

      for (let indice = 1; indice < pasos.length; indice++) {
        expect(pasos[indice].comparisons).toBeGreaterThanOrEqual(pasos[indice - 1].comparisons);
        expect(pasos[indice].swaps).toBeGreaterThanOrEqual(pasos[indice - 1].swaps);
        expect(pasos[indice].writes).toBeGreaterThanOrEqual(pasos[indice - 1].writes);
      }

      const ultimoPaso = pasos.at(-1);
      expect(ultimoPaso).toBeDefined();
      if (algoritmo.metric === "swaps") {
        expect(ultimoPaso?.writes).toBe(0);
      } else {
        expect(ultimoPaso?.swaps).toBe(0);
      }
    });
  });
}

describe("bubbleSort", () => {
  test("devuelve una copia ordenada sin mutar la entrada", () => {
    const entrada = [3, 1, 2];

    expect(bubbleSort(entrada)).toEqual([1, 2, 3]);
    expect(entrada).toEqual([3, 1, 2]);
  });
});

describe("complejidad declarada", () => {
  test("refleja los costos de las implementaciones actuales", () => {
    expect(sortingAlgorithms.bubble.complexity).toEqual({
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      auxiliarySpace: "O(1)",
    });
    expect(sortingAlgorithms.merge.complexity).toEqual({
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      auxiliarySpace: "O(n)",
    });
    expect(sortingAlgorithms.quick.complexity).toEqual({
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      auxiliarySpace: "O(log n) promedio; O(n) peor caso",
    });
  });
});
