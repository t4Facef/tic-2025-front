import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";

export function ResetPassword() {
    return (
        <div className="mx-4 md:mx-16 lg:mx-32 xl:mx-64 my-12 p-12 border border-black rounded-lg bg-blue1 space-y-5 flex flex-col items-center">
            <div className=" bg-blue3 text-center text-blue1 font-bold text-[1.4rem] p-4 rounded-md w-full">
                <h2>Redefinição de senha</h2>
            </div>
            <div className="w-full flex flex-col items-center">
                <p className="font-semibold text-blue3 text-[1.2rem]">
                    Digite seu e-mail no campo abaixo para realizar a redefinição de senha!
                </p>
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
                        <div className="flex flex-col items-center text-blue1">
                            <GenericBlueButton color={3} link="/auth/reset/password">Redefinir senha</GenericBlueButton>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-blue3">
                <p>Lembrou sua senha? <Link to={"/auth/login"} className="underline">Faça o login</Link></p>
            </div>
        </div>
    )
}