"use client";

import Certificate from "@/components/Dialogue/Certificate";
import Education from "@/components/Dialogue/Education";
import Experience from "@/components/Dialogue/Experience";
import Interest from "@/components/Dialogue/Interest";
import Language from "@/components/Dialogue/Language";

export default function Home() {
 

  return (
    <>
    <div className="m-6">
    <Education/>
    <Experience/>
    <Language/>
    <Interest/>
    <Certificate/>
    
    </div>
  
    </>
  );
}
