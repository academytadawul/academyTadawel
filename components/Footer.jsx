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
            <a>تابعنا</a>
          </section>
          <section>
            <a>تواصل معنا </a>
            <div href={"#"}>
              <span>Email:</span>
              <span>info@academytadawul.com</span>
              <span>:البريد الإلكتروني</span>
            </div>
            <div >
              <span>Phone:</span>
              <span>+966-xx-xxxxxxx</span>
              <span>:رقم الهاتف</span>
            </div>
          </section>
          <section>
            <a>روابط سريعة</a>
            <Link href={"/courses"}>الدورات</Link>
            <Link href={"/about"}>عن الأكاديمية</Link>
            <Link href={"/contact"}>اتصل بنا</Link>
          </section>
        </section>
      </div>
    </>
  );
};
