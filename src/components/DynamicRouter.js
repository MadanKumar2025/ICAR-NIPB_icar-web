import { useParams } from "react-router-dom";
import Current_Director from "./Current Director/Current_Director";
import FormerDirectors from "./Former_Directors/FormerDirectors";
import InstitutionalProjects from "./InstitutionalProjects/InstitutionalProjects";
import ExternallyFunded from "./Externally Funded/ExternallyFunded";
import StaticContent from "./Static content/StaticContent";
import CadreStrength from "./Cadre Strength/CadreStrength";
import Scientist from "./Scientist/Scientist";
import TechnicalStaff from "./Technical Staff/TechnicalStaff";
import Patents from "./Patents/Patents";
import Collaborations from "./Collaborations/Collaborations";
import TechnologiesDeveloped from "./Technologies developed/TechnologiesDeveloped";
import ResearchPublications from "./Research Publications/ResearchPublications";
import Student from "./Student/Student";
import NewsAll from "./NewsBox/NewsAll";
import Events from "./NewsBox/Events";
import { useEffect, useState } from "react";
import axios from "axios";
import ContactUs from "./contact-us/ContactUs";
import AboutCentre from "./AboutCentre/AboutCentre";
import VigilanceOfficer from "./Vigilance Officer/VigilanceOfficer";
import Help from "./Help/Help";
import Alumni from "./Alumni/Alumni";
import AllAlbum from "./Album/AllAlbum";
import AlumniForm from "./Alumni/AlumniForm";
import Organogram from "./Organogram/Organogram";
import Payment from "./Payment/Payment";
import Feedback from "./Feedback/Feedback";

function DynamicRouter() {
  const { slug } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPage = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/pages/get/slug/${slug}`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        setPageData(res.data?.data || null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };
    getPage();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  switch (pageData?.designTemplate?.templateName) {
    case "Current_Director":
      return <Current_Director />;

    case "Former_Directors":
      return <FormerDirectors />;

    case "Cadre_Strength":
      return <CadreStrength />;

    case "Scientist":
      return <Scientist />;

    case "Staff":
      return <TechnicalStaff />;

    case "Institutional_Projects":
      return <InstitutionalProjects />;

    case "Externally_Funded":
      return <ExternallyFunded />;

    case "Patents":
      return <Patents />;

    case "Collaborations":
      return <Collaborations />;

    case "Technologies_Developed":
      return <TechnologiesDeveloped />;

    case "Publications":
      return <ResearchPublications />;

    case "Student":
      return <Student />;

    case "NewsAll":
      return <NewsAll />;

    case "events":
      return <Events />;

    case "ContactUs":
      return <ContactUs />;

    case "AboutCentre":
      return <AboutCentre />;

    case "vigilanceOfficer":
      return <VigilanceOfficer />;

      // this is FAQ
    case "Help":
      return <Help />;

    case "Alumni":
      return <Alumni />;

    case "AllAlbum":
      return <AllAlbum />;

    case "createAlumni":
      return <AlumniForm />;

    case "Organogram":
      return <Organogram />;

    case "Payment":
      return <Payment />;

    case "Feedback":
      return <Feedback />;

    default:
      return <StaticContent />;
  }
}

export default DynamicRouter;
