import {addThousandsSeparator} from "../util/utils.js";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLORS = ["#59168B", "#a0090e", "#016630"];

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Expense", amount: totalExpense},
        {name: "Total Income", amount: totalIncome},
    ];
    return (
        <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg">Finance Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`${addThousandsSeparator(totalBalance)} VNĐ`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;