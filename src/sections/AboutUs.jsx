import '../styles/comp.css'
import arrow from '../assets/arrow.png'
import dollar from "../assets/dollar.png";
import rocket from "../assets/rocket.png";
import ConceptCard from '../components/ConceptCards'

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
      </section>
    );
}

export default AboutUs