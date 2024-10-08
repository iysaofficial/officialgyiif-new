const Contact = ({ contactInfo }) => {

  return (
    <section className="contact-section" id="contact">
      <div className="container row">
        <div className="col-md-8">
          <div className="row">
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>
                Please fill out the form below to send us an email and we will
                get back to you as soon as possible.
              </p>
            </div>
            <form action="https://formspree.io/f/mknlrzbr" method="POST">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Message"
                  required
                ></textarea>
                <p className="help-block text-danger"></p>
              </div>
              <button type="submit" className="btn btn-custom btn-lg" >Send Message</button>
            </form>
          </div>
        </div>
        <div className="col-md-3 col-md-offset-1 contact-info">
          <div className="contact-item">
            <h3>Contact Info</h3>
            <p>
              <span>
                <i className="fa fa-map-marker"></i> Address
              </span>
              <span>
                <a
                  href="https://goo.gl/maps/9x18coXGCmSscKec6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jalan Kemang RT. 03 RW. 06 Pasir Putih, Kecamatan Sawangan,
                  Kota Depok, Jawa Barat 16511, Indonesia.
                </a>
              </span>
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-phone"></i> Phone
              </span>
              <a
                href="https://api.whatsapp.com/send/?phone=6288213248890&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                0882 1324 8890
              </a>
              <br />
              <a
                href="https://api.whatsapp.com/send/?phone=6281770914129&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                0817 7091 4129
              </a>
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-envelope-o"></i> Email
              </span>
              <a
                href="mailto:gyiif.iysa@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                gyiif.iysa@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
