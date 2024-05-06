import { useState } from "react";
import PropTypes from "prop-types";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";

const TableComponent = ({ rows, columns, func, rowHeight, type }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  function EnhancedTableToolbar(props) {
    let { numSelected } = props;

    return (
      <>
        {numSelected > 0 && (
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(numSelected > 0 && {
                bgcolor: (theme) =>
                  alpha("#71867c", theme.palette.action.activatedOpacity),
              }),
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  func(selectedIds);
                  setSelectedIds([]);
                }}
              >
                {type === "requests" ? (
                  <CancelIcon style={{ color: "#333333" }} />
                ) : (
                  <DeleteIcon style={{ color: "#333333" }} />
                )}
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ width: "98%", alignSelf: "center" }}
    >
      <EnhancedTableToolbar numSelected={selectedIds.length} />{" "}
      <DataGrid
        style={{ boxShadow: "0 0 10px 2px #ccc" }}
        autoHeight
        rowHeight={rowHeight}
        rows={rows}
        getRowId={(row) => row._id}
        className="bg-white"
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          setSelectedIds(ids);
        }}
        rowSelectionModel={selectedIds}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default TableComponent;
