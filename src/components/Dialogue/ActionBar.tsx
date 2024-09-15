import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
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
  Plus,
  Grid,
  Share2,
  WandSparkles,
} from "lucide-react";
import ExperienceForm from "../forms/ExperienceForm";
import EducationForm from "../forms/EducationForm";
import AwardForm from "../forms/AwardForm";
import CourseForm from "../forms/CourseForm";
import SkillForm from "../forms/SkillForm";
import LanguageForm from "../forms/LanguageForm";
import InterestForm from "../forms/InterestForm";
import ContactForm from "../forms/ContactForm";
import CertificateForm from "../forms/CertificateForm";

type BlockOption = {
  icon: React.ReactNode;
  label: string;
  group?: string;
};

const blockOptions: BlockOption[] = [
  { icon: <User className="w-6 h-6" />, label: "About" },
  {
    icon: <Briefcase className="w-10 h-6" />,
    label: "Experience",
  },
  { icon: <GraduationCap className="w-6 h-6" />, label: "Education" },
  { icon: <FolderKanban className="w-6 h-6" />, label: "Projects" },
  { icon: <Lightbulb className="w-6 h-6" />, label: "Skill", group: "middle" },
  { icon: <BookOpen className="w-6 h-6" />, label: "Course", group: "middle" },
  { icon: <Award className="w-6 h-6" />, label: "Award", group: "middle" },
  {
    icon: <FileCheck className="w-6 h-6" />,
    label: "Certificate",
    group: "middle",
  },
  { icon: <Languages className="w-6 h-6" />, label: "Language" },
  { icon: <Heart className="w-6 h-6" />, label: "Interest" },
  { icon: <Phone className="w-6 h-6" />, label: "Contact" },
  { icon: <Layout className="w-6 h-6" />, label: "Custom" },
];

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const handleBlockClick = (label: string) => {
    setSelectedBlock(label);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setSelectedBlock(null); // Reset selected block when opening dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBlock(null);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-3xl mx-auto px-4">
      <div className="flex items-center  bg-white rounded-md px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <button className="p-2 border text-gray-600 hover:bg-gray-100 rounded-md">
            <User className="w-5 h-5" />
          </button>
          <button className="p-1 inline-flex items-center border bg-orange-500 text-white px-2 rounded-md text-sm font-medium">
            <span className="p-1">
              <Briefcase className="w-5 h-5" />
            </span>
            <span className="ml-1  hidden sm:block">Experience</span>
          </button>
          <button
            onClick={handleOpenDialog}
            className="p-2 border text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 border text-gray-600 hover:bg-gray-100 rounded-md">
            <Grid className="w-5 h-5" />
          </button>
          <button className="p-2 border text-gray-600 hover:bg-gray-100 rounded-md">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <button className="ml-2 p-1 inline-flex items-center bg-green-500 text-white px-2 rounded-md text-sm font-medium">
          <span className="p-1 rotate-90">
            <WandSparkles className="w-5 h-5" />
          </span>
          <span className="ml-1 hidden sm:block">Save Changes</span>
        </button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-white text-gray-900  overflow-y-auto sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-left">
              {selectedBlock ? `Add ${selectedBlock}` : "Add Block"}
            </DialogTitle>
          </DialogHeader>
          <hr className="border-t border-gray-200 " />
          {!selectedBlock ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 p-1">
              {blockOptions.map((option) => (
                <Button
                  key={option.label}
                  variant="outline"
                  className={`flex flex-row items-center justify-start  p-3 h-14  hover:bg-green-100 font-medium border  rounded-lg ${
                    option.group === "middle" ? "ring-2 ring-blue-200" : ""
                  }`}
                  onClick={() => handleBlockClick(option.label)}
                >
                  <div className=" border rounded-md p-1" >{option.icon}</div>
                  <span className="text-center line-clamp-2 ml-1 font-semibold p-1">
                    {option.label}
                  </span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="p-2">
              {selectedBlock.toLowerCase().includes("experience") && (
                <ExperienceForm onClose={() => setSelectedBlock(null)} />
              )}
              {selectedBlock === "About" && (
                <CertificateForm onClose={() => setSelectedBlock(null)} />
              )}
              {selectedBlock === "Education" && (
                <EducationForm onClose={() => setSelectedBlock(null)} />
              )}
               {selectedBlock === "Award" && (
                <AwardForm onClose={() => setSelectedBlock(null)} />
              )}
              {selectedBlock === "Course" && (
                <CourseForm onClose={() => setSelectedBlock(null)} />
              )}
              {selectedBlock === "Skill" && (
                <SkillForm onClose={() => setSelectedBlock(null)} />
              )}
               {selectedBlock === "Language" && (
                <LanguageForm onClose={() => setSelectedBlock(null)} />
              )}
              {selectedBlock === "Interest" && (
                <InterestForm onClose={() => setSelectedBlock(null)} />
              )}
              {selectedBlock === "Contact" && (
                <ContactForm onClose={() => setSelectedBlock(null)} />
              )}
               {selectedBlock === "Certificate" && (
                <CertificateForm onClose={() => setSelectedBlock(null)} />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
