import React, { useEffect, useMemo, useState } from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipientFailure,
  deleteRecipientStart,
  deleteRecipientSuccess,
  fetchRecipient,
} from "../../redux/global/recipientsSlice";
import Loading from "../../utils/Loading";
import axios from "axios";
import { selectRecipient } from "../../redux/app/state";
import { toast } from "react-toastify";

const Listing = () => {
  const dispatch = useDispatch();
  const { recipients, loading, error } = useSelector(selectRecipient);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  console.log("click the table head check box to select all", selectedRows);
  useEffect(() => {
    if (recipients.length === 0) {
      dispatch(fetchRecipient());
    }
  }, [dispatch, recipients]);

  const handleDeleteOrder = async (recipientId) => {
    try {
      dispatch(deleteRecipientStart());
      const response = await axios.delete(
        `/api/recipient/delete-recipient/${recipientId}`
      );
      console.log(response);
      dispatch(deleteRecipientSuccess(response.data));
      toast.success(response.data.message, {
        theme: "colored",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      dispatch(deleteRecipientFailure(data));
      toast.error(data.message, { type: "error", theme: "colored" });
    }
  };

  const handleCheckboxChange = (rowId) => {
    console.log(rowId);
    const newSelectedRows = selectedRows.includes(rowId)
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];

    setSelectedRows(newSelectedRows);
  };

  const handleGetSelectedEmails = () => {
    const selectedEmails = recipients
      .filter((row) => selectedRows.includes(row._id))
      .map((row) => row.email);

    setSelectedEmails(selectedEmails);
    // Use the selectedEmails state as needed (e.g., send to backend, display, etc.)
    console.log("Selected Emails:", selectedEmails);
  };

  const handleGetTotalEmails = () => {
    const allEmails = recipients.map((row) => row.email);
    console.log("Total Emails:", allEmails);
  };

  const columns = useMemo(() => [
    { id: "firstName", label: "First-Name" },
    { id: "lastName", label: "Last-Name" },
    { id: "email", label: "E-mail" },
    { id: "actions", label: "Actions", size: "120" },
  ]);

  return (
    <Layout>
      <hgroup className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Recipients</h1>
        <Link
          to={"/add-recipient"}
          className="p-0 px-2 py-1 m-0 btn bg-blue text-white shadow-sm"
        >
          <i className="bi bi-plus text-white p-0 m-0"></i>
          Add recipients
        </Link>
      </hgroup>
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <main className="container table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === recipients.length}
                      onChange={() => {
                        const allRowIds = recipients.map((row) => row._id);
                        setSelectedRows(
                          selectedRows.length === recipients.length
                            ? []
                            : allRowIds
                        );
                      }}
                    />
                  </th>
                  <th scope="col">#</th>
                  <th scope="col">First-Name</th>
                  <th scope="col">Last-Name</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((row, index) => (
                  <tr key={row._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>
                      <Link to={`/update-recipient/${row._id}`}>
                        <i className="bi bi-pencil-square fs-5 text-primary" />
                      </Link>
                      <Link onClick={() => handleDeleteOrder(row._id)}>
                        <i className="bi bi-trash-fill fs-5 text-danger" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
          <div className="d-flex justify-content-between p-3">
            <button
              onClick={handleGetSelectedEmails}
              disabled={selectedRows.length === 0}
            >
              Get Selected Emails
            </button>
            <button
              onClick={handleGetTotalEmails}
              disabled={recipients.length === 0}
            >
              Get Total Emails
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
