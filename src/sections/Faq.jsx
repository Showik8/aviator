import { useState } from "react";
import planeIcon from "../assets/planeIcon.png";
import secondIcon from "../assets/secondIcon.png";
import patent from "../assets/patent.png";

import "../styles/faq.sass";

function FAQ() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How was the brand Aviator created?",
      answer: (
        <p>
          First use of Aviator as a brand in the gambling industry took place in
          2015 when City Loft LLC established a company which ran one of the
          most popular online gambling platforms in Georgia, adjarabet.com.
          <br />
          <br />
          In 2016-2017 under the instructions of City Loft LLC, various
          designers worked on the design and logo of Casino Aviator, a land
          casino which operated in 2018-2019.
          <br />
          <img className="icon" src={planeIcon} alt="Plane Icon" />
        </p>
      ),
    },
    {
      id: 2,
      question:
        "When did the first use of Aviator brand in gambling take place?",
      answer: (
        <p>
          First use of Aviator brand in gambling took place in the beginning of
          2018 when land casino Aviator was opened in Tbilisi and soon after its
          opening, a live stream from the casino was placed on Adjarabet
          platform using the same branding.
        </p>
      ),
    },
    {
      id: 3,
      question: "Who owns Aviator branding now?",
      answer: (
        <p>
          On May 03, 2022, City Loft LLC, which had sold its online gambling
          business Adjarabet to Flutter Entertainment Plc, transferred all
          Aviator-related IP (trademark registrations and copyright on the image
          below) to its current holder Aviator LLC (404612610), which since 2022
          runs a slots business under the said trademarks and uses the said logo
          for its business.,
          <br />
          <img className="icon" src={planeIcon} alt="Plane Icon" />
        </p>
      ),
    },
    {
      id: 4,
      question: "What rights does Aviator Studio own on Aviator branding?",
      answer: (
        <p>
          Aviator Studio owns a worldwide exclusive license to use Aviator
          branding in the gambling industry except for Georgia.
        </p>
      ),
    },
    {
      id: 5,
      question:
        "Why did Spribe OU start using Aviator branding as the name and visual part of the crash game?",
      answer: (
        <p>
          Spribe OU was established on 08.08.2018, clearly after Aviator
          branding had been used in the gambling industry. In 2018, in
          cooperation with the Adjarabet platform, newly formed SPRIBE created
          the crash game, exclusively launched on Adjarabet. SPRIBE was
          instructed to use the name Aviator and airplane image but was never
          granted rights to use them outside the platform.
          <br />
          On January 24, 2024, the court issued a preliminary injunction
          forbidding its use until the dispute on IP infringement was resolved.
        </p>
      ),
    },
    {
      id: 6,
      question:
        "What is the current status of the dispute between Aviator LLC and Spribe OU regarding ownership of AVIATOR IP?",
      answer: (
        <>
          <p>
            Despite not having rights to the Aviator name or image, SPRIBE
            applied for trademarks in multiple jurisdictions, including Georgia.
            In 2024, Aviator LLC initiated invalidation actions against these
            registrations.
          </p>
          <ul>
            <li className="faqList">
              <img className="patentIcon" src={patent} alt="Patent" /> reg. no.
              35671, registration date: 11.07.2022, class 9: computer software;
              <a
                href="https://www.sakpatenti.gov.ge/en/search_engine/view/113348/3/"
                target="_blank"
              >
                Registration Link
              </a>
            </li>
            <li className="faqList">
              <img className="patentIcon" src={secondIcon} alt="Plane" />
              reg. no: 37550; registration date: 12.11.2023; classes 9 and 41;
              <a
                href="https://www.sakpatenti.gov.ge/ka/search_engine/view/120814/3/"
                target="_blank"
              >
                {" "}
                Registration Link
              </a>
            </li>
          </ul>
          <p>
            On August 20, 2024, the court invalidated SPRIBE’s trademarks for
            bad faith registration and copyright infringement. This decision was
            upheld on February 17, 2025. Similar actions are ongoing in EUIPO
            and the UK.
          </p>
        </>
      ),
    },
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <section id="faq">
      <pre>
        <span>Any Questions?</span>
        We Can Help You
      </pre>

      <div className="faqContent">
        {faqData.map((item) => (
          <details
            className={`faqItem ${
              expandedQuestion === item.id ? "expanded" : ""
            }`}
            key={item.id}
          >
            <summary
              className="questionRow"
              onClick={() => toggleQuestion(item.id)}
            >
              <span className="toggleIcon">
                {expandedQuestion === item.id ? "-" : "+"}
              </span>
              <h2 className="question">{item.question}</h2>
            </summary>
            <div className="answer">
              {item.answer}
              {item.id === 1 && <div className="aviatorLogoContainer"></div>}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
