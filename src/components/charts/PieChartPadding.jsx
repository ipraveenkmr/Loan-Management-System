import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';


export default function PieChartWithPaddingAngle({ client, loan, emi }) {
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
                <Stack direction="row">
                    <PieChart
                        series={[
                            {
                                paddingAngle: 5,
                                innerRadius: 60,
                                outerRadius: 80,
                                data,
                            },
                        ]}
                        margin={{ right: 5 }}
                        width={200}
                        height={210}
                        legend={{ hidden: true }}
                    />
                </Stack>
            )}
        </>
    );
}
