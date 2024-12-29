
import DonutChart from 'react-donut-chart';
import { CheckReport, Payment, Vehicle_details, GraphData } from '../typscript/dashboard';
import { useEffect, useState } from 'react';
const Cards = ({ title, ispayment, report, details, setTotal }: { title: string, ispayment:boolean, report: (CheckReport | Payment)[], details: Vehicle_details[], setTotal: (total: number) => void; }) => {


    
    const [graphData, setGraphData] = useState<GraphData[]>([])
    const [vehicle, setVehicle] = useState<Vehicle_details>({})

    useEffect(() => {
        setVehicle(Object.assign({}, ...details))
        const sum = report.reduce((a, c) => {
            if ('vehiclecount' in c) {
                return a + c.vehiclecount;
            } else if ('amountcollected' in c) {
                return a + c.amountcollected / 100;
            }
            return a;
        }, 0)
        console.log("Sum of", sum)
        setTotal(sum)
        let data: GraphData[] = []
        report.forEach((item) => {

            if ('vehiclecount' in item && Object.keys(vehicle).length > 0) {
                let label = vehicle[item.vehicletype].type_name || ""
                data.push({ label: label, value: item.vehiclecount })
            } else if ('amountcollected' in item && Object.keys(vehicle).length > 0) {
                let label = vehicle[item.paymentmode].type_name || ""
                data.push({ label: label, value: (item.amountcollected/100) })
            }
        })
        setGraphData(data)
    }, [report, details])

    return (
        <div >
            <div className="card bg-body rounded border-0">
                
                <div className="card-body p-3">
                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                        
                        <div id="orderStatisticsChart">
                            {ispayment? (
                                
                                    <DonutChart width={120} height={120} legend={false} strokeColor={"#fff"}
                                        colors={["#03c3ec", "#71dd37", "#696cff", "#919cab"]} innerRadius={0.75}
                                        data={graphData}
                                    />

                                
                            ):""}
                        </div>
                    </div> */}
                    <ul className="p-0 m-0">
                        {report.map((val, index) => {
                            let image1: string = ""
                            let name: string = ""
                            let amount: string = ""

                            if ('vehicletype' in val && Object.keys(vehicle).length > 0) {
                                image1 = `data:image/png;base64,${vehicle[val.vehicletype].image}`;
                                name = vehicle[val.vehicletype].type_name
                                amount = ""+val.vehiclecount
                            } else if ('amountcollected' in val && Object.keys(vehicle).length > 0) {
                                image1 = "payment.svg"
                                name = vehicle[val.paymentmode].type_name
                                amount = `₹ ${val.amountcollected/100}`

                            }
                            return (
                                <li key={index} className="d-flex mb-4 pb-1">
                                    <div className="avatar flex-shrink-0 rounded" style={{ width: "20%", marginRight: "17px" }}>
                                        <span className="avatar-initial rounded bg-label-primary">
                                            <img className='img-fluid' src={image1} />
                                        </span>
                                    </div>
                                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                        <div className="me-2 ">
                                            <h6 className="mb-0">{name}</h6>

                                        </div>
                                        <div className="user-progress">
                                            <small className="fw-medium">{amount}</small>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}



                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;