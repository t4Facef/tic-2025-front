import "./header_button.css"

export default function HeaderButton(){
    return (
        <div className="allButton">
            <button className="loginButton">
                Login        
            </button>
            <button className="registerButton">
                Registrar
            </button>
        </div>
    )
}