import Button from "../components/Button";

const WhyUs = () => {
  const reasons = [
    "High RTP% for fair and exciting gameplay",
    "Innovative single & double bet strategies",
    "Auto cash-out & real-time statistics",
    "Fully licensed brand",
  ];
  return (
    <section id="whyus">
      <pre>
        <span>Why</span>
        Choose Aviator?
      </pre>

      <div className="reasonCards">
        {reasons.map((text, index) => (
          <div className="reasonCard" key={index}>
            <span className="reasonSpan">{text}</span>
          </div>
        ))}
      </div>
      <div className="conteinerOfWhyus">
        <h4>
          It’s time to experience the game as it was meant to be played. Join us
          and take off with Aviator—the original crash game!
        </h4>
        <p className="pOfreasons">
          For business inquiries and casino partnerships, contact us at
        </p>
        <Button role={"primary"} text={"Contact Us"} />
      </div>
    </section>
  );
};

export default WhyUs;
