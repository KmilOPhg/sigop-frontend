import ReactECharts from 'echarts-for-react';

interface ChartDonutProps {
    title: string;
    activos: number;
    inactivos: number;
}

export function ChartDonut({ title, activos, inactivos }: ChartDonutProps) {
    const option = {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [
            {
                name: title,
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: { show: false, position: 'center' },
                emphasis: {
                    label: { show: true, fontSize: 28, fontWeight: 'bold' },
                },
                labelLine: { show: false },
                data: [
                    { value: activos, name: 'Activos', itemStyle: { color: 'rgba(0,200,0,0.9)' } },
                    { value: inactivos, name: 'Inactivos', itemStyle: { color: 'rgba(255,0,0,0.3)' } },
                ],
            },
        ],
    };

    return (
        <div className="bg-surface-container-low rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-4">{title}</h3>
            <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
        </div>
    );
}
