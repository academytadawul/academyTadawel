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
          </section>
          <section>
            <a>Legal</a>
          </section>
          <section>
            <a>Helpful Links</a>
          </section>
        </section>
      </div>
    </>
  );
};
