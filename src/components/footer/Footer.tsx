"use client"

import * as React from "react"

import "./footer.css"
import TechTag from "../main/TechTag";
import Link from "next/link";

interface IFooter { }

const Footer: React.FC<IFooter> = (): React.ReactElement => {
  return (
    <footer>
      <div>
        <div className="footer-item-wrapper author">
          <SiteStamp />
        </div>
        <div id="footer-break">|</div>
        <div className="footer-item-wrapper">
          <p>contact:</p>
          <div className="tech-tags">
            <TechTag key="github" keyword="github" />
            <TechTag key="linkedin" keyword="linkedin" />
            <div id="link-mail-form">
              <TechTag key="mail" keyword="mail" />
            </div>
          </div>
        </div>
        <div id="footer-break">|</div>
        <div className="footer-item-wrapper">
          <p>powered by:</p>
          <div className="tech-tags">
            <TechTag key="react" keyword="react" />
            <TechTag key="typescript" keyword="typescript" />
            <TechTag key="nextjs" keyword="nextjs" />
            <TechTag key="graphcms" keyword="graphcms" />
            <TechTag key="vercel" keyword="vercel" />
          </div>
        </div>
      </div>
    </footer>
  )
}

const SiteStamp = () => {
  return (
    <p>
      © {new Date().getFullYear() + " "}
      <Link
        href="https://ppauldev.github.io/cv/"
        hrefLang="en"
        rel="author"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Phillip Paul
      </Link>
    </p>
  )
}

export default Footer
