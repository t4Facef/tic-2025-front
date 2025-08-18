import AnchorListItem from "../components/content/anchor_list_item";
import TextSection from "../components/content/text_section";

export default function Utilizacao(){
    return(
        <div className="flex-1 flex min-h-screen">
            <nav className="flex-[1] bg-blue2 p-4 flex-col font-georgia text-white">
                <h1 className="text-[2rem]">Tópicos</h1>
                <ul className="list-disc list-inside space-y-3">
                    <AnchorListItem id="1">Tópico 1</AnchorListItem>
                    <AnchorListItem id="2">Tópico 2</AnchorListItem>
                    <AnchorListItem id="3">Tópico 3</AnchorListItem>
                    <AnchorListItem id="4">Tópico 4</AnchorListItem>
                    <AnchorListItem id="5">Tópico 5</AnchorListItem>
                    <AnchorListItem id="6">Tópico 6</AnchorListItem>
                </ul>
            </nav>
            <div className="flex-[7] p-6">
                <h1 className="font-bold text-[2rem]">Guia de Utilização do Site</h1>
                <TextSection id="1" title="Tópico 1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio corporis eveniet molestiae quia exercitationem minima eos voluptatibus! Ipsam fugit soluta nulla enim nemo impedit temporibus, fugiat id deserunt quas.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis ex soluta itaque corrupti provident hic nobis facilis illum nostrum consequuntur nisi vel doloremque asperiores, qui placeat architecto recusandae optio saepe.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sequi, libero eveniet dolore in debitis eaque recusandae atque, possimus beatae neque perferendis corporis nobis porro esse, fugiat aspernatur laudantium hic!
                </TextSection>
                <TextSection id="2" title="Tópico 2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio corporis eveniet molestiae quia exercitationem minima eos voluptatibus! Ipsam fugit soluta nulla enim nemo impedit temporibus, fugiat id deserunt quas.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore illo provident sapiente esse aperiam natus alias eius, dicta veritatis reiciendis explicabo aliquid suscipit obcaecati odit id fugit debitis optio magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error, animi qui voluptates, ullam inventore blanditiis cumque est tempora possimus cum atque. Consequatur reiciendis suscipit neque labore fuga hic ipsa?
                </TextSection>
                <TextSection id="3" title="Tópico 3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio corporis eveniet molestiae quia exercitationem minima eos voluptatibus! Ipsam fugit soluta nulla enim nemo impedit temporibus, fugiat id deserunt quas.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore illo provident sapiente esse aperiam natus alias eius, dicta veritatis reiciendis explicabo aliquid suscipit obcaecati odit id fugit debitis optio magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error, animi qui voluptates, ullam inventore blanditiis cumque est tempora possimus cum atque. Consequatur reiciendis suscipit neque labore fuga hic ipsa?
                </TextSection>
                <TextSection id="4" title="Tópico 4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio corporis eveniet molestiae quia exercitationem minima eos voluptatibus! Ipsam fugit soluta nulla enim nemo impedit temporibus, fugiat id deserunt quas.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore illo provident sapiente esse aperiam natus alias eius, dicta veritatis reiciendis explicabo aliquid suscipit obcaecati odit id fugit debitis optio magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error, animi qui voluptates, ullam inventore blanditiis cumque est tempora possimus cum atque. Consequatur reiciendis suscipit neque labore fuga hic ipsa?
                </TextSection>
                <TextSection id="5" title="Tópico 5" img="./img/utilizacao/teste1.png">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio corporis eveniet molestiae quia exercitationem minima eos voluptatibus! Ipsam fugit soluta nulla enim nemo impedit temporibus, fugiat id deserunt quas.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore illo provident sapiente esse aperiam natus alias eius, dicta veritatis reiciendis explicabo aliquid suscipit obcaecati odit id fugit debitis optio magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error, animi qui voluptates, ullam inventore blanditiis cumque est tempora possimus cum atque. Consequatur reiciendis suscipit neque labore fuga hic ipsa?
                </TextSection>
                <TextSection id="6" title="Tópico 6" img="./img/utilizacao/teste2.png">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus optio corporis eveniet molestiae quia exercitationem minima eos voluptatibus! Ipsam fugit soluta nulla enim nemo impedit temporibus, fugiat id deserunt quas.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore illo provident sapiente esse aperiam natus alias eius, dicta veritatis reiciendis explicabo aliquid suscipit obcaecati odit id fugit debitis optio magnam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error, animi qui voluptates, ullam inventore blanditiis cumque est tempora possimus cum atque. Consequatur reiciendis suscipit neque labore fuga hic ipsa?
                </TextSection>
            </div>
        </div>
    )
}