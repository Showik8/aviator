import { useState } from "react";

const Navigation = () => {
  const navLinks = [
    { text: "Home", href: "/#home" },
    { text: "About Us", href: "#about" },
    { text: "Concept", href: "#conception" },
    { text: "Why Us?", href: "#whyus" },
    { text: "FAQ", href: "#faq" },
  ];

  const [activeLink, setActiveLink] = useState(null); 

  const handleActivation = (href) => {
    setActiveLink(href); 
    setTimeout(() => {
      setActiveLink(null)
    }, 4000);
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
