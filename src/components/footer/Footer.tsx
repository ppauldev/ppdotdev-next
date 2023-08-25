"use client"

import * as React from "react"
import { useRouter } from "next/navigation";

import "./footer.css"
import TechTag from "../main/TechTag";

interface IFooter { }

const Footer: React.FC<IFooter> = (): React.ReactElement => {
  const router = useRouter()

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
            <div id="link-mail-form" onClick={() => router.push("/contact")}>
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
      <a
        href="https://ppauldev.github.io/cv/"
        hrefLang="en"
        rel="author"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Phillip Paul
      </a>
    </p>
  )
}

export default Footer
