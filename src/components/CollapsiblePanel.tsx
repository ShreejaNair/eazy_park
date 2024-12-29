import React, { useState } from 'react';
import Cards from "./Cards";

import { CheckReport, Payment, Vehicle_details, GraphData } from '../typscript/dashboard';

const CollapsiblePanels = ({ title, ispayment, report, details, activePanel, toggleFn }: { title: string, ispayment: boolean, report: (CheckReport | Payment)[], details: Vehicle_details[], activePanel:string, toggleFn:(panel:string)=>void }) => {
    const [total, setTotal] = useState<number>(0)

    return (
        <div className='w-full'>
            <div style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <div
                    onClick={() => toggleFn(title)}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    <span>{title}</span>
                    <span>Total of: {total}</span>
                </div>
                {activePanel === title && (
                    <div style={{ padding: '10px', backgroundColor: '#fff' }}>
                        <p><Cards
                            title={title}
                            ispayment={ispayment}
                            report={report}
                            details={details}
                            setTotal={setTotal}
                        /></p>
                    </div>
                )}
            </div>

        </div>

    );
};

export default CollapsiblePanels;
