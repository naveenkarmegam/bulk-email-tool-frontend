import React from "react";
import { Link } from "react-router-dom";
const Table = ({recipients,handleDeleteOrder}) => {
  return (
    <main className="container table-responsive core">
      <table className="custom-table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First-Name</th>
            <th scope="col">Last-Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row?.id}</th>
              <td>{row?.firstName}</td>
              <td>{row?.lastName}</td>
              <td>{row?.email}</td>
              <td className="action-buttons">
                <Link
                  to={`/update-recipient/${row?._id}`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button
                  onClick={() => handleDeleteOrder(row?._id)}
                  className="btn btn-danger btn-sm m-1"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Table;
