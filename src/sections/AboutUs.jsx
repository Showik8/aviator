import arrow from '../assets/arrow.png'
import dollar from "../assets/dollar.png";
import rocket from "../assets/rocket.png";
import ConceptCard from '../components/ConceptCards'
import phone from '../assets/phones.png'

import "../styles/component.sass";


const AboutUs = () =>{
    const cards = [
      { img: rocket, tema: "Watch the multiplier rise" , alt: "rocket"},
      { img: dollar, tema: "Cash out before the plane flies away", alt:"dollar"},
      { img: arrow, tema: "Use strategy to maximize your winnings",alt:"arrow" },
    ];

    return (
      <section id="about">
        <pre>
          <span>The Concept</span>
          is simple but electrifying
        </pre>
        <div className="cards">
            {
            cards.map((e,ind)=>{
                return <ConceptCard key={ind} alt={e.alt} img={e.img} info={e.tema} />
            })
            }
        </div>

        <div className='phonesDiv'>
          <img src={phone} alt="Phones" />
          <p>Aviator offers single and double betting modes, auto bet and auto cash-out features, and detailed game statistics—giving players full control over their strategy. Whether you’re a high-risk thrill-seeker or a cautious strategist, Aviator delivers an unmatched gaming experience.</p>
          </div>
      </section>
    );
}

export default AboutUs