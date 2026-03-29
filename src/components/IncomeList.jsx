import {Download, LoaderCircle, Mail} from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {
    const [loading, setLoading] = useState(false);
    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        } finally {
            setLoading(false);
        }
    }
    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">
                    Income Sources
                </h5>

                <div className="flex items-center gap-2">
                    <button
                        disabled={loading}
                        onClick={handleEmail}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-purple-100 hover:text-purple-600 hover:border-purple-200 transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animated-spin"/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="text-base"/>Email
                            </>
                        )}
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-purple-100 hover:text-purple-600 hover:border-purple-200 transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animated-spin"/>
                                Dowloading...
                            </>
                        ) : (
                            <>
                                <Download size={15} className="text-base"/>Download
                            </>
                        )}

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
                        date={moment(income.date).format('DD/MM/YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default IncomeList;