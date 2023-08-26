"use client"

import * as React from "react"
import { usePathname } from "next/navigation";

import "./navigation.css"
import Link from "next/link";

const navigationItems: string[][] = Object.entries({
  // attributeValue: textValue //
  coffee: "Books + Coffee",
  cleancode: "Clean code",
  protocols: "Protocols",
  research: "Research",
  testing: "Testing",
})

interface INavigation { }

const Navigation: React.FC<INavigation> = (): React.ReactElement => {
  const pathname = usePathname()

  return (
    <header>
      <div id="logo-wrapper">
        <Link href="/">
          <div id="logo" />
        </Link>
      </div>
      <nav>
        <ul>
          {navigationItems.map(([attributeValue, textValue]: string[]) => {
            return (
              <li
                key={attributeValue}
                id={attributeValue === "coffee" ? "special" : ""}
                className={(pathname as string).replace("/", "") === attributeValue ? "active" : ""}
                value={attributeValue}
              >
                <Link href={`/${attributeValue}`}>
                  {attributeValue !== "coffee" ? textValue : "📚 ☕"}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
