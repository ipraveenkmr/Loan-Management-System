const columns = [
    {
        field: 'firstName',
        headerName: 'Full name',
        sortable: true,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 150,
        editable: true,
    },
    {
        field: 'employmentStatus',
        headerName: 'Employment Status',
        width: 200,
        editable: true,
    },
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
        field: 'creditScore',
        headerName: 'Credit Score',
        width: 150,
        editable: true,
    },
    {
        field: 'dob',
        headerName: 'DOB',
        width: 150,
        editable: true,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        type: 'string',
        width: 200,
        editable: true,
    },

];

export default columns;
