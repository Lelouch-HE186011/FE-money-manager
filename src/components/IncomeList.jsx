import {Download, Mail} from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const IncomeList = ({transactions, onDelete}) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">
                    Income Sources
                </h5>

                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-purple-100 hover:text-purple-600 hover:border-purple-200 transition-all duration-200"
                    >
                        <Mail size={15} className="text-base"/>Email
                    </button>

                    <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-purple-100 hover:text-purple-600 hover:border-purple-200 transition-all duration-200"
                    >
                        <Download size={15} className="text-base"/>Download
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* display the incomes*/}
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onClick={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default IncomeList;