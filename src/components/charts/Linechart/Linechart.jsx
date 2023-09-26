import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);
import {
  generateRandomId,
  roundNumber,
} from '../../../utils/secondaryFunctions';
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  pointStyle: 'circle',
  radius: '3',
  borderWidth: '4',
  hoverRadius: '3',
  plugins: {
    tooltip: {
      xAlign: 'center',
      yAlign: 'bottom',
      displayColors: false,
      backgroundColor: '#210B36',
      bodyFont: {
        family: 'Nunito',
        weight: '700',
        size: 15,
      },
    },
  },
};

const data = {
  labels: [],
  datasets: [{
    borderColor: '#B865D6',
  }]
};

export const LineChart = ({ year, transactions }) => {
  data.labels = [];
  let lastTransfers = [];

  for (let i = 0; i < 12; i++) {
    const lastTransferInMonth =
      transactions.filter(op => new Date(op.date).getFullYear() === year).
        filter(op => new Date(op.date).getMonth() === i).
        at(-1);
    if (lastTransferInMonth !== undefined) {
      lastTransfers.push(lastTransferInMonth);
    }
  }
  if (lastTransfers.length > 6) lastTransfers = lastTransfers.slice(-6);

  data.datasets[0].data = lastTransfers.map(elem => {
    const month = new Date(elem.date).toLocaleString('default',
      { month: 'short' }).replace('.', '');
    return { x: month, y: roundNumber(elem.amount) };
  });

  return (
    <Line
      key={generateRandomId()}
      options={options}
      data={data}
      redraw={true}
    />
  );
};

LineChart.propTypes = {
  year: PropTypes.number,
  transactions: PropTypes.array
};
