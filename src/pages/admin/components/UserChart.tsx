// components/TrafficChart.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

type UserDataOneDay = {
  _id: string; // ISO string
  dailyCount: number;
};

interface Props {
  userData: UserDataOneDay[];
}

// Example fetched server-side or passed as prop
const visitData = [
  { _id: "2025-05-22", dailyCount: 12 },
  { _id: "2025-05-23", dailyCount: 15 },
  { _id: "2025-05-24", dailyCount: 10 },
  { _id: "2025-05-25", dailyCount: 20 },
  { _id: "2025-05-26", dailyCount: 25 },
];

{
  /* <TrafficChart visits={visitData} />; */
}

export default function UserChart({ userData = visitData }: Props) {
  const labels = userData.map((v) => new Date(v._id).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: "Aggregate User Count",
        data: userData.map((v) => v.dailyCount),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
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
