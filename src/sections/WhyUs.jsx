import Button from '../components/Button'
import React from "react";

const WhyUs = () => {
  return (
    <section id="whyus">
      <pre>
        <span>Why</span>
        Choose Aviator?
      </pre>

      <div className="reasonCards">
        <div className="reasonCard">
          <span className='reasonSpan' >High RTP% for fair and exciting gameplay</span>
        </div>
        <div className="reasonCard">
          <span className='reasonSpan' >Innovative single & double bet strategies</span>
        </div>
        <div className="reasonCard">
          <span className='reasonSpan' >Auto cash-out & real-time statistics</span>
        </div>
        <div className="reasonCard">
          <span className='reasonSpan' >Fully licensed brand</span>
        </div>
      </div>
      <div className="conteinerOfWhyus">
        <h4 >
          It’s time to experience the game as it was meant to be played. Join us
          and take off with Aviator—the original crash game!
        </h4>
        <p className='pOfreasons'>For business inquiries and casino partnerships, contact us at</p>
      <Button role={"primary"} text={"Contact Us"}/>
      </div>
    </section>
  );
};

export default WhyUs;
