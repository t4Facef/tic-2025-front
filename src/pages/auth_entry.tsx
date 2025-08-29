// [TODO] - Terminar de implementar as apis

import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";

export default function AuthEntry(){
    return (
        <div className="bg-blue1 m-24 min-h-screen">
            <div className="flex flex-col items-center p-10 min-h-screen px-36">
                <h1 className="font-bold text-6xl py-10">Seja bem vindo!</h1>
                <div className="flex flex-col items-center justify-center py-6 w-full">
                    <label htmlFor="auth_email" className="py-6">Digite um endereço de e-mail para prosseguir</label>
                    <input type="text" placeholder="nome@email.com" name="auth_email" id="auth_email" className="w-full py-4 border border-black rounded-md text-center text-lg"/>
                </div>
                <div className="my-5">
                    <GenericBlueButton color={3} size="lg" link="/">Continuar</GenericBlueButton>
                </div>
                <div className="flex flex-col w-full py-12 px-16">
                    <p className="font-semibold text-[1.5rem]">Ou entre também por</p>
                    <div className="w-full bg-blue2 flex justify-center items-center py-12">
                        W.I.P
                    </div>
                </div>
                <div className="flex flex-col text-[1.2rem] items-center my-12">
                    <span>É sua primeira vez?</span>
                    <Link to="/registrar" className="underline pt-1">Cadastrar</Link>
                </div>
            </div>
        </div>
    )
}