import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipient } from "../../../redux/app/state";
import axios from "axios";
import { updateRecipientFailure, updateRecipientStart, updateRecipientSuccess } from "../../../redux/global/recipientsSlice";
import Loading from "../../../utils/Loading";
import { recipientValidationSchema } from "./schema/validationSchema";
import { toast } from "react-toastify";

const EditRecipient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading,error } = useSelector(selectRecipient);
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema:recipientValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(updateRecipientStart());
        const response = await axios.patch(`/api/recipient/update-recipient/${id}`,values)
        dispatch(updateRecipientSuccess(response.data))
        toast.success(response.data.message,{theme:'colored',type:'success'})
        navigate('/list')
      } catch (error) {
        const {data} = error.response
        dispatch(updateRecipientFailure(data))
        toast.error(data.message, { type: "error", theme: "colored" });
      }
    },
  });

  const getRecipientById = async ()=>{
    try {
      const response = await axios.get(`/api/recipient/get-recipient/${id}`)
      formik.setValues(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getRecipientById()
  }, [dispatch, id]);
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
                    <h1 className="text-center  h1">EDIT USER</h1>
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
                       {
                        loading ? <Loading isLoading={loading} /> : 'Update'
                       }
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

export default EditRecipient;
