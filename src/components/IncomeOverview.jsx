import {useMemo} from "react";
import { Plus } from "lucide-react";
import {prepareIncomeLineChartData} from "../util/prepareIncomeLineChartData.js";
import CustomLineChart from "./CustomLineChart.jsx";

const IncomeOverview = ({transactions, onAddIncome}) => {
    const chartData = useMemo(() => {
        return prepareIncomeLineChartData(transactions);
    }, [transactions]);

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button
                    className="add-btn flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
                    onClick={onAddIncome}>
                    <Plus size={15} className="text-lg"/> Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData}/>
            </div>
        </div>
    )
}

export default IncomeOverview;