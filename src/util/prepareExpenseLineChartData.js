import moment from "moment";

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedData = sortedData.reduce((acc, item) => {
        const date = moment(item.date).format("DD/MM/YYYY");
        if (!acc[date]) {
            acc[date] = {
                date,
                amount: 0,
                transactions: []
            };
        }
        acc[date].amount += item.amount;
        acc[date].transactions.push(item);
        return acc;
    }, {});

    return Object.values(groupedData);
};
