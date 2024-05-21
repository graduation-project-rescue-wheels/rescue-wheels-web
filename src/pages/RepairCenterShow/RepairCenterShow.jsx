import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetspacificepairCenter } from "../../store/RepairCenterSlice";
import Scheduler, { Resource } from "devextreme-react/scheduler";
import {
  AddReservationClient,
  deleteReservationClient,
  updateReservationClient,
} from "../../store/ReservationSlice";
import "./repairCenterShow.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Toaster } from "react-hot-toast";

const RepairCenterShow = () => {
  const { id } = useParams();
  const authUser = useSelector((state) => state.AuthData.UserData);
  const btnRef = useRef(null);
  const popupRef = useRef(null);

  const [state, setState] = useState({
    repairData: [],
    reservations: [],
    image: "",
    dataFetched: false,
  });

  const { reservations, image } = state;
  const currentDate = new Date();
  const views = ["day", "week", "month"];

  const resourcesData = [
    {
      id: 1,
      color: "#cb6bb2",
    },
    {
      id: 2,
      color: "#56ca85",
    },
    {
      id: 3,
      color: "#E40D80",
    },
    {
      id: 4,
      color: "#C47011",
    },
  ];
  const dispatch = useDispatch();

  const fetchRepairData = async () => {
    setState((prevState) => ({ ...prevState, dataFetched: true }));
    try {
      const res = await dispatch(GetspacificepairCenter(id));
      const repairData = res.payload.data.Technicians;
      const reservations = res.payload.data.Reservations.map((el) => ({
        ...el,
        ownerId: el.status == "New" ? [1] : [2],
        // ownerId: [2],
        text: el.title,
        startDate: new Date(el.startDate),
        endDate: new Date(el.endDate),
      }));
      const image = res.payload.data.Image?.secure_url || "";

      setState({ repairData, reservations, image, dataFetched: false });
      console.log("Repair center data fetched successfully:", repairData);
    } catch (error) {
      console.error("Failed to fetch repair center data:", error);
      setState((prevState) => ({ ...prevState, dataFetched: false }));
    }
  };

  useEffect(() => {
    fetchRepairData();
  }, [id, dispatch]);

  useEffect(() => {
    console.log("Updated Reservations:", state.reservations);
  }, [state.reservations]);

  const onAppointmentAdded = async (e) => {
    const formData = {
      title: e.appointmentData.text,
      description: e.appointmentData.description,
      startDate: new Date(e.appointmentData.startDate),
      endDate: new Date(e.appointmentData.endDate),
    };
    console.log(formData);
    const res = await dispatch(
      AddReservationClient({ id: id, formData: formData })
    ); // Pass id and formData as payload
    res.payload.status === 201 && popupRef.current.classList.add("active");
    fetchRepairData();
    console.log(res);
    console.log(e.appointmentData);
  };
  const AppointmentUpdated = async (e) => {
    const formData = {
      title: e.appointmentData.text,
      description: e.appointmentData.description,
      startDate: new Date(e.appointmentData.startDate),
      endDate: new Date(e.appointmentData.endDate),
    };
    console.log(formData);
    const res = await dispatch(
      updateReservationClient({ id: e.appointmentData._id, formData: formData })
    ); // Pass id and formData as payload
    res.payload.status === 200 && popupRef.current.classList.add("active");
    console.log(res);
    console.log(e.appointmentData);
  };

  const AppointmentDeleted = async (e) => {
    const res = await dispatch(
      deleteReservationClient({ id: e.appointmentData._id })
    ); // Pass id and formData as payload
    console.log(res);
    console.log(e.appointmentData);
  };

  useEffect(() => {
    btnRef.current.addEventListener("click", () => {
      popupRef.current.classList.remove("active");
    });
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        ref={popupRef}
        className="popup d-flex flex-column justify-content-between align-items-center"
      >
        <ThumbUpIcon className="icon d-flex justify-content-center align-items-center" />
        <div className="info">
          <h2>Congratulation!</h2>
          <p>Your Reservation is sent to Repair Center to confirm</p>
        </div>
        <button ref={btnRef}>OK</button>
      </div>
      {/* <div className="mx-auto text-center mt-3">
        {image && (
          <img src={image} style={{ width: "100px" }} alt="Repair Center" />
        )}
      </div> */}

      <div className="container-fluid mt-3" style={{ color: "red" }}>
        <Scheduler
          timeZone="Africa/Cairo"
          dataSource={reservations}
          views={views}
          defaultCurrentView="week"
          defaultCurrentDate={currentDate}
          height={730}
          startDayHour={12}
          onAppointmentAdded={onAppointmentAdded}
          onAppointmentUpdated={AppointmentUpdated}
          onAppointmentDeleting={AppointmentDeleted}
          appointmentDragging={{
            onDragStart(e) {
              if (
                e.itemData.addedBy !== authUser._id &&
                authUser.role === "User"
              ) {
                e.cancel = true;
              }
            },
          }}
          onAppointmentClick={(e) => {
            if (
              e.targetedAppointmentData.addedBy !== authUser._id &&
              authUser.role === "User"
            ) {
              e.cancel = true;
            }
          }}
          onAppointmentDblClick={(e) => {
            if (
              e.targetedAppointmentData.addedBy !== authUser._id &&
              authUser.role === "User"
            ) {
              e.cancel = true;
            }
          }}
        >
          {/* <Resource
            fieldExpr="ownerId"
            allowMultiple={true}
            dataSource={resourcesData}
            // label="Owner"
            // useColorAsDefault={true}
          /> */}
        </Scheduler>
      </div>
    </>
  );
};

export default RepairCenterShow;
