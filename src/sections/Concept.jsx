// import secondPlane from "../assets/secondPlane.png"
import second from "../assets/second.png";
import "../styles/component.sass";


const Concept = ({ width }) => {
  return (
    <section id="conception">
      <div className="conc">
        <pre>
          <span>The Official </span>
          Aviator Game
        </pre>
        <p>
          Aviator, the original crash game, delivers a thrilling experience
          built on a foundation of fairness, security, and gameplay integrity.
          One and only fully licensed Aviator brand establishes a trusted
          environment where players can engage with confidence. It's more than
          just a game. It's a community-driven experience that sets the standard
          for high-adrenaline gameplay.
        </p>

        <p>
          Aviator Studio, through the official licensed Aviator branding, is
          committed to expanding this experience with new and innovative games
          in the future, continuing to push the boundaries of online gaming.
        </p>
      </div>
      {width > 800 ? (
        <img className="secondPlane" src={second} alt={second} />
      ) : null}
    </section>
  );
};

export default Concept;
