// components/TrafficChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);



type Visit = {
  date: string; // ISO string
  count: number;
};

interface Props {
  visits: Visit[];
}


// Example fetched server-side or passed as prop
const visitData = [
  { date: '2025-05-22', count: 12 },
  { date: '2025-05-23', count: 15 },
  { date: '2025-05-24', count: 10 },
  { date: '2025-05-25', count: 20 },
  { date: '2025-05-26', count: 25 },
];

{/* <TrafficChart visits={visitData} />; */}


export default function TrafficChart({ visits=visitData }: Props) {
  const labels = visits.map(v => new Date(v.date).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Visits',
        data: visits.map(v => v.count),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return <Line data={data} options={options} />;
}
