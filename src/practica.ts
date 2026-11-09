function encontrarMayor(numeros: number[]): number | undefined {
  if (numeros.length === 0) {
    return undefined;
  }

  let mayor = numeros[0];

  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > mayor) {
      mayor = numeros[i];
    }
  }

  return mayor;
}

console.log(encontrarMayor([12, 5, 27, 3, 18]));
console.log(encontrarMayor([-12, -5, -27, -3, -18]));
console.log(encontrarMayor([7]));
console.log(encontrarMayor([9, 9, 9]));
console.log(encontrarMayor([100, 2, 3, 4]));
