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
import AwardForm from "@/components/forms/AwardForm";

type AwardData = {
  issuedBy: string;
  award: string;
  year: number;
};

export default function Award() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = (data: {
    award: string;
    issuedBy: string;
    date: string;
    description?: string;
  }) => {
    const transformedData: AwardData = {
      issuedBy: data.issuedBy,
      award: data.award,
      year: parseInt(data.date.split("/")[1], 10)
    };

    console.log(transformedData);
    //BACKEND LOGIC TO HANDLE TRANSFORMED DATA

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-100 text-gray-900">
          Add Award
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px] md:max-w-[500px] lg:max-w-[500px] bg-white text-gray-900 shadow-lg max-h-[400px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Award
          </DialogTitle>
          <hr className="border-t border-gray-300 my-4" />
        </DialogHeader>
        <AwardForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
