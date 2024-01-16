import React from "react";
import Loading from "../../../utils/Loading";


const ReportCard = ({ title, value, icon, loading }) => {
  loading = false
  return (
    <article className="col-xl-4 col-md-6 mb-4">
      <section className="card border-left-color shadow h-100 py-2">
        <main className="card-body mx-3">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-color text-uppercase mb-1">
                {/* {title} */} Naveen
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? <Loading /> : 100}
              </div>
            </div>
            {/* <div className="col mr-2">
              <div className="progress progress-sm mr-2">
                <div className="progress-bar bg-orange" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div> */}

            <div className="col-auto">
              <i className={`bi bi-truck fs-2 text-color`} />
              {icon}
            </div>
          </div>
        </main>
      </section>
    </article>
  );
};

export default ReportCard;
