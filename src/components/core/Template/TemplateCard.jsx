import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  deleteTemplateFailure,
  deleteTemplateStart,
  deleteTemplateSuccess,
} from "../../../redux/global/templateSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
const TemplateCard = ({ templates, isCustom }) => {
  const dispatch = useDispatch();
  const subRef = useRef();
  const contentRef = useRef();
  const handleClick = () => {
    const subject = subRef.current.innerText.trim();
    const content = contentRef.current.innerText.trim();
    navigate("/campaign", { state: { subject, content } });
    console.log(subject, content);
  };
  const handleDeleteOrder = async (templateId) => {
    try {
      dispatch(deleteTemplateStart());
      const response = await axios.delete(
        `/api/template/delete-template/${templateId}`
      );
      dispatch(deleteTemplateSuccess(response.data));
    } catch (error) {
      dispatch(deleteTemplateFailure(error.response.data));
    }
  };

  return (
    <article className="row px-2">
      {templates.map((template, index) => {
        return (
          <main className="col-lg-6 col-xl-4 col-md-6 mb-4" key={index}>
            <div className="card shadow h-100">
              <header className="card-header bg-color text-white text-center py-3">
                <h6 className="m-0 font-weight-bold">{template.title}</h6>
              </header>
              <div className="card-body ddd">
                <div className="border-bottom py-2 px-1">
                  <strong>Subject:</strong>
                  <span ref={subRef}>&nbsp; {template.subject}</span>
                </div>
                <div ref={contentRef}>
                  <strong>Content:</strong> &nbsp;
                  {template.content}
                </div>
              </div>
              <div className="card-footer d-flex justify-content-around  bg-gray-200 px-0">
                <Link className={`btn btn-primary`} disabled={isCustom}>
                  use
                </Link>
                <Link
                  className={`btn btn-info ${isCustom ? "disabled" : ""}`}
                  disabled={isCustom}
                >
                  copy
                </Link>
                <Link
                  to={`/update-template/${template._id}`}
                  className={`btn btn-warning ${isCustom ? "disabled" : ""}`}
                  disabled={isCustom}
                >
                  edit
                </Link>
                <button
                  className={`btn btn-danger ${isCustom ? "disabled" : ""}`}
                  disabled={isCustom}
                  onClick={() => handleDeleteOrder(template._id)}
                >
                  delete
                </button>
              </div>
            </div>
          </main>
        );
      })}
    </article>
  );
};

export default TemplateCard;
