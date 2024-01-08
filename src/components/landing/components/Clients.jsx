import React from "react";
import client1 from "../../../assets/img/clients/client-1.png";
import client2 from "../../../assets/img/clients/client-2.png";
import client3 from "../../../assets/img/clients/client-3.png";
import client4 from "../../../assets/img/clients/client-4.png";
import client5 from "../../../assets/img/clients/client-5.png";
import client6 from "../../../assets/img/clients/client-6.png";
const Clients = () => {
  return (
    <section id="clients" className="clients section-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src={client1} className="img-fluid" alt="client-image" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src={client2} className="img-fluid" alt="client-image" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src={client3} className="img-fluid" alt="client-image" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src={client4} className="img-fluid" alt="client-image" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src={client5} className="img-fluid" alt="client-image" />
          </div>
          <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
            <img src={client6} className="img-fluid" alt="client-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
