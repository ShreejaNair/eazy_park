import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";
import moment from "moment";
import { dashboard } from "../../services/apiService";
import { toast } from "react-toastify";
import { getFacilityList } from "../../services/apiService";

const Dashboard = () => {

    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [paymentMode, setPaymentmode] = useState()
    const [facilityList, setFacilityList] = useState([]);
    useEffect(()=> {
        const getReport = async() => {
            const token = localStorage.getItem("authToken") || ""
            const facilityId = localStorage.getItem("facilityId") || ""
            const date = moment().format("DD-MMM-YYYY")
            const response = await dashboard(facilityId, token, date)
            if (response?.data) {
                console.log("response", response.data)
            }
        }
        getReport()
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
   


  const handleFilterchange = (id: any, fromDate: any, toDate: any) => {};

  return (
    <>
      <div className="row">
        <Greetings />
        <Filter list={facilityList} onChange={handleFilterchange} />
      </div>
      <div className="row">
        <Cards title="Check In" />
        <Cards title="Check Out" />
        <Cards title="Payment" />
      </div>
    </>
  );
};

export default Dashboard;
