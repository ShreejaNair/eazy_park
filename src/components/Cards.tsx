const Cards = ({title}: {title:string}) => {
    return (
        <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
            <div className="card h-100 shadow p-3 mb-5 bg-body rounded border-0">
                <div className="card-header d-flex align-items-center justify-content-between pb-0">
                    <div className="card-title mb-0">
                        <h5 className="m-0 me-2">{title}</h5>
                        
                    </div>
                    <div className="dropdown">
                        <button aria-label='Click me'
                            className="btn p-0"
                            type="button"
                            id="orederStatistics"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="orederStatistics"
                        >
                            <a aria-label="select all " className="dropdown-item" href="#">
                                Select All
                            </a>
                            <a aria-label="refresh" className="dropdown-item" href="#">
                                Refresh
                            </a>
                            <a aria-label="share" className="dropdown-item" href="#">
                                Share
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column align-items-center gap-1">
                            <h2 className="mb-2">8,258</h2>
                            <span>Total {title}</span>
                        </div>
                        <div id="orderStatisticsChart"></div>
                    </div>
                    <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3 p-1 rounded" style={{background:"#e9a6e9"}}>
                                <span className="avatar-initial rounded bg-label-primary">
                                <i className="fa-sharp-duotone fa-solid fa-car" style={{color: "#ea75ea"}}></i>
                                </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                    <h6 className="mb-0">Car</h6>
                                    
                                </div>
                                <div className="user-progress">
                                    <small className="fw-medium">1200</small>
                                </div>
                            </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3 p-1 rounded" style={{background:"#99E9B2"}}>
                                <span className="avatar-initial rounded bg-label-success">
                                <i className="fa-duotone fa-solid fa-bus" style={{color: "#4DD261"}}></i>
                                </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                    <h6 className="mb-0">Bus</h6>
                                    
                                </div>
                                <div className="user-progress">
                                    <small className="fw-medium">6000</small>
                                </div>
                            </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                            <div className="avatar flex-shrink-0 me-3">
                                <span className="avatar-initial rounded bg-label-info">
                                    <i className="bx bx-home-alt"></i>
                                </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                    <h6 className="mb-0">Decor</h6>
                                    <small className="text-muted">Fine Art, Dining</small>
                                </div>
                                <div className="user-progress">
                                    <small className="fw-medium">849k</small>
                                </div>
                            </div>
                        </li>
                        <li className="d-flex">
                            <div className="avatar flex-shrink-0 me-3">
                                <span className="avatar-initial rounded bg-label-secondary">
                                    <i className="bx bx-football"></i>
                                </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                    <h6 className="mb-0">Sports</h6>
                                    <small className="text-muted">
                                        Football, Cricket Kit
                                    </small>
                                </div>
                                <div className="user-progress">
                                    <small className="fw-medium">99</small>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;