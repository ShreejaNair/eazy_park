import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";
import moment from "moment";
import { dashboard } from "../../services/apiService";
import { toast } from "react-toastify";
import { getFacilityList } from "../../services/apiService";
import { CheckReport, Payment } from "../../typscript/dashboard";
import React, { Suspense } from 'react';
const Dashboard = () => {

  const [checkIn, setCheckIn] = useState<CheckReport[]>([])
  const [checkOut, setCheckOut] = useState<CheckReport[]>([])
  const [paymentMode, setPaymentmode] = useState<Payment[]>([])
  const [facilityList, setFacilityList] = useState([]);
  useEffect(() => {
    try {
      const getReport = async () => {
        const token = localStorage.getItem("authToken") || ""
        // const facilityId = localStorage.getItem("facilityId") || ""
        const facilityId = "4"
        // const date = moment().format("DD-MMM-YYYY")
        const date = "24-Nov-2024"
        const response = await dashboard(facilityId, token, date)
        if (response?.data?.data?.[0]) {
          setCheckIn(response.data.data[0].checkin)
          setCheckOut(response.data.data[0].checkout)
          setPaymentmode(response.data.data[0].payment)
        }

      }
      getReport()
    } catch (error) {
      toast.error("Something went wrong, Try again Later");
    }
  }, [])
  useEffect(() => {
    getFacility();
  }, []);



  const getFacility = async () => {
    try {
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");
      if (role && token && Number(role) == 5001) {
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



  const handleFilterchange = (id: any, fromDate: any, toDate: any) => { };

  return (
    <>
      <div className="row">
        <Greetings />
        <Filter list={facilityList} onChange={handleFilterchange} />
      </div>
      <div className="row">
        <Cards title="Check In" report={checkIn} />
        <Cards title="Check Out" report={checkOut} />
        <Cards title="Payment" report={paymentMode} />
      </div>
    </>
  );
};

export default Dashboard;
