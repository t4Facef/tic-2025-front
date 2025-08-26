export default function Adequacao() {
  const h1Style: React.CSSProperties = {
    fontWeight: "bold",
    fontSize: "2rem",
    fontStyle: "italic",
  };

  const h2Style: React.CSSProperties = {
    fontWeight: "bold",
    fontSize: "1.5rem",
    fontStyle: "italic",
  };

  return (
    <div className="px-20 py-10">
      <h1 style={h1Style}>Como participar?</h1>
      <p className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae ullam iste! 
        Impedit consequuntur quis nam minus amet? Placeat deserunt quod voluptates porro 
        sequi, impedit accusamus! Eum culpa modi distinctio.
      </p>

      <div className="mt-10">
        <h2 style={h2Style}>Como se cadastrar para Candidatos:</h2>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quidem reprehenderit
          consequuntur ducimus amet ipsum asperiores, saepe dolorum accusantium nulla voluptates 
          doloribus suscipit aliquam ratione. Animi optio dolorem dolorum assumenda.
        </p>
      </div>

      <div className="mt-10">
        <h2 style={h2Style}>Como se cadastrar para Empresas:</h2>
        <p className="mt-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad doloremque nulla aliquam
          rerum dolore! Quibusdam ut ratione dicta, adipisci accusamus impedit aspernatur neque
          debitis ab sunt, tenetur, quasi sequi nam.
        </p>
      </div>
    </div>
  );
}
