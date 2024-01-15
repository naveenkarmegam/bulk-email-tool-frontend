import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import {
  updateProfileSuccess,
  setLoading,
  setError,
} from "../../../../redux/global/userSlice";
import { app } from "../../../client/firebase/firebase";
import { userValidationSchema } from "../../helpers/schema/validationSchema";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout/Layout";
import { selectUser } from "../../../../redux/app/state";
import Loading from "../../../../utils/Loading";
import LeftArrow from "../Icons/LeftArrow";

const ProfileEdit = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(selectUser);
  const navigate = useNavigate();
  const [image, setImage] = useState(undefined);
  const [uploadingPercentage, setUploadingPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [changeImage, setChangeImage] = useState(currentUser.profilePicture);

  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      profilePicture: currentUser.profilePicture,
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading());
        dispatch(setError());
        const updatedValues = { ...values, profilePicture: changeImage };
        const response = await axios.patch(
          `/api/user/updateProfile/${currentUser._id}`,
          updatedValues
        );
        if (response.status === 200) {
          dispatch(updateProfileSuccess(response.data));
          navigate("/settings");
        }
      } catch (error) {
        dispatch(setError(error.response.data));
      }
    },
  });

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = nanoid() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingPercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      async () => {
        try {
          const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setChangeImage(imgUrl);
        } catch (error) {
          setImageError(true);
        }
      }
    );
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  return (
    <Layout>
      <Link to={"/settings"}>
        <LeftArrow />
      </Link>
      <hgroup className="row justify-content-center">
        <div className="col-lg-6">
          <div
            className="card o-hidden border-0 shadow-lg mt-3"
            style={{ background: "  #ddd" }}
          >
            <main className="card-body p-0">
              <div className="row">
                <div className="p-5">
                  <header className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Happy to Mailing</h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    <div className="text-center border-bottom border-dark mb-4">
                      <div className="profile-img-div">
                        <img
                          src={
                            changeImage
                              ? changeImage
                              : currentUser.profilePicture
                          }
                          alt="profile picture"
                          className="card-img-top img-responsive rounded-circle pb-4 mx-auto d-block"
                          style={{ width: "10rem" }}
                          onClick={() => fileRef.current.click()}
                        />
                        <span className="border-white d-block">
                          <i
                            className="bi bi-pencil pencil-icon text-white"
                            onClick={() => fileRef.current.click()}
                          ></i>
                        </span>
                      </div>
                      <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        value={formik.values.image}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <p className="text-center">
                        {imageError ? (
                          <span className="text-danger">
                            Error uploading image
                          </span>
                        ) : uploadingPercentage > 0 &&
                          uploadingPercentage < 100 ? (
                          <span className="text-warning">{`uploading ${uploadingPercentage}%`}</span>
                        ) : uploadingPercentage === 100 ? (
                          <span className="text-success">
                            uploaded successfully
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
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
                        disabled
                      />
                      {formik.touched.email && formik.errors.email && (
                        <span className="d-block text-start ms-3 text-danger small invalid-feedback">
                          {formik.errors.email}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary btn-user btn-block col-sm-5 col-md-6"
                        type="submit"
                      >
                        {loading ? <Loading /> : "Update"}
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

export default ProfileEdit;
