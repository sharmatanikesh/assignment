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
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";

const schema = z.object({
  skills: z.array(
    z.object({
      degree: z.string().min(1, { message: "Language is required" }),
      level: z.string().min(1, { message: "Level is required" }),
    })
  ),
});

type FormData = z.infer<typeof schema>;

interface EducationFormProps {
  onSubmit: (data: FormData) => void;
}

export default function LanguageForm({ onSubmit }: EducationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [{ degree: "", level: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "skills",
    control,
  });

  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);

  const handleUrlSubmit = (url: string) => {
    setEnteredUrl(url);
    setIsUrlFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-4 rounded-lg shadow-sm"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 mb-4">
            {/* Language Input Field with more width */}
            <div className="w-3/4 flex flex-col">
              <Label
                htmlFor={`skills.${index}.degree`}
                className="text-sm font-medium text-gray-700"
              >
                Add Language<span className="text-red-500">*</span>
              </Label>
              <Input
                id={`skills.${index}.degree`}
                {...register(`skills.${index}.degree` as const)}
                className="border-gray-300"
                placeholder="Enter language"
              />
              {errors.skills?.[index]?.degree && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skills[index].degree.message}
                </p>
              )}
            </div>

            {/* Level Select Field */}
            <div className="w-1/4 flex flex-col">
              <Label
                htmlFor={`skills.${index}.level`}
                className="text-sm font-medium text-gray-700"
              >
                Level<span className="text-red-500">*</span>
              </Label>
              <Controller
                name={`skills.${index}.level` as const}
                control={control}
                render={({ field }) => (
                  <>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id={`skills.${index}.level`}>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="level1">Level 1</SelectItem>
                        <SelectItem value="level2">Level 2</SelectItem>
                        <SelectItem value="level3">Level 3</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.skills?.[index]?.level && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.skills[index].level.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center py-2">
          <span
            onClick={() => append({ degree: "", level: "" })}
            className="text-orange-500 cursor-pointer"
          >
            + Add More
          </span>
        </div>

        <div className="flex justify-end pt-2">
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
