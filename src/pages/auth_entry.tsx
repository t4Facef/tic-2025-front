import GenericBlueButton from "../components/buttons/generic_link_blue_button";

export default function AuthEntry(){
    return (
        <div className="bg-blue1 m-20 min-h-screen">
            <div className="flex flex-col items-center p-10 min-h-screen">
                <h1 className="font-bold text-4xl">Seja bem vindo!</h1>
                <label htmlFor="auth_email" className="py-6">Digite um endereço de e-mail para prosseguir</label>
                <input type="text" placeholder="nome@email.com" name="auth_email" id="auth_email" className="px-32 py-1 border border-black rounded-md text-center"/>
                <GenericBlueButton color={3} link="./">Continuar</GenericBlueButton>
            </div>
        </div>
    )
}