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

const Dashboard = () => {
  const [checkIn, setCheckIn] = useState<CheckReport[]>([]);
  const [checkOut, setCheckOut] = useState<CheckReport[]>([]);
  const [paymentMode, setPaymentmode] = useState<Payment[]>([]);
  const [facilityList, setFacilityList] = useState([]);
  const [vehicles, setVehicles] = useState<Vehicle_details[]>([]);
  const [otherFaciltyAccess, setOtherFacilityAccess] = useState<boolean>(false);
  const [label, setLabel] = useState<string[]>([])
  const [last3MnthSales, setLast3MnthSales] = useState<Payment[][]>([])
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const [selectedFacilityName, setSelectedFacilityName] = useState<
    string | null
  >(null);
  const [paymentType, setPaymentType] = useState<Vehicle_details[]>([]);
  const token: string = localStorage.getItem("token") || "";
  useEffect(() => {
    try {
      const getReport = async () => {
        let id = localStorage.getItem("facilityId") || "";
        const facilityId = "29";
        const date = moment().format("DD-MMM-YYYY");
        // const date = "14-Dec-2024";
        const response = await dashboard(facilityId, token, date);
        if (response?.data?.data?.[0]) {
          setCheckIn(response.data.data[0]?.checkin || []);
          setCheckOut(response.data.data[0]?.checkout || []);
          setPaymentmode(response.data.data[0]?.payment || []);
        }
      };
      getReport();
    } catch (error) {
      toast.error("Something went wrong, Try again Later");
    }
  }, []);

  useEffect(() => {
    let id:string = localStorage.getItem("facilityId") || ""
    setSelectedFacilityId(id);
    setSelectedFacilityName(localStorage.getItem("facilityName"));
    getVehicles();
    getAllPayments();
    getFacility();
    getThreeMonthsSale(id);
  }, []);

  const getThreeMonthsSale = async (id:string) => {
    
    const lastThreeMonths = Array.from({ length: 3 }, (_, i) => 
      moment().subtract(2 - i, 'months').format('MMMM')
    );
    setLabel(lastThreeMonths)
    let data = []
    for await (const mnth of lastThreeMonths) {
      let start = moment().month(mnth).startOf('month').format('DD-MMM-YYYY');
      let end = moment().month(mnth).endOf('month').format('DD-MMM-YYYY')
      let facilityId = id || ""
      let response = await getCustomParkingDashboardReportByDate(facilityId, token, start, end)
      if (response?.data?.data?.[0]?.payment) {
        
        data.push(response?.data?.data[0]?.payment)
      }
      
    }
    setLast3MnthSales(data)
  }

  const getAllPayments = async () => {
    try {
      const response = await getAllPaymentTypes(token);
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
      const response = await getAllVehicles(token);
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
        if (response?.data?.groupmapping?.data) {
          setFacilityList(response.data.groupmapping.data);
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
      // console.log("Response", response);
      if (response?.data?.data[0]) {
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
    getReportByDate(id, fromDate, toDate);
    getThreeMonthsSale(id)
  };

  return (
    <>
      <div className="row">
       
        <Filter
          list={facilityList}
          onChange={handleFilterchange}
          defaultSelectedFacilityId={selectedFacilityId}
          defaultSelectedFacilityName={selectedFacilityName}
          otherFaciltyAccess={otherFaciltyAccess}
        />
      </div>
      <div className="row">
        <Cards title="Check In" ispayment={false} report={checkIn} details={vehicles} />
        <Cards title="Check Out" ispayment={false} report={checkOut} details={vehicles} />
        <Cards title="Payment" ispayment={true} report={paymentMode} details={paymentType} />
        <StackedBar labels={label} sales={last3MnthSales} details={paymentType} />
      </div>
    </>
  );
};

export default Dashboard;
