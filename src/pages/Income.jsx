import Dashboard from "../components/Dashboard.jsx";
import useUser from "../hooks/useUser.jsx";

const Income = () => {
    useUser();
    return (
        <Dashboard activeMenu="Income">
            This is income page
        </Dashboard>
    )
}

export default Income;