// components/Services.js

const Services = ({ services }) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Categories</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <i className="fa fa-flask"></i>
            <div className="service-desc">
              <h3>Social Science</h3>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-pagelines"></i>
            <div className="service-desc">
              <h3>Environmental Science</h3>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-building-o"></i>
            <div className="service-desc">
              <h3>Innovation Science</h3>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-male"></i>
            <div className="service-desc">
              <h3>Life Sciences</h3>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-cog"></i>
            <div className="service-desc">
              <h3>Engineering and Technology</h3>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-pie-chart"></i>
            <div className="service-desc">
              <h3>Physics</h3>
            </div>
          </div>
          <div className="col-md-4">
            <i className=""></i>
            <div className="service-desc">
              <h3></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
