import React, { useState } from 'react';
import Cards from "./Cards";

import { CheckReport, Payment, Vehicle_details, GraphData } from '../typscript/dashboard';

const CollapsiblePanels = ({ title, ispayment, report, details, activePanel, toggleFn }: { title: string, ispayment: boolean, report: (CheckReport | Payment)[], details: Vehicle_details[], activePanel:string, toggleFn:(panel:string)=>void }) => {
    const [total, setTotal] = useState<number>(0)

    return (
        <div className='w-full '>
            <div style={{ marginBottom: '10px' }}>
                <div
                    onClick={() => toggleFn(title)}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0px 15px',
                        backgroundColor: '#57358b',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        height: '77px',
                        alignItems: 'center',
                        color: 'white',
                        borderRadius:'10px'
                    }}
                >
                    <span>{title}</span>
                    <span>Total {ispayment?"₹ ":""}{total}</span>
                </div>
                {activePanel === title && (
                    <div className='shadow-sm' style={{ padding: '0px', backgroundColor: '#fff' }}>
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
