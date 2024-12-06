import Sidebar from "./components/Sidebar"

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="d-flex">
            <Sidebar/>

            {/* Main Content */}
            <div className="content">
               {children}
            </div>

        </div>
    )
}

export default DefaultLayout