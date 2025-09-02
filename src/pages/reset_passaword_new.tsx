import { CircleCheck } from "lucide-react";
import GenericBlueButton from "../components/buttons/generic_blue_button";
import GenericFormField from "../components/forms/generic_form_field";

export default function ResetPasswordNew() {
  return (
    <div className="mx-4 md:mx-16 lg:mx-32 xl:mx-64 my-12 p-12 border border-black rounded-lg bg-blue1 space-y-5 flex flex-col items-center">
      <h2 className=" bg-blue3 text-center text-blue1 font-bold text-[1.4rem] p-4 rounded-md w-full">
        Redefinição de senha
      </h2>
      <section className="flex flex-row space-x-4 rounded-lg p-4 bg-blue5 text-blue3">
        <div>
          <CircleCheck></CircleCheck>
        </div>
        <div className="font-semibold">
          <p>Um e-mail de redefinição de senha foi enviado para @email.com!</p>
        </div>
      </section>
      <div className="font-medium text-blue3">
        <p>Por favor, insira sua nova senha nos campos abaixo.</p>
      </div>
      <div className="text-blue3 font-semibold w-full">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="w-full my-6 space-y-3">
            <GenericFormField
              id="reset_password_field"
              type="password"
              placeholder="Digite sua nova senha"
            >
              Nova senha
            </GenericFormField>
            <GenericFormField
              id="reset_password_confirmation"
              type="password"
              placeholder="Confirme sua nova senha"
            ></GenericFormField>
          </div>
          <div className="flex flex-col items-center text-blue1">
            <GenericBlueButton color={3} link="">
              Redefinir senha
            </GenericBlueButton>
          </div>
        </form>
      </div>
    </div>
  );
}
