import React, { useEffect, useState } from 'react';
import DataGridTable from '../components/DataGridTable';
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import Button from '@mui/material/Button';
import CreateEmi from '../components/modal/createEmi';
import columns from '../components/columns/EmiColumns';
import {
    GridActionsCellItem,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Emi = () => {
    const recordsCollectionRef = collection(db, "emis");
    const loansCollectionRef = collection(db, "loans");
    const [records, setRecords] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recordColumns, setRecordColumns] = useState(columns);
    const [loanEmails, setLoanEmails] = useState(null);

    const getClients = async () => {
        try {
            const clientsData = await getDocs(loansCollectionRef);
            const emails = clientsData.docs.map((doc) => ({ email: doc.id }));
            setLoanEmails(emails);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getClients();
        const hasActionColumn = columns.some((col) => col.field === 'actions');
        if (!hasActionColumn) {
            const actionColumn = {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 100,
                cellClassName: 'actions',
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                },
            };

            setRecordColumns([...columns, actionColumn]);
        }
        setLoading(false);
    }, []);

    const handleEditClick = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            const recordDoc = await getDoc(recordDocRef);
            if (recordDoc.exists()) {
                const recordData = { id: recordDoc.id, ...recordDoc.data() };
                // console.log('recordData ', recordData);
                setEditData(recordData);
                setShowModal(true);
            } else {
                console.log("No such document found!");
            }
        } catch (error) {
            console.error("Error fetching record:", error);
        }
    };

    const handleDeleteClick = async (id) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });


    };

    const handleDelete = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            await deleteDoc(recordDocRef);
            console.log(`Record with ID ${id} deleted successfully.`);
            setRecords((prevRecords) => prevRecords.filter(record => record.id !== id));
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    }


    const hideModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        getUsers();
    }, [showModal]);

    const getUsers = async () => {
        try {
            const records = await getDocs(recordsCollectionRef);
            const recordsData = records.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecords(recordsData);
            console.log("recordsDatas: ", recordsData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className='p-4 mx-4'>
            {showModal && (
                <CreateEmi hideModal={hideModal} editData={editData} loanEmails={loanEmails} />
            )}
            <h1 className='mt-5 text-2xl text-blue-600'>All EMIs</h1>
            <div className="flex-grow flex justify-center">
                <div className='mt-10'>
                    <div className='my-3 flex justify-end mr-4'>
                        <Button variant="outlined" size="small" onClick={() => { setEditData(null); setShowModal(true) }}>Add EMI</Button>
                    </div>
                    {!loading && (
                        <DataGridTable data={records} columns={recordColumns} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Emi;
