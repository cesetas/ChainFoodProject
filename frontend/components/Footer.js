import * as React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div className="text font-style: italic   text-center bg-black text-white fixed inset-x-0 bottom-0">
      <a>
        <span>Paribu Hub - Akıllı Sözleşme & Solidity Practicum</span>
      </a>
      <div>
        <span className="text-xl font-bold text-yellow-300">
          {" "}
          Patika.dev - 2023
        </span>
      </div>
      <div className="flex justify-around">
        <a href="https://www.linkedin.com/in/cesetas/" target="_blank">
          <LinkedInIcon className="m-2" />
        </a>
        <a href="https://github.com/cesetas" target="_blank">
          <GitHubIcon className="m-2" />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <TwitterIcon className="m-2" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <FacebookIcon className="m-2" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
