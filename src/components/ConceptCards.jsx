
const ConceptCard = ({ img, alt, info }) => {
  return (
    <div className="card">
      <img src={img} alt={alt} />
      <span className="conceptSpan">{info}</span>
    </div>
  );
};

export default ConceptCard;
