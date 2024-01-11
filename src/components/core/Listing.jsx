import React, { useMemo } from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import { data } from "./data";
import { Typography } from "@mui/material";
const Listing = () => {
  const columns = useMemo(() => [
    {
      accessorKey: "firstName",
      header: "First-Name",
    },
    {
      accessorKey: "lastName",
      header: "Last-Name",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      size:'120',
      Cell: ({ row }) => (
        <div className="d-flex justify-content-around">
          <Link to={`/edit-order/${row.original.id}`} className="btn p-0 m-0">
            <i className="bi bi-pencil-square fs-5 text-primary" />
          </Link>
            <button
              className="btn p-0 m-0"
              // onClick={() => handleDeleteOrder(row.original.id)}
            >
              <i className="bi bi-trash-fill fs-5 text-danger" />
            </button>
        </div>
      ),
    },
  ]);
  return (
    <Layout>
      <hgroup className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Orders</h1>
        <Link
          to={"/add-user"}
          className="p-0 px-2 py-1 m-0 btn bg-blue text-white shadow-sm"
        >
          {" "}
          <i className="bi bi-plus text-white p-0 m-0"></i>
          Add User
        </Link>
      </hgroup>
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <article className="card shadow mb-4">
            <header className="card-header py-3 mb-1">
              <h6 className="m-0 font-weight-bold text-orange text-center">
                Your User Data
              </h6>
            </header>
            <main className="d-flex justify-content-center">
              <MaterialReactTable
                columns={columns}
                data={data}
                enableGlobalFilterModes
                enableColumnFilters={false}
                // enableColumnPinning
                enableRowSelection
                enableStickyHeader
                enableRowNumbers={true}
                initialState={{
                  density: "compact",
                  pagination: { pageSize: 5, pageIndex: 0 },
                }}
                muiPaginationProps={{
                  showRowsPerPage: true,
                  shape: "rounded",
                }}
              />
            </main>
          </article>
        </div>
      </div>
      
    </Layout>
  );
};

export default Listing;
