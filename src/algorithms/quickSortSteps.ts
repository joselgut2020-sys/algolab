import type { SortingStep } from "../types/sorting";

export function quickSortSteps(numeros: number[]): SortingStep[] {
  const resultado = [...numeros];
  const pasos: SortingStep[] = [{
    array: [...resultado],
    comparing: [],
    comparisons: 0,
    swaps: 0,
    writes: 0,
  }];
  let comparisons = 0;
  let swaps = 0;

  function intercambiar(izquierda: number, derecha: number): void {
    if (izquierda === derecha) return;

    [resultado[izquierda], resultado[derecha]] = [resultado[derecha], resultado[izquierda]];
    swaps++;
    pasos.push({
      array: [...resultado],
      comparing: [izquierda, derecha],
      comparisons,
      swaps,
      writes: 0,
    });
  }

  function particionar(inicio: number, fin: number): number {
    const pivote = resultado[fin];
    let limiteMenores = inicio;

    for (let indice = inicio; indice < fin; indice++) {
      comparisons++;
      pasos.push({
        array: [...resultado],
        comparing: [indice, fin],
        comparisons,
        swaps,
        writes: 0,
      });

      if (resultado[indice] <= pivote) {
        intercambiar(indice, limiteMenores);
        limiteMenores++;
      }
    }

    intercambiar(limiteMenores, fin);
    return limiteMenores;
  }

  function ordenar(inicio: number, fin: number): void {
    if (inicio >= fin) return;

    const indicePivote = particionar(inicio, fin);
    ordenar(inicio, indicePivote - 1);
    ordenar(indicePivote + 1, fin);
  }

  ordenar(0, resultado.length - 1);
  pasos.push({
    array: [...resultado],
    comparing: [],
    comparisons,
    swaps,
    writes: 0,
  });

  return pasos;
}
