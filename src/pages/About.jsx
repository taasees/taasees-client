import { React, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
//improt images
import paperwork from "../assets/images/paperwork.jpg";
import "../assets/style/common/aboutPages.css";
import AnimatedContent from "../components/AnimatedContent";
import axios from "axios";

import { motion } from "framer-motion";
export default function About() {
  const path = window.location.pathname; // e.g. "/e-commerce-projects"
  const lastSegment =
    path.split("/").filter(Boolean).pop()?.toLowerCase() || "";
  // State for multiple about cards list
  const [aboutCards, setAboutCards] = useState([]);
  useEffect(() => {
    fetchAboutByCategory(lastSegment).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Normalize to keep imgUrl as img and no imgFile
        const normalized = data.map((item) => ({
          ...item,
          img: item.imgUrl || "",
          imgFile: null,
        }));
        setAboutCards(normalized);
      }
    });
  }, [lastSegment]);
  const fetchAboutByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://shark-consulting-net.onrender.com/category/${category}`
      );
      return response.data; // expecting array of about cards
    } catch (err) {
      console.error("Failed to fetch about data:", err);
      return [];
    }
  };
 const [menuTxt, setmenuTxt] = useState({});
   const [paperwork, setpaperwork] = useState({});

   useEffect(() => {
     try {
       const savedMenu = localStorage.getItem("menuTxt");
       const savepaperwork = localStorage.getItem("paperwork");
       if (savedMenu && savedMenu !== "undefined") {
         setmenuTxt(JSON.parse(savedMenu));
       }
       if (savepaperwork && savepaperwork !== "undefined") {
         setpaperwork(JSON.parse(savepaperwork));
       }
     } catch (err) {
       console.warn("Failed to parse saved menuTxt from localStorage:", err);
       setmenuTxt({});
     }
   }, []);
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };
  return (
    <motion.div
      className="about-pages"
      dir="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div className="headerimg">
        <AnimatedContent delay={0.2} threshold={0} duration={2}>
          <h1>{menuTxt.about}</h1>
        </AnimatedContent>
        <img src={paperwork.paperworkImage} alt="" />
      </div>
      <div className="cards">
        <h2>خبرتنا تمتد لـ اكثر من 13 عام في السوق الخليجي</h2>
        {aboutCards.map((about, index) => (
          <motion.div
            key={index}
            className="card"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className="top">
              <span>{about.topTitle}</span>
              <p>{about.topSubtitle}</p>
            </div>

            <div className="title">
              <h2>{about.sectionTitle}</h2>
            </div>

            <div className="img" style={{ position: "relative" }}>
              {about.img && <img src={about.img} alt={about.sectionTitle} />}
            </div>

            <div className="text">
              <p style={{ whiteSpace: "pre-wrap" }}>{about.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
