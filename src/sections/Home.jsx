import plane from "../assets/plane.png";
import Button from "../components/Button";

import "../styles/component.sass";


const Home = ({width}) => {
   
  return (
    <section id="home">
      <div className={width >= 1440 ? "divInHome" : "divInHomeResp"}>
        <pre>
          <span>Aviator Studio –</span>
          The Original Crash Game Experience
        </pre>
        <p>
          Aviator Studio is a game provider focused on delivering engaging and
          innovative gaming experiences, starting with the flagship game
          Aviator. This game is crafted with a unique multiplayer experience,
          thrilling high-RTP gameplay, and an engaging visual & sound design
          that sets it apart.
        </p>
        <Button text={"Contact Us"} role={"primary"} />
      </div>
      {width >= 1440 ? <img src={plane} alt="" /> : null}
    </section>
  );
};

export default Home;
