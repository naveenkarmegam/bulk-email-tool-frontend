import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../client/firebase/firebase";
import { userValidationSchema } from "../../helpers/schema/validationSchema";
import { nanoid } from "@reduxjs/toolkit";

const ProfileEditModal = ({ currentUser }) => {
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [uploadingPercentage, setUploadingPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
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
        console.log(values);
      } catch (error) {}
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url)); //url link will be come
      }
    );
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  //   allow read;
  //   allow write: if
  //   request.resource.size < 2 * 1024 * 1024 &&
  //   request.resource.contentType.matches('image/.*')
  // }

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
                <div className="text-center border-bottom border-dark mb-4">
                  <img
                    src={currentUser.profilePicture}
                    alt="profile picture"
                    className="card-img-top rounded-circle pb-4 "
                    style={{ width: "10rem" }}
                    onClick={() => fileRef.current.click()}
                  />
                  <span>
                    <i
                      className="bi bi-pencil pencil-icon text-white"
                      onClick={() => fileRef.current.click()}
                    ></i>
                  </span>
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
                      <span className="text-danger">Error uploading image</span>
                    ) : uploadingPercentage > 0 && uploadingPercentage < 100 ? (
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
