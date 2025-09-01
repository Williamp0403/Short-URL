import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material';

export function DevicesChart({ data }) {
  const theme = useTheme();

  const chartData = data.map(item => ({
    id: item.device_type,
    value: item.device_count,
    label: `${item.device_type} (${item.device_percentage}%)`,
  }));

  return (
      <PieChart
        padding={0}
        margin={0}
        series={[
          {
            data: chartData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 60, additionalRadius: -30, color: 'gray' },
            innerRadius: 60,
            outerRadius: 80,
            paddingAngle: 3,
            cornerRadius: 0,
            colors: [
              theme.palette.primary.main,
              theme.palette.secondary.main,
              theme.palette.success.main
            ],
          },
        ]}
        height={200}
        width={300}
        slotProps={{
          legend: {     
            position: { vertical: 'top', horizontal: 'left' },
            padding: 0,
          },
        }}
      />
  );
}
