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
  issuedBy: z.string().min(1, { message: "Issued by is required" }),
  date: z
    .string()
    .regex(/^\d{2}\/\d{4}$/, { message: "Date must be in MM/YYYY format" }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CourseFormProps {
  onSubmit: (data: FormData) => void;
}

export default function CourseForm({ onSubmit }: CourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);

  console.log(enteredUrl);

  const handleUrlSubmit = (url: string) => {
    setEnteredUrl(url);
    setIsUrlFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-1 bg-white p-2 rounded-lg shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="award" className="text-sm font-medium text-gray-700">
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

        <div className="space-y-2">
          <Label htmlFor="issuedBy" className="text-sm font-medium text-gray-700">
            Issued By
          </Label>
          <Input
            id="issuedBy"
            {...register("issuedBy")}
            className="border-gray-300"
            placeholder="Enter Institution"
          />
          {errors.issuedBy && (
            <p className="text-red-500 text-sm">{errors.issuedBy.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="date"
              className="text-sm font-medium text-gray-700"
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
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            className="border-gray-300 h-24"
            placeholder="Type Here..."
          />
        </div>

        <div className="flex justify-end">
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
