import React from "react";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";

const Template = () => {
  return (
    <Layout>
      <article className="d-sm-flex align-items-center justify-content-between mb-4">
        <section className="col-md-4">
          <h1 className="h3 mb-0 text-gray-800">Template</h1>
        </section>
        <section className="col-md-4">
          <input
            type="search"
            className="form-control flex-fill"
            placeholder="Search here"
          />
        </section>
        <section className="col-md-4 text-end">
          <Link
            to={"/add-template"}
            className="p-0 px-2 py-1 m-0  btn bg-blue text-white shadow-sm"
          >
            <i className="bi bi-bi-plus p-0 m-0" />
            Add Template
          </Link>
        </section>
      </article>
      <article className="row">
        <main className="col-lg-4 mb-4">
          <div className="card shadow h-100">
            <header className="card-header text-center py-3 mb-1">
              <h6 className="m-0 font-weight-bold text-orange text-center">
                Template Name
              </h6>
            </header>
            <div className="card-body">
              <p>
                Welcome to [Your Company Name]! We're thrilled to have you on
                board. Here are some key features and information to help you
                get started.
              </p>
              <p>
                If you have any questions or need assistance, feel free to reach
                out to our support team.
              </p>
              <p>
                Best regards, <br />
                The [Your Company Name] Team
              </p>
            </div>
          </div>
        </main>
      </article>
    </Layout>
  );
};

export default Template;
