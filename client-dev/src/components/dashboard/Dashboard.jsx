import { Link } from "react-router-dom";
import Carousel from "../landingpage/Carousel.jsx";
import "./DashboardStyle.css";
import Logo from "../assets/SupportStreetLogo.png";

const Dashboard = () => {
  return (
    <>
      <section className="relative z-10">
        <Carousel />
      </section>
      <section className="flex  justify-center h-full  w-full">
        <div className="relative">
          <Link
            to="/groups"
            className="reusableSquareDash absolute"
            style={{ "--i": 5 }}
          >
            <div className="square-link text-center font-bold">
              Meine Gruppen
            </div>
          </Link>
          <Link
            to="/neighbours"
            className="reusableSquareDash absolute"
            style={{ "--i": 6 }}
          >
            <div className="square-link text-center font-bold">
              Meine Nachbarschaft
            </div>
          </Link>
          <Link
            to="/market"
            className="reusableSquareDash absolute"
            style={{ "--i": 7 }}
          >
            <div className="square-link text-center font-bold">Marktplatz</div>
          </Link>
          <Link
            to="/profile"
            className="reusableSquareDash absolute"
            style={{ "--i": 8 }}
          >
            <div className="square-link text-center font-bold">Mein Profil</div>
          </Link>
          <Link
            to="/nachbarn-einladen"
            className="reusableSquareDash absolute"
            style={{ "--i": 9 }}
          >
            <div className="square-link text-center font-bold">
              Nachbarn einladen
            </div>
          </Link>
        </div>

        <div className="container mt-64">
          <div className="form">
            <h2 className="text-3xl font-bold mb-4  text-gray-800">
              Herzlich Willkommen bei Kiez!
            </h2>
            <img src={Logo} alt="logo" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
