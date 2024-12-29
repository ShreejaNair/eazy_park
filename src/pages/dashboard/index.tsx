import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";
import moment from "moment";
import {
  dashboard,
  getAllVehicles,
  getAllPaymentTypes,
  getCustomParkingDashboardReportByDate,
} from "../../services/apiService";
import { toast } from "react-toastify";
import { getFacilityList } from "../../services/apiService";
import {
  CheckReport,
  Payment,
  Payment_details,
  Vehicle,
  Vehicle_details,
  Payment_Type,
} from "../../typscript/dashboard";
import StackedBar from "../../components/StackedBar";
import CollapsiblePanels from "../../components/CollapsiblePanel";
import checks from '../../data/checkIn.json'
import vehicleData from '../../data/vehicle.json'
import paymentData from  '../../data/payment.json'
import Datatables from "../../components/Datatable";


const Dashboard = () => {
  const [checkIn, setCheckIn] = useState<CheckReport[]>([]);
  const [checkOut, setCheckOut] = useState<CheckReport[]>([]);
  const [paymentMode, setPaymentmode] = useState<Payment[]>([]);
  const [facilityList, setFacilityList] = useState<any>([]);
  const [vehicles, setVehicles] = useState<Vehicle_details[]>([]);
  const [otherFaciltyAccess, setOtherFacilityAccess] = useState<boolean>(false);
  const [label, setLabel] = useState<string[]>([]);
  const [last3MnthSales, setLast3MnthSales] = useState<Payment[][]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const [selectedFacilityName, setSelectedFacilityName] = useState<
    string | null
  >(null);
  const [paymentType, setPaymentType] = useState<Vehicle_details[]>([]);
  const token: string = localStorage.getItem("token") || "";
  const allFacilityValue = { facilityid: "all", name: "All" };
  const role = localStorage.getItem("role");
  const [activePanel, setActivePanel] = useState<string>("Check In");

    const togglePanel = (panel: string) => {
        setActivePanel(activePanel === panel ? "" : panel);
    };
    
  useEffect(() => {
    try {
      const getReport = async () => {
        console.log("rofff")
        let id = localStorage.getItem("facilityId") || "";
        const facilityId = "29";
        const date = moment().format("DD-MMM-YYYY");
        // const date = "14-Dec-2024";
        // const response = await dashboard(facilityId, token, date);
        //temporary changes
        const response = checks
        // if (response?.data?.data?.[0]) {
        //   setCheckIn(response.data.data[0]?.checkin || []);
        //   setCheckOut(response.data.data[0]?.checkout || []);
        //   setPaymentmode(response.data.data[0]?.payment || []);
        // }
        //temporary changes if loop
        if (response?.data?.[0]) {
          let checkin = response.data[0].checkin
          console.log("jhgfj",typeof(response.data[0].checkin))
          setCheckIn(checkin);
          setCheckOut(response.data[0].checkout);
          setPaymentmode(response.data[0].payment || []);
        }
      };
      if (role && token && Number(role) != 5001) {
        getReport();
      }
      getReport();
    } catch (error) {
      toast.error("Something went wrong, Try again Later");
    }
  }, []);

  useEffect(() => {
    let id: string = localStorage.getItem("facilityId") || "";
    if (role && token && Number(role) == 5001) {
      setSelectedFacilityId("all");
      setSelectedFacilityName("All");
    } else {
      setSelectedFacilityId(id);
      setSelectedFacilityName(localStorage.getItem("facilityName"));
    }
    getVehicles();
    getAllPayments();
    getFacility();
    getThreeMonthsSale(id);
  }, []);

  const getThreeMonthsSale = async (id: string) => {
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) =>
      moment()
        .subtract(2 - i, "months")
        .format("MMMM")
    );
    setLabel(lastThreeMonths);
    let data = [];
    for await (const mnth of lastThreeMonths) {
      let start = moment().month(mnth).startOf("month").format("DD-MMM-YYYY");
      let end = moment().month(mnth).endOf("month").format("DD-MMM-YYYY");
      let facilityId = id || "";
      let response = await getCustomParkingDashboardReportByDate(
        facilityId,
        token,
        start,
        end
      );
      if (response?.data?.data?.[0]?.payment) {
        data.push(response?.data?.data[0]?.payment);
      }
    }
    setLast3MnthSales(data);
  };

  const getAllPayments = async () => {
    try {
      // const response = await getAllPaymentTypes(token);
      const response = paymentData;
      console.log("pay",response.data.options)
      let data: Vehicle_details[] = [];
      let pay = null;
      if (response?.data?.options?.[0]) {
        pay = response.data.options;
        pay.forEach((pay_type: Payment_Type) => {
          data.push({
            [pay_type.statuscode]: { type_name: pay_type.status, image: "" },
          });
        });
        setPaymentType(data);
      }
    } catch (error) {
      console.log("getAllPayments - error", error);
      toast.error("Something went wrong Payment, Try again Later");
    }
  };

  const getVehicles = async () => {
    try {
      // const response = await getAllVehicles(token);
      const response = vehicleData;
      console.log("vehicles", response.data.details)
      let data: Vehicle_details[] = [];
      let vehicle = null;
      if (response?.data?.details?.[0]) {
        vehicle = response.data.details;
        vehicle.forEach((element: Vehicle) => {
          data.push({
            [element.type_id]: {
              type_name: element.type_name,
              image: element.image,
            },
          });
        });
        setVehicles(data);
      }
    } catch (error) {
      toast.error("Something went wrong Vehicle, Try again Later");
    }
  };

  const getFacility = async () => {
    try {
      const role = localStorage.getItem("role");
      if (role && token && Number(role) == 5001) {
        setOtherFacilityAccess(true);
        const deviceUniqueId = "Web1";
        const response = await getFacilityList(deviceUniqueId, token);
        console.log("response", response);
        if (response?.data?.groupmapping?.data) {
          setFacilityList([
            allFacilityValue,
            ...response.data.groupmapping.data,
          ]);
          const currentDate = moment().format("DD-MMM-YYYY");
          const ids = response.data.groupmapping.data
            .filter(
              (facility: any) =>
                facility.facilityid !== "all" && facility.facilityid !== "28"
            )
            .map((facility: any) => facility.facilityid)
            .join(",");
          handleFilterchange(ids, currentDate, currentDate);
        } else {
          toast.error(
            response?.data?.message || "Somehing went wrong. try again."
          );
          if (
            response?.data?.relogin ||
            response?.data?.message
              .toString()
              .toLowerCase()
              .includes("not logged")
          ) {
            localStorage.clear();
            window.location.href = "/login";
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong. try later");
    }
  };

  const setAllFacilityReports = (data: any) => {
    let allCheckIn: any = {};
    let allCheckOut: any = {};
    let allPayment: any = {};

    data.forEach((facility: any) => {
      facility.checkin.forEach((checkin: any) => {
        if (!allCheckIn[checkin.vehicletype]) {
          allCheckIn[checkin.vehicletype] = {
            vehicletype: checkin.vehicletype,
            vehicletypename: checkin.vehicletypename,
            vehiclecount: 0,
          };
        }
        allCheckIn[checkin.vehicletype].vehiclecount += checkin.vehiclecount;
      });
      facility.checkout.forEach((checkout: any) => {
        if (!allCheckOut[checkout.vehicletype]) {
          allCheckOut[checkout.vehicletype] = {
            vehicletype: checkout.vehicletype,
            vehicletypename: checkout.vehicletypename,
            vehiclecount: 0,
          };
        }
        allCheckOut[checkout.vehicletype].vehiclecount += checkout.vehiclecount;
      });

      facility.payment.forEach((payment: any) => {
        if (!allPayment[payment.paymentmode]) {
          allPayment[payment.paymentmode] = {
            paymentmode: payment.paymentmode,
            amountcollected: 0,
          };
        }
        allPayment[payment.paymentmode].amountcollected +=
          payment.amountcollected;
      });
    });
    setCheckIn(Object.values(allCheckIn) || []);
    setCheckOut(Object.values(allCheckOut) || []);
    setPaymentmode(Object.values(allPayment) || []);
  };

  const getReportByDate = async (
    facilityId: string,
    fromDate: string,
    toDate: string
  ) => {
    try {
      const response = await getCustomParkingDashboardReportByDate(
        facilityId,
        token,
        fromDate,
        toDate
      );
      console.log("Response-------", JSON.stringify(response.data.data));
      if (response?.data?.data[1]) {
        setAllFacilityReports(response.data.data);
      } else if (response?.data?.data[0]) {
        setCheckIn(response?.data?.data[0]?.checkin || []);
        setCheckOut(response?.data?.data[0]?.checkout || []);
        setPaymentmode(response?.data?.data[0]?.payment || []);
      }
    } catch (error) {
      console.log("getReportByDate-Error", error);
      // toast.error("Something went wrong. try later");
    }
  };

  const handleFilterchange = (id: string, fromDate: string, toDate: string) => {
    console.log("id, fromDate, toDate", id, fromDate, toDate);
    getReportByDate(id, fromDate, toDate);
    getThreeMonthsSale(id);
  };

  return (
    <>
      <div className="row px-2">
        <Filter
          list={facilityList}
          onChange={handleFilterchange}
          defaultSelectedFacilityId={selectedFacilityId}
          defaultSelectedFacilityName={selectedFacilityName}
          otherFaciltyAccess={otherFaciltyAccess}
        />
      </div>
      <div className="row px-2">
      
      <div className="col-md-6 col-lg-4 col-xl-9 order-0 mb-4">
        {/* <StackedBar
          labels={label}
          sales={last3MnthSales}
          details={paymentType}
        /> */}
        <Datatables vehicleData={vehicles}/>
      </div>
      
        <div className="col-md-6 col-lg-4 col-xl-3 order-0 mb-4">
          <CollapsiblePanels title="Check In"
            ispayment={false}
            report={checkIn}
            details={vehicles}
            activePanel={activePanel}
            toggleFn = {togglePanel}
            />
            <CollapsiblePanels title="Check Out"
            ispayment={false}
            report={checkOut}
            details={vehicles}
            activePanel={activePanel}
            toggleFn = {togglePanel}
            />
            <CollapsiblePanels
            title="Payment"
            ispayment={true}
            report={paymentMode}
            details={paymentType}
            activePanel={activePanel}
            toggleFn = {togglePanel}
          />
          
        </div>
        
        
      </div>
    </>
  );
};

export default Dashboard;
