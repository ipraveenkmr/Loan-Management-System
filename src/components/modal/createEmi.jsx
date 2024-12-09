import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from '../../firebase';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
    email: yup.string().email().required('Please enter email address'),
    emiAmount: yup.number().required('Please enter loan term in months').positive(),
    paidOnDate: yup.date().required('Please enter a start date'),
});

export default function CreateEmi({ hideModal, editData, loanEmails }) {
    const recordsCollectionRef = collection(db, "emis");
    const loansCollectionRef = collection(db, "loans");
    const [loanRecord, setLoanRrecord] = useState(null);


    const getLoanRecords = async (data) => {
        // console.log('rowdata ', data);
        if (data?.email !== undefined && data?.email !== null) {
            const customDocumentId = data?.email;
            const userDocRef = doc(loansCollectionRef, customDocumentId);
            const existingDoc = await getDoc(userDocRef);

            if (existingDoc.exists()) {
                const { id, ...loanData } = existingDoc.data(); // Exclude `id` from the document data
                // console.log("Filtered Loan Data:", loanData);
                setLoanRrecord(loanData); // Set the filtered data
            } else {
                console.log("No such document!");
                setLoanRrecord(null);
            }
        } else {
            setLoanRrecord(null);
        }
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            emiAmount: '',
            paidOnDate: '',
        }
    });

    useEffect(() => {
        if (editData) {
            const formattedEditData = {
                ...editData,
                paidOnDate: editData.paidOnDate
                    ? new Date(editData.paidOnDate).toISOString().split("T")[0]
                    : '',
            };

            reset(formattedEditData);
            setLoanRrecord(formattedEditData);
        } else {
            reset({});
        }
    }, [editData, reset]);


    const onSubmitNew = async (data) => {
        data.paidOnDate = String(data.paidOnDate);
        data.createdAt = String(new Date());

        if (!loanRecord) {
            toast.error("Loan record not found for the selected email!");
            return;
        }

        try {
            // Fetch all EMI records for the given email
            const emiQuerySnapshot = await getDocs(query(recordsCollectionRef, where("email", "==", data.email)));

            const totalEMIPaid = emiQuerySnapshot.docs.reduce((total, doc) => {
                const emiData = doc.data();
                return total + (Number(emiData.emiAmount) || 0);
            }, 0) + Number(data.emiAmount);

            const remainingLoanAmount = loanRecord.totalPayment - totalEMIPaid;

            if (remainingLoanAmount < 0) {
                toast.error("EMI exceeds the remaining loan amount!");
                return;
            }

            const updatedData = {
                ...data,
                ...loanRecord,
                totalEMIPaid,
                remainingLoanAmount,
            };

            const loanDocRef = doc(loansCollectionRef, data.email);
            await updateDoc(loanDocRef, { totalEMIPaid, remainingLoanAmount });

            const userDocRef = editData
                ? doc(recordsCollectionRef, editData.id) // Existing document
                : doc(recordsCollectionRef); // New document

            if (editData) {
                const docSnap = await getDoc(userDocRef);
                if (!docSnap.exists()) {
                    toast.error("Document not found for editing!");
                    return;
                }
                await updateDoc(userDocRef, updatedData);
            } else {
                await setDoc(userDocRef, updatedData);
            }

            hideModal();
            toast.success("EMI added successfully!");
        } catch (error) {
            console.error("Error updating EMI records:", error);
            toast.error("Failed to process EMI. Please try again.");
        }
    };


    return (
        <>
            <Toaster />
            <Dialog
                open={true}
                onClose={hideModal}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <form onSubmit={handleSubmit(onSubmitNew)}
                    className="w-full max-w-md p-2 space-y-4"
                >
                    <h2 className='mt-5 text-2xl text-blue-600 ml-4'>{editData ? 'Edit' : 'Add'} EMI</h2>
                    <DialogContent dividers={true}>
                        <DialogContentText id="scroll-dialog-description">

                            {loanRecord && (
                                <div>
                                    <div className="flex">
                                        <div>
                                            Email:
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.email}
                                        </div>
                                    </div>
                                    <div className="flex mt-1">
                                        <div>
                                            Loan Amount:
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.loanAmount}
                                        </div>
                                    </div>
                                    <div className="flex mt-1">
                                        <div>
                                            Interest Rate:
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.interestRate}
                                        </div>
                                    </div>
                                    <div className="flex mt-1">
                                        <div>
                                            Loan Term (in months):
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.loanTerm}
                                        </div>
                                    </div>
                                    <div className="flex mt-1">
                                        <div>
                                            Loan EMI:
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.loanEMI}
                                        </div>
                                    </div>
                                    <div className="flex mt-1">
                                        <div>
                                            Total Interest:
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.totalInterest}
                                        </div>
                                    </div>
                                    <div className="flex mt-1">
                                        <div>
                                            Total Payment:
                                        </div>
                                        <div className='font-semibold ml-2'>
                                            {loanRecord?.totalPayment}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!loanRecord && (
                                <div className="mt-4">
                                    <label htmlFor="email" className="text-sm font-semibold mb-1">
                                        Email
                                    </label>
                                    <Autocomplete
                                        className='mt-3'
                                        disablePortal
                                        id="combo-box-demo"
                                        onChange={(e, v) => getLoanRecords(v)}
                                        options={loanEmails}
                                        getOptionLabel={(loanEmails) => loanEmails.email || ""}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Email" size="small" name="email" {...register("email")} />
                                        )}
                                    />
                                    {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
                                </div>
                            )}
                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">EMI Amount</label>
                                <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Loan Term in Months" {...register("emiAmount")} />
                                {errors?.emiAmount && <p className="text-red-500 text-xs mt-1">{errors.emiAmount?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Paid On Date</label>
                                <input className="w-full px-3 py-2 border rounded" type="date" name="paidOnDate" {...register("paidOnDate")} />
                                {errors?.paidOnDate && <p className="text-red-500 text-xs mt-1">{errors.paidOnDate?.message}</p>}
                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideModal}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
