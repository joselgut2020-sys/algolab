export type SortingStep = {
  array: number[];
  comparing: number[];
  comparisons: number;
  swaps: number;
  writes: number;
};

export type SortingMetric = "swaps" | "writes";
export type SortingAlgorithmId = "bubble" | "merge" | "quick";

export type SortingAlgorithm = {
  name: string;
  buildSteps: (numbers: number[]) => SortingStep[];
  metric: SortingMetric;
  metricLabel: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
    auxiliarySpace: string;
  };
};
