// import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetAllRepairCenters } from "../../store/RepairCenterSlice";
import RepairCenterComponent from "../../components/RepairCenterComponent/RepairCenterComponent";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../../components/Loading/Loading";

const HomePage = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const SORT_ALPHABETICALLY = 1;
  const SORT_BY_LOCATION = 2;
  // const {AddRepaircenterData} = useSelector((x)=>x.RepairCenterData)
  const [repairCenterData, setRepairCenterData] = useState([]);
  const [filteredRepairCenter, setFilteredRepairCenter] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([
    
  ]);
  const [selectedSortOption, setSelectedSortOption] = useState(1);
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
    }
  };

  // const calculateDistance = (long1, lat1, long2, lat2) => {
  //   const earthR = 6371; // 6371 is radius of Earth
  //   const lat1Rad = (lat1 * Math.PI) / 180;
  //   const lat2Rad = (lat2 * Math.PI) / 180;
  //   const deltaLatRad = ((lat2 - lat1) * Math.PI) / 180;
  //   const deltaLongRad = ((long2 - long1) * Math.PI) / 180;

  //   const a =
  //     Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
  //     Math.cos(lat1Rad) *
  //       Math.cos(lat2Rad) *
  //       Math.sin(deltaLongRad / 2) *
  //       Math.sin(deltaLongRad / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //   return earthR * c;
  // };

  // const handleFilter = (selectValue) => {
  //   let sortedData = [...filteredRepairCenter];
  //   if (selectValue === "alphabetically") {
  //     sortedData.sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });
  //   } else if (selectValue === "by-location") {
  //     sortedData.sort((a, b) => {
  //       var diffA = calculateDistance(
  //         geoLocation.lng,
  //         geoLocation.lat,
  //         a.location.coords.latitude,
  //         a.location.coords.longitude
  //       );

  //       var diffB = calculateDistance(
  //         geoLocation.lng,
  //         geoLocation.lat,
  //         b.location.coords.latitude,
  //         b.location.coords.longitude
  //       );

  //       if (diffA > diffB) {
  //         return 1;
  //       } else if (diffA < diffB) {
  //         return -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   } else {
  //     sortedData = [...repairCenterData];
  //   }
  //   setFilteredRepairCenter(sortedData);
  // };

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

  return (
    <div>
      <div className="container" style={{ marginTop: "140px" }}>
        <h2 className="fw-bold">Repair Centers</h2>
        <div className="d-flex justify-content-between">
          <div
            className="d-flex align-items-center bg-white"
            style={{
              padding: "0.75rem 1.5rem",
              width: "40%",
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
          <div className="d-flex align-items-center">
            sort
            <select
              name="sort"
              id="sort"
              className="ms-1"
              onChange={(e) => setSelectedSortOption(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                width: "10rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                outline: "none",
                border: "none",
              }}
            >
              <option value="none">none</option>
              <option value={SORT_BY_LOCATION}>By Location</option>
              <option value={SORT_ALPHABETICALLY}>Alphabetically</option>
            </select>
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
