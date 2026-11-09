import type { SortingStep } from "../types/sorting";

export function mergeSortSteps(numeros: number[]): SortingStep[] {
  const resultado = [...numeros];
  const pasos: SortingStep[] = [{
    array: [...resultado],
    comparing: [],
    comparisons: 0,
    swaps: 0,
    writes: 0,
  }];
  let comparisons = 0;
  let moves = 0;

  function mergeSort(inicio: number, fin: number): void {
    if (fin - inicio <= 1) return;

    const medio = Math.floor((inicio + fin) / 2);
    mergeSort(inicio, medio);
    mergeSort(medio, fin);

    const izquierda = resultado.slice(inicio, medio);
    const derecha = resultado.slice(medio, fin);
    let i = 0;
    let j = 0;
    let destino = inicio;

    while (i < izquierda.length && j < derecha.length) {
      const indiceIzquierda = inicio + i;
      const indiceDerecha = medio + j;
      comparisons++;
      pasos.push({
        array: [...resultado],
        comparing: [indiceIzquierda, indiceDerecha],
        comparisons,
        swaps: 0,
        writes: moves,
      });

      resultado[destino++] = izquierda[i] <= derecha[j]
        ? izquierda[i++]
        : derecha[j++];
      moves++;
      pasos.push({
        array: [...resultado],
        comparing: [indiceIzquierda, indiceDerecha],
        comparisons,
        swaps: 0,
        writes: moves,
      });
    }

    while (i < izquierda.length) {
      resultado[destino++] = izquierda[i++];
      moves++;
      pasos.push({ array: [...resultado], comparing: [], comparisons, swaps: 0, writes: moves });
    }

    while (j < derecha.length) {
      resultado[destino++] = derecha[j++];
      moves++;
      pasos.push({ array: [...resultado], comparing: [], comparisons, swaps: 0, writes: moves });
    }
  }

  mergeSort(0, resultado.length);
  pasos.push({ array: [...resultado], comparing: [], comparisons, swaps: 0, writes: moves });
  return pasos;
}
