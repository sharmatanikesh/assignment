"use client";

import Education from "@/components/Dialogue/Education";
import Experience from "@/components/Dialogue/Experience";
import LanguageForm from "@/components/forms/LanguageForm";
import SkillForm from "@/components/forms/SkillForm";

export default function Home() {
 

  return (
    <>
    <div className="m-6">
    <Education/>
    <Experience/>
    {/* <SkillForm/> */}
    <LanguageForm/>
    
    </div>
  
    </>
  );
}
