import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

// Mock data for the chart - this would come from your API
const chartData = [
    { month: 'Ene', balance: 30000 },
    { month: 'Feb', balance: 35000 },
    { month: 'Mar', balance: 38000 },
    { month: 'Abr', balance: 42000 },
    { month: 'May', balance: 45230 },
];

export function BalanceChart() {
    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis
                        dataKey="month"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
