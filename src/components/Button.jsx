import { Link } from "react-router-dom";
// import "../styles/button.sass";

import "../../css/button.css";

const Button = ({ role, text, href, blank }) => {
  return (
    <button className={role}>
      {href ? (
        <Link to={href} target={blank ? "_blank" : null}>
          {text}
        </Link>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
