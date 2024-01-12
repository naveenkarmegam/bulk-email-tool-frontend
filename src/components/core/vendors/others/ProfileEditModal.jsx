import { useFormik } from "formik";
import React, { useEffect } from "react";
import { userValidationSchema } from "../../helpers/schema/validationSchema";

const ProfileEditModal = ({currentUser}) => {
  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName:currentUser.lastName,
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        formik.resetForm();
      } catch (error) {}
    },
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary col-sm-6"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
       Edit
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Hey! Dude
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
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
                    <span className="d-block text-start ms-3 text-danger small invalid-feedback">
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
                    <span className="d-block text-start ms-3 text-danger small invalid-feedback">
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
                    <span className="d-block text-start ms-3 text-danger small invalid-feedback">
                      {formik.errors.email}
                    </span>
                  )}
                </div>
                <div className="modal-footer m-0 p-0">
                  <button
                    className="btn btn-primary btn-user  btn-block col-sm-5 col-md-6"
                    type="submit"
                  >
                   UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
