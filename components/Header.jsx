"use client";
import React, { useRef } from "react";
import Link from "next/link";

export const Header = () => {
  const section2PhoneRef = useRef(null);

  const toggleSection = () => {
    if (section2PhoneRef.current) {
      section2PhoneRef.current.style.display =
        section2PhoneRef.current.style.display === "flex" ? "none" : "flex";
    }
  };

  return (
    <>
      <div className="header">
        <section className="section_2 hide">
          <Link href="/contact">اتصل بنا</Link>
          <Link href="/about">عن الأكاديمية</Link>
          <Link href="/courses">الدورات</Link>
        </section>
        <section onClick={toggleSection} className="section_2_phone_btn">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1in44b7"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="MenuIcon"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </section>
        <Link href="/" className="section_1">
          <section className="logo_container">
            <img src="/tadawel.jpg" alt="Main Logo" />
          </section>
          <section
            onClick={() => {
              sessionStorage.setItem("reload_status", "0");
            }}
            className="heading"
          >
            <div>ACADEMY TADAWUL</div>
            <div className="heading_inner_text">best site for tadawel</div>
          </section>
        </Link>
      </div>

      {/* Button to toggle section */}
      <section ref={section2PhoneRef} className="section_2_phone">
        <Link href="/contact">اتصل بنا</Link>
        <Link href="/about">عن الأكاديمية</Link>
        <Link href="/courses">الدورات</Link>
      </section>
    </>
  );
};
