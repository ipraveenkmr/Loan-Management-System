import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function TwoSimplePieChart({ client, loan, emi }) {
    const [data, setData] = useState([]);

    useEffect(() => {

        const formattedData = [
            { label: 'Clients', value: client },
            { label: 'Loans', value: loan },
            { label: 'EMI', value: emi },
        ];

        setData(formattedData);
    }, [client, loan, emi]);

    return (
        <>
            {data.length > 0 && (
                <PieChart
                    series={[
                        {
                            outerRadius: 80,
                            data: data,
                        },
                    ]}
                    height={210}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                />
            )}
        </>
    );
}
