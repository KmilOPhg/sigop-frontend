import ReactECharts from 'echarts-for-react';

interface ChartBarItem {
    key: string;
    label: string;
    total: number;
    estado: string;
}

interface ChartBarProps {
    title: string;
    items: ChartBarItem[];
    onBarClick: (key: string) => void;
}

export function ChartBar({ title, items, onBarClick }: ChartBarProps) {
    const categorias = items.map((i) => i.key);
    const totales = items.map((i) => i.total);
    const colores = items.map((i) =>
        i.estado === 'activo' ? 'rgba(0,200,0,0.9)' : 'rgba(255,0,0,0.3)'
    );

    const option = {
        tooltip: { trigger: 'axis' },
        grid: { left: 40, right: 20, bottom: 100, top: 20 },
        xAxis: {
            type: 'category',
            data: categorias,
            axisLabel: { rotate: -60, fontSize: 10 },
        },
        yAxis: { type: 'value' },
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: categorias.length > 10 ? 20 : 100,
            },
            { type: 'inside' },
        ],
        series: [
            {
                type: 'bar',
                data: totales.map((v, i) => ({
                    value: v,
                    itemStyle: { color: colores[i] },
                })),
                barWidth: '60%',
            },
        ],
    };

    const onEvents = {
        click: (params: { name: string }) => {
            onBarClick(params.name);
        },
    };

    return (
        <div className="bg-surface-container-low rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <ReactECharts
                    option={option}
                    style={{ height: '300px', width: '100%' }}
                    onEvents={onEvents}
                />
            </div>
        </div>
    );
}
