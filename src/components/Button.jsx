import "../styles/button.sass"

  
const Button = ({text,role}) =>{
  
    return <button className={role}>{text}</button>;
}

export default Button