import React from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileEditModal from "./vendors/others/ProfileEditModal";
const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Layout>
      <hgroup className="d-sm-flex align-items-center justify-content-center mb-4">
        <h1 className="h3 mb-0 text-gray-800 text-center">Profile</h1>
      </hgroup>
      <div className="row py-2 justify-content-center">
        <div className="col-lg-6">
          <article className="card shadow mb-4">
            <header className="card-header py-3 mb-1">
              <h6 className="m-0 font-weight-bold text-orange text-center">
                Your User Data
              </h6>
            </header>
            <main className="card-body ">
              <div className="row py-2 justify-content-center">
                <div className="col-lg-6 text-center">
                  <img
                    src={currentUser.profilePicture}
                    alt="profile picture"
                    className="card-img-top rounded-circle"
                    style={{ width: "10rem" }}
                  />
                </div>
                <hr />
                <div className="px-sm-5">
                  <div className="row py-2">
                    <div className="col-sm-3">
                      <h6 className="pb-0 mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9">
                      <p className="p-0 m-0">{currentUser.firstName}</p>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-sm-3">
                      <h6  className="pb-0 mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9">
                      <p className="p-0 m-0">{currentUser.lastName}</p>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-sm-3">
                      <h6  className="pb-0 mb-0">E-mail</h6>
                    </div>
                    <div className="col-sm-9">
                      <p className="p-0 m-0">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="d-gird text-center">
                    <ProfileEditModal currentUser={currentUser} />
                  </div>
                </div>
              </div>
            </main>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
