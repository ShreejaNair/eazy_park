import { DatePicker, InputGroup } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
const Filter = () => {
    return (
        <div className="col-lg-12 mb-4 order-0">
            <div className="card border-0 shadow-sm bg-body rounded">
                <div className="d-flex align-items-end row">
                    <div className="col-sm-12">
                        <div className="card-body d-flex">
                            <span style={{ marginRight: "10px" }}>Filter:  </span>
                            <div className="btn-group" style={{ marginRight: "30px" }}>
                                <button type="button" className="btn btn-warning">RKMP West</button>
                                <button type="button" className="btn btn-warning dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">RKMP West</a></li>
                                    <li><a className="dropdown-item" href="#">RKMP East</a></li>
                                    <li><a className="dropdown-item" href="#">BPL 2W Parking PF-6</a></li>
                                    <li><a className="dropdown-item" href="#">BHS 2W Parking PF-1</a></li>
                                </ul>
                            </div>
                            <InputGroup className='shadow-sm' style={{ width: 428 }}>
                                <DatePicker format="dd-MM-yyyy" block appearance="subtle" placeholder="From Date" style={{ width: 230 }} />
                                <InputGroup.Addon>to</InputGroup.Addon>
                                <DatePicker format="dd-MM-yyyy" block appearance="subtle" placeholder="To Date" style={{ width: 230 }} />
                            </InputGroup>

                        </div>
                    </div>
                    {/* <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                            
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default Filter