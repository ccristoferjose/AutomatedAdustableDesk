import React, { useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-svg';


const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // opcional, muestra dos decimales
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

interface LineChartData {
    labels: string[];
    datasets: {
        data: number[];
    }[];
}

type Props = {
    sensor: string;
}

const GraphCard: React.FC<Props> = ( { sensor}) => {

    const [ data, setData ] = useState<LineChartData>( { labels: [], datasets: [{ data: [] }] });

    useEffect(() => {
        dataFecth();
        const interval = setInterval(dataFecth, 20000);
        return () => clearInterval(interval);
    }, [sensor]);

    const dataFecth = async () => {
       try {
        const response = await fetch(`http://192.168.1.44:3000/api/data/historical/${sensor}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        const labels = jsonData.map((item: { Timestamp: string }) => {
            const date = new Date(item.Timestamp);
            return date.getDate().toString(); // Obtiene el día del mes y lo convierte a cadena
        });
        let dataValue;
        switch (sensor) {
            case "1":
                dataValue = jsonData.map((item: {Temperature: number}) => Math.round(item.Temperature));
                break;
            case "2":
                dataValue = jsonData.map((item: {Lux: number}) => Math.round(item.Lux));
                break;
            case "3":
                dataValue = jsonData.map((item: {Humidity: number}) => Math.round(item.Humidity));
                break;
            case "4":
                dataValue = jsonData.map((item: {AirQuality: number}) => Math.round(item.AirQuality));
                break;
            default:
                break;
        }
        setData({
            labels: labels,
            datasets: [{ data: dataValue }]
        });
        
       } catch (error) {
        console.log('Hubo un problema con la operación fetch:', error);
       }
    }


  
    return (
        data.labels.length > 0 ? (
             <LineChart chartConfig={chartConfig} data={data} width={400} height={220}/>
        ) : (
            <Text>Loading...</Text>
        )
     
      
    );
  };
  
  export default GraphCard;