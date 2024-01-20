import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ContactForm = () => {
  const[failure,setFailure]=useState(false)
  const[success,setSuccess]=useState(false)
  const formik = useFormik({
    initialValues: {
      name: "",
      recipients: "",
      subject: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name."),
      recipients: Yup.string().email("Invalid email address").required("Please enter your email address."),
      subject: Yup.string().required("Please enter a subject."),
      content: Yup.string().required("Please enter your Message."),
    }),
    
    onSubmit: async(values, { setSubmitting, resetForm }) => {
     try {
      setSuccess(false)
      setFailure(false)
      const response = await axios.post('/api/mail/sendContactMail',values)
      setSuccess("Your message successfully received by our team")
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.log(error)
      setSuccess(false)
      setFailure(error.response.data.message)
     }
    },
  });

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or inquiries related to our Bulk Mailer
            services, feel free to get in touch with us. We'd love to hear from
            you!
          </p>
        </div>
        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
          <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt" />
                <h4>Our Location:</h4>
                <p>Your Business Street, Thanjavur, India, 600 0028</p>
              </div>
              <div className="email">
                <i className="bi bi-envelope" />
                <h4>Email:</h4>
                <p>info@bulkmailer.com</p>
              </div>
              <div className="phone">
                <i className="bi bi-phone" />
                <h4>Contact Number:</h4>
                <p>+1 555-1234-5678</p>
              </div>
              {/* You can replace the iframe with a static map image or another map integration */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1646.8151454839856!2d79.22427795294608!3d10.977816823628853!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baad023dafc1d35%3A0x6d87a4f790397fd5!2sKuruvadi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1704692416555!5m2!1sen!2sin"
                style={{ border: 0, width: "100%", height: 290 }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form className="php-email-form" onSubmit={formik.handleSubmit}>
              {
                success && (<p className="text-center text-success">{success}</p>)
              }
              {
                failure && (<p className="text-center text-danger">{failure}</p>)
              }
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    id="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    required
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="recipients">Your Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      formik.touched.recipients && formik.errors.recipients
                        ? "is-invalid"
                        : ""
                    }`}
                    name="recipients"
                    id="recipients"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.recipients}
                    required
                  />
                  {formik.touched.recipients && formik.errors.recipients && (
                    <div className="invalid-feedback">{formik.errors.recipients}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.subject && formik.errors.subject
                      ? "is-invalid"
                      : ""
                  }`}
                  name="subject"
                  id="subject"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                  required
                />
                {formik.touched.subject && formik.errors.subject && (
                  <div className="invalid-feedback">
                    {formik.errors.subject}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="content">Message</label>
                <textarea
                  className={`form-control ${
                    formik.touched.content && formik.errors.content
                      ? "is-invalid"
                      : ""
                  }`}
                  name="content"
                  rows={10}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                  required
                />
                {formik.touched.content && formik.errors.content && (
                  <div className="invalid-feedback">
                    {formik.errors.content}
                  </div>
                )}
              </div>
              <div className="my-3">
                <div className="text-center">
                  <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
