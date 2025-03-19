"use client";
import React from "react";
import Link from "next/link";
export const Footer = () => {
  return (
    <>
      <div className="footer">
        <section className="section1">
          <img src="/tadawel.jpg" alt="main logo" />
        </section>
        <section className="section2">
          <section>
            <a>Services</a>
            <Link href="/">Tours</Link>
          </section>
          <section>
            <a>Legal</a>
            <Link href="/PrivacyPolicy">Privacy Policy</Link>
            <Link href="/TermsConditions">Terms & Conditions</Link>
            <Link href="/CancecllationPolicy">Cancellation Policy</Link>
            <Link href="/Cookies">Cookies</Link>
          </section>
          <section>
            <a>Helpful Links</a>
            <Link href="/contact">Contact</Link>
          </section>
        </section>
      </div>
      <div className="footer_visas_container">
        <img src="" alt="" />
      </div>
    </>
  );
};
