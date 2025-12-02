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
    <div className="mt-6 space-y-6">
      {/* Gráfico Semanal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-1 h-5 bg-blue3 rounded mr-2"></div>
          Visitantes por Dia da Semana
          <span className="ml-2 text-sm text-gray-500 font-normal">(últimos 7 dias)</span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitantesPorSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
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
                  backgroundColor: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#f9fafb'
                }}
              />
              <Bar 
                dataKey="total" 
                fill="#3b82f6"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico Mensal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-1 h-5 bg-blue2 rounded mr-2"></div>
          Visitantes por Mês
          <span className="ml-2 text-sm text-gray-500 font-normal">(últimos 6 meses)</span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitantesPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
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
                  backgroundColor: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#f9fafb'
                }}
              />
              <Bar 
                dataKey="total" 
                fill="#06b6d4"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}