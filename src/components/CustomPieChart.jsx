import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    
    // Lọc bỏ những phần tử có giá trị 0 hoặc nullish
    const activeData = data.filter(d => d && d.amount > 0);

    const renderCustomizedLabel = () => {
        if (!showTextAnchor) return null;
        return (
            <>
                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-600 text-sm font-medium">
                    {label}
                </text>
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900 text-lg sm:text-xl font-bold">
                    {totalAmount}
                </text>
            </>
        );
    };

    const renderLegend = () => {
        return (
            <ul className="flex justify-center flex-wrap gap-6 mt-4">
                {activeData.map((entry, index) => {
                    const originalColorIndex = data.findIndex(d => d.name === entry.name);
                    return (
                        <li key={`item-${index}`} className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: colors[originalColorIndex % colors.length] }}
                            />
                            <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                        </li>
                    )
                })}
            </ul>
        );
    };

    return (
        <div className="w-full h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={activeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={130}
                        paddingAngle={0}
                        dataKey="amount"
                        stroke="none"
                    >
                        {activeData.map((entry, index) => {
                            // Find the original color index
                            const colorIndex = data.findIndex(d => d.name === entry.name);
                            return <Cell key={`cell-${index}`} fill={colors[colorIndex % colors.length]} />;
                        })}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => `${value.toLocaleString('vi-VN')} VNĐ`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    {renderCustomizedLabel()}
                    <Legend content={renderLegend} verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;
