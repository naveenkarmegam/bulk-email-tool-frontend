import React from "react";
import Layout from "./layout/Layout";
import { useFormik } from "formik";
import { emailValidationSchema } from "./schema/validationSchema";

const Campaign = () => {
  const formik = useFormik({
    initialValues: {
      content: "",
      to: "",
      subject: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      try {
        formik.resetForm();
      } catch (error) {}
    },
  });
  return (
    <Layout>
      <hgroup className="row justify-content-center">
        <div className="col-lg-6">
          <div
            className="card o-hidden border-0 shadow-lg my-5"
            style={{ background: "#ddd" }}
          >
            <main className="card-body p-0">
              <div className="row">
                <div className="p-5">

                  <header className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Happy to Mailing</h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    <div className="form-group p-0">
                      <input
                        type="text"
                        className={`form-control form-control-user ${
                          formik.touched.to && formik.errors.to
                            ? "is-invalid"
                            : ""
                        }`}
                        id="to"
                        placeholder="to"
                        name="to"
                        value={formik.values.to}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.to && formik.errors.to && (
                        <span className="d-block ms-3 text-danger small invalid-feedback">
                          {formik.errors.to}
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
