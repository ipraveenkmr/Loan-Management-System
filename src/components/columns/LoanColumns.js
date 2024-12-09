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
        field: 'loanEMI',
        headerName: 'Loan EMI',
        width: 130,
        sortable: true,
        editable: true,
    },
    {
        field: 'totalInterest',
        headerName: 'Total Interest',
        width: 130,
        sortable: true,
        editable: true,
    },
    {
        field: 'totalPayment',
        headerName: 'Total Payment',
        width: 130,
        sortable: true,
        editable: true,
    },
    {
        field: 'loanType',
        headerName: 'Loan Type',
        width: 160,
        sortable: true,
        editable: true,
    },
    {
        field: 'loanAmount',
        headerName: 'Loan Amount',
        width: 150,
        type: 'number',
        editable: true,
    },
    {
        field: 'interestRate',
        headerName: 'Interest Rate (%)',
        width: 150,
        type: 'number',
        editable: true,
    },
    {
        field: 'loanTerm',
        headerName: 'Loan Term (Months)',
        width: 180,
        type: 'number',
        editable: true,
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
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: true,
    },
    {
        field: 'collateralName',
        headerName: 'Collateral Name',
        width: 180,
        editable: true,
    },
    {
        field: 'collateralDescription',
        headerName: 'Collateral Description',
        width: 220,
        editable: true,
    },
    {
        field: 'collateralValue',
        headerName: 'Collateral Value',
        width: 150,
        type: 'number',
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
