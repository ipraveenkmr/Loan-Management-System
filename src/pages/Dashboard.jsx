import React, { useEffect, useState } from 'react';
import {
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import StackedBarChart from '../components/charts/BarChart';
import StackedAreaChart from '../components/charts/AreaChart';
import BiaxialLineChart from '../components/charts/LineChart';
import { useTheme } from '@mui/material/styles';
import TwoSimplePieChart from "../components/charts/PieChart";
import PieChartWithPaddingAngle from "../components/charts/PieChartPadding";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Dashboard = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isLoaded, setIsLoaded] = useState(false);
    const [clientsCount, setClientsCount] = useState(0);
    const [loanAccountsCount, setLoanAccountsCount] = useState(0);
    const [emiAccountsCount, setEmiAccountsCount] = useState(0);
    const [loanDistributed, setLoanDistributed] = useState(0);
    const [loanCollected, setLoanCollected] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch total clients
                const clientsSnapshot = await getDocs(collection(db, 'clients'));
                setClientsCount(clientsSnapshot.size);

                // Fetch total loan accounts
                const loanAccountsSnapshot = await getDocs(collection(db, 'loans'));
                setLoanAccountsCount(loanAccountsSnapshot.size);

                const loanData = loanAccountsSnapshot.docs.map((doc) => doc.data());
                const totalLoanDistributed = loanData.reduce(
                    (sum, item) => sum + item.loanAmount,
                    0
                );
                setLoanDistributed(totalLoanDistributed);

                const emisSnapshot = await getDocs(collection(db, 'emis'));
                setEmiAccountsCount(emisSnapshot.size);
                const emisData = emisSnapshot.docs.map((doc) => doc.data());

                const totalLoanCollected = emisData.reduce(
                    (sum, item) => sum + item.totalEMIPaid,
                    0
                );
                setLoanCollected(totalLoanCollected);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-4">
            <div className="grid grid-cols-10 gap-4">
                <div className="col-span-7 min-h-[88vh]">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Total Clients */}
                        <div className={`rounded-lg flex justify-center p-2 shadow-md min-h-[100px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div className="flex">
                                <div className="bg-purple-100 rounded-full my-5 p-5">
                                    <PeopleAltIcon className="text-purple-500" />
                                </div>
                                <div className="ml-5 mt-6">
                                    <div className="font-semibold">
                                        <span className="text-xl">{clientsCount}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-semibold">
                                        Clients
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Total Loan Accounts */}
                        <div className={`rounded-lg flex justify-center p-2 shadow-md min-h-[100px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div className="flex">
                                <div className="bg-blue-100 rounded-full my-5 p-5">
                                    <CreditScoreIcon className="text-blue-500" />
                                </div>
                                <div className="ml-5 mt-6">
                                    <div className="font-semibold">
                                        <span className="text-xl">{loanAccountsCount}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 font-semibold">
                                        Loan Accounts
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Loan Distributed */}
                        <div>
                            <div className={`rounded-lg flex justify-center p-1 shadow-md min-h-[50px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <div className="flex">
                                    <div className="bg-yellow-100 rounded-full my-2 p-1">
                                        <AccountBalanceIcon className="text-yellow-500" />
                                    </div>
                                    <div className="ml-5 mt-1">
                                        <div className="font-semibold">
                                            <span className="text-lg">₹{loanDistributed}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 font-semibold">
                                            Loan Distributed
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Loan Collected */}
                            <div className={`rounded-lg mt-2 flex justify-center p-1 shadow-md min-h-[50px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <div className="flex">
                                    <div className="bg-red-100 rounded-full my-2 p-1">
                                        <AccountBalanceWalletIcon className="text-red-500" />
                                    </div>
                                    <div className="ml-5 mt-1">
                                        <div className="font-semibold">
                                            <span className="text-lg">₹{loanCollected}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 font-semibold">
                                            Loan Collected
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Charts */}
                    <div className={`mt-4 rounded-lg flex justify-center p-2 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <BiaxialLineChart />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className={`rounded-lg flex justify-center p-2 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <TwoSimplePieChart client={clientsCount} loan={loanAccountsCount} emi={emiAccountsCount} />
                        </div>
                        <div className={`rounded-lg flex justify-center p-2 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <PieChartWithPaddingAngle client={clientsCount} loan={loanAccountsCount} emi={emiAccountsCount} />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 min-h-[88vh]">
                    <div className={`rounded-lg flex justify-center p-2 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <StackedAreaChart />
                    </div>
                    <div className={`rounded-lg flex justify-center p-2 mt-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <StackedBarChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
