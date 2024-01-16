import React, { useRef } from "react";
import Layout from "./layout/Layout";
import { Link, useNavigate } from "react-router-dom";

const Template = () => {
  const subRef = useRef();
  const contentRef = useRef();
  const navigate = useNavigate();
  const handleClick = () => {
    const subject = subRef.current.innerText.trim();
    const content = contentRef.current.innerText.trim();
    navigate("/campaign", { state: { subject, content } });
    console.log(subject, content);
  };
  const emailTemplates = [
    {
      title: "Welcome Email",
      subject: "Welcome to Our Community!",
      content: "Dear [Name],\n\nWe are thrilled to welcome you to our community! Thank you for joining us on this journey.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Event Invitation",
      subject: "You're Invited to Our Special Event!",
      content: "Dear [Name],\n\nWe are excited to invite you to our upcoming event. Join us for an unforgettable experience filled with [details].\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Feedback Request",
      subject: "Your Opinion Matters!",
      content: "Dear [Name],\n\nWe value your feedback and would appreciate it if you could take a few moments to share your thoughts on [topic]. Your input is important to us.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Job Application Acknowledgment",
      subject: "Thank You for Your Job Application!",
      content: "Dear [Name],\n\nThank you for submitting your job application to [Company]. We have received your information and will review it carefully.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Holiday Greetings",
      subject: "Warm Wishes for the Holiday Season!",
      content: "Dear [Name],\n\nWishing you and your loved ones a joyous holiday season filled with love, laughter, and good cheer. May the new year bring you happiness and success.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Congratulations!",
      subject: "Congratulations on Your Achievement!",
      content: "Dear [Name],\n\nCongratulations on your recent achievements. Your hard work and dedication have truly paid off. We are proud to celebrate this milestone with you.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Account Activation",
      subject: "Your Account is Now Active!",
      content: "Dear [Name],\n\nWe are delighted to inform you that your account has been successfully activated. You can now enjoy all the features and benefits of [Platform/Service].\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Product Announcement",
      subject: "Exciting News: New Product Launch!",
      content: "Dear [Name],\n\nWe are thrilled to share the exciting news about our latest product launch. Discover the innovative features and enhancements that will enhance your experience.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Educational Webinar",
      subject: "Join Our Educational Webinar!",
      content: "Dear [Name],\n\nExpand your knowledge by participating in our upcoming educational webinar. Gain insights from industry experts and enhance your skills in [topic].\n\nBest Regards,\nThe [Your Company Name] Team",
    },
    {
      title: "Volunteer Opportunity",
      subject: "Get Involved: Volunteer with Us!",
      content: "Dear [Name],\n\nWe invite you to make a positive impact in your community by volunteering with us. Join our team and contribute to meaningful projects that make a difference.\n\nBest Regards,\nThe [Your Company Name] Team",
    },
  ];
  
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
      <article className="row px-2">
        {emailTemplates.map((item, index) => (
          <main className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card shadow h-100">
              <header className="card-header bg-color text-white text-center py-3">
                <h6 className="m-0 font-weight-bold">
                  {item.title}
                </h6>
              </header>
              <div className="card-body ddd">
                <div className="border-bottom py-2 px-1">
                <strong>Subject:</strong>
                  <span ref={subRef}>&nbsp; {item.subject}</span>
                </div>
                <div ref={contentRef}>
                <strong>Content:</strong> &nbsp;
                  {
                    item.content
                  }
                </div>
              </div>
                <div className="card-footer d-flex justify-content-around  bg-gray-200">
                  <Link className="btn btn-primary" onClick={handleClick}>
                    use
                  </Link>
                  <Link className="btn btn-info">copy</Link>
                  <Link className="btn btn-warning">edit</Link>
                  <Link className="btn btn-danger">delete</Link>
                </div>
            </div>
          </main>
        ))}
      </article>
    </Layout>
  );
};

export default Template;
