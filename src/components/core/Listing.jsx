import React, { useEffect, useMemo, useState } from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipientFailure,
  deleteRecipientStart,
  deleteRecipientSuccess,
  fetchRecipient,
  setSelectedRecipientEmail,
} from "../../redux/global/recipientsSlice";
import Loading from "../../utils/Loading";
import axios from "axios";
import { selectRecipient } from "../../redux/app/state";
import { toast } from "react-toastify";

const Listing = () => {
  const dispatch = useDispatch();
  const { recipients, loading, error } = useSelector(selectRecipient);
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

  const handleGetTotalEmails = () => {
    const allEmails = recipients.map((row) => row.email);
    dispatch(setSelectedRecipientEmail(allEmails))
  };

  return (
    <Layout>
      <hgroup className="row justify-content-around mb-4">
        <div className="col-md-12">
          <h1 className="h3 mb-0 text-gray-800 text-center">Recipients</h1>
        </div>
        <div className="col-md-6 mt-3 text-center">
          <Link
            to={"/add-recipient"}
            className="m-2 btn bg-gradient-primary text-white shadow-sm "
          >
            <i className="bi bi-plus text-white"></i>
            Add recipients
          </Link>
          <Link
             to={"/campaign"}

            className="btn bg-gradient-warning text-white shadow-sm "
            onClick={handleGetTotalEmails}
            disabled={recipients.length === 0}
          >
            <i className="bi bi-mailbox text-white px-2"></i>
            Send Mail
          </Link>
        </div>
      </hgroup>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9 col-md-12">
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
                  <tr key={row._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td className="action-buttons">
                      <Link to={`/update-recipient/${row._id}`} className="btn btn-primary btn-sm">
                        <i className="bi bi-pencil-square"></i> 
                      </Link>
                      <button
                        onClick={() => handleDeleteOrder(row._id)}
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
       
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
