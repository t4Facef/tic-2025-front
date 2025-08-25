// [TODO] - Inicialmente implementar logica simples de react, depois usar fetch/useEffect
// [TODO] - Verificar viabilidade de alterar cor das caixas de conteudo para cinza
// [TODO] - Fazer as imagens serem opcionais
// [TODO] - Adicionar redes sociais e suas apis se tiver

import TagContainer from "../components/content/tag_container";
import InfoList from "../components/content/info_list";

export default function CompanyProfile(){
    return (
        <div className="p-12 px-60">
            <div className="flex items-center">
                <img src="/img/profile-default.png" alt="Profile-pic" className="rounded-full border border-black w-52 h-52 mr-7"/>
                <div className="mt-4">
                    <h1 className="font-bold text-4xl">Company Name</h1>
                    <p className="mt-3 text-justify">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae autem aliquid nostrum sint asperiores maiores quas accusamus delectus obcaecati, ipsam, ratione excepturi, error molestiae unde deserunt! Nam sed quas dicta?
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, itaque ipsa, vel veritatis odio perferendis architecto omnis accusantium illum, dolore expedita laborum sed? Consequatur eum culpa, ea aliquid unde sequi.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo molestiae, debitis odit nisi beatae natus ipsum praesentium sed, doloribus maiores accusantium, delectus dolores. Deserunt accusamus dolores repellat natus rerum.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem cumque dolorem possimus ab magni nihil facilis praesentium nostrum natus, incidunt rem, dolores magnam expedita? Iste totam molestias dolore fugiat aliquam!
                    </p>
                </div>
            </div>
            <div>
                <div className="mt-8">
                    <h2 className="font-semibold">Nossa História</h2>
                    <div className="flex mt-3">
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque placeat sit qui quia enim aliquam quidem temporibus mollitia eum, eveniet maxime atque unde maiores harum tenetur incidunt vitae saepe distinctio.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia accusamus, vitae labore ipsum voluptate blanditiis veniam temporibus ullam deserunt, ad tempore tenetur architecto fuga adipisci quidem? Et labore assumenda similique?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi vitae rerum deleniti culpa voluptate, in ut non optio architecto magnam voluptates voluptatem, officia corporis repudiandae, earum explicabo perspiciatis voluptatum molestiae.
                        </p>
                        <img src="/img/tester.png" alt="retangulo-de-teste" className="w-72 ml-3"/>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="font-semibold">Missão e Valor</h2>
                    <div className="flex mt-3">
                        <img src="/img/tester.png" alt="retangulo-de-teste" className="w-72 mr-3"/>
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque placeat sit qui quia enim aliquam quidem temporibus mollitia eum, eveniet maxime atque unde maiores harum tenetur incidunt vitae saepe distinctio.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia accusamus, vitae labore ipsum voluptate blanditiis veniam temporibus ullam deserunt, ad tempore tenetur architecto fuga adipisci quidem? Et labore assumenda similique?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi vitae rerum deleniti culpa voluptate, in ut non optio architecto magnam voluptates voluptatem, officia corporis repudiandae, earum explicabo perspiciatis voluptatum molestiae.
                        </p>
                    </div>
                </div>
                <img src="/img/tester.png" alt="" className="py-6 h-96 w-full object-cover"/>
            </div>
            <div className="bg-blue1 flex justify-between p-6 my-6">
                <InfoList items={[
                    { label: "Localização", value: "São Paulo, SP" },
                    { label: "Tempo de Atuação", value: "15 anos" },
                    { label: "Área de Atuação", value: "Tecnologia" }
                ]} />
                <InfoList items={[
                    { label: "Funcionários", value: "500+" },
                    { label: "Certificações", value: "ISO 9001" },
                    { label: "Site", value: "www.empresa.com" }
                ]} />
            </div>
            <div className="mt-5">
                <TagContainer tags={["lorem", "ipsum", "lorem", "ipsum", "lorem", "ipsum", "lorem", "ipsum"]}>Capacidade de Apoio</TagContainer>
            </div>
        </div>
    )
}