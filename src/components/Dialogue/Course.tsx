"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CourseForm from "@/components/forms/CourseForm";

type CourseData = {
  institution: string;
  course: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
};

export default function Course() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: {
    course: string;
    school: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    description?: string;
  }) => {
    const transformedData: CourseData = {
      institution: data.school,
      course: data.course,
      fieldOfStudy: "Field of Study",
      startYear: parseInt(data.startDate.split("/")[1], 10),
      endYear: data.endDate
        ? parseInt(data.endDate.split("/")[1], 10)
        : undefined,
    };

    console.log(transformedData);
    //BACKEND LOGIC TO HANDLE TRANSFORMED DATA

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-100 text-gray-900">
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px] md:max-w-[500px] lg:max-w-[500px] bg-white text-gray-900 shadow-lg max-h-[400px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Course
          </DialogTitle>
          <hr className="border-t border-gray-300 my-4" />
        </DialogHeader>
        <CourseForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
