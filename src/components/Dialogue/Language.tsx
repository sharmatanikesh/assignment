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
import LanguageForm from "../forms/LanguageForm";

export default function Language() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: {
    skills: { degree: string; level: string }[];
  }) => {
    console.log("Form Data Submitted:", data);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-100 text-gray-900">
          Add language
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px] md:max-w-[500px] lg:max-w-[500px] bg-white text-gray-900 shadow-lg max-h-[400px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Language
          </DialogTitle>
          <hr className="border-t border-gray-300 my-4" />
        </DialogHeader>
        <LanguageForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
