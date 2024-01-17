import React, { useEffect, useMemo, useState } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipientFailure,
  deleteRecipientStart,
  deleteRecipientSuccess,
  fetchRecipient,
  setSelectedRecipientEmail,
} from "../../../redux/global/recipientsSlice";

import axios from "axios";
import { selectRecipient } from "../../../redux/app/state";
import AutoDismissAlert from "../../../utils/AutoDismissAlert";
import Loading from "../../../utils/Loading";
import Table from "./Table";
import Pagination from "./Pagination";
import SelectLimit from "./SelectLimit";

// const recipients = [
//   { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
//   { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
//   { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com' },
//   { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' },
//   { firstName: 'Eva', lastName: 'Williams', email: 'eva.williams@example.com' },
//   { firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com' },
//   { firstName: 'Olivia', lastName: 'Davis', email: 'olivia.davis@example.com' },
//   { firstName: 'Daniel', lastName: 'Miller', email: 'daniel.miller@example.com' },
//   { firstName: 'Sophia', lastName: 'Wilson', email: 'sophia.wilson@example.com' },
//   { firstName: 'Matthew', lastName: 'Moore', email: 'matthew.moore@example.com' },
// ];



const Recipients = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { recipients, error, success, loading } = useSelector(selectRecipient);
  // console.log(loading)
  useEffect(() => {
      if(recipients.length===0){
        dispatch(fetchRecipient());
      }
  }, [dispatch]);

  const handleDeleteOrder = async (recipientId) => {
    try {
      dispatch(deleteRecipientStart());
      const response = await axios.delete(
        `/api/recipient/delete-recipient/${recipientId}`
      );
      dispatch(deleteRecipientSuccess(response.data));
    } catch (error) {
      dispatch(deleteRecipientFailure(error.response.data));
    }
  };

  const handleGetTotalEmails = () => {
    const allEmails = recipients.map((row) => row.email);
    dispatch(setSelectedRecipientEmail(allEmails));
  };

  const getRecipients = (page, limit) => {
    let array = [];
    for (let i = (page - 1) * limit; i < page * limit && recipients[i]; i++) {
      array.push(recipients[i]);
    }
    return array;
  };

  const totalPage = Math.ceil(recipients.length / limit);
  let pageNo ;
  if(page<=totalPage){
    pageNo = page;
  }else{
    setPage(totalPage)
    pageNo = page;
  }
  const onPageChange = (value) => {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
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
          <div className="mx-3">
            {success && <AutoDismissAlert message={success} type={"success"} />}
            {error && (
              <AutoDismissAlert message={error.message} type={"danger"} />
            )}
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Table
                recipients={getRecipients(page, limit)}
                handleDeleteOrder={handleDeleteOrder}
              />
              <SelectLimit onLimitChange={setLimit} />
              <Pagination
                totalPage={totalPage}
                page={pageNo}
                limit={limit}
                siblings={1}
                onPageChange={onPageChange}
              />
            </>
            // console.log(getRecipients)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Recipients;
