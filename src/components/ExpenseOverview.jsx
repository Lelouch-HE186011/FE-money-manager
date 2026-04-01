import {useMemo} from "react";
import { Plus } from "lucide-react";
import {prepareExpenseLineChartData} from "../util/prepareExpenseLineChartData.js";
import CustomLineChart from "./CustomLineChart.jsx";

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const chartData = useMemo(() => {
        return prepareExpenseLineChartData(transactions);
    }, [transactions]);

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Expense Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending over time and analyze your expense trends.
                    </p>
                </div>
                <button
                    className="add-btn flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
                    onClick={onAddExpense}>
                    <Plus size={15} className="text-lg"/> Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData} color="#a0090e" />
            </div>
        </div>
    )
}

export default ExpenseOverview;
