import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    collection,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from '../../firebase';

const schema = yup.object().shape({
    email: yup.string().email().required('Please enter email address'),
    firstName: yup.string().required('Please enter first name'),
    phoneNumber: yup.string().required('Please enter phone number'),
    address: yup.string().required('Please enter address'),
})


export default function CreateClient({ hideModal, editData }) {
    const recordsCollectionRef = collection(db, "clients");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        }
    });

    useEffect(() => {
        console.log('editData ', editData);
        reset(editData ? editData : {});
    }, [])


    const onSubmitNew = async (data) => {
        const customDocumentId = data.email;
        const userDocRef = doc(recordsCollectionRef, customDocumentId);
        data.createdAt = String(new Date());
        console.log(data);
        if (editData) {
            await updateDoc(userDocRef, data);
        } else {
            await setDoc(userDocRef, data);
        }
        hideModal();
    };

    return (
        <>
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
                    <h2 className='mt-5 text-2xl text-blue-600 ml-4'>{editData ? 'Edit' : 'Add'} Client</h2>
                    <DialogContent dividers={true}>
                        <DialogContentText
                            id="scroll-dialog-description"
                        >

                            <div className="mt-1">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    First Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="First name"
                                    {...register("firstName")}
                                />
                                {errors?.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName?.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Last Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Last Name"
                                    {...register("lastName")}
                                />
                                {errors?.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName?.message}</p>
                                )}
                            </div>


                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                {errors?.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Phone Number
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="number"
                                    placeholder="Phone Number"
                                    {...register("phoneNumber")}
                                />
                                {errors?.phoneNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber?.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Address
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Address"
                                    {...register("address")}
                                />
                                {errors?.address && (
                                    <p className="text-red-500 text-xs mt-1">{errors.address?.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    DOB
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="date"
                                    placeholder="DOB"
                                    {...register("dob")}
                                />
                                {errors?.dob && (
                                    <p className="text-red-500 text-xs mt-1">{errors.dob?.message}</p>
                                )}
                            </div>


                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Employment Status
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Employment Status"
                                    {...register("employmentStatus")}
                                />
                                {errors?.employmentStatus && (
                                    <p className="text-red-500 text-xs mt-1">{errors.employmentStatus?.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Income
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Income"
                                    {...register("income")}
                                />
                                {errors?.income && (
                                    <p className="text-red-500 text-xs mt-1">{errors.income?.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm font-semibold mb-1">
                                    Credit Score
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Credit Score"
                                    {...register("creditScore")}
                                />
                                {errors?.creditScore && (
                                    <p className="text-red-500 text-xs mt-1">{errors.creditScore?.message}</p>
                                )}
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
