"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";
import { LinkIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const schema = z.object({
  interests: z.array(
    z.object({
      contact: z.string().min(1, { message: "Platform is required" }),
    })
  ),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      interests: [{ contact: "",}],
    },
  });
  const [activeTab, setActiveTab] = useState<"social" | "resume">("social")

  const { fields, append } = useFieldArray({
    name: "interests",
    control,
  });

  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);
  console.log(enteredUrl);

  const [selectedOption, setSelectedOption] = useState<"skillsnap" | "custom" | null>(null);

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
      <div className="flex mb-2">
        <button
          className={`flex-1 py-2 text-sm font-semibold ${
            activeTab === "social"
              ? "text-black border-b-2 border-orange-500"
              : "text-gray-500 border-b border-gray-500"
          }`}
          onClick={() => setActiveTab("social")}
        >
          Social
        </button>
        <button
          className={`flex-1 py-2 text-sm font-semibold ${
            activeTab === "resume"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500 border-b border-gray-500"
          }`}
          onClick={() => setActiveTab("resume")}
        >
          Resume
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-4 rounded-lg shadow-sm"
      >
        {activeTab === "social" && (
          <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 mb-4">
              <div className="w-3/4 flex flex-col">
                <Label
                  htmlFor={`interests.${index}.degree`}
                  className="text-sm font-semibold text-black"
                >
                  Platform<span className="text-red-500">*</span>
                </Label>
                  <Select>
                  <SelectTrigger id="platform" className="w-full border-gray-200 rounded-md mt-1">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
                {errors.interests?.[index]?.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.interests[index].contact.message}
                  </p>
                )}
              </div>
              <div className="w-1/4 flex flex-col">
                <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsUrlFormOpen(true)}
                className=" mt-6  p-2 h-10 border-orange-300 text-orange-500 hover:bg-orange-50"
              >
                <LinkIcon className="h-4 w-4" />
                <span className="ml-2 p-0.5 pr-2">Add Link</span>
              </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-center py-2">
            <span
              onClick={() => append({ contact: ""})}
              className="text-orange-500 cursor-pointer"
            >
              + Add More
            </span>
          </div>
          </div>
        )}

        {activeTab === "resume" && (
          <div className="space-y-4">
            <div
              className={`flex items-center space-x-3 p-4 rounded-lg border ${
                selectedOption === "skillsnap"
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200'
              }`}
            >
              <Checkbox
                id="skillSnapResume"
                checked={selectedOption === "skillsnap"}
                onClick={() => setSelectedOption("skillsnap")}
              />
              <div className="flex-grow">
                <label htmlFor="skillSnapResume" className="text-sm font-medium">
                  SkillSnap Resume
                </label>
                <p className="text-sm text-gray-500">
                  This will use custom ATS-friendly resume generated by SkillSnap
                </p>
              </div>
              <Button
                type="button"
                variant="link"
                className="text-orange-500 font-medium"
              >
                Download
              </Button>
            </div>

            <div
              className={`flex items-center space-x-3 p-4 border rounded-lg ${
                selectedOption === "custom"
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200'
              }`}
            >
              <Checkbox
                id="uploadCustom"
                checked={selectedOption === "custom"}
                onClick={() => setSelectedOption("custom")}
              />
              <div>
                <label htmlFor="uploadCustom" className="text-sm font-medium">
                  Upload Custom
                </label>
                <p className="text-sm text-gray-500">Upload your resume.</p>
              </div>
            </div>
          </div>
        )}


        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="includeContactUs"/>
            <label htmlFor="includeContactUs" className="text-sm text-gray-700">
              Include Contact Us
            </label>
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6">
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
