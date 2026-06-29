// import "./App.css";
// import "./assets/css/animate.min.css";
// import "./assets/css/bootstrap.min.css";
// // import "./assets/css/responsive.css";
// import "./assets/css/style.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import Header from "./components/Header/Header.js";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import Home from "./components/Home/Home.js";
// import Footer from "./components/Footer/Footer.js";
// import { Route, Routes, useParams } from "react-router-dom";
// import StaticContent from "./components/Static content/StaticContent.js";
// import InstitutionalProjects from "./components/InstitutionalProjects/InstitutionalProjects.js";
// import ExternallyFunded from "./components/Externally Funded/ExternallyFunded.js";
// import { LanguageProvider, useLanguage } from "./components/LanguageContext.js";
// import DynamicRouter from "./components/DynamicRouter.js";
// import ScientistDetails from "./components/Scientist Details/ScientistDetails.js";
// import { useTheme } from "./components/ThemeContext.js";
// import EventsDetails from "./components/NewsBox/EventsDetails.js";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import AllGallery from "./components/Album/AllGallery.js";
// import AlumniDetails from "./components/Alumni/AlumniDetails.js";
// import StaffDetails from "./components/Staff Details/StaffDetails.js";
// import CommitteesDetails from "./components/Committees/CommitteesDetails.js";
// import PublicationsYear from "./components/Research Publications/PublicationsYear.js";

// import { CopilotKit } from "@copilotkit/react-core";
// import "@copilotkit/react-ui/styles.css";
// import { CopilotPopup } from "@copilotkit/react-ui";

// function AppContent() {
//   const API_URL = process.env.REACT_APP_API_URL;

//   const { theme } = useTheme();
//   const { lang } = useLanguage();
//   function MainRouter() {
//     const { type } = useParams();

//     if (type === "dynamic") {
//       return <InstitutionalProjects />;
//     }
//     if (type === "dynamic") {
//       return <ExternallyFunded />;
//     }

//     return <StaticContent />;
//   }
//   if ("scrollRestoration" in window.history) {
//     window.history.scrollRestoration = "manual";
//   }
//   return (
//     <>
//       {/* <div className={`theme-hi theme-${theme}`}> */}
//       <div
//         className={lang === "hi" ? `theme-hi theme-${theme}` : `theme-${theme}`}
//       >
//         <div className="menu-overlay"></div>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/:slug" element={<DynamicRouter />} />
//           <Route path="/:slug/gallery/:id" element={<AllGallery />} />
//           <Route path="/:slug/alumni/:id" element={<AlumniDetails />} />
//           <Route path="/:slug/:id" element={<ScientistDetails />} />
//           <Route path="/:slug/StaffDetails/:id" element={<StaffDetails />} />
//           <Route path="/:slug/details/:id" element={<EventsDetails />} />
//           <Route
//             path="/:slug/CommitteesDetails/:id"
//             element={<CommitteesDetails />}
//           />
//           <Route path="/:slug/:category/:id" element={<PublicationsYear />} />
//         </Routes>
//         <Footer />
//       </div>
//       <CopilotPopup
//         instructions="You are an assistant for ICAR-NIPB website."
//         labels={{
//           title: "ICAR Assistant",
//           initial: "Hello! Main aapki kya help kar sakta hoon?",
//         }}
//       />
//     </>
//   );
// }

// function App() {
//   if ("scrollRestoration" in window.history) {
//     window.history.scrollRestoration = "manual";
//   }
//   const API_URL = process.env.REACT_APP_API_URL;

//   return (
//     <CopilotKit runtimeUrl={`${API_URL}/copilotkit`}>
//       <LanguageProvider>
//         <AppContent />
//       </LanguageProvider>
//     </CopilotKit>
//   );
// }

// export default App;

import "./App.css";
import "./assets/css/animate.min.css";
import "./assets/css/bootstrap.min.css";
// import "./assets/css/responsive.css";
import "./assets/css/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "./components/Header/Header.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home/Home.js";
import Footer from "./components/Footer/Footer.js";
import { Route, Routes, useParams } from "react-router-dom";
import StaticContent from "./components/Static content/StaticContent.js";
import InstitutionalProjects from "./components/InstitutionalProjects/InstitutionalProjects.js";
import ExternallyFunded from "./components/Externally Funded/ExternallyFunded.js";
import { LanguageProvider, useLanguage } from "./components/LanguageContext.js";
import DynamicRouter from "./components/DynamicRouter.js";
import ScientistDetails from "./components/Scientist Details/ScientistDetails.js";
import { useTheme } from "./components/ThemeContext.js";
import EventsDetails from "./components/NewsBox/EventsDetails.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AllGallery from "./components/Album/AllGallery.js";
import AlumniDetails from "./components/Alumni/AlumniDetails.js";
import StaffDetails from "./components/Staff Details/StaffDetails.js";
import CommitteesDetails from "./components/Committees/CommitteesDetails.js";
import PublicationsYear from "./components/Research Publications/PublicationsYear.js";

function AppContent() {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  function MainRouter() {
    const { type } = useParams();

    if (type === "dynamic") {
      return <InstitutionalProjects />;
    }
    if (type === "dynamic") {
      return <ExternallyFunded />;
    }

    return <StaticContent />;
  }
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  return (
    <>
      {/* <div className={`theme-hi theme-${theme}`}> */}
      <div
        className={lang === "hi" ? `theme-hi theme-${theme}` : `theme-${theme}`}
      >
        <div className="menu-overlay"></div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<DynamicRouter />} />
          <Route path="/:slug/gallery/:id" element={<AllGallery />} />
          <Route path="/:slug/alumni/:id" element={<AlumniDetails />} />
          <Route path="/:slug/:id" element={<ScientistDetails />} />
          <Route path="/:slug/StaffDetails/:id" element={<StaffDetails />} />
          <Route path="/:slug/details/:id" element={<EventsDetails />} />
          <Route
            path="/:slug/CommitteesDetails/:id"
            element={<CommitteesDetails />}
          />
          <Route path="/:slug/:category/:id" element={<PublicationsYear />} />
        </Routes>
        <Footer />
        
      </div>
    </>
  );
}

function App() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
