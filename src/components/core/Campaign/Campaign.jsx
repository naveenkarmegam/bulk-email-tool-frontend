import React from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMail, selectRecipient } from "../../../redux/app/state";
import FieldConfig from "../vendors/utils/FieldConfig";
import TextArea from "../vendors/utils/TextArea";
import {
  sendMailFailure,
  sendMailStart,
  sendMailSuccess,
} from "../../../redux/global/mailSlice";
import ProgressBar from "../../../utils/ProgressBar";
import AutoDismissAlert from "../../../utils/AutoDismissAlert";
import Loading from "../../../utils/Loading";
import { emailValidationSchema } from "./validation/emailValidationSchema";

const Campaign = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { recipientsEmail } = useSelector(selectRecipient);
  const { loading, success, error } = useSelector(selectMail);

  const initialRecipients = recipientsEmail.join(",") || "";
  const initialSubject = location.state?.subject || "";
  const initialContent = location.state?.content || "";

  const fieldConfig = [
    { name: "recipients", placeholder: "recipients", type: "text" },
    { name: "subject", placeholder: "subject", type: "text" },
  ];

  const formik = useFormik({
    initialValues: {
      content: initialSubject,
      recipients: initialRecipients,
      subject: initialContent,
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(sendMailStart());
        values = { ...values, recipients: values.recipients.trim().split(",") };
        const response = await axios.post("/api/mail/sendBulkMail", values);
        dispatch(sendMailSuccess(response.data));
      } catch (error) {
        dispatch(sendMailFailure(error.response.data.message));
      }
    },
  });
  return (
    <Layout>
      <hgroup className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <div className="card o-hidden bg-color border-0 shadow-lg my-5">
            <main className="card-body p-0">
              <div className="row">
                <div className="p-5">
                  <header className="text-center">
                    <h1 className="h4 text-white mb-4">
                      Happy recipients Mailing
                    </h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    {fieldConfig.map((field, index) => (
                      <FieldConfig field={field} formik={formik} key={index} />
                    ))}
                    <TextArea formik={formik} />
                    <div className="text-center">
                      <div>
                        {/* Button trigger modal */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block col-sm-5 col-md-6"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Send 
                        </button>
                        {/* Modal */}
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content bg-color">
                              <div className="modal-body text-white">
                                {loading ? (
                                  <Loading />
                                ) : error ? (
                                  <AutoDismissAlert />
                                ) : (
                                  success
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </hgroup>
    </Layout>
  );
};

export default Campaign;
