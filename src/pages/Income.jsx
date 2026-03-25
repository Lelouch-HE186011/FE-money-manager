import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                console.log('Income list', response.data.data);
                setIncomeData(response.data.data);
            }
        } catch (error) {
            console.log('Failed to fetch income details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
    }, [])

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid gird-cols-1 gap-6">
                    <div>
                        {/* overview for income with line char*/}
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => console.log('deleting the income', id)}
                    />
                </div>
            </div>
        </Dashboard>
    )
}

export default Income;