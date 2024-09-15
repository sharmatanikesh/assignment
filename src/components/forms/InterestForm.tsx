"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";
import { LinkIcon } from "lucide-react";

const schema = z.object({
  interests: z.array(
    z.object({
      interest: z.string().min(1, { message: "Interest is required" }),
    })
  ),
});

type FormData = z.infer<typeof schema>;

interface InterestFormProps {
  onClose: () => void;
}

export default function InterestForm({ onClose }: InterestFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      interests: [{ interest: "",}],
    },
  });

  const { fields, append } = useFieldArray({
    name: "interests",
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
        className="space-y-4 bg-white  rounded-lg "
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 mb-4">
            <div className="w-3/4 flex flex-col">
              <Label
                htmlFor={`interests.${index}.degree`}
                className="text-sm font-semibold text-black"
              >
                Add Interest<span className="text-red-500">*</span>
              </Label>
              <Input
                id={`interests.${index}.degree`}
                {...register(`interests.${index}.interest` as const)}
                className="flex-grow border-gray-300"
                placeholder="Enter Interests/Hobbies"
              />
              {errors.interests?.[index]?.interest && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interests[index].interest.message}
                </p>
              )}
            </div>
            <div className="w-1/4 flex flex-col">
              <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsUrlFormOpen(true)}
              className=" mt-5 px-3 py-2 h-10 border-orange-300 text-orange-500 hover:bg-orange-50"
            >
              <LinkIcon className="h-4 w-4" />
              <span className="ml-2 p-0.5 pr-2">View Link</span>
            </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-center ">
          <span
            onClick={() => append({ interest: ""})}
            className="text-orange-500 cursor-pointer"
          >
            + Add More
          </span>
        </div>

        <div className="flex justify-end ">
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
