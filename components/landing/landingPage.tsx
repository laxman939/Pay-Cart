"use client";
import Carousel from "react-material-ui-carousel";
import Item from "./item";

const LandingPage = () => {
  let items = [
    {
      name: "random1",
      title: "Special offers",
      description: "Celebrate end of season sale with up to",
      bgImage: "/images/banner1.jpg",
      bgColor: "#e1e6e2",
      offerPercentage: 80,
    },
    {
      name: "random2",
      title: "Festival offers",
      description: "Diwali special offer with up to",
      bgImage: "/images/banner2.jpg",
      bgColor: "#edfaf1",
      offerPercentage: 75,
    },
    {
      name: "random3",
      title: "Special discount sale",
      description: "Great indian festival offers with upto",
      bgImage: "/images/banner3.jpg",
      bgColor: "#f5f7f6",
      offerPercentage: 85,
    },
  ];

  return (
    <div className="w-full h-3/4 relative">
      {" "}
      <Carousel
        className=""
        navButtonsAlwaysVisible
        fullHeightHover={true} // We want the nav buttons wrapper to only be as big as the button element is
      >
        {items.length > 0 &&
          items.map((item, i) => <Item key={i} item={item} />)}
      </Carousel>
      <div>
        <div className="w-2/4 flex gap-5 mx-2">
          <span>New arrivals</span>
          <span>Top rated</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
