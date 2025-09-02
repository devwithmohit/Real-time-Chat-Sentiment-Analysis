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
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(156, 163, 175, 0.8)'
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(244, 63, 94)',
          'rgb(156, 163, 175)'
        ],
        borderWidth: 3,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(244, 63, 94, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        hoverBorderWidth: 4
      }
    ]
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight:500
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true
    }
  };

  const totalMessages = messages.length;
  const hasData = totalMessages > 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          📊 Mood Analysis
          {hasData && (
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {totalMessages} messages
            </span>
          )}
        </h3>
      </div>
      
      <div className="p-6">
        {hasData ? (
          <>
            <div className="h-64 mb-6">
              <Pie data={data} options={options} />
            </div>
            
            {/* Sentiment Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-700 font-medium">Positive</span>
                </div>
                <span className="text-emerald-600 font-bold">
                  {sentimentCount.positive} ({Math.round((sentimentCount.positive / totalMessages) * 100)}%)
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <span className="text-rose-700 font-medium">Negative</span>
                </div>
                <span className="text-rose-600 font-bold">
                  {sentimentCount.negative} ({Math.round((sentimentCount.negative / totalMessages) * 100)}%)
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Neutral</span>
                </div>
                <span className="text-gray-600 font-bold">
                  {sentimentCount.neutral} ({Math.round((sentimentCount.neutral / totalMessages) * 100)}%)
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="text-4xl mb-3">📈</div>
            <p className="font-medium">No data yet</p>
            <p className="text-sm">Send messages to see mood analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodPieChart;