import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { DatePicker, InputGroup, Button } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
const Filter = ({
  list,
  onChange,
  defaultSelectedFacilityName,
  defaultSelectedFacilityId,
  otherFaciltyAccess,
}: any) => {
  const [selectedFacilityName, setSelectedFacilityName] = useState(
    defaultSelectedFacilityName
  );
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    defaultSelectedFacilityId
  );
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);

  useEffect(() => {
    setSelectedFacilityName(defaultSelectedFacilityName);
    setSelectedFacilityId(defaultSelectedFacilityId);
  }, [defaultSelectedFacilityId, defaultSelectedFacilityName]);

  const handleFilter = () => {
    console.log(
      "selectedFacilityId && selectedFacilityName && fromDate && toDate",
      selectedFacilityId,
      selectedFacilityName,
      fromDate,
      toDate
    );
    if (selectedFacilityId && selectedFacilityName && fromDate && toDate) {
      onChange?.(selectedFacilityId, fromDate, toDate);
    } else {
      toast("Please select filter");
    }
  };

  return (
    <div className="col-lg-12 mb-4 order-0">
      <div className="card border-0 shadow-sm bg-body rounded">
        <div className="d-flex align-items-end row">
          <div className="col-sm-12">
            <div className="card-body d-flex">
              <span style={{ marginRight: "10px" }}>Filter: </span>
              <div className="btn-group" style={{ marginRight: "30px" }}>
                <button
                  type="button"
                  className="btn btn-warning"
                  disabled={!otherFaciltyAccess}>
                  {selectedFacilityName + " " + selectedFacilityId || "Select"}
                  {/* Show default selected value */}
                </button>
                <button
                  type="button"
                  className="btn btn-warning dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={!otherFaciltyAccess}>
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  {list.map((item: any, index: any) => (
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          // handleFacilityChange(item.facilityid, item.name)
                          console.log("item.facilityId", item);
                          setSelectedFacilityId(item.facilityid);
                          setSelectedFacilityName(item.name);
                        }}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <InputGroup className="shadow-sm" style={{ width: 428 }}>
                <DatePicker
                  format="dd-MM-yyyy"
                  block
                  appearance="subtle"
                  placeholder="From Date"
                  style={{ width: 230 }}
                  onChange={(value) =>
                    setFromDate(moment(value).format("DD-MMM-YYYY"))
                  }
                />
                <InputGroup.Addon>to</InputGroup.Addon>
                <DatePicker
                  format="dd-MM-yyyy"
                  block
                  appearance="subtle"
                  placeholder="To Date"
                  style={{ width: 230 }}
                  onChange={(value) =>
                    setToDate(moment(value).format("DD-MMM-YYYY"))
                  }
                />
              </InputGroup>
              <Button
                appearance="primary"
                onClick={handleFilter}
                style={{ marginLeft: "20px" }}>
                Filter
              </Button>
            </div>
          </div>
          {/* <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                            

                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};
export default Filter;
