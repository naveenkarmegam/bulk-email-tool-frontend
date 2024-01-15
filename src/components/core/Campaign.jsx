import React from "react";
import Layout from "./layout/Layout";
import { useFormik } from "formik";
import { emailValidationSchema } from "./schema/validationSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecipient } from "../../redux/app/state";

const Campaign = () => {
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  const {recipientsEmail}=useSelector(selectRecipient)
  const initialRecipients = recipientsEmail.join(',')|| "";
  const initialSubject = location.state?.subject || "";
  const initialContent = location.state?.content || "";
  const formik = useFormik({
    initialValues: {
      content: initialSubject,
      recipients: initialRecipients,
      subject: initialContent,
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      try {
        values = {...values,recipients:values.recipients.trim().split(',')}
        console.log(values)
        const response = await axios.post('/api/mail/sendBulkMail',values);
        if(response.status === 200){
          console.log(response.data)
        }
  
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message,{
          type: 'error',
          autoClose: 5000,
          theme: "colored"
        })
      }
    },
  });
  return (
    <Layout>
      <hgroup className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <div
            className="card o-hidden bg-warning border-0 shadow-lg my-5"
            // style={{ background: "#ddd" }}
          >
            <main className="card-body p-0">
              <div className="row">
                <div className="p-5">

                  <header className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Happy recipients Mailing</h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    <div className="form-group p-0">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formik.touched.recipients && formik.errors.recipients
                            ? "is-invalid"
                            : ""
                        }`}
                        id="recipients"
                        placeholder="recipients"
                        name="recipients"
                        value={formik.values.recipients}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.recipients && formik.errors.recipients && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.recipients}
                        </span>
                      )}
                    </div>
                    <div className="form-group p-0">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formik.touched.subject && formik.errors.subject
                            ? "is-invalid"
                            : ""
                        }`}
                        id="subject"
                        placeholder="subject"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.subject && formik.errors.subject && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.subject}
                        </span>
                      )}
                    </div>
                    <div className="form-group p-0 ">
                      <textarea
                        className={`form-control ${
                          formik.touched.content && formik.errors.content
                            ? "is-invalid"
                            : ""
                        }`}
                        id="content"
                        cols={30}
                        rows={8}
                        placeholder="Enter the body of the mail"
                        name="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.content && formik.errors.content && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.content}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary btn-user btn-block col-sm-5 col-md-6"
                        type="submit"
                      >
                        ADD
                      </button>
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
