import Question from "../components/content/question";
import LinkListItem from "../components/content/list_link_item"

export default function Faq() {
    return (
        <div className="px-20 py-10">
            <h1 className="text-3xl pb-7 font-bold">Perguntas Frequentes</h1>
            <div className="flex space-x-20 justify-between">
                <div className="flex-col space-y-4 flex-[8] text-justify">
                    <Question title="Duvida 1?" description="
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sapiente veniam magni quam, amet ab mollitia officia accusamus, repellendus perspiciatis, exercitationem recusandae provident minima incidunt enim fuga numquam quos cumque!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sapiente veniam magni quam, amet ab mollitia officia accusamus, repellendus perspiciatis, exercitationem recusandae provident minima incidunt enim fuga numquam quos cumque!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sapiente veniam magni quam, amet ab mollitia officia accusamus, repellendus perspiciatis, exercitationem recusandae provident minima incidunt enim fuga numquam quos cumque!"/>
                    <Question title="Duvida 2?" description="
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores ipsum necessitatibus facere minima laboriosam. Perspiciatis?"/>
                    <Question title="Duvida 3?" description="
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores ipsum necessitatibus facere minima laboriosam. Perspiciatis?"/>
                    <Question title="Duvida 4?" description="
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores ipsum necessitatibus facere minima laboriosam. Perspiciatis?"/>
                </div>
                <nav className="flex-[2] flex flex-col items-center">
                    <h2 className="text-xl font-semibold">Saiba Sobre</h2>
                    <LinkListItem path="/">Link 1</LinkListItem>
                    <LinkListItem path="/">Link 2</LinkListItem>
                    <LinkListItem path="/">Link 3</LinkListItem>
                    <LinkListItem path="/">Link 4</LinkListItem>
                </nav>
            </div>
        </div>
    )
}