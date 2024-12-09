import { useEffect } from 'react';
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
    getDoc
} from "firebase/firestore";
import { db } from '../../firebase';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
    email: yup.string().email().required('Please enter email address'),
    loanType: yup.string().required('Please select a loan type'),
    loanAmount: yup.number().required('Please enter loan amount').positive(),
    interestRate: yup.number().required('Please enter interest rate').positive(),
    loanTerm: yup.number().required('Please enter loan term in months').positive(),
    startDate: yup.date().required('Please enter a start date'),
    endDate: yup.date().required('Please enter an end date'),
    status: yup.string().required('Please select a status'),
    collateralName: yup.string().required('Please enter collateral name'),
    collateralDescription: yup.string().required('Please enter collateral description'),
    collateralValue: yup.number().required('Please enter collateral value').positive(),
});

export default function CreateLoan({ hideModal, editData, clientEmails }) {
    const recordsCollectionRef = collection(db, "loans");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            loanType: '',
            loanAmount: '',
            interestRate: '',
            loanTerm: '',
            startDate: '',
            endDate: '',
            status: '',
            collateralName: '',
            collateralDescription: '',
            collateralValue: ''
        }
    });

    useEffect(() => {
        console.log('clientEmails', clientEmails);
        reset(editData ? editData : {});
    }, [])

    const onSubmitNew = async (data) => {
        const customDocumentId = data.email;
        const userDocRef = doc(recordsCollectionRef, customDocumentId);
        data.startDate = String(data.startDate);
        data.endDate = String(data.endDate);
        data.createdAt = String(new Date());


        // calculating EMI
        let p = parseFloat(data.loanAmount);
        let r = parseFloat(data.interestRate);
        let n = parseFloat(data.loanTerm);

        let actualRate = parseFloat(r / 12 / 100);

        let calcemi =
            p *
            actualRate *
            (Math.pow(1 + actualRate, n) / (Math.pow(1 + actualRate, n) - 1));


        data.totalPayment = Math.round(calcemi * n);
        data.totalInterest = Math.round(calcemi * n - p);
        data.loanEMI = Math.round(calcemi);


        console.log(data);

        const existingDoc = await getDoc(userDocRef);
        if (existingDoc.exists() && !editData) {
            toast('A record with this email already exists.');
            return;
        }

        if (editData) {
            await updateDoc(userDocRef, data);
        } else {
            await setDoc(userDocRef, data);
        }
        hideModal();
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
                    <h2 className='mt-5 text-2xl text-blue-600 ml-4'>{editData ? 'Edit' : 'Add'} Loan Account</h2>
                    <DialogContent dividers={true}>
                        <DialogContentText id="scroll-dialog-description">
                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Email
                                </label>
                                {editData ? (
                                    <p>
                                        {editData?.email}
                                    </p>
                                ) : (
                                    <Autocomplete
                                        className='mt-3'
                                        disablePortal
                                        id="combo-box-demo"
                                        options={clientEmails}
                                        getOptionLabel={(clientEmails) => clientEmails.email || ""}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Email" size="small" name="email" {...register("email")} />
                                        )}
                                    />
                                )}

                                {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Loan Type</label>
                                <select className="w-full px-3 py-2 border rounded" {...register("loanType")}>
                                    <option value="">Select</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Home">Home</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Education">Education</option>
                                    <option value="Business">Business</option>
                                </select>
                                {errors?.loanType && <p className="text-red-500 text-xs mt-1">{errors.loanType?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Loan Amount</label>
                                <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Loan Amount" {...register("loanAmount")} />
                                {errors?.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Interest Rate (%)</label>
                                <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Interest Rate" {...register("interestRate")} />
                                {errors?.interestRate && <p className="text-red-500 text-xs mt-1">{errors.interestRate?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Loan Term (Months)</label>
                                <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Loan Term in Months" {...register("loanTerm")} />
                                {errors?.loanTerm && <p className="text-red-500 text-xs mt-1">{errors.loanTerm?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Start Date</label>
                                <input className="w-full px-3 py-2 border rounded" type="date" {...register("startDate")} />
                                {errors?.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">End Date</label>
                                <input className="w-full px-3 py-2 border rounded" type="date" {...register("endDate")} />
                                {errors?.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Status</label>
                                <select className="w-full px-3 py-2 border rounded" {...register("status")}>
                                    <option value="">Select</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approve">Approve</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Close">Close</option>
                                </select>
                                {errors?.status && <p className="text-red-500 text-xs mt-1">{errors.status?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Collateral Name</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" placeholder="Collateral Name" {...register("collateralName")} />
                                {errors?.collateralName && <p className="text-red-500 text-xs mt-1">{errors.collateralName?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Collateral Description</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" placeholder="Collateral Description" {...register("collateralDescription")} />
                                {errors?.collateralDescription && <p className="text-red-500 text-xs mt-1">{errors.collateralDescription?.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold mb-1">Collateral Value</label>
                                <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Collateral Value" {...register("collateralValue")} />
                                {errors?.collateralValue && <p className="text-red-500 text-xs mt-1">{errors.collateralValue?.message}</p>}
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
