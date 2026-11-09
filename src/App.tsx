
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { sortingAlgorithms } from "./algorithms/sortingAlgorithms";
import "./App.css";
import type { SortingAlgorithmId } from "./types/sorting";
import GraphVisualizer from "./components/GraphVisualizer";

function App() {
  const [numeros, setNumeros] = useState([45, 20, 80, 10, 60, 30]);
  const [algoritmo, setAlgoritmo] = useState<SortingAlgorithmId>("bubble");
  const [pasoActual, setPasoActual] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [velocidad, setVelocidad] = useState(500);

  const configuracion = sortingAlgorithms[algoritmo];
  const pasos = useMemo(() => configuracion.buildSteps(numeros), [configuracion, numeros]);
  const paso = pasos[pasoActual];

  const finalizado = pasoActual === pasos.length - 1;
  const activo = reproduciendo && !finalizado;

  // Control de reproducción automática
  useEffect(() => {
    if (!activo) return;

    const timer = window.setTimeout(() => {
      setPasoActual(actual => Math.min(actual + 1, pasos.length - 1));
    }, velocidad);

    return () => window.clearTimeout(timer);
  }, [activo, pasoActual, velocidad, pasos.length]);

  function reproducir() {
    if (activo) {
      setReproduciendo(false);
    } else {
      if (finalizado) setPasoActual(0);
      setReproduciendo(true);
    }
  }

  function reiniciar() {
    setReproduciendo(false);
    setPasoActual(0);
  }

  function cambiarAlgoritmo(event: ChangeEvent<HTMLSelectElement>) {
    setAlgoritmo(event.target.value as SortingAlgorithmId);
    setReproduciendo(false);
    setPasoActual(0);
  }

  function generarNumeros() {
    const nuevos = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 90) + 10
    );

    setReproduciendo(false);
    setNumeros(nuevos);
    setPasoActual(0);
  }

  return (
    <main className="app">
      <h1>AlgoLab</h1>
      <p>Visualizador de algoritmos de ordenamiento</p>

      <div className="selector-algoritmo">
        <label htmlFor="algoritmo">Algoritmo:</label>
        <select id="algoritmo" value={algoritmo} onChange={cambiarAlgoritmo}>
          {Object.entries(sortingAlgorithms).map(([id, algoritmo]) => (
            <option key={id} value={id}>{algoritmo.name}</option>
          ))}
        </select>
      </div>

      <h2>{configuracion.name}</h2>

      <div className="estadisticas">
        <div>
          <h3>{paso.comparisons}</h3>
          <p>Comparaciones</p>
        </div>
        <div>
          <h3>{paso[configuracion.metric]}</h3>
          <p>{configuracion.metricLabel}</p>
        </div>
        <div>
          <h3>{pasoActual}/{pasos.length - 1}</h3>
          <p>Pasos</p>
        </div>
      </div>

      <div className="barras">
        {paso.array.map((numero, index) => (
          <div
            key={index}
            className={`barra ${
              paso.comparing.includes(index) ? "comparando" : ""
            }`}
            style={{ height: `${numero * 3}px` }}
          >
            {numero}
          </div>
        ))}
      </div>

      <div className="controles">
        <button onClick={reproducir}>
          {activo ? "⏸ Pausar" : "▶ Reproducir"}
        </button>

        <button
          onClick={() => setPasoActual(p => Math.min(p + 1, pasos.length - 1))}
          disabled={activo || finalizado}
        >
          Siguiente paso
        </button>

        <button onClick={reiniciar}>Reiniciar</button>
        <button onClick={generarNumeros}>Generar números</button>
      </div>

      <div className="velocidad">
        <h3>Velocidad de animación</h3>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={1100 - velocidad}
          onChange={e => setVelocidad(1100 - Number(e.target.value))}
        />
        <p>{velocidad} ms por paso</p>
      </div>

      <section className="complejidad" aria-labelledby="titulo-complejidad">
        <h2 id="titulo-complejidad">Comparación de complejidad Big-O</h2>
        <p className="complejidad-descripcion">
          Describe cómo crece el trabajo del algoritmo cuando aumenta la cantidad de elementos (n).
        </p>
        <div className="tabla-complejidad-contenedor">
          <table>
            <thead>
              <tr>
                <th scope="col">Algoritmo</th>
                <th scope="col">Mejor caso</th>
                <th scope="col">Promedio</th>
                <th scope="col">Peor caso</th>
                <th scope="col">Espacio auxiliar</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sortingAlgorithms).map(([id, algoritmoInfo]) => (
                <tr key={id} className={id === algoritmo ? "algoritmo-seleccionado" : undefined}>
                  <th scope="row">{algoritmoInfo.name}</th>
                  <td>{algoritmoInfo.complexity.best}</td>
                  <td>{algoritmoInfo.complexity.average}</td>
                  <td>{algoritmoInfo.complexity.worst}</td>
                  <td>{algoritmoInfo.complexity.auxiliarySpace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="nota-complejidad">
          El espacio auxiliar describe el algoritmo; no incluye el historial de pasos que AlgoLab guarda para animarlo.
        </p>
      </section>

      <GraphVisualizer />

      {finalizado && <h2>¡Ordenamiento completado!</h2>}
    </main>
  );
}

export default App;
