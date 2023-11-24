import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // opcional, muestra dos decimales
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // ... otros estilos
  };

interface LineChartData {
    labels: string[];
    datasets: {
        data: number[];
    }[];
}

const GraphCard: React.FC = () => {
    const data: LineChartData = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      datasets: [
        { data: [20, 45, 28, 80, 99, 43] }
      ]
    };
  
    return (
      <LineChart chartConfig={chartConfig} data={data} width={400} height={220}
      />
    );
  };
  
  export default GraphCard;