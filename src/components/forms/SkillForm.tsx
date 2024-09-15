"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";

const schema = z.object({
  skills: z.array(
    z.object({
      degree: z.string().min(1, { message: "Skill is required" }),
      level: z.string().min(1, { message: "Level is required" }),
    })
  ),
});

type FormData = z.infer<typeof schema>;

interface EducationFormProps {
  onClose: () => void;
}

export default function SkillForm({ onClose }: EducationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [{ degree: "", level: "" }], // Initialize with one skill entry
    },
  });

  const { fields, append } = useFieldArray({
    name: "skills",
    control,
  });

  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);
  console.log(enteredUrl);

  const handleUrlSubmit = (url: string) => {
    setEnteredUrl(url);
    setIsUrlFormOpen(false);
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    onClose();
    // Handle form submission logic here, e.g., send data to the server or update state
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white  rounded-lg "
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2 mb-2">
            <div className="flex-grow flex flex-col">
              <Label htmlFor={`skills.${index}.degree`} className="text-sm truncate font-semibold text-black">
                Add Skill<span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center">
                <Input
                  id={`skills.${index}.degree`}
                  {...register(`skills.${index}.degree` as const)}
                  className="border-gray-300 flex-grow "
                  placeholder="Enter soft or hard skill"
                />
                {errors.skills?.[index]?.degree && (
                  <p className="text-red-500 text-sm ml-2">{errors.skills[index].degree.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Controller
                name={`skills.${index}.level` as const}
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={`skills.${index}.level`}>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="level1">Level 1</SelectItem>
                      <SelectItem value="level2">Level 2</SelectItem>
                      <SelectItem value="level3">Level 3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsUrlFormOpen(true)}
                className="px-3 py-2 h-10 border-orange-300 text-orange-500 hover:bg-orange-50"
              >
                <LinkIcon className="h-3 w-3" />
                <span className="ml-2">Add Link</span>
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-center py-1">
          <span
            onClick={() => append({ degree: "", level: "" })}
            className="text-orange-500 cursor-pointer"
          >
            + Add More
          </span>
        </div>

        <div className="flex justify-end pt-1">
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
