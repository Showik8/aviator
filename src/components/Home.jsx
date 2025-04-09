import plane from "../assets/plane.png";
import Button from "./Button";

import '../styles/comp.css'

const Home = () => {
  return (
    <section id="home">
      <div>
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
      <img src={plane} alt="" />
    </section>
  );
};

export default Home;
