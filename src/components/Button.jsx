import { Link } from "react-router-dom";
import "../styles/button.sass"

  
const Button = ({ role, text, href }) => {
  console.log(href)
  return (
    <button className={role}>
      {href ? <Link to={href}>{text}</Link> : text}
    </button>
  );
};

export default Button