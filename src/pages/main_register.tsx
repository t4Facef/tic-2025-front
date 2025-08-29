export default function MainRegister() {
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
      <div  className="flex flex-row justify-center py-8 space-x-8 my-4">
        <div className="bg-blue3 rounded-l-lg p-16 space-x-5">
          <button className="text-blue1 font-semibold text-[1.5rem]">Responsável da Empresa</button>
          <p className="text-white">buscando por talentos especiais</p>
        </div>
        <div className="bg-blue5 rounded-r-lg p-16">
          <button className=" text-blue3 font-semibold text-[1.5rem] px-8">Candidato PCD</button>
          <p>buscando oportunidades inclusivas</p>
        </div>
      </div>
    </div>
  );
}
