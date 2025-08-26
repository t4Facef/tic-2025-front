import TextSection from "../components/content/text_section";

export default function About(){
    return(
        <div className="p-8 flex flex-col font-georgia">
            <h1 className="text-5xl font-bold py-4">Sobre</h1>
            <TextSection title="Sobre o projeto" id="1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa placeat reprehenderit, sed debitis perspiciatis minus assumenda officia adipisci expedita autem modi numquam delectus atque labore ut harum non! Perferendis, perspiciatis.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, architecto eveniet? Eius ut commodi soluta, excepturi asperiores dolor ipsam tenetur corrupti deleniti architecto fugit debitis aliquid maiores animi nulla officiis?
            </TextSection>
            <TextSection title="Sobre os responsáveis" id="2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa placeat reprehenderit, sed debitis perspiciatis minus assumenda officia adipisci expedita autem modi numquam delectus atque labore ut harum non! Perferendis, perspiciatis.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, architecto eveniet? Eius ut commodi soluta, excepturi asperiores dolor ipsam tenetur corrupti deleniti architecto fugit debitis aliquid maiores animi nulla officiis?
            </TextSection>
            <div className="flex justify-center">
                <img src="./img/tester.png" alt="" className="w-max py-8 " />
            </div>
            <TextSection title="Agradecimentos" id="1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa placeat reprehenderit, sed debitis perspiciatis minus assumenda officia adipisci expedita autem modi numquam delectus atque labore ut harum non! Perferendis, perspiciatis.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, architecto eveniet? Eius ut commodi soluta, excepturi asperiores dolor ipsam tenetur corrupti deleniti architecto fugit debitis aliquid maiores animi nulla officiis?
            </TextSection>
        </div>
    )
}