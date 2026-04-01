import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label, color = "#8b5cf6" }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-lg min-w-[150px]">
                <p className="font-semibold text-sm mb-2 text-gray-800">{label}</p>
                <div className="border-t border-gray-200 py-2 pb-2">
                    <p className="text-sm font-bold flex items-center justify-between text-gray-800">
                        Total:<span style={{color: color}} className="ml-4">{payload[0].value.toLocaleString('vi-VN')} VNĐ</span>
                    </p>
                </div>
                <div className="border-t border-gray-200 pt-2">
                    <p className="text-xs text-gray-500 mb-1">Details:</p>
                    {payload[0].payload.transactions.map((t, index) => (
                        <div key={index} className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>{t.name}:</span>
                            <span className="ml-4">{t.amount.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data, color = "#8b5cf6" }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                    <linearGradient id={`colorAmount-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                    dataKey="date" 
                    tick={{ fill: "#4b5563", fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickMargin={10} 
                />
                <YAxis 
                    width={80}
                    tick={{ fill: "#4b5563", fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickMargin={10}
                />
                <Tooltip 
                    content={<CustomTooltip color={color} />} 
                    cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: "4 4" }} 
                />
                <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke={color} 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill={`url(#colorAmount-${color.replace('#','')})`}
                    dot={{ r: 4, fill: color, stroke: color, strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: color, stroke: "#fff", strokeWidth: 2 }} 
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
