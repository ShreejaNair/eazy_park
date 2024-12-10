import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";
import moment from "moment";
import { dashboard } from "../../services/apiService";

const Dashboard = () => {

    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [paymentMode, setPaymentmode] = useState()
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
    return(
        <>
            <div className="row">
                <Greetings/>
                <Filter/>
            </div>
            <div className="row">
                <Cards title="Check In"/>
                <Cards title="Check Out"/>
                <Cards title="Payment"/>
            </div>

        </>
    )
}

export default Dashboard;