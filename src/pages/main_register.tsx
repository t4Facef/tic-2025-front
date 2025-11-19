import { Link, useNavigate } from "react-router-dom";

export default function MainRegister() {
  const navigate = useNavigate()

  return (
    <div className="m-6 md:m-20 bg-blue1 border border-black rounded-lg">
      <div className="p-3 md:p-8 text-center text-white text-xl md:text-[3rem] font-semibold bg-blue3 rounded-t-lg ">
        <h1>Seja bem-vindo à ApoJobs!</h1>
      </div>
      <div className="p-6 md:p-8 pb-4 md:pb-8 text-center text-black text-base md:text-[1.5rem]">
        <p>
          Notamos que é a sua primeira vez em nosso site. Por isso, conte para a
          gente quem você é!
        </p>
      </div>
      <div className="flex flex-col justify-center items-center py-3 md:py-8 px-6 my-2 md:my-8 space-y-6 md:space-y-12">
        <div className="flex flex-row w-full max-w-4xl">
          <button className="bg-blue3 rounded-l-xl p-4 md:p-16 hover:bg-blue3H transition-colors flex-1" onClick={() => navigate("/auth/register/companies")}>
            <p className="text-blue1 font-semibold text-sm md:text-[1.5rem] mb-1 md:mb-2">Responsável da Empresa</p>
            <p className="text-white text-xs md:text-base hidden md:block">buscando por talentos especiais</p>
          </button>
          <button className="bg-blue5 rounded-r-xl p-4 md:p-16 hover:bg-blue5H transition-colors flex-1" onClick={() => navigate("/auth/register/candidates")}>
            <p className=" text-blue3 font-semibold text-sm md:text-[1.5rem] mb-1 md:mb-2">Candidato PCD</p>
            <p className="text-xs md:text-base hidden md:block">buscando oportunidades inclusivas</p>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p>Não é sua primeira vez?</p>
          <Link to={"/"} className="underline font-bold">Clique aqui</Link>
        </div>
      </div>
    </div>
  );
}
