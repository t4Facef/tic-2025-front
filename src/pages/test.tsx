import React, { useState, useEffect } from "react";
import CompanieForm3 from "../components/forms/register/companie_form3";
import { CompanieForm3Data } from "../types/forms/companie";

interface Estatisticas {
  candidaturasHoje: number;
  candidatosAtivos: number;
  vagasAbertas: number;
}

export default function TestPage() {
  const [formData, setFormData] = useState<CompanieForm3Data>({ supportCapabilities: [] });
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFormSubmit = (data: CompanieForm3Data) => {
    console.log("Form submitted:", data);
    setFormData(data);
  };

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const response = await fetch("/api/estatisticas");
        const data = await response.json();
        setEstatisticas(data);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstatisticas();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 m-16 bg-blue-200 space-y-12">
      {/* --- Header e Formulário --- */}
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold">Teste CompanieForm3</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <CompanieForm3
            formFunc={handleFormSubmit}
            formId="testForm3"
            initialData={formData}
          />

          <button
            type="submit"
            form="testForm3"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Testar Submit
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg w-full">
          <h3 className="font-semibold mb-2">Dados do Form:</h3>
          <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>

      {/* --- Estatísticas (antigo componente StatisticsSection) --- */}
      {loading ? (
        <section className="bg-white py-12 w-full">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-600">Carregando estatísticas...</div>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Estatísticas da Plataforma</h2>
              <p className="text-blue-100">Acompanhe os números em tempo real</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {estatisticas?.candidaturasHoje || 0}
                </div>
                <div className="text-blue-100">Candidaturas Hoje</div>
              </div>

              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {estatisticas?.candidatosAtivos || 0}
                </div>
                <div className="text-blue-100">Candidatos Ativos</div>
              </div>

              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {estatisticas?.vagasAbertas || 0}
                </div>
                <div className="text-blue-100">Vagas Abertas</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
