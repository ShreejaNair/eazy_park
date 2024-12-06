import Cards from "../../components/Cards";
import Greetings from "../../components/Greetings";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
    return(
        <>
            <div className="row">
                <Greetings/>

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