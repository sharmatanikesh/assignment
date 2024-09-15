"use client";

import Actionbar from "@/components/Dialogue/ActionBar";
import AddBlock from "@/components/Dialogue/AddBlock";
import Award from "@/components/Dialogue/Award";
import Certificate from "@/components/Dialogue/Certificate";
import Contact from "@/components/Dialogue/Contact";
import Course from "@/components/Dialogue/Course";
import Education from "@/components/Dialogue/Education";
import Experience from "@/components/Dialogue/Experience";
import Interest from "@/components/Dialogue/Interest";
import Language from "@/components/Dialogue/Language";
import Skill from "@/components/Dialogue/Skill";
import AddBlockDialog from "@/components/Dialogue/testing";
import ExperienceForm from "@/components/forms/ExperienceForm";

export default function Home() {
 

  return (
    <>
    <div>
    <Actionbar/>
    </div>
    
    <div className="m-6">
    <Education/>
  
    <AddBlockDialog/>
    <Language/>
    <Certificate/>
    <Award/>
    <Skill/>
    <Interest/>
    <Course/>
    <Contact/>
    
    
    </div>
  
    </>
  );
}
