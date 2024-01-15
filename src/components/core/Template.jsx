import React, { useRef } from "react";
import Layout from "./layout/Layout";
import { Link, useNavigate } from "react-router-dom";

const Template = () => {
  const subRef = useRef()
  const contentRef = useRef()
  const navigate = useNavigate()
  const handleClick = ()=>{
    const subject = subRef.current.innerText.trim();
    const content = contentRef.current.innerText.trim();
    navigate('/campaign', { state: { subject, content } });
    console.log(subject,content)
  }
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
        <main className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow h-100">
            <header className="card-header bg-blue text-white text-center py-3">
              <h6 className="m-0 font-weight-bold text-orange text-center">
                Template Name
              </h6>
            </header>
            <div className="card-body ddd" >
              <div className="border-bottom py-2 px-1">
                <span>
                  subject : 
                </span>
                <span ref={subRef}>
                 &nbsp; write your subject here!!
                </span>
              </div>
              <p ref={contentRef}>
                Welcome to [Your Company Name]! We're thrilled to have you on
                board. Here are some key features and information to help you
                get started.
              <br />
              <br />
                If you have any questions or need assistance, feel free to reach
                out to our support team.
              <br />
              <br />
                Best regards, <br />
                The [Your Company Name] Team
              </p>
              <div className="card-footer d-flex justify-content-around rounded-5 bg-gray-200">
                <Link className="btn btn-primary"   onClick={handleClick}>
                  use
                </Link>
                <Link className="btn btn-info">
                  copy
                </Link>
                <Link className="btn btn-warning">
                  edit
                </Link>
                <Link className="btn btn-danger">
                  delete
                </Link>
              </div>
            </div>
          </div>
        </main>
      </article>
    </Layout>
  );
};

export default Template;
