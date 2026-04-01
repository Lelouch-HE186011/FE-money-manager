import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                console.log('Expense list', response.data.data);
                setExpenseData(response.data.data);
            }
        } catch (error) {
            console.log('Failed to fetch expense details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    }

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                console.log('Expense Categories', response.data.data);
                setCategories(response.data.data);
            }
        } catch (error) {
            console.log('Failed to fetch expense categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    }

    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;

        if (!name.trim()) {
            toast.error("Please enter a valid name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error('Date cannot be in the future')
            return;
        }

        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });

            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense Added Successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }

        } catch (error) {
            console.log('Failed to add expense details:', error);
            toast.error(error.response?.data?.message || "Failed to add expense details");
        }
    }

    const deleteExpense = async (id) => {
        try {
            const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            if (response.status === 200) {
                setOpenDeleteAlert({show: false, data: null});
                toast.success("Expense deleted successfully");
                fetchExpenseDetails();
            }
        } catch (error) {
            console.log('Failed to delete expense details:', error);
            toast.error(error.response?.data?.message || "Failed to delete expense details");

        } finally {
            setLoading(false);
        }
    }

    const handleDownloadExpenseDetails = async () => {

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType: "blob"});
            if (response.status === 200) {
                let filename = "expense_details.xlsx";
                const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
                toast.success("Download expense details successfully");
            }
        } catch (error) {
            console.log('Failed to download expense details:', error);
            toast.error(error.response?.data?.message || "Failed to download expense details");

        }
    }

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Email sent successfully");
            }
        } catch (error) {
            console.log('Failed to send email for expense details:', error);
            toast.error(error.response?.data?.message || "Failed to send expense details");
        }
    }


    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid gird-cols-1 gap-6">
                    <div>
                        {/* overview for expense with line char*/}
                        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)}/>
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    {/* Add Expense Modal*/}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete Expense Modal*/}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this Expense details?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;