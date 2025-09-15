"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const ContactComp = () => {
  useEffect(() => {
      const scriptURL =
      "https://script.google.com/macros/s/AKfycbzdgUOy_s6zjJQTgqXQ7GX3H1_w6TvWq1hsBZgH0mSREWt3qXCKA34-qo74-jfDVbHE/exec";

      const form = document.forms.namedItem("home-contact");

      if (form) {
      const handleSubmit = async (e: Event) => {
          e.preventDefault();
          try {
          await fetch(scriptURL, {
              method: "POST",
              body: new FormData(form),
          });
          alert("Message sent successfully!");
          form.reset();
          } catch (error) {
          console.error("Error:", error);
          alert("Failed to send Message.");
          }
      };

      form.addEventListener("submit", handleSubmit);

      // cleanup listener
      return () => {
          form.removeEventListener("submit", handleSubmit);
      };
      }
  }, []);
  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(".input");

    const focusFunc = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        target.parentElement?.classList.add("focus");
    };

    const blurFunc = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        if (!target.value) target.parentElement?.classList.remove("focus");
    };

    inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
    });

    return () => {
        inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
        });
    };
  }, []);
  return (
    <>
      <section className="contact-section" id="contact">
        <div className="container1">
          <div className="form">
            <div className="contact-info">
              <h3 className="title">Lets get in touch</h3>
              <p>Feel free to contact us. We are here to assist you with all your needs.</p>

              <div className="info">
                <div className="information">
                  <img src="/assets/images/icon/location.png" className="contact-icon" alt="" />
                  <Link href="https://goo.gl/maps/9x18coXGCmSscKec6" target="_blank" rel="noreferrer">
                    Jl. Kemang No. 63 RT 03 RW 06
                  </Link>
                </div>
                <div className="information">
                  <img src="/assets/images/icon/email.png" className="contact-icon" alt="" />
                  <Link href="mailto:iysa.olympiad@gmail.com" target="_blank" rel="noreferrer">
                    iysa.olympiad@gmail.com
                  </Link>
                </div>
                <div className="information">
                  <img src="/assets/images/icon/phone.png" className="contact-icon" alt="" />
                  <Link href="https://wa.me/+6283870026877" target="_blank" rel="noreferrer">
                    +6283870026877
                  </Link>
                </div>
              </div>

              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  <Link href="https://www.facebook.com/profile.php?id=100063979907207" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link href="https://www.instagram.com/iyco.official?utm_source=ig_web_button_share_sheet&igsh=MXU2cm8xMWx0N284MA==" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link href="https://www.youtube.com/@IYSAOfficial" target="_blank" rel="noreferrer">
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link href="https://www.tiktok.com/@iysa.official" target="_blank" rel="noreferrer">
                    <i className="fab fa-tiktok"></i>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/indonesian-young-scientist-association-iysa"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <span className="circle one"></span>
              <span className="circle two"></span>

              <form action="" autoComplete="off" method="POST" name="home-contact">
                <h3 className="title">Contact us</h3>
                <input type="hidden" name="Event" value="IYCO" readOnly />
                <div className="input-container">
                  <input id="name" type="text" name="Name" className="input" />
                  <label htmlFor="name">name</label>
                  <span>name</span>
                </div>

                <div className="input-container">
                  <input id="email" type="email" name="Email" className="input" />
                  <label htmlFor="email">Email</label>
                  <span>Email</span>
                </div>

                <div className="input-container textarea">
                  <textarea id="message" name="Message" className="input"></textarea>
                  <label htmlFor="message">Message</label>
                  <span>Message</span>
                </div>

                <input type="submit" value="Send" className="btn-contact" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactComp;