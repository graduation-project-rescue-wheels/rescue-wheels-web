import GroupIcon from "@mui/icons-material/Group";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const AdminCard = ({ name, total }) => {
  const renderIcon = () => {
    switch (name) {
      case "Total Users":
        return <GroupIcon style={{ fontSize: "3rem" }} />;
        break;

      case "Total Technicians":
        return <EngineeringIcon style={{ fontSize: "3rem" }} />;
        break;

      case "Total Repair Centers":
        return <CarRepairIcon style={{ fontSize: "3rem" }} />;
        break;

      case "Total Requests":
        return <ContentPasteIcon style={{ fontSize: "3rem" }} />;
        break;

      default:
        break;
    }
  };
  return (
    <div
      className="card d-flex flex-row p-3 justify-content-between"
      style={{
        flexBasis: "300px",
        flexGrow: "1",
        backgroundColor: "var(--secondry-color)",
        color: "var(--main-color)",
        borderRadius: "15px",
      }}
    >
      <div className="data justify-content-between d-flex flex-column gap-3">
        <p style={{ fontSize: "2rem", margin: "0" }}>{total}</p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>{name}</p>
      </div>
      <div className="icon">{renderIcon()}</div>
    </div>
  );
};

export default AdminCard;
