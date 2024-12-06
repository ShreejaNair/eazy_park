import Cards from "../../components/Cards";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
    return(
        <>
           <div className="row">
                <Cards title="Check In"/>
                <Cards title="Check Out"/>
           </div>

        </>
    )
}

export default Dashboard;