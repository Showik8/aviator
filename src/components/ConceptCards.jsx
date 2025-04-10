import "../styles/card.sass"
const ConceptCard = ({ img, alt, info }) => {
  return (
    <div className="card">
      <img className="conceptImg" src={img} alt={alt} />
      <span className="conceptSpan">{info}</span>
    </div>
  );
};

export default ConceptCard;
