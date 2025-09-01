import { Link } from "react-router-dom";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";

export function ResetPassword() {
    return (
        <div className="mx-36 my-12 p-12 border border-black rounded-lg bg-blue1 space-y-5">
            <div className=" bg-blue3 text-center text-blue1 font-bold text-[1.4rem] p-4 rounded-md">
                <h2>Redefinição de senha</h2>
            </div>
            <p className="font-semibold text-blue3">
                Digite seu e-mail no campo abaixo para realizar a redefinição de senha!
            </p>
            <div className="">
                <form action="">
                    <GenericFormField
                        id="candidate_email_register"
                        type="email"
                        placeholder="Digite seu e-mail">
                        Informe seu e-mail
                    </GenericFormField>
                </form>
            </div>
            <div>
                <GenericBlueButton color={3} link="">Redefinir senha</GenericBlueButton>
            </div>
            <div>
                <p>Lembrou sua senha? <Link to={"/auth/login"}>Faça seu login</Link></p>
            </div>
        </div>
    )
}