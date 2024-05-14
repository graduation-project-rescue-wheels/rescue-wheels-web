import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const SimpleTable = ({ title, rows, columns, styles }) => {
  return (
    <div className="p-3 bg-white table" style={styles}>
      <h2 style={{ color: "var(--main-color)", fontWeight: "bold" }}>
        {title}
      </h2>
      <DataGrid
        style={{ border: "none" }}
        autoHeight
        rowHeight={78}
        rows={rows}
        getRowId={(row) => row._id}
        className="bg-white"
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default SimpleTable;
