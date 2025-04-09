import { useState } from "react";

const Navigation = () => {
  const navLinks = [
    { text: "Home", href: "/#home" },
    { text: "About Us", href: "#about" },
    { text: "Concept", href: "#concept" },
    { text: "Why Us?", href: "#whyus" },
    { text: "FAQ", href: "#faq" },
  ];

  const [activeLink, setActiveLink] = useState(null); // Store the href of the active link

  const handleActivation = (href) => {
    setActiveLink(href); // Update the activeLink state with the clicked link's href
  };

  return (
    <nav>
      <ul>
        {navLinks.map((link, index) => (
          <li key={index}>
            <a
              onClick={() => handleActivation(link.href)}
              className={activeLink === link.href ? "activatedList" : "list"}
              href={link.href}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
