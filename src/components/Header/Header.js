import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";

function Header() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;

  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [menu, setMenu] = useState();
  const [organization, setOrganization] = useState();
  const navigate = useNavigate();

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

  // this is use for get slug
  const handlePageClick = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/pages/get/web/${id}`);

      const slug = res?.data?.data?.slug;
      // const designTemplate = res?.data?.data?.designTemplate?._id;

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

  const changeFontSize = (delta) => {
    const root = document.documentElement;
    const currentSize = parseInt(
      getComputedStyle(root).getPropertyValue("--base-font-size"),
    );
    let newSize = currentSize + delta;

    if (newSize < 12) newSize = 12;
    if (newSize > 20) newSize = 20;

    root.style.setProperty("--base-font-size", `${newSize}px`);
    localStorage.setItem("fontSize", newSize);
  };

  const resetFontSize = () => {
    const root = document.documentElement;
    root.style.setProperty("--base-font-size", `${DEFAULT_FONT_SIZE}px`);
    localStorage.setItem("fontSize", DEFAULT_FONT_SIZE);
  };

  const homeLabel = lang === "hi" ? "होम" : "HOME";
  return (
    <div className={`theme-${theme}`}>
      <div className="menu-overlay"></div>
      <header className="header-section p-0 position-relative">
        <div className="top-header-wrap">
          <div className="container">
            <div className="row">
              <div className="col-12 position-relative">
                <div className="top-header theme-bg navbar">
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
                      onClick={() => changeFontSize(-2)}
                    >
                      A-
                    </button>
                    <button className="screen-btn" onClick={resetFontSize}>
                      A
                    </button>
                    <button
                      className="screen-btn"
                      onClick={() => changeFontSize(2)}
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
                <nav className="navbar navbar-expand-lg position-relative justify-content-between p-0">
                  {/* <!-- Mobile Toggle --> */}
                  <button className="btn menu-toggle d-lg-none">☰</button>
                  {/* <!-- Menu --> */}
                  <div className="sidebar-menu">
                    {/* <!-- Close Button --> */}
                    <div className="menu-header d-lg-none">
                      <a href="#">
                        {/* <img src="images/icar_logo.svg" alt=""> */}
                      </a>
                      <button className="menu-close">&times;</button>
                    </div>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link
                          // style={{ cursor: "pointer", color: "#fff" }}
                          to={"/"}
                          className="menu-link active"
                        >
                          {homeLabel}
                        </Link>
                      </li>

                      {parents?.map((parent) => {
                        const childItems = children?.filter(
                          (child) => child.parentMenu?.id === parent.id,
                        );
                        //  Agar child nahi hai → normal menu
                        if (!childItems || childItems.length === 0) {
                          return (
                            <li className="nav-item" key={parent.id}>
                              {parent.page?.id ? (
                                <span
                                  className="menu-link"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handlePageClick(parent?.page?.id)
                                  }
                                >
                                  {/* {parent?.menuName_en?.toUpperCase()} */}
                                  {parent?.[`menuName_${lang}`]?.toUpperCase()}
                                </span>
                              ) : (
                                <a
                                  href={parent.customUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="menu-link"
                                >
                                  {/* {parent?.menuName_en?.toUpperCase()} */}
                                  {parent?.[`menuName_${lang}`]?.toUpperCase()}
                                </a>
                              )}
                            </li>
                          );
                        }

                        // Agar child hai → dropdown menu
                        return (
                          <li className="nav-item dropdown" key={parent.id}>
                            <a
                              className="menu-link dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                            >
                              {/* {parent?.menuName_en?.toUpperCase()} */}
                              {parent?.[`menuName_${lang}`]?.toUpperCase()}
                            </a>

                            <ul className="theme-dropdown-nav">
                              {childItems.map((child) => (
                                <li key={child.id}>
                                  {child.page?.id ? (
                                    <span
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="dropdown-item"
                                      onClick={() =>
                                        handlePageClick(child?.page?.id)
                                      }
                                    >
                                      {/* {child?.menuName_en?.toUpperCase()} */}
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
                  <div className="header-contact-btn">
                    <a className="contact-link" href="#">
                      <span className="theme-bg d-flex justify-content-center align-items-center rounded-circle">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <span className="theme-color">Contact Us</span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
