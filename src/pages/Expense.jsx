import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";

const Expense = () => {
    useUser();
    return (
        <Dashboard activeMenu="Expense">
            This is expense page
        </Dashboard>
    )
}

export default Expense;