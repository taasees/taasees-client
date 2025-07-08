import React from "react";
import "../assets/style/footer/footer.css";
import logo from "../assets/images/Logo_1.webp";
import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer dir="auto">
      <div className="desktop">
        <div className="top">
          <div className="right">
            <div className="img">
              <img src={logo} alt="" />
            </div>
            <div className="text">
              <p>
                خبرتنا تمتد لأكثر من 13 عام من تقديم خدماتنا المميزة فى الخليج
              </p>
            </div>
          </div>
          <div className="left">
            <div className="links">
              <h4>اهم الروابط :</h4>
              <ul>
                <li>
                  <Link to={"/feasibility-studies"}>دراسات الجدوى</Link>
                </li>
                <li>
                  <Link to={"/Administrational-consultations"}>
                    إستشارات إدارية
                  </Link>
                </li>
                <li>
                  <Link to={"/files-management"}>إدارة الملفات</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="copyright">
            <p>
              حقوق الطبع والنشر 
              <span> شارِك للإستشارات </span>. جميع الحقوق محفوظة
            </p>
          </div>
          <div className="design">
            <p>
              تم التصميم بواسطة
              <Link
                to={"/"}
              >
                {/* hussam shannan */}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className="copyright">
          <p>
            حقوق الطبع والنشر 
            <span> شارِك للإستشارات </span>. جميع الحقوق محفوظة
          </p>
        </div>
        {/* <div className="design">
          <p>
            تم التصميم بواسطة
            <Link to={"https://www.linkedin.com/in/hussam-shannan-47071b291/"}>
              hussam shannan
            </Link>
          </p>
        </div> */}
      </div>
    </footer>
  );
}
