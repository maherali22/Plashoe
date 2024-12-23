import React from "react";
import Footer from "./Footer";
const Lookbook = () => {
  return (
    <div>
      <div
        className="lk-lk"
        style={{
          fontFamily: "sans-serif",
          fontSize: "40px",
          marginBottom: "40px",
          // marginTop: "50px",
          // marginLeft: "100px",
          // fontWeight: "bold",
          // color: "black",
          // textDecoration: "none",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Lookbook</h3>
      </div>
      <div className="lk-img">
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-4.jpg"
          alt="img"
          style={{ width: "100%" }}
        />
      </div>
      <div
        className="lk-txt"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "80px",
          marginLeft: "100px",
        }}
      >
        <div style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
          <h1>Fall/Winter 2021</h1>
        </div>
        <div style={{ fontSize: "25px" }}>
          <p>
            Elementum donec leo vulputate sit proin suspendisse
            <br /> malesuada neque proin gravida ut platea vitae duis hac
            <br /> hac vel id ipsum ultricies ut faucibus ultrices.
          </p>
          <div style={{ marginTop: "20px" }}>
            <a href="/#" id="scrollToTopLink" style={{ color: "yellow" }}>
              <h6 style={{ color: "black" }}>Shop Now</h6>
            </a>
          </div>
        </div>
      </div>
      <div className="lk-summer">
        <div style={{ marginTop: "60px" }}>
          <img
            src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-3.jpg"
            alt="img"
            style={{ width: "100%" }}
          />
        </div>

        <div
          className="lk-txt"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "80px",
            marginLeft: "100px",
          }}
        >
          <div style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
            <h1>Spring/Summer 2021</h1>
          </div>
          <div style={{ fontSize: "25px" }}>
            <p>
              Elementum donec leo vulputate sit proin suspendisse
              <br /> malesuada neque proin gravida ut platea vitae duis hac
              <br /> hac vel id ipsum ultricies ut faucibus ultrices.
            </p>
            <div style={{ marginTop: "20px" }}>
              <a href="/#" id="scrollToTopLink" style={{ color: "yellow" }}>
                <h6 style={{ color: "black" }}>Shop Now</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lookbook;
