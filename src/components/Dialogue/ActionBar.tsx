import {
  User,
  Plus,
  Grid,
  Share2,
  Briefcase,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import AddBlock from "./AddBlock";

export default function FloatingActionBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleBlock = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-3xl mx-auto px-4">
      <div className="flex items-center justify-between bg-white rounded-md px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <button className="p-2 border text-gray-600 hover:bg-gray-100 rounded-md">
            <User className="w-5 h-5" />
          </button>
          <button className="ml-2 p-1 inline-flex items-center bg-orange-500 text-white px-2 rounded-md text-sm font-medium">
            <span className="p-1">
              <Briefcase />
            </span>
            <span className="ml-1">Experience</span>
          </button>
          <button
            onClick={handleBlock}
            className="p-2 border text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Plus className="w-5 h-5" />
            {isOpen && <AddBlock />}
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
            <WandSparkles />
          </span>
          <span className="ml-1">Save Changes</span>
        </button>
      </div>
    </div>
  );
}
