import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
// menu active ke liye
import { useLocation } from "react-router-dom";
import { data } from "jquery";
import Swal from "sweetalert2";

function Header() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;

  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [menu, setMenu] = useState();
  const [organization, setOrganization] = useState();
  const navigate = useNavigate();
  // add new sticky header
  const [isSticky, setIsSticky] = useState(false);

  const getOrganization = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/organization/get/web`);

      setOrganization(response?.data?.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMenu = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/menu/getmenu/web`);
      const activeData = (response?.data?.data || []).filter(
        (item) => item.isActive === true,
      );

      setMenu(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // menu active ke liye
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("home");

  // Search States
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearch = async (keyword) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/search/get/?keyword=${keyword}`,
      );

      // console.log("Search Response:", response.data);

      setFilteredResults(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Add New Sticky Scroll Function
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        getSearch(searchTerm);
      } else {
        setFilteredResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // console.log("filteredResults", filteredResults);

  // // this is use for get slug
  // const handlePageClick = async (id) => {
  //   try {
  //     const res = await axios.get(`${API_URL}/pages/get/web/${id}`);

  //     const slug = res?.data?.data?.slug;
  //     // const designTemplate = res?.data?.data?.designTemplate?._id;

  //     if (slug) {
  //       navigate(`/${slug}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching page slug:", error);
  //   }
  // };
  const handlePageClick = async (id) => {
    document.getElementById("navbarSupportedContent")?.classList.remove("show");
    try {
      const res = await axios.get(`${API_URL}/pages/get/web/${id}`);
      const slug = res?.data?.data?.slug;
      if (slug) {
        navigate(`/${slug}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };

  useEffect(() => {
    getMenu();
    getOrganization();
  }, []);

  const parents = menu?.filter(
    (item) => item.menuCategory === "header" && item.menuType === "parent",
  );

  const children = menu?.filter((item) => item.menuType === "child");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const DEFAULT_FONT_SIZE = 16; // normal size

  // const changeFontSize = (delta) => {
  //   const root = document.documentElement;
  //   const currentSize = parseInt(
  //     getComputedStyle(root).getPropertyValue("--base-font-size"),
  //   );
  //   let newSize = currentSize + delta;

  //   if (newSize < 12) newSize = 12;
  //   if (newSize > 20) newSize = 20;

  //   root.style.setProperty("--base-font-size", `${newSize}px`);
  //   localStorage.setItem("fontSize", newSize);
  // };

  //  Add New Funcation for Font size strat
  const changeFontSize = (delta) => {
    const html = document.documentElement;
    let currentSize = parseInt(window.getComputedStyle(html).fontSize);
    let newSize = currentSize + delta;
    if (newSize < 13) newSize = 13;
    if (newSize > 19) newSize = 19;
    html.style.fontSize = `${newSize}px`;
    localStorage.setItem("fontSize", newSize);
  };
  useEffect(() => {
    const savedSize = localStorage.getItem("fontSize");

    if (savedSize) {
      document.documentElement.style.fontSize = `${savedSize}px`;
    }
  }, []);
  //  Add New Funcation for Font size End

  // const resetFontSize = () => {
  //   const root = document.documentElement;
  //   root.style.setProperty("--base-font-size", `${DEFAULT_FONT_SIZE}px`);
  //   localStorage.setItem("fontSize", DEFAULT_FONT_SIZE);
  // };
  //  Add New Funcation for Font size reset font size
  const resetFontSize = () => {
    document.documentElement.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
    localStorage.setItem("fontSize", DEFAULT_FONT_SIZE);
  };

  const homeLabel = lang === "hi" ? "होम" : "HOME";
  // const limitWords = (text, limit = 10) => {
  //   if (!text) return "";
  //   const words = text.split(" ");
  //   return words.length > limit
  //     ? words.slice(0, limit).join(" ") + "..."
  //     : text;
  // };
  // const limitWords = (text, limit = 5) => {
  //   if (!text) return "";

  //   // 1. HTML remove karo (agar aata hai)
  //   let cleanText = text.replace(/<[^>]*>/g, " ");

  //   // 2. extra spaces remove karo
  //   cleanText = cleanText.replace(/\s+/g, " ").trim();

  //   // 3. words split
  //   const words = cleanText.split(" ");

  //   return words.length > limit
  //     ? words.slice(0, limit).join(" ") + "..."
  //     : cleanText;
  // };

  const limitWords = (text, limit = 10) => {
    if (!text) return "";

    // console.log("text", text);
    // var clean = text;

    const clean = String(text)
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const words = clean?.split(" ");

    // const words = (clean, limit = 10) => {
    //   console.log("clean:", clean, typeof clean);
    //   return clean.split(" ").slice(0, limit).join(" ");
    // };

    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : clean;
  };

  // ADD NEW FUNCATION FOR TOP TO BOTTOM BUTTON START
  const [showButton, setShowButton] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setShowButton(scrollTop > 10);
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 20);
      const totalHeight = documentHeight - windowHeight;
      const progress = (scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScrollClick = () => {
    if (isAtBottom) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;
  // ADD NEW FUNCATION FOR TOP TO BOTTOM BUTTON End

  const showIsoPhoto = (imageUrl) => {
    Swal.fire({
      title: "ISO Certificate",
      imageUrl: imageUrl,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "ISO Photo",
      confirmButtonText: "Close",
    });
  };

  return (
    <div className={`theme-${theme}`}>
      <div className="menu-overlay"></div>
      {/* <header className="header-section p-0 position-relative"> */}
      <header
        className={`header-section p-0 position-relative  ${isSticky ? "sticky-header" : ""}`}
      >
        <div className="top-header-wrap">
          <div className="container">
            <div className="row">
              <div className="col-12 position-relative">
                <div className="top-header theme-bg">
                  <div className="header-contact">
                    <span>
                      <img src="images/icons/phone_icon.svg" alt="" />
                    </span>
                    <div className="header-contact-info">
                      <p className="call-us-title m-0 d-none">Call us Now</p>
                      <a href={`tel:${organization?.contactNumber}`}>
                        {organization?.contactNumber}
                      </a>
                    </div>
                  </div>

                  <div className="header-lang">
                    <select
                      id="langSelect"
                      value={lang}
                      onChange={(e) => setLang(e.target.value)}
                      className="form-select form-select-sm w-auto"
                    >
                      <option value="en">English</option>
                      <option value="hi">हिंदी</option>
                    </select>
                  </div>

                  <div className="screen-size-box">
                    <button
                      className="screen-btn"
                      onClick={() => changeFontSize(-1)}
                    >
                      A-
                    </button>
                    <button className="screen-btn" onClick={resetFontSize}>
                      A
                    </button>
                    <button
                      className="screen-btn"
                      onClick={() => changeFontSize(1)}
                    >
                      A+
                    </button>
                  </div>

                  <div className="theme-switchcare d-flex align-items-center gap-2">
                    <div
                      className={`theme-btn theme-blue-btn ${theme === "blue" ? "active" : ""}`}
                      onClick={() => {
                        changeTheme("blue");
                      }}
                    />

                    <div
                      className={`theme-btn theme-orange-btn ${theme === "orange" ? "active" : ""}`}
                      onClick={() => changeTheme("orange")}
                    />

                    <div
                      className={`theme-btn theme-green-btn ${theme === "green" ? "active" : ""}`}
                      onClick={() => changeTheme("green")}
                    />
                  </div>

                  {/* header search butoon */}

                  <div
                    className="header-search-icon"
                    onClick={() => setSearchOpen(true)}
                  >
                    <span>Search...</span>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>

                  {searchOpen && (
                    <div className="search-overlay">
                      <div className="search-popup">
                        <button
                          className="search-close"
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchTerm("");
                            setFilteredResults([]);
                          }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="search-box">
                          <input
                            className="search-input-field"
                            type="text"
                            placeholder="Search Here..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                          />

                          <button className="search-btn">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>

                          {/* {searchTerm.trim() !== "" && (
                            <div className="search-dropdown">
                              {filteredResults.length > 0 ? (
                                <ul>
                                  {filteredResults.map((item, index) => (
                                    <Link
                                      to={item?.url}
                                      onClick={() => {
                                        setSearchOpen(false);
                                        setSearchTerm("");
                                        setFilteredResults([]);
                                      }}
                                    >
                                      <li
                                        key={index}
                                        dangerouslySetInnerHTML={{
                                          __html: item?.title,
                                        }}
                                      ></li>
                                      
                                    </Link>
                                  ))}
                                </ul>
                              ) : (
                                <div className="no-result">
                                  No Results Found
                                </div>
                              )}
                            </div>
                          )} */}

                          {searchTerm.trim() !== "" && (
                            <div className="search-dropdown">
                              {filteredResults.length > 0 ? (
                                <ul>
                                  {filteredResults.map((item, index) => (
                                    <Link
                                      key={index}
                                      to={item?.url}
                                      onClick={() => {
                                        setSearchOpen(false);
                                        setSearchTerm("");
                                        setFilteredResults([]);
                                      }}
                                    >
                                      <li
                                        style={{
                                          color: "black",
                                          fontSize: "15px",
                                        }}
                                        dangerouslySetInnerHTML={{
                                          __html: limitWords(item?.title, 5),
                                        }}
                                      ></li>
                                    </Link>
                                  ))}
                                </ul>
                              ) : (
                                <div className="no-result">
                                  No Results Found
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div className="theme-switchcare d-flex align-items-center gap-2">
                  <div
                    className="theme-btn theme-blue-btn"
                    data-theme="blue"
                  ></div>
                  <div
                    className="theme-btn theme-orange-btn"
                    data-theme="orange"
                  ></div>
                  <div
                    className="theme-btn theme-green-btn"
                    data-theme="green"
                  ></div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="middle-header">
          <div className="container">
            <div className="row position-relative">
              <div className="header-logos position-relative">
                <div className="icar-logo">
                  <Link to={"/"}>
                    <img
                      src={`${IMG_BASE_URL}/${organization?.logo1}`}
                      alt={organization?.logo1Title}
                    />
                  </Link>
                </div>
                <div className="logo-center text-center">
                  <div className="header-logo-title theme-green-color fw-700">
                    {organization?.organizationName?.[lang]}
                  </div>
                  <span className="header-logo-sub-title">
                    {organization?.addressLine1?.[lang]},
                    {organization?.addressLine2?.[lang]}
                  </span>
                  <span
                    className="header-logo-sub-title"
                    style={{cursor:"pointer", fontSize:"15px" }}
                    onClick={() =>
                      showIsoPhoto(
                        organization?.isoPhoto
                          ? `${IMG_BASE_URL}/${organization.isoPhoto}`
                          : "",
                      )
                    }
                  >
                    {organization?.isoNumber}
                  </span>
                </div>
                <div className="nipb-logo">
                  <Link to={"/"}>
                    <img
                      src={`${IMG_BASE_URL}/${organization?.logo2}`}
                      alt={organization?.logo2Title}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-menu-bar theme-bg">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg p-0">
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="theme-nav-navbar navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        {/* <Link
                          // style={{ cursor: "pointer", color: "#fff" }}
                          to={"/"}
                          className="menu-link active"
                        >
                          {homeLabel}
                        </Link> */}
                        {/* <Link
                          style={{ fontWeight: "500" }}
                          to="/"
                          className="menu-link active"
                          onClick={() =>
                            document
                              .getElementById("navbarSupportedContent")
                              ?.classList.remove("show")
                          }
                        >
                          {homeLabel}
                        </Link> */}
                        <Link
                          style={{ fontWeight: "500" }}
                          to="/"
                          className={`menu-link ${activeMenu === "home" ? "active" : ""}`}
                          onClick={() => {
                            setActiveMenu("home");
                            document
                              .getElementById("navbarSupportedContent")
                              ?.classList.remove("show");
                          }}
                        >
                          {homeLabel}
                        </Link>
                      </li>

                      {parents?.map((parent) => {
                        const childItems = children?.filter(
                          (child) => child.parentMenu?.id === parent.id,
                        );
                        //  Agar child nahi hai → normal menu

                        if (
                          !childItems ||
                          (childItems.length === 0 &&
                            parent?.menuName_en !== "Contact Us")
                        ) {
                          return (
                            <li className="nav-item" key={parent?.id}>
                              {parent?.page?.id ? (
                                // <span
                                //   className="menu-link"
                                //   style={{
                                //     cursor: "pointer",
                                //     fontWeight: "500",
                                //   }}
                                //   onClick={() =>
                                //     handlePageClick(parent?.page?.id)
                                //   }
                                // >
                                //   {/* {parent?.menuName_en?.toUpperCase()} */}
                                //   {parent?.[`menuName_${lang}`]?.toUpperCase()}
                                // </span>
                                <span
                                  className={`menu-link ${
                                    activeMenu === `parent-${parent?.id}`
                                      ? "active"
                                      : ""
                                  }`}
                                  style={{
                                    cursor: "pointer",
                                    fontWeight: "500",
                                  }}
                                  onClick={() => {
                                    setActiveMenu(`parent-${parent?.id}`);
                                    handlePageClick(parent?.page?.id);
                                  }}
                                >
                                  {parent?.[`menuName_${lang}`]?.toUpperCase()}
                                </span>
                              ) : (
                                <a
                                  href={parent?.customUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="menu-link"
                                  style={{ fontWeight: "500" }}
                                  onClick={(e) => {
                                    e.preventDefault();

                                    Swal.fire({
                                      title: "Continue?",
                                      text: "This page will redirect you to an external website. Do you want to continue?",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Continue",
                                      cancelButtonText: "Cancel",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        window.open(
                                          parent?.customUrl,
                                          "_blank",
                                          "noopener,noreferrer",
                                        );
                                      }
                                    });
                                  }}
                                >
                                  {/* {parent?.menuName_en?.toUpperCase()} */}
                                  {parent?.[`menuName_${lang}`]?.toUpperCase()}
                                </a>
                              )}
                            </li>
                          );
                        }

                        // Agar child hai → dropdown menu
                        const isDropdownActive =
                          activeMenu === `dropdown-${parent.id}` ||
                          childItems.some(
                            (child) => activeMenu === `child-${child.id}`,
                          );
                        return (
                          // <li
                          //   className="nav-item dropdown custom-nav-dropdown"
                          //   key={parent.id}
                          // >
                          <li
                            className={`nav-item dropdown custom-nav-dropdown ${
                              isDropdownActive ? "active" : ""
                            }`}
                            key={parent.id}
                          >
                            {/* <a
                              className="nav-link dropdown-toggle"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ fontWeight: "500" }}
                            >
                            
                              {parent?.[`menuName_${lang}`]?.toUpperCase()}
                            </a> */}
                            <a
                              className={`nav-link dropdown-toggle ${
                                isDropdownActive ? "active" : ""
                              }`}
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ fontWeight: "500" }}
                            >
                              {parent?.[`menuName_${lang}`]?.toUpperCase()}
                            </a>

                            <ul
                              className="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              {childItems.map((child) => (
                                <li className="dropdown-links" key={child.id}>
                                  {child.page?.id ? (
                                    // <span
                                    //   style={{
                                    //     cursor: "pointer",
                                    //   }}
                                    //   className="dropdown-item"
                                    //   onClick={() =>
                                    //     handlePageClick(child?.page?.id)
                                    //   }
                                    // >
                                    //   {/* {child?.menuName_en?.toUpperCase()} */}
                                    //   {child?.[
                                    //     `menuName_${lang}`
                                    //   ]?.toUpperCase()}
                                    // </span>
                                    <span
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className={`dropdown-item ${
                                        activeMenu === `child-${child.id}`
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setActiveMenu(`child-${child.id}`);
                                        handlePageClick(child?.page?.id);
                                      }}
                                    >
                                      {child?.[
                                        `menuName_${lang}`
                                      ]?.toUpperCase()}
                                    </span>
                                  ) : (
                                    <a
                                      href={child?.customUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="dropdown-item"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        Swal.fire({
                                          title: "Continue?",
                                          text: "This page will redirect you to an external website. Do you want to continue?",
                                          icon: "warning",
                                          showCancelButton: true,
                                          confirmButtonText: "Continue",
                                          cancelButtonText: "Cancel",
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            window.open(
                                              child?.customUrl,
                                              "_blank",
                                              "noopener,noreferrer",
                                            );
                                          }
                                        });
                                      }}
                                    >
                                      {/* {child?.menuName_en?.toUpperCase()} */}
                                      {child?.[
                                        `menuName_${lang}`
                                      ]?.toUpperCase()}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <button
                    className="navbar-toggler theme-toggle-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="header-contact-btn">
                    <a className="contact-link" href="#">
                      <span className="theme-bg d-flex justify-content-center align-items-center rounded-circle">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <span
                        className="theme-color"
                        onClick={() =>
                          handlePageClick("6a019615b41b02c9e0121bdb")
                        }
                      >
                        Contact Us
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <button
        className={`scroll-progress-btn ${showButton ? "show" : ""}`}
        onClick={handleScrollClick}
      >
        <svg className="progress-ring" width="60" height="60">
          <circle className="progress-ring-bg" cx="30" cy="30" r={radius} />

          <circle
            className="progress-ring-fill"
            cx="30"
            cy="30"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <i
          className={`fa-solid fa-arrow-down ${
            isAtBottom ? "rotate-icon" : ""
          }`}
        ></i>
      </button>
    </div>
  );
}

export default Header;
