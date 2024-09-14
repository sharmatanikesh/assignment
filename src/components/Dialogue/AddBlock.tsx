"use client";
import { useState } from "react";
import {
  X,
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Lightbulb,
  BookOpen,
  Award,
  FileCheck,
  Languages,
  Heart,
  Phone,
  Layout,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ButtonBox from "./ButtonBox";
import Experience from "./Experience";

export default function AddBlock() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleOpenDialog = (dialogId: string) => {
    setOpenDialog(dialogId);
    console.log(dialogId);
    console.log(isOpen);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] lg:max-w-[700px] bg-white text-gray-900 shadow-lg max-h-[400px] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">
                Add Block
              </DialogTitle>
              <button className="text-gray-600 hover:text-gray-800"></button>
            </div>
            <hr className="border-t border-gray-300 my-4" />
          </DialogHeader>
          <div className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <ButtonBox icon={<User />} text="About" />
              <ButtonBox icon={<Briefcase />} text="Professional Experience" />
              <ButtonBox icon={<GraduationCap />} text="Education" />
              <ButtonBox icon={<FolderKanban />} text="Projects" />
              <ButtonBox icon={<Lightbulb />} text="Skill" />
              <ButtonBox icon={<BookOpen />} text="Course" />
              <ButtonBox icon={<Award />} text="Award" />
              <ButtonBox icon={<FileCheck />} text="Certificate" />
              <ButtonBox icon={<Languages />} text="Language" />
              <ButtonBox icon={<Heart />} text="Interest" />
              <ButtonBox icon={<Phone />} text="Contact" />
              <ButtonBox icon={<Layout />} text="Custom" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
     
    </> 
  );
}
