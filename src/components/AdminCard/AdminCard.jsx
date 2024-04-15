import GroupIcon from '@mui/icons-material/Group';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const AdminCard = ({name, total }) => {

    const renderIcon = () => {
        switch (name) {
            case "Total Users":
                console.log(name);
                return <GroupIcon style={{ fontSize: "3rem" }} />
                break;

            case "Total Technicians":
                return <GroupIcon style={{ fontSize: "3rem" }}  />
                break;

            case "Total Repair Centers":
                return <CarRepairIcon style={{ fontSize: "3rem" }}  />
                break;

            case "Total Requests":
                return <ContentPasteIcon style={{ fontSize: "3rem" }}  />
                break;
        
            default:
                break;
        }
    }
    return (
        <div className="card d-flex flex-row p-3" style={{ flexBasis: "300px", flexGrow: "1", backgroundColor: "#e48700", color: "white", justifyContent: "space-between", borderRadius: "15px" }}>
            <div className="data" style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "5px"
            }}>
                <p style={{ fontSize: "2rem", margin: "0" }}>{total}</p>
                <p style={{ margin: "0", fontSize: "1.2rem" }}>{name}</p>
            </div>
            <div className="icon">
                {renderIcon()}
            </div>
        </div>
    )
}

export default AdminCard