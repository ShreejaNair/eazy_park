import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { DatePicker, InputGroup, Button } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { isAfter } from "rsuite/esm/internals/utils/date";
import { useNavigate } from "react-router-dom";
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
  const [fromDate, setFromDate] = useState<any>(new Date());
  const [toDate, setToDate] = useState<any>(new Date());
  // const [all, setAll] =useState<string>("")
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedFacilityName(defaultSelectedFacilityName);
    setSelectedFacilityId(defaultSelectedFacilityId);
    // const facilityIds:string = list.map((item:string) => Object.values(item)[0]);
    // console.log("facility", facilityIds)
    // setAll(facilityIds)
  }, [defaultSelectedFacilityId, defaultSelectedFacilityName]);

  const handleFilter = (
    selectedFacilityId: string,
    selectedFacilityName: string,
    fromDate: any,
    toDate: any
  ) => {
    if (selectedFacilityId && selectedFacilityName && fromDate && toDate) {
      if (moment(fromDate).isAfter(toDate)) {
        toast("To Date should not be greater than From Date");
        return;
      }
      let ids = selectedFacilityId;
      if (selectedFacilityId == "all") {
        ids = list
          .filter(
            (facility: any) =>
              facility.facilityid !== "all" && facility.facilityid !== "28"
          )
          .map((facility: any) => facility.facilityid)
          .join(",");
      }
      onChange?.(
        ids,
        moment(fromDate).format("DD-MMM-YYYY"),
        moment(toDate).format("DD-MMM-YYYY")
      );
    } else {
      toast("Please select the From Date and To Date");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="col-lg-12 mb-4 order-0">
      <div className="card border-0 shadow-sm bg-body rounded">
        <div className="d-flex align-items-end row">
          <div className="col-sm-12">
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <span style={{ marginRight: "10px" }}>Facility Name: </span>
                <div className="btn-group" style={{ marginRight: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-warning"
                    disabled={!otherFaciltyAccess}
                  >
                    {selectedFacilityName || "Select Facility"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={!otherFaciltyAccess}
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    {list.map((item: any, index: any) => (
                      <li key={index}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => {
                            let ids: any = item.facilityid;
                            setSelectedFacilityId(ids);
                            setSelectedFacilityName(item.name);
                            handleFilter(ids, item.name, fromDate, toDate);
                          }}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <InputGroup className="shadow-sm" style={{ width: 428 }}>
                  <DatePicker
                    defaultValue={fromDate}
                    format="dd-MMM-yyyy"
                    block
                    appearance="subtle"
                    placeholder="From Date"
                    style={{ width: 230 }}
                    oneTap
                    shouldDisableDate={(date) =>
                      moment(date).isAfter(new Date())
                    }
                    onChange={(value) => {
                      const date = moment(value).format("DD-MMM-YYYY");
                      setFromDate(date);
                      handleFilter(
                        selectedFacilityId,
                        selectedFacilityName,
                        date,
                        toDate
                      );
                    }}
                    onClean={() => {
                      setFromDate(null);
                    }}
                  />
                  <InputGroup.Addon>to</InputGroup.Addon>
                  <DatePicker
                    defaultValue={toDate}
                    format="dd-MMM-yyyy"
                    block
                    oneTap
                    appearance="subtle"
                    placeholder="To Date"
                    style={{ width: 230 }}
                    shouldDisableDate={(date) =>
                      moment(date).isAfter(new Date()) ||
                      moment(date).isBefore(fromDate)
                    }
                    onChange={(value) => {
                      const date = moment(value).format("DD-MMM-YYYY");
                      setToDate(date);
                      handleFilter(
                        selectedFacilityId,
                        selectedFacilityName,
                        fromDate,
                        date
                      );
                    }}
                    onClean={() => {
                      setToDate(null);
                    }}
                  />
                </InputGroup>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-link"
                  type="button"
                  style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                  }}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-lg"></i>
                  &nbsp;&nbsp; Hi, {localStorage.getItem("username")}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filter;
