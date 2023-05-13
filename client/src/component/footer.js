import React from "react";
import facebook from "../img/facebook.png";
import ig from "../img/ig.png";
import line from "../img/line.png"

function Footer() {
  return (
    <>
        <div className="foot">Follow us !
            <img src={facebook} className="imgFoot" />
            <img src={ig} className="imgFoot" />
            <img src={line} className="imgFoot" />
            02-222-0369
        </div>
    </>
  );
}

export default Footer;
