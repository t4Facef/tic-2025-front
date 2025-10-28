import { useState } from "react";
import JobModal from "./job_modal";
import ProfileLink from "../profile/profile_link";
import { API_BASE_URL } from "../../config/api";
import { JobData } from "../../types/vagas/vaga";

interface JobPositionProps {
  jobData: JobData;
  isEditing: boolean;
}

export default function JobPosition({ jobData, isEditing=false }: JobPositionProps) {
  const [open, setOpen] = useState(false);

  if (!jobData) {
    return null;
  }

  return (
    <>
      <div className={`w-full flex cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${!open ? 'hover:opacity-75' : ''}`} onClick={() => setOpen(true)} >
        <div className="w-28 h-28 bg-blue2 border-blue3 border-2 rounded-l-md"> 
          <ProfileLink id={jobData.idEmpresa} imgPath={`${API_BASE_URL}/api/arquivos/empresa/${jobData.idEmpresa}/foto/view`}></ProfileLink>
        </div>
        
        <div className="flex flex-col flex-1 max-h-28">
          <div className="bg-blue2 border-blue3 border-2 flex-[1] flex justify-between items-center px-2 rounded-tr-md">
            <span>{jobData.title}</span>
          </div>

          <div className="bg-blue1 border-blue3 border-2 flex-[3] overflow-auto p-2 break-words rounded-br-md">
            <p>
              {jobData.description.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').substring(0, 360)}
              {jobData.description.length > 360 ? '...' : ''}
            </p>
          </div>
        </div>
      </div>
      
      <JobModal 
        jobData={jobData}
        open={open}
        isEditing={isEditing}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
