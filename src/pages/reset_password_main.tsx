import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";
import { useState } from "react";
import { CircleX } from "lucide-react";


export function ResetPassword() {
    const [ emailConfirm, setEmailConfirm ] = useState(true)

    return (
        <div className="mx-96 my-24 border border-black rounded-lg bg-blue1 space-y-5 flex flex-col items-center">
            <h2 className=" bg-blue3 text-center text-white font-bold text-[1.4rem] p-4 rounded-t-md w-full">Redefinição de senha</h2>
            <div className="p-8">
                <div className="w-full flex flex-col items-center">
                    <p className="font-semibold text-blue3 text-[1.2rem] mb-6">
                        Digite seu e-mail no campo abaixo para realizar a redefinição de senha!
                    </p>
                    {!emailConfirm && 
                        <div className="self-start flex flex-row p-3 bg-red1 text-red2 font-semibold rounded-lg space-x-3 mb-4">
                            <CircleX/>
                            <div >
                                <p>E-mail não encontrado</p>
                            </div>
                        </div>
                    }
                    <div className="text-blue3 font-semibold w-full">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="w-full my-6">
                                <GenericFormField
                                    id="reset_password_email"
                                    type="email"
                                    placeholder="Digite seu e-mail">
                                    E-mail
                                </GenericFormField>
                            </div>
                            <div className="flex flex-col items-center my-8">
                                <GenericBlueButton color={3} onClick={() => setEmailConfirm(!emailConfirm)}>Redefinir senha</GenericBlueButton>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="text-blue3">
                    <p>Lembrou sua senha? <Link to={"/auth/login"} className="underline">Faça o login</Link></p>
                </div>
            </div>
        </div>
    )
}