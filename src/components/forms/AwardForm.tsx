"use client";

import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";

const schema = z.object({
  award: z.string().min(1, { message: "Award is required" }),
  issuedBy: z.string().optional(),
  date: z
    .string().optional(),
    description:z.string().optional()
});

type FormData = z.infer<typeof schema>;

interface CourseFormProps {
  onClose: () => void;
}

export default function AwardForm({ onClose }: CourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);

  
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    onClose();
    // Handle form submission logic here, e.g., send data to the server or update state
  };

  const handleUrlSubmit = (url: string) => {
    setEnteredUrl(url);
    setIsUrlFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-1 bg-white p-2 rounded-lg "
      >
        <div className="space-y-1">
          <Label htmlFor="award" className="text-sm font-semibold text-black">
            Award Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="award"
              {...register("award")}
              className="flex-grow border-gray-300"
              placeholder="Enter award title"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsUrlFormOpen(true)}
              className="px-3 py-2 h-10 border-orange-300 text-orange-500 hover:bg-orange-50"
            >
              <LinkIcon className="h-4 w-4" />
              <span className="ml-2">Add Link</span>
            </Button>
          </div>
          {errors.award && (
            <p className="text-red-500 text-sm">{errors.award.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="issuedBy" className="text-sm font-semibold text-black">
            Issued By
          </Label>
          <Input
            id="issuedBy"
            {...register("issuedBy")}
            className="border-gray-300"
            placeholder="Enter Institution"
          />
         
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <Label
              htmlFor="date"
             className="text-sm font-semibold text-black"
            >
              Date
            </Label>
            <div className="relative">
              <Input
                id="date"
                {...register("date")}
                className="border-gray-300"
                placeholder="MM/YYYY"
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
           className="text-sm font-semibold text-black"
          >
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            className="border-gray-300 h-20 "
            placeholder="Type Here..."
          />
        </div>

        <div className="flex justify-end mt-1">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save
          </Button>
        </div>
      </form>

      <UrlForm
        isOpen={isUrlFormOpen}
        onClose={() => setIsUrlFormOpen(false)}
        onSave={handleUrlSubmit}
      />
    </>
  );
}
