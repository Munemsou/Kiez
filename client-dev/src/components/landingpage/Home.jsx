import "./home.css";
import Carousel from "./Carousel.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="relative z-10">
        <Carousel />
      </section>
      <section className="style-test w-auto">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ "--i": 0 }}></div>
          <div className="square" style={{ "--i": 1 }}></div>
          <div className="square" style={{ "--i": 2 }}></div>
          <div className="square" style={{ "--i": 3 }}></div>
          <div className="square" style={{ "--i": 4 }}></div>

          <div className="container mt-64">
            <div className="form">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                Herzlich Willkommen bei Kiez!
              </h2>
              <p className="text-xl mb-6 text-center">
                Bist du bereits Mitglied?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline block custom-text-shadow tracking-wide font-bold"
                >
                  Einloggen
                </Link>
              </p>
              <p className="text-xl mb-4 text-center">
                Bist du neu hier?{" "}
                <a
                  href="/register"
                  className="text-blue-600 hover:underline block tracking-wide font-bold custom-text-shadow"
                >
                  Registrieren
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
