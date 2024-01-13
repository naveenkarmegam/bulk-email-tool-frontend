import React from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import ReportCard from "./vendors/others/ReportCard";
import LineChartOD from "./vendors/utils/LineChart";
import PieChartOD from "./vendors/utils/PieChart";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/app/state";
const DashBoard = () => {
  const {currentUser} =useSelector(selectUser)
  return (
    <Layout>
      <hgroup className="d-sm-flex align-items-center justify-content-between mb-4">
        <div className="col-md-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div className="col-md-4 text-center">
          <h3 className="h4 ">Welcome, {currentUser.firstName}</h3>
        </div>
        <div className="col-md-4 text-end">
          <Link
            to={"/create-order"}
            className="d-none d-sm-inline-block btn bg-orange text-white shadow-sm"
          >
            <i className="bi bi-plus" /> Create Order
          </Link>
        </div>
      </hgroup>
      <div className="row">
          <ReportCard   />
          <ReportCard   />
          <ReportCard   />
      </div>
      <article className="row ">
        <div className="col-xl-8 col-lg-7 d-none d-md-block">
          <div className="card shadow">
            <header className="card-header py-3 text-center">
              <h6 className="m-0 font-weight-bold text-orange">
                Earnings Overview
              </h6>
            </header>   
            <main className="card-body">
              <div className="chart-area">
                <LineChartOD />
              </div>
            </main>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <header className="card-header py-3 text-center">
              <h6 className="m-0 font-weight-bold text-orange">
                Revenue Sources
              </h6>
            </header>
            <main className="card-body">
              <div className="chart-pie d-flex justify-content-center">
                <PieChartOD  />
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary" /> standard
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success" /> priority
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-info" /> Express
                </span>
              </div>
            </main>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default DashBoard;
