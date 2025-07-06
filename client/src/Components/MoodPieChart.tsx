import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';
import type { ChatMessage } from '../types/message';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MoodPieChartProps {
  messages: ChatMessage[];
}

const MoodPieChart: React.FC<MoodPieChartProps> = ({ messages }) => {
  const sentimentCount = {
    positive: 0,
    negative: 0,
    neutral: 0
  };

  messages.forEach((msg) => {
    sentimentCount[msg.sentiment]++;
  });

  const data = {
    labels: ['Positive 😊', 'Negative 😠', 'Neutral 😐'],
    datasets: [
      {
        label: 'Mood Distribution',
        data: [
          sentimentCount.positive,
          sentimentCount.negative,
          sentimentCount.neutral
        ],
        backgroundColor: ['#4ade80', '#f87171', '#cbd5e1'],
        borderColor: ['#22c55e', '#ef4444', '#94a3b8'],
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-4">
      <Pie data={data} options={options} />
    </div>
  );
};

export default MoodPieChart;
