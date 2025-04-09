import "../styles/button.css"

  
const Button = ({text,role}) =>{
  
    return <button className={role}>{text}</button>;
}

export default Button