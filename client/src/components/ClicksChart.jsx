import { LineChart } from '@mui/x-charts/LineChart';
import { formatLast7DaysDate } from '../utils/formatDate';

export function ClicksLast7DaysChart({ data }) {

  return (
    <LineChart
      xAxis={[{
        data: data.map(d => d.day),
        scaleType: 'band',
        valueFormatter: formatLast7DaysDate
      }]}
      series={[{
        data: data.map(f => Number(f.clicks)),
        area: true
      }]}
      height={400}
    />
  );
}
