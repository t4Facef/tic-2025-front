import { Link, useNavigate } from "react-router-dom";

export default function MainRegister() {
  const navigate = useNavigate()

  return (
    <div className="m-20 bg-blue1 border border-black rounded-lg">
      <div className="p-5 text-center text-white text-[3rem]  font-semibold bg-blue3 rounded-t-lg ">
        <h1>Seja bem-vindo à ApoJobs!</h1>
      </div>
      <div className="p-8 text-center text-black text-[1.5rem]">
        <p>
          Notamos que é a sua primeira vez em nosso site. Por isso, conte para a
          gente quem você é!
        </p>
      </div>
      <div className="flex flex-col justify-center items-center py-8 space-x-8 my-8 space-y-12">
        <div className="flex flex-row ">
          <button className="bg-blue3 rounded-l-xl p-16 space-x-5 hover:bg-blue3H transition-colors" onClick={() => navigate("/auth/register/companies")}>
            <p className="text-blue1 font-semibold text-[1.5rem]">Responsável da Empresa</p>
            <p className="text-white">buscando por talentos especiais</p>
          </button>
          <button className="bg-blue5 rounded-r-xl p-16 hover:bg-blue5H transition-colors" onClick={() => navigate("/auth/register/candidates")}>
            <p className=" text-blue3 font-semibold text-[1.5rem] px-8">Candidato PCD</p>
            <p>buscando oportunidades inclusivas</p>
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
