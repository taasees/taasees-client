import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./assets/style/app/app.css";
import CountUp from "./components/CountUp";
import { Link } from "react-router-dom";
import AnimatedContent from "./components/AnimatedContent";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import images
import img1 from "./assets/images/herobanner__front__1.webp";
import img2 from "./assets/images/herobanner__front__2.webp";
import img3 from "./assets/images/herobanner__front__3.webp";
import video_img from "./assets/images/video__3.webp";
import market_growth from "./assets/images/market_growth.webp";
import paperwork from "./assets/images/paperwork.jpg";
// Import videos
import heroVideo from "./assets/videos/herobanner_full.mp4";
import sharek from "./assets/videos/sharek.mp4";
import feasibility_studies from "./assets/videos/feasibility_studies.mp4";
import administrational_consultations from "./assets/videos/administrational_consultations.mp4";
import files_management from "./assets/videos/files_management.mp4";
import { motion } from "framer-motion";
import axios from "./axiosInstance";
function App() {
  const [aboutCards, setAboutCards] = useState([]);

  const [selectedFont, setSelectedFont] = useState("arabic_bold_1");
  useEffect(() => {
    // Fetch latest saved font from server
    const fetchFont = async () => {
      try {
        const res = await axios.get(
          "https://shark-consulting-net.onrender.com/fonts/latest"
        );
        const { fontFamily, fontStyles } = res.data;
        setSelectedFont(fontFamily);
        document.documentElement.style.setProperty(
          "--arabic-fm-r",
          fontStyles.regular
        );
        document.documentElement.style.setProperty(
          "--arabic-fm-b",
          fontStyles.bold
        );
        document.documentElement.style.setProperty(
          "--arabic-fm-exb",
          fontStyles.extraBold
        );
      } catch (err) {
        console.error("Error fetching font:", err.message);
      }
    };

    fetchFont();
  }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
    >
      <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
    </svg>
  );
  const playVideo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#EA3323"
    >
      <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
    </svg>
  );
  const fetchAboutByCategory = async () => {
    try {
      const response = await axios.get(
        `https://shark-consulting-net.onrender.com/question`
      );
      return response.data; // expecting array of about cards
    } catch (err) {
      console.error("Failed to fetch about data:", err);
      return [];
    }
  };
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchAboutByCategory().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Normalize to keep imgUrl as img and no imgFile
        const normalized = data.map((item) => ({
          ...item,
        }));
        setAboutCards(normalized);
      }
    });
    // const fetchContent = async () => {
    //   try {
    //     const response = await axios.get("/textContent");
    //     setContent(response.data.data);
    //     console.log(response.data.data);
    //   } catch (err) {
    //     setError(err.response?.data?.error || err.message);
    //     setContent(null);
    //   }
    // };

    // fetchContent();
  }, []);

  // useEffect(() => {
  //   const video = document.getElementById("hero-video");
  //   if (video) {
  //     video.play().catch((err) => {
  //       console.warn("Autoplay failed:", err);
  //     });
  //   }
  // }, []);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsVideoVisible(true);

    // Wait a moment to ensure video is ready
    setTimeout(() => {
      videoRef.current?.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }, 100);
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsVideoVisible(false);
  };
  const [Hero, setHero] = useState({});
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/textContent");
        setContent(response.data.data);
        const response2 = await axios.get("/hero");
        setHero(response2.data.data);
        const response3 = await axios.get("/paperwork");
        if (localStorage.getItem("paperwork")) {
          localStorage.setItem("paperwork", null);
        }
        localStorage.setItem("paperwork", JSON.stringify(response3.data.data));
      } catch (err) {
        setContent(null);
      } finally {
        setTimeout(() => {
          const videoEl = document.getElementById("hero_video");
          if (videoEl) {
            videoEl.load(); // Reload the new source
            const onLoadedData = () => {
              videoEl.play().catch((err) => {
                console.error("Auto-play failed:", err);
              });
              videoEl.removeEventListener("loadeddata", onLoadedData);
            };
            videoEl.addEventListener("loadeddata", onLoadedData);
          }
        }, 100);
      }
    };

    fetchContent();
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
      className="container"
      dir="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <main className="hero">
        <Swiper
          dir="rtl"
          rewind={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          speed={1500}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="swipe-image">
              <AnimatedContent delay={0.2} duration={1.2}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className="text"
                >
                  <h2>{Hero.slide1_title}</h2>
                  <p>{Hero.slide1_desc}</p>
                  {/* <Link to={""}>اطلب الخدمة</Link>*/}
                </motion.div>
              </AnimatedContent>
              <div className="img">
                <img src={img1} alt="" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swipe-image">
              <div className="text">
                <h2>{Hero.slide2_title}</h2>
                <p>{Hero.slide2_desc}</p>
                {/* <Link to={""}>اطلب الخدمة</Link> */}
              </div>
              <div className="img">
                <img src={img2} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swipe-image">
              <div className="text">
                <h2>{Hero.slide3_title}</h2>
                <p>{Hero.slide3_desc}</p>
                {/* <Link to={""}>اطلب الخدمة</Link> */}
              </div>
              <div className="img">
                <img src={img3} alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="bg-video">
          <video id="hero_video" autoPlay loop muted playsInline>
            <source src={Hero?.bg_videoUrl} type="video/mp4" />
          </video>
        </div>
      </main>
      <section>
        <header className="section-header">
          <h1>{content.headerTitle}</h1>
          <p>{content.headerDesc}</p>
        </header>
        <AnimatedContent delay={0.2} duration={1.2}>
          <Link to={"/feasibility-studies"} className="card">
            <div className="card-video">
              <video autoPlay={true} loop muted playsInline controls={false}>
                <source src={feasibility_studies} />
              </video>
            </div>
            <div className="text">
              <h1>{menuTxt.studies}</h1>
              <p>{content.card1Desc}</p>
            </div>
          </Link>
        </AnimatedContent>
        <AnimatedContent delay={0.2} duration={1.2}>
          <Link to={"/Administrational-consultations"} className="card">
            <div className="card-video">
              <video autoPlay={true} loop muted playsInline controls={false}>
                <source src={administrational_consultations} />
              </video>
            </div>
            <div className="text">
              <h1>{menuTxt.adminConsult}</h1>
              <p>{content.card2Desc}</p>
            </div>
          </Link>
        </AnimatedContent>
        <AnimatedContent delay={0.2} duration={1.2}>
          <Link to={"/files-management"} className="card">
            <div className="card-video">
              <video autoPlay={true} loop muted playsInline controls={false}>
                <source src={files_management} />
              </video>
            </div>
            <div className="text">
              <h1>{menuTxt.filesMgmt}</h1>
              <p>{content.card3Desc}</p>
            </div>
          </Link>
        </AnimatedContent>
        <AnimatedContent delay={0.2} duration={1.2}>
          <div className="thoumbnail">
            <img loading="lazy" src={content.thumbnailUrl} alt="" />
            <div className="playbutton" to="#" onClick={handlePlayClick}>
              <span>{playVideo}</span>
            </div>
          </div>
        </AnimatedContent>
      </section>
      {isVideoVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999900099,
          }}
          onClick={closeVideo}
        >
          <video
            ref={videoRef}
            // autoPlay
            controls
            // muted
            // playsInline
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          >
            <source src={content.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Close button */}
          <button
            onClick={closeVideo}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "0rem",
              fontSize: "2rem",
              background: "none",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      )}
      {/* <div className="count">
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>1150+</span>
            <p>دراسات الجدوى</p>
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="market_growth">
            <img loading="lazy" src={market_growth} alt="" />
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>28+</span>
            <p>استشاري مميز</p>
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="market_growth">
            <img loading="lazy" src={market_growth} alt="" />
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>180+</span>
            <p>خدمات استشارية</p>
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="market_growth">
            <img loading="lazy" src={market_growth} alt="" />
          </div>
        </AnimatedContent>
        <AnimatedContent threshold={0.5} delay={0.2} duration={1.2}>
          <div className="numbers">
            <span>
            500+
            </span>
            <p>إستشارات إدارية دورية</p>
          </div>
        </AnimatedContent>
      </div> */}
      <div className="feedback">
        <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
          <header className="feedback-header">
            <span>آراء العملاء</span>
            <h3>شبكتنا مليئة بالعملاء ذو التجارب الناجحة</h3>
          </header>
        </AnimatedContent>
        <Swiper
          dir="rtl"
          rewind={true}
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1} // 👈 default for mobile
          breakpoints={{
            768: {
              slidesPerView: 3, // 👈 from 768px and up (desktop/tablet)
            },
          }}
          // autoplay={{
          //   delay: 4500,
          //   disableOnInteraction: false,
          // }}
          speed={1500}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="feedbackSwiper"
        >
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “ما نستطيع قوله بشأن ادارة شركة شارِك في اختيار فريق عمل
                  متكامل حقق لي العديد من الخدمات والإستشارات وعدد ٢ دراسة جدوى
                  لمشروعات خاصة بي حقا ما يميز هذه الشركة هو قدرتهم على الادارة
                  المتميزة التي حققت المعادلة بين الأسعار المناسبة والجودة
                  المطلوبة. شكرا لكم”
                </p>
                <span className="person">
                  <p className="name">فاطمة المري</p>
                  <p className="job">صاحب المشروع</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “كنت ابحث عن شركة تقوم بإعداد دراسة جدوى لمشروع مصنع هياكل
                  حديدية واخبرني اخوي بان اقوم بعمل دراسة الجدوى من خلال شركة
                  شارِك للإستشارات واستلمت دراسة جدوى للمشروع وحصلت على الموافقة
                  بدون أي تعديلات بفضل الله”
                </p>
                <span className="person">
                  <p className="name">عبد العزيز الكواري</p>
                  <p className="job">رائد اعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “كانت شركة شارِك للإستشارات سببا في تغيير مستقبلي حيث قمت من
                  خلالهم بطلب خدمة دراسة جدوى وبالفعل حصلت على دراسة الجدوى
                  للمشروع وبالفعل كانت النتائج الحمد لله مرضية”
                </p>
                <span className="person">
                  <p className="name">احمد المعاضيد</p>
                  <p className="job">رائد اعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “ما نستطيع قوله بشأن ادارة شركة شارِك في اختيار فريق عمل
                  متكامل حقق لي العديد من الخدمات والإستشارات وعدد ٢ دراسة جدوى
                  لمشروعات خاصة بي حقا ما يميز هذه الشركة هو قدرتهم على الادارة
                  المتميزة التي حققت المعادلة بين الأسعار المناسبة والجودة
                  المطلوبة. شكرا لكم”
                </p>
                <span className="person">
                  <p className="name">محمد الهاجري</p>
                  <p className="job">رجل أعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedContent threshold={0.7} delay={0.2} duration={1.2}>
              <div className="feedBack-text">
                <p>
                  “ان صدق التعامل في الوقت والدقة للمشروع الذي قمت بإعداد دراسة
                  جدوى لدى شركة شارِك للإستشارات هو ما جعلني استمر معهم في
                  العديد من الإستشارات الاخرى لمشاريعي”
                </p>
                <span className="person">
                  <p className="name">ناصر الدوسري</p>
                  <p className="job">رجل أعمال</p>
                </span>
              </div>
            </AnimatedContent>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="paperwork">
        <img loading="lazy" src={paperwork?.paperworkImage} alt="" />
        <AnimatedContent threshold={0.3} delay={0.2} duration={1.2}>
          <h2>{paperwork.paperworkText}</h2>
        </AnimatedContent>
      </div>
      <div className="commonQuestion">
        {aboutCards.map((about, index) => (
          <motion.div
            className="text"
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div
              className={`question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleAnswer(index)}
            >
              <h4>{about.question}</h4>
              <span
                style={{
                  transform:
                    openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {arrowDown}
              </span>
            </div>
            <div className={`answer ${openIndex === index ? "open" : ""}`}>
              <div>
                <p>{about.answer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default App;
