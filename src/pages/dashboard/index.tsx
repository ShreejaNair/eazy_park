import Cards from "../../components/Cards";
import Filter from "../../components/Filter";
import Greetings from "../../components/Greetings";

const Dashboard = () => {
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