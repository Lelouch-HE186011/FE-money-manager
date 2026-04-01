import {ArrowRight} from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({transactions, onMore}) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">Recent Transactions</h4>

                <button
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition"
                    onClick={onMore}>
                    More <ArrowRight className="text-base" size={15}/>
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format('DD-MM-YYYY')}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions;