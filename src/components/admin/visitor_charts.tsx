import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VisitorChartsProps {
  visitantesPorSemana: Array<{
    diaSemana: string;
    total: number;
  }>;
  visitantesPorMes: Array<{
    mes: string;
    total: number;
  }>;
}

export default function VisitorCharts({ visitantesPorSemana, visitantesPorMes }: VisitorChartsProps) {
  return (
    <div className="mt-8 space-y-8">
      {/* Gráfico Semanal */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-blue1 to-blue3 rounded mr-3"></div>
          Visitantes por Dia da Semana
          <span className="ml-2 text-sm text-gray-500">(últimos 7 dias)</span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitantesPorSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="diaSemana" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
                labelStyle={{ color: '#f9fafb' }}
              />
              <Bar 
                dataKey="total" 
                fill="url(#blueGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico Mensal */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-blue2 to-blue4 rounded mr-3"></div>
          Visitantes por Mês
          <span className="ml-2 text-sm text-gray-500">(últimos 6 meses)</span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitantesPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="mes" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
                labelStyle={{ color: '#f9fafb' }}
              />
              <Bar 
                dataKey="total" 
                fill="url(#tealGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}