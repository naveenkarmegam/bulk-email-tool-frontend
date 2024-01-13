import React from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import { userValidationSchema } from "./schema/validationSchema";
import axios from "axios";

const AddRecipients = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "/api/recipient/add-recipient",
          values
        );
        if ((response.status = 201)) {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Layout>
      <hgroup className="row justify-content-center">
        <div className="col-lg-6">
          <div
            className="card o-hidden border-0 shadow-lg my-5"
            style={{ background: "  #ddd" }}
          >
            <main className="card-body p-0">
              <div className="row">
                <div className="p-5">
                  <hgroup className="d-flex justify-content-center user-heading">
                    <h1 className="text-center  h1">ADD USER</h1>
                  </hgroup>

                  <header className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Happy to Mailing</h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    <div className="form-group p-0">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formik.touched.firstName && formik.errors.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="firstName"
                        placeholder="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.firstName}
                        </span>
                      )}
                    </div>
                    <div className="form-group p-0">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formik.touched.lastName && formik.errors.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="lastName"
                        placeholder="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.lastName}
                        </span>
                      )}
                    </div>
                    <div className="form-group p-0 ">
                      <input
                        className={`form-control form-control-user ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.email}
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

export default AddRecipients;
