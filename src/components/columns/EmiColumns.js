const columns = [
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
        renderCell: (params) => (
            <span className="text-blue-500 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'emiAmount',
        headerName: 'EMI Amount',
        width: 160,
        sortable: true,
        editable: true,
        renderCell: (params) => (
            <span className="text-yellow-500 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'totalEMIPaid',
        headerName: 'Total EMI Paid',
        width: 160,
        sortable: true,
        editable: true,
        renderCell: (params) => (
            <span className="text-green-500 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'remainingLoanAmount',
        headerName: 'Remaining Loan Amount',
        width: 160,
        sortable: true,
        editable: true,
        renderCell: (params) => (
            <span className="text-red-500 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'totalPayment',
        headerName: 'Total Payment',
        width: 130,
        sortable: true,
        editable: true,
        renderCell: (params) => (
            <span className="text-purple-600 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'loanAmount',
        headerName: 'Loan Amount',
        width: 150,
        type: 'number',
        editable: true,
        renderCell: (params) => (
            <span className="text-orange-500 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'interestRate',
        headerName: 'Interest Rate (%)',
        width: 150,
        type: 'number',
        editable: true,
        renderCell: (params) => (
            <span className="text-amber-700 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'loanTerm',
        headerName: 'Loan Term (Months)',
        width: 180,
        type: 'number',
        editable: true,
        renderCell: (params) => (
            <span className="text-blue-700 font-semibold">
                {params.value}
            </span>
        ),
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
        width: 150,
        type: 'string',
        editable: true,
    },
    {
        field: 'endDate',
        headerName: 'End Date',
        width: 150,
        type: 'string',
        editable: true,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        type: 'string',
    },
];

export default columns;
