import { bubbleSortSteps } from "./bubbleSortSteps";
import { mergeSortSteps } from "./mergeSortSteps";
import { quickSortSteps } from "./quickSortSteps";
import type { SortingAlgorithm, SortingAlgorithmId } from "../types/sorting";

export const sortingAlgorithms: Record<SortingAlgorithmId, SortingAlgorithm> = {
  bubble: {
    name: "Bubble Sort",
    buildSteps: bubbleSortSteps,
    metric: "swaps",
    metricLabel: "Intercambios",
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      auxiliarySpace: "O(1)",
    },
  },
  merge: {
    name: "Merge Sort",
    buildSteps: mergeSortSteps,
    metric: "writes",
    metricLabel: "Escrituras en el arreglo",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      auxiliarySpace: "O(n)",
    },
  },
  quick: {
    name: "Quick Sort",
    buildSteps: quickSortSteps,
    metric: "swaps",
    metricLabel: "Intercambios",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      auxiliarySpace: "O(log n) promedio; O(n) peor caso",
    },
  },
};
