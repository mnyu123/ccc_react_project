import React from "react";
import "../css/Main_nav.css";

const Mainnav = () => {
  const handleClick = (event) => {
    event.preventDefault();

    const targetId = event.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const headerHeight = 109;

      window.scrollTo({
        top: targetPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="small_nav_1">
      <ul>
        <li>
          <a href="#">오늘의 책</a>
        </li>
        <li>
          <a href="#monthbooks_wrap" onClick={handleClick}>
            이달의 책
          </a>
        </li>
        <li>
          <a href="#soaring_wrap" onClick={handleClick}>
            급상승
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Mainnav;
