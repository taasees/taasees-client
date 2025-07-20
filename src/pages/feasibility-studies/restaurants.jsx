import { React, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
//improt images
import paperwork from "../../assets/images/paperwork.jpg";

import "../../assets/style/common/feasibility-studies.css";
import AnimatedContent from "../../components/AnimatedContent";
import { motion } from "framer-motion";
import axios from "axios";

export default function Restaurants() {
  const path = window.location.pathname; // e.g. "/e-commerce-projects"
  const lastSegment = path.split("/").filter(Boolean).pop().toLowerCase();
  const [customSlides, setCustomSlides] = useState([]);
  useEffect(() => {
    fetchSlidesByCategory(lastSegment).then((slides) => {
      const normalized = slides.map((slide) => ({
        ...slide,
        img: slide.imgUrl, // to keep it consistent with local previews
      }));
      setCustomSlides(normalized);
    });
  }, []);
  const fetchSlidesByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://taasees-server.onrender.com/slides/category/${category}`
      );
      return response.data; // slides array
    } catch (err) {
      console.error("Failed to fetch slides:", err);
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
          <h1>
            {menuTxt.studies} {menuTxt.restaurants}
          </h1>
        </AnimatedContent>
        <img src={paperwork.paperworkImage} alt="" />
      </div>
      <div className="slides">
        {customSlides.map((slide, index) => (
          <div className="slide" key={slide._id || `custom_${index}`}>
            <div className="img" style={{ position: "relative" }}>
              {slide.img && (
                <img src={slide.img || slide.imgUrl} alt={slide.title} />
              )}
            </div>
            <div className="text">
              <h3>{slide.title}</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
