import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Payment,
  Vehicle_details
} from "../typscript/dashboard";

const StackedBar = ({ labels, sales, details }: { labels: string[], sales: Payment[][], details: Vehicle_details[] }) => {
  type ChartDataEntry = {
    month: string;
    [vehicleType: string]: number | string;
  };
  const [chartData, setChartData] = useState<ChartDataEntry[]>([]);

  // Sample data
  const vehicleDetails: Vehicle_details[] = details;
  const paymentData: Payment[][] = sales;

  useEffect(() => {
    // Map vehicle ID to type_name
    const vehicleMap: Record<number, string> = Object.fromEntries(
      vehicleDetails.map((vehicle) => {
        const id = Number(Object.keys(vehicle)[0]);
        return [id, vehicle[id].type_name];
      })
    );
    console.log("vehicle ", vehicleMap)
    // Prepare chart data
    const months = labels;
    const processedData: ChartDataEntry[] = paymentData.map((monthData, index) => {
      const month = months[index];
      const vehicleTotals: Record<string, number> = monthData.reduce(
        (totals, payment) => {
          const vehicleType = vehicleMap[payment.paymentmode] || "Unknown";
          totals[vehicleType] = (totals[vehicleType] || 0) + (payment.amountcollected / 100);
          return totals;
        },
        {} as Record<string, number>
      );
      return { month, ...vehicleTotals };
    });

    setChartData(processedData);
  }, [vehicleDetails, paymentData]);


  const getAllKeys = (data: Array<Record<string, any>>): string[] => {
    const allKeys = new Set<string>();

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "month") { // Exclude "month" if it's not a data key
          allKeys.add(key);
        }
      });
    });

    return Array.from(allKeys); // Convert Set to Array
  };
  const allKeys = getAllKeys(chartData);
  return (
    <div className="col-md-6 col-lg-4 col-xl-6 order-0 mb-4">
      <div className="card shadow-sm mb-5 bg-body rounded border-0">
        <div className="card-header d-flex align-items-center justify-content-between p-4 border-0" style={{ background: "#e3e3e3" }}>
          <div className="card-title mb-0">
            <h5 className="m-0 me-2">Sales</h5>
          </div>
          
        </div>
        <div className="card-body p-4">
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex flex-column gap-1">
              
            </div>

          </div> */}
          <ResponsiveContainer  width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {chartData.length > 0 &&
                    allKeys.map((key) => (
                      <Bar key={key} dataKey={key} stackId="a" fill={getColor(key)} />
                    ))}
                </BarChart>
              </ResponsiveContainer>
        </div>
      </div>
    </div>
    

  );





  function getColor(type: string): string {
    const colors: Record<string, string> = {
      Cash: "#8884d8",
      Online: "#82ca9d",
      Unknown: "#ffc658",
    };
    return colors[type] || "#000000";
  }
};

export default StackedBar;
