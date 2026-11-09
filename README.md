# AlgoLab

AlgoLab es una aplicación web interactiva para aprender cómo funcionan los algoritmos de ordenamiento y los recorridos de grafos. Forma parte de mi **Engineering Roadmap**, una serie de 32 proyectos para practicar fundamentos de programación e ingeniería de software.

- **Demo en vivo:** [algolab en Vercel](https://algolab-jose-gutierrez-s-projects1.vercel.app)
- **Código fuente:** [joselgut2020-sys/algolab en GitHub](https://github.com/joselgut2020-sys/algolab)

## Funcionalidades

- Visualización paso a paso de **Bubble Sort**, **Merge Sort** y **Quick Sort**.
- Controles para reproducir, pausar, avanzar, reiniciar, cambiar la velocidad y generar datos aleatorios.
- Métricas en vivo: comparaciones, intercambios o escrituras, según el algoritmo.
- Comparación de complejidad Big-O y espacio auxiliar.
- Grafo no dirigido de ejemplo con su lista de adyacencia.
- Recorridos animados **BFS** (por niveles) y **DFS** (en profundidad).
- Pruebas unitarias para ordenamientos, métricas, lista de adyacencia y recorridos.

## Tecnologías

- **React** para construir la interfaz con componentes reutilizables.
- **TypeScript** para describir los datos de los algoritmos y detectar errores de tipos.
- **Vite** para el servidor de desarrollo y la compilación de producción.
- **CSS** para estilos y diseño adaptable.
- **Vitest** para las pruebas unitarias.

## Requisitos

- Node.js 22.12 o posterior.
- npm.

## Instalación y ejecución

Clona el repositorio y entra en la carpeta del proyecto. Luego instala las dependencias:

```bash
npm ci
```

Inicia el servidor local:

```bash
npm run dev
```

Vite mostrará la dirección local en la terminal. Abre esa dirección en el navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm test` | Ejecuta las pruebas unitarias una vez. |
| `npm run lint` | Revisa el código con Oxlint. |
| `npm run build` | Comprueba los tipos y crea la compilación de producción. |
| `npm run preview` | Sirve localmente la compilación de producción. |

## Complejidad de los algoritmos

Las complejidades describen el algoritmo de ordenamiento, sin contar el historial de estados que AlgoLab guarda para animar cada paso.

| Algoritmo | Mejor caso | Promedio | Peor caso | Espacio auxiliar |
| --- | --- | --- | --- | --- |
| Bubble Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) promedio; O(n) peor caso |

La implementación de Bubble Sort no termina antes si detecta que el arreglo ya está ordenado, por lo que su mejor caso sigue siendo O(n²). Quick Sort usa el último elemento de cada partición como pivote; si las particiones quedan muy desequilibradas, el peor caso es O(n²).

## Grafos

El módulo usa una **lista de adyacencia** para representar un grafo no dirigido. Cada nodo contiene la lista de sus vecinos. BFS usa una cola y explora primero los nodos cercanos; DFS usa recursión y profundiza por una rama antes de retroceder.

Con esta representación, el recorrido teórico de ambos algoritmos es O(V + E), donde **V** es el número de nodos y **E** el número de aristas. La generación de instantáneas para la animación añade trabajo y memoria, que no se incluyen en esa complejidad teórica.

## Estructura del proyecto

```text
src/
├── algorithms/
│   ├── bubbleSort.ts
│   ├── bubbleSortSteps.ts
│   ├── graphTraversal.ts
│   ├── graphTraversal.test.ts
│   ├── mergeSortSteps.ts
│   ├── quickSortSteps.ts
│   ├── sortingAlgorithms.ts
│   └── sortingAlgorithms.test.ts
├── components/
│   ├── GraphVisualizer.tsx
│   └── GraphVisualizer.css
├── types/
│   └── sorting.ts
├── assets/
├── App.tsx
├── App.css
├── index.css
├── main.tsx
├── practica.ts
└── pruebaBubble.ts
```

La definición y los metadatos de los algoritmos de ordenamiento se centralizan en `src/algorithms/sortingAlgorithms.ts`. Los recorridos y datos del grafo viven en `src/algorithms/graphTraversal.ts`, separados del componente visual.

## Pruebas

Ejecuta `npm test` para comprobar que los algoritmos ordenan correctamente, conservan sus entradas, mantienen sus métricas y producen los recorridos esperados del grafo.
