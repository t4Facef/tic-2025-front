import { ReactNode } from "react";
import { User } from "lucide-react";
import TextSection from "./text_section";
import TagContainer from "./tag_container";

interface JobModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

export default function JobModal({ open, onClose, title, children }: JobModalProps) {
  const dumpTags = ["lorem", "ipsum", "lorem", "ipsum", "lorem", "ipsum", "lorem", "ipsum"];

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-hidden flex-col" onClick={onClose}>
      <div className="max-w-[100vh] w-full py-10" onClick={(e) => e.stopPropagation()}>
        <div className="bg-blue1 p-6 rounded-t-xl shadow-lg max-h-[80vh] overflow-auto">
          <div className="flex flex-1 justify-between">
            <div className="flex-[7]">
              <h2 className="text-xl font-bold mb-4 text-[70px] py-7">{title}</h2>
              <div className="">{children}</div>
            </div>
            <div className="bg-white rounded-full flex justify-center items-center w-40 h-40 m-3 ml-9 border border-black">
                <User size={100}/>
            </div>
          </div>
          <div className="my-3">
            <TextSection title="Lorem Ipsum" id="1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit delectus earum ab facilis, dolor aliquid aspernatur quibusdam consequuntur laborum provident nam voluptatum dolorem facere ea quaerat illo ex adipisci magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ut voluptatum minima mollitia doloremque. Illo cumque officia itaque inventore facere dignissimos. Ab reiciendis culpa molestiae laudantium nesciunt unde sunt eaque! lorem</TextSection>
            <TextSection title="Lorem Ipsum" id="1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit delectus earum ab facilis, dolor aliquid aspernatur quibusdam consequuntur laborum provident nam voluptatum dolorem facere ea quaerat illo ex adipisci magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ut voluptatum minima mollitia doloremque. Illo cumque officia itaque inventore facere dignissimos. Ab reiciendis culpa molestiae laudantium nesciunt unde sunt eaque! lorem</TextSection>
          </div>
          <div>
            <TagContainer tags={dumpTags}>Habilidades esperadas</TagContainer>
            <TagContainer tags={dumpTags}>Apoio da empresa</TagContainer>
          </div>
        </div>
        <div className="bg-white border border-y-black flex justify-center py-3">
          <span>Você é XX% compátivel com essa vaga</span>
        </div>
        <div className="flex flex-1">
          <button className="bg-blue3 text-white flex-[5] border-black border-[2px] text-[60px] rounded-bl-3xl" onClick={onClose}>Fechar</button>
          <button className="bg-blue3 text-white flex-[5] border-black border-[2px] text-[60px] rounded-br-3xl" onClick={onClose}>Inscrever</button>
        </div>
      </div>
    </div>
  );
}