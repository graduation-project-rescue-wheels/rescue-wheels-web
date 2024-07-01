// import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { GetAllOffers,GetAllRepairCenters } from "../../store/RepairCenterSlice";
import RepairCenterComponent from "../../components/RepairCenterComponent/RepairCenterComponent";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../../components/Loading/Loading";
import "./HomePage.css";

const HomePage = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const [offers,setOffers] = useState([])

  const SORT_ALPHABETICALLY = 1;
  const SORT_BY_LOCATION = 2;
  // const {AddRepaircenterData} = useSelector((x)=>x.RepairCenterData)
  const [repairCenterData, setRepairCenterData] = useState([]);
  const [filteredRepairCenter, setFilteredRepairCenter] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([
    "Tyre shop",
    "Electrician",
    "Automechanic",
    "Air conditioner",
    "Body shop",
    "Exhaust system",
  ]);
  const [selectedSortOption, setSelectedSortOption] =
    useState(SORT_BY_LOCATION);
  const [geoLocation, setGeoLocation] = useState({});
  const [searchValue, setSearchValue] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  const fetchRepairCeneterData = async () => {
    const res = await dispatch(
      GetAllRepairCenters({
        filters: selectedCategories,
        sortedBy: selectedSortOption,
        isAscending: isAscendingOrder,
        coords: geoLocation,
      })
    );
    console.log(res.payload.data);

    setRepairCenterData(res.payload.data);
    setFilteredRepairCenter(res.payload.data);

    if (searchValue.length > 0) {
      setFilteredRepairCenter(
        res.payload.data.filter((rc) =>
          rc.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    console.log("Repair center data fetched successfully:", repairCenterData);
    setIsFetched(true);
  };

  const handleSearch = () => {
    if (searchValue.length > 0) {
      setFilteredRepairCenter(
        repairCenterData.filter((rc) =>
          rc.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredRepairCenter(repairCenterData);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    getCurrentLocation();
    fetchRepairCeneterData();
  }, [selectedCategories.length, selectedSortOption, isAscendingOrder]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      if (searchValue.length > 0) {
        setFilteredRepairCenter(() => {
          let rcs = filteredRepairCenter;
          let filtered = [];
          selectedCategories.forEach((e) => {
            filtered = [
              ...filtered,
              ...rcs.filter((item) => item.description === e),
            ];
          });
          return filtered;
        });
      } else {
        console.log(selectedCategories);
        setFilteredRepairCenter(() => {
          let rcs = repairCenterData;
          let filtered = [];
          selectedCategories.forEach((e) => {
            filtered = [
              ...filtered,
              ...rcs.filter((item) => item.description === e),
            ];
          });
          return filtered;
        });
      }
    }
  }, [selectedCategories.length]);

  useEffect(() => {
    let btns = document.querySelectorAll(".filterBtn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("activeFilter")) {
          btn.classList.remove("activeFilter");
        } else {
          btn.classList.add("activeFilter");
        }
      })
    })
    getOfferData()

  }, []);
  const getOfferData = async()=>{
    const res = await dispatch(GetAllOffers())
    console.log("offers", res.payload.data);
    setOffers(res.payload.data)
}
  return (
    <div>
      <div className="container" style={{ marginTop: "140px" }}>
      {offers.length>0 ?
            <h2 className="fw-bold">Offres</h2>
      :""}

      <div>
      <div className="d-flex g-3 mb-5 pb-3" style={{overflow:'auto'}}>
        {offers.map((offer) => {
          return <div key={offer._id} className="col-md-3  rounded">
            <div className="bg-white me-3 rounded-4 p-3">
              <h5 className="white rounded-pill p-1 ps-2" style={{backgroundColor:'#362e93',color:'white'}}>{offer.title}</h5>
              <p className="text-secondary">{offer.Desc}</p>
            </div>
            </div>
        })}</div>
      </div>
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="fw-bold">Repair Centers</h2>
          <button
            class="btn"
            type="button"
            style={{
              backgroundColor: "var(--main-color)",
              color: "var(--secondry-color)",
            }}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Filters
          </button>
        </div>

        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Filters
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div className="d-flex flex-column gap-5">
              <div className="d-flex flex-wrap">
                <h2 className="w-100">Search</h2>
                <div
                  className="d-flex align-items-center bg-white w-100"
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <SearchIcon />
                  <input
                    type="search"
                    style={{
                      border: "none",
                      outline: "none",
                      marginLeft: "0.5rem",
                      width: "100%",
                    }}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap">
                <h2 className="w-100">Sort</h2>
                <select
                  name="sort"
                  id="sort"
                  className="w-100"
                  onChange={(e) => setSelectedSortOption(e.target.value)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                    outline: "none",
                    border: "none",
                  }}
                >
                  <option value={SORT_BY_LOCATION}>By Location</option>
                  <option value={SORT_ALPHABETICALLY}>Alphabetically</option>
                </select>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <h2 className="w-100">Categories</h2>
                {allCategories.map((category) => {
                  return (
                    <button
                      key={category}
                      className="btn filterBtn text-nowrap"
                      onClick={(e) => {
                        if (selectedCategories.includes(e.target.innerHTML)) {
                          setSelectedCategories((categories) =>
                            categories.filter(
                              (item) => e.target.innerHTML !== item
                            )
                          );
                        } else {
                          setSelectedCategories((category) => [
                            ...category,
                            e.target.innerHTML,
                          ]);
                        }
                      }}
                      style={{
                        backgroundColor: "var(--main-color)",
                        color: "var(--secondry-color)",
                      }}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {isFetched ? (
          <div className="d-flex flex-wrap">
            {filteredRepairCenter?.map((el) => {
              return (
                <RepairCenterComponent
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  description={el.description}
                  image={el.Image?.secure_url}
                  location={el.location}
                  phoneNumber={el.phoneNumber}
                />
              );
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default HomePage;
