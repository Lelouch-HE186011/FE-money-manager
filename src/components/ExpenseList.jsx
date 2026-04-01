import {Download, LoaderCircle, Mail} from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";

const ExpenseList = ({transactions, onDelete, onDownload, onEmail}) => {
    const [isEmailing, setIsEmailing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleEmail = async () => {
        setIsEmailing(true);
        try {
            await onEmail();
        } finally {
            setIsEmailing(false);
        }
    }
    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await onDownload();
        } finally {
            setIsDownloading(false);
        }
    }
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">
                    Expense Sources
                </h5>

                <div className="flex items-center gap-2">
                    <button
                        disabled={isEmailing}
                        onClick={handleEmail}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-red-100 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                    >
                        {isEmailing ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="text-base"/>Email
                            </>
                        )}
                    </button>

                    <button
                        disabled={isDownloading}
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-red-100 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                    >
                        {isDownloading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin"/>
                                Downloading...
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
                {/* display the expenses */}
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format('DD/MM/YYYY')}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ExpenseList;
