import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";
import moment from "moment";
import {
  dashboard,
  getAllVehicles,
  getCustomParkingDashboardReportByDate,
} from "../../services/apiService";
import { toast } from "react-toastify";
import { getFacilityList } from "../../services/apiService";
import {
  CheckReport,
  Payment,
  Vehicle,
  Vehicle_details,
} from "../../typscript/dashboard";
import React, { Suspense } from "react";
const Dashboard = () => {
  const [checkIn, setCheckIn] = useState<CheckReport[]>([]);
  const [checkOut, setCheckOut] = useState<CheckReport[]>([]);
  const [paymentMode, setPaymentmode] = useState<Payment[]>([]);
  const [facilityList, setFacilityList] = useState([]);
  const [vehicles, setVehicles] = useState<Vehicle_details[]>([]);
  const [otherFaciltyAccess, setOtherFacilityAccess] = useState<boolean>(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const [selectedFacilityName, setSelectedFacilityName] = useState<
    string | null
  >(null);
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    try {
      const getReport = async () => {
        // const facilityId = localStorage.getItem("facilityId") || ""
        const facilityId = "4";
        // const date = moment().format("DD-MMM-YYYY")
        const date = "24-Nov-2024";
        const response = await dashboard(facilityId, token, date);
        if (response?.data?.data?.[0]) {
          setCheckIn(response.data.data[0].checkin);
          setCheckOut(response.data.data[0].checkout);
          setPaymentmode(response.data.data[0].payment);
        }
      };
      getReport();
    } catch (error) {
      toast.error("Something went wrong, Try again Later");
    }
  }, []);
  useEffect(() => {
    setSelectedFacilityId(localStorage.getItem("facilityId"));
    setSelectedFacilityName(localStorage.getItem("facilityName"));
    getVehicles();
    getFacility();
  }, []);

  const getVehicles = async () => {
    try {
      const response = await getAllVehicles(token);
      let data: Vehicle_details[] = [];
      let vehicle = null;
      if (response?.data?.details?.[0]) {
        vehicle = response.data.details;
        vehicle.forEach((element: Vehicle) => {
          // data.push({[element.type_id]: {type_name: element.type_name, image: element.image}})
          data.push({
            [2]: { type_name: element.type_name, image: element.image },
          });
        });
        setVehicles(data);
      }
    } catch (error) {
      toast.error("Something went wrong, Try again Later");
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
      console.log("Response", response);
      if (response?.data?.data[0]) {
        setCheckIn(response?.data.data[0]?.checkin);
        setCheckOut(response?.data.data[0]?.checkout);
        setPaymentmode(response?.data.data[0]?.payment);
        setFacilityList(response.data.groupmapping.data);
      }
    } catch (error) {
      toast.error("Something went wrong. try later");
    }
  };

  const handleFilterchange = (id: string, fromDate: string, toDate: string) => {
    getReportByDate(id, fromDate, toDate);
  };

  return (
    <>
      <div className="row">
        <Greetings />
        <Filter
          list={facilityList}
          onChange={handleFilterchange}
          defaultSelectedFacilityId={selectedFacilityId}
          defaultSelectedFacilityName={selectedFacilityName}
          otherFaciltyAccess={otherFaciltyAccess}
        />
      </div>
      <div className="row">
        <Cards title="Check In" report={checkIn} details={vehicles} />
        {/* <Cards title="Check Out" report={checkOut} details={vehicles} /> */}
        {/* <Cards title="Payment" report={paymentMode} /> */}
      </div>
    </>
  );
};

export default Dashboard;
