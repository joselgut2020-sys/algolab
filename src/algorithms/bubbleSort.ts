
export function bubbleSort(numeros: number[]): number[] {
  const resultado = [...numeros];
  const n = resultado.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (resultado[j] > resultado[j + 1]) {
        const temp = resultado[j];
        resultado[j] = resultado[j + 1];
        resultado[j + 1] = temp;
      }
    }
  }

  return resultado;
}
