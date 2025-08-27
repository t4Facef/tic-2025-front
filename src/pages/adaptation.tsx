import GenericBlueButton  from "../components/buttons/generic_blue_button";

export default function Adaptation() {
  return (
    <div className="px-20 py-10">
      <h1 className="font-bold text-[2rem] italic">Como participar?</h1>
      <p className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        lorem
      
      </p>

      <div className="mt-10">
        <h2 className="font-bold text-[1.5rem] italic">Como se cadastrar para Candidatos:</h2>
        <p className="mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        lorem
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-[1.5rem] italic">Como se cadastrar para Empresas:</h2>
        <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        loremLorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
        lorem
        </p>
      </div>
      <div className="mt-10 items-end flex w-full flex-col">
        <div className="space-y-2">
          <p className="font-semibold text-lg italic">Se interessou?</p>
          <GenericBlueButton color={3} link="/auth/entry" size="md">Registre-se agora</GenericBlueButton>
        </div>
      </div>
    </div>
  );
}
