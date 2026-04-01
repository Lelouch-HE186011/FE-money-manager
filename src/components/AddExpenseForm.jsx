import {useState, useEffect} from "react";
import EmojiPickerPopup from "../components/EmojiPickerPopup.jsx";
import Input from "../components/Input.jsx";
import {LoaderCircle} from "lucide-react";

const AddExpenseForm = ({onAddExpense, categories}) => {
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categories && categories.length > 0 && !expense.categoryId) {
            setExpense(prev => ({
                ...prev,
                categoryId: categories[0].id
            }));
        }
    }, [categories, expense.categoryId]);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setExpense({...expense, [key]: value});
    }

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={(e) => handleChange('name', e.target.value)}
                label="Expense Source"
                placeholder="e.g., Rent, Groceries, Bills"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label="Amount"
                placeholder="e.g., 500"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    disabled={loading}
                    onClick={handleAddExpense}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/> Adding...
                        </>
                    ) : (
                        <>
                            Add Expense
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm;
