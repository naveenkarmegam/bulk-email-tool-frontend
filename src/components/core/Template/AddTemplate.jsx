import React from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import FieldConfig from "../vendors/utils/FieldConfig";
import TextArea from "../vendors/utils/TextArea";
import { templateValidationSchema } from "./validations/templateValidationSchema";

const AddTemplate = () => {
  const fieldConfig = [
    { name: "title", placeholder: "Template Title", type: "text" },
    { name: "subject", placeholder: "Subject", type: "text" },
  ];
  const formik = useFormik({
    initialValues: {
      title: "",
      subject: "",
      content: "",
    },
    validationSchema: templateValidationSchema,
    onSubmit: async (values) => {
      try {
        
      } catch (error) {
        
      }
    },
  });
  return (
    <Layout>
      <hgroup className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card o-hidden border-0 bg-color shadow-lg my-5">
            <main className="card-body p-0">
              <div className="row">
                <div className="p-5">
                  <hgroup className="d-flex justify-content-center user-heading">
                    <h1 className="text-center text-white h3">ADD TEMPLATE</h1>
                  </hgroup>

                  <header className="text-center">
                    <h1 className="h4 text-white mb-4">Happy to Mailing</h1>
                  </header>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    {fieldConfig.map((field, index) => (
                      <FieldConfig field={field} formik={formik} key={index} />
                    ))}
                    <TextArea formik={formik} />
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

export default AddTemplate;
