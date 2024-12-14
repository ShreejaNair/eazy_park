import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";
import moment from "moment";
import { dashboard, getAllPaymentTypes, getAllVehicles } from "../../services/apiService";
import { toast } from "react-toastify";
import { getFacilityList } from "../../services/apiService";
import { CheckReport, Payment, Payment_details, Vehicle, Vehicle_details, Payment_Type } from "../../typscript/dashboard";
import React, { Suspense } from 'react';
const Dashboard = () => {

  const [checkIn, setCheckIn] = useState<CheckReport[]>([])
  const [checkOut, setCheckOut] = useState<CheckReport[]>([])
  const [paymentMode, setPaymentmode] = useState<Payment[]>([])
  const [facilityList, setFacilityList] = useState([]);
  const [vehicles, setVehicles] = useState<Vehicle_details[]>([]);
  const [paymentType, setPaymentType] = useState<Payment_details[]>([])
  const token:string = localStorage.getItem("token") || "";
  useEffect(() => {
    try {
      const getReport = async () => {
        // const facilityId = localStorage.getItem("facilityId") || ""
        const facilityId = "29"
        // const date = moment().format("DD-MMM-YYYY")
        const date = "12-Dec-2024"
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
    getVehicles()
    getAllPayments()
    getFacility();
  }, []);

  const getAllPayments = async () => {
    try {
      const response = await getAllPaymentTypes(token)
      let data:Payment_details[] = []
      let pay = null
      if (response?.data?.options?.[0]) {
        pay = response.data.options
        pay.forEach((pay_type: Payment_Type) => {
          data.push({[pay_type.statuscode]: {status:pay_type.status}})
        }); 
        setPaymentType(data)
      }

    }catch(error) {
      toast.error("Something went wrong, Try again Later")
    }
  }

  const getVehicles = async () => {
    try{
      const response = await getAllVehicles(token) 
      let data:Vehicle_details[] = []
      let vehicle = null
      if (response?.data?.details?.[0]){
        vehicle = response.data.details
        vehicle.forEach((element: Vehicle) => {
          data.push({[element.type_id]: {type_name: element.type_name, image: element.image}})
        });
        setVehicles(data)
        
      }
      

    }catch(error) {
      toast.error("Something went wrong, Try again Later")
    }
  }

  const getFacility = async () => {
    try {
      const role = localStorage.getItem("role");
      
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
        <Cards title="Check In" report={checkIn} details={vehicles} />
        <Cards title="Check Out" report={checkOut} details={vehicles} />
        {/* <Cards title="Payment" report={paymentMode} details={paymentType} /> */}
      </div>
    </>
  );
};

export default Dashboard;
