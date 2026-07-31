import React from "react";
import { comingSoonStyles } from "../assets/dummyStyles";
import CS1 from "../assets/CS1.png";
import CS2 from "../assets/CS2.png";
import CS3 from "../assets/CS3.png";
import CS4 from "../assets/CS4.png";
import CS5 from "../assets/CS5.png";
import { Link } from "react-router";

const watch = [
  {
    id: 1,
    name: "Norqain Independence",
    price: 620000,
    image: CS1,
  },
  {
    id: 2,
    name: "Zenith Chronomaster",
    price: 1069200,
    image: CS2,
  },
  {
    id: 3,
    name: "Jacob & Co. Epic X",
    price: 3100000,
    image: CS3,
  },
  {
    id: 4,
    name: "Bvlgari Octo",
    price: 2450000,
    image: CS4,
  },
  {
    id: 5,
    name: "Louis Erand Excellence",
    price: 3300000,
    image: CS5,
  },
];

const formatINR = comingSoonStyles.formatINR;

const ComingSoonWatch = () => {
  return (
    <section className={comingSoonStyles.section}>
      <div className={comingSoonStyles.container}>
        <div className={comingSoonStyles.headerContainer}>
          <div className={comingSoonStyles.titleContainer}>
            <h2
              className={comingSoonStyles.title}
              style={comingSoonStyles.titleStyle}
            >
              New Arrivals
            </h2>
            <p className={comingSoonStyles.subtitle}>Coming soon</p>
          </div>

          <Link to="/watches" className={comingSoonStyles.viewAllLink}>
            View All ›
          </Link>
        </div>

        <div className={comingSoonStyles.watchesContainer}>
          <div className={comingSoonStyles.watchesRow}>
            {watch.map((watch) => (
              <figure key={watch.id} className={comingSoonStyles.watchItem}>
                <div className={comingSoonStyles.imageContainer}>
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className={comingSoonStyles.image}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22></svg>";
                    }}
                  />
                </div>

                <figcaption className={comingSoonStyles.figcaption}>
                  <div className={comingSoonStyles.watchName}>{watch.name}</div>
                  <div className={comingSoonStyles.watchPrice}>
                    {formatINR(watch.price)}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonWatch;
