import { useState, useEffect } from "react";

const letras = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const colores = ["bg-yellow-300", "bg-green-300", "bg-blue-300"];

export default function LibretaNotas() {
  const [letraSeleccionada, setLetraSeleccionada] = useState("A");
  const [notas, setNotas] = useState({});
  const [textoNota, setTextoNota] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState(colores[0]);

  useEffect(() => {
    const notasGuardadas = JSON.parse(localStorage.getItem("misnotas")) || {};
    setNotas(notasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem("misnotas", JSON.stringify(notas));
  }, [notas]);

  const agregarNota = () => {
    if (!textoNota.trim()) return;
    const nueva = {
      texto: textoNota,
      fecha: new Date().toLocaleString(),
      color: colorSeleccionado,
    };
    setNotas((prev) => ({
      ...prev,
      [letraSeleccionada]: [...(prev[letraSeleccionada] || []), nueva],
    }));
    setTextoNota("");
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Notas: "{letraSeleccionada}"</h1>

        <div className="flex space-x-2 mb-3">
          {colores.map((c) => (
            <button
              key={c}
              className={`w-8 h-8 rounded-full border-2 ${c} ${colorSeleccionado === c ? "border-black" : "border-transparent"}`}
              onClick={() => setColorSeleccionado(c)}
            />
          ))}
        </div>

        <textarea
          value={textoNota}
          onChange={(e) => setTextoNota(e.target.value)}
          rows={3}
          className="w-full p-2 border rounded mb-2"
          placeholder="Escribe tu nota aquí..."
        />

        <button onClick={agregarNota} className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Nota
        </button>

        <div className="mt-4 space-y-4">
          {(notas[letraSeleccionada] || []).map((nota, i) => (
            <div key={i} className={`p-4 rounded shadow ${nota.color}`}>
              <div className="text-sm text-gray-600">{nota.fecha}</div>
              <div>{nota.texto}</div>
            </div>
          ))}
        </div>
      </main>

      <aside className="w-16 bg-gray-100 p-2 flex flex-col items-center space-y-2 overflow-y-auto">
        {letras.map((l, i) => (
          <button
            key={l}
            onClick={() => setLetraSeleccionada(l)}
            className={`w-10 h-10 rounded-full font-bold text-white ${
              letraSeleccionada === l ? "ring-2 ring-black" : ""
            } ${colores[i % colores.length]}`}
          >
            {l}
          </button>
        ))}
      </aside>
    </div>
  );
}
