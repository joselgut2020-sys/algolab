import type { SortingStep } from "../types/sorting";

export function bubbleSortSteps(numeros: number[]): SortingStep[] {
  const resultado = [...numeros];

  let comparisons = 0;
  let swaps = 0;

  const pasos: SortingStep[] = [{
    array: [...resultado],
    comparing: [],
    comparisons: 0,
    swaps: 0,
    writes: 0,
  }];

  const n = resultado.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {

      comparisons++;

      pasos.push({
        array: [...resultado],
        comparing: [j, j + 1],
        comparisons,
        swaps,
        writes: 0,
      });

      if (resultado[j] > resultado[j + 1]) {
        const temp = resultado[j];
        resultado[j] = resultado[j + 1];
        resultado[j + 1] = temp;

        swaps++;

        pasos.push({
          array: [...resultado],
          comparing: [j, j + 1],
          comparisons,
            swaps,
            writes: 0,
        });
      }
    }
  }

  pasos.push({
    array: [...resultado],
    comparing: [],
    comparisons,
    swaps,
    writes: 0,
  });

  return pasos;
}
