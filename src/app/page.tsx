"use client";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EducationForm from '@/components/ui/forms/EducationForm';

type EducationData = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: { degree: string; school: string; city: string; country: string; startDate: string; endDate: string; description?: string }) => {
    const transformedData: EducationData = {
      institution: data.school,
      degree: data.degree,
      fieldOfStudy: "Field of Study", 
      startYear: parseInt(data.startDate.split('/')[1], 10), 
      endYear: data.endDate ? parseInt(data.endDate.split('/')[1], 10) : undefined,
    };

    console.log(transformedData);
    //BACKEND LOGIC TO HANDLE TRANSFORMED DATA
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-100 text-gray-900">Add Education</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px] md:max-w-[500px] lg:max-w-[500px] bg-white text-gray-900 shadow-lg max-h-[400px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Education</DialogTitle>
          <hr className="border-t border-gray-300 my-4" />
        </DialogHeader>
        <EducationForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
