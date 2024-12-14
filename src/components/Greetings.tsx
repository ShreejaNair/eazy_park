const Greetings = () => {
    return (
        <div className="col-lg-12 mb-4 order-0">
            <div className="card border-0 shadow-sm bg-body rounded">
                <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                        <div className="card-body">
                            <h5 className="card-title text-primary">
                                Good Afternoon {localStorage.getItem("username")}! 🎉
                            </h5>
                                                       
                        </div>
                    </div>
                    <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Greetings