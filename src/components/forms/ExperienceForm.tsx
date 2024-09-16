"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X } from "lucide-react";
import { DatePicker } from "@/lib/DatePicker";
import { format } from "date-fns";

// Define validation schema
const schema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  type: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.string().optional(),
  present: z.boolean().optional(),
  skills: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof schema>;
interface ExperienceFormProps {
  onClose: () => void;
}
export default function ExperienceForm({ onClose }: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: ["Figma", "Maze", "Adobe XD"],
    },
  });

  const [skills, setSkills] = useState(["Figma", "Maze", "Adobe XD"]);
  const [isCurrentDate, setIsCurrentDate] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | undefined
  >();
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>();

  const handleDateChange = (field: "startDate" | "endDate", date: Date) => {
    const formattedDate = format(date, "MM-yyyy");
    setValue(field, formattedDate);
    if (field === "startDate") {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleCurrentDateChange = (checked: boolean) => {
    setIsCurrentDate(checked);
    if (checked) {
      const currentDate = new Date();
      setSelectedEndDate(currentDate);
      setValue("endDate", undefined);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    onClose();
    // Handle form submission logic here, e.g., send data to the server or update state
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-1 rounded-lg">
      <div className="space-y-1">
        <Label htmlFor="company" className="font-semibold text-black">
          Company Name<span className="text-red-500">*</span>
        </Label>
        <Input
          id="company"
          {...register("company")}
          placeholder="Enter company name"
        />
        {errors.company && (
          <p className="text-red-500 text-sm">{errors.company.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex-grow space-y-1">
          <Label htmlFor="title" className="font-semibold text-black">
            Title<span className="text-red-500">*</span>
          </Label>
          <Input id="title" {...register("title")} placeholder="Type Here..." />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="w-1/3 space-y-1">
          <Label htmlFor="type" className="font-semibold text-black">
            Type
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Full Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-1/2 space-y-1">
          <Label htmlFor="city" className="font-semibold text-black">
            City
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="w-1/2 space-y-1">
          <Label htmlFor="country" className="font-semibold text-black">
            Country
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-1/2 space-y-1">
          <Label htmlFor="startDate" className="font-semibold text-black">
            Start Date
          </Label>
          <div className="relative">
            <Input
              id="startDate"
              {...register("startDate")}
              value={
                selectedStartDate ? format(selectedStartDate, "MM-yyyy") : ""
              }
              className="border-gray-300"
              placeholder="MM/YYYY"
              onChange={(e) => setSelectedStartDate(new Date(e.target.value))}
            />
            <DatePicker
              selectedDate={selectedStartDate}
              onDateChange={(date) => handleDateChange("startDate", date)}
            />
            {/* <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
          </div>
        </div>
        <div className="w-1/2 space-y-1">
          <Label htmlFor="endDate" className="font-semibold text-black">
            End Date
          </Label>
          <div className="relative">
            <Input
              id="endDate"
              {...register("endDate")}
              className="border-gray-300"
              value={selectedEndDate ? format(selectedEndDate, "MM-yyyy") : ""}
              placeholder="MM/YYYY"
              disabled={isCurrentDate}
              onChange={(e) => setSelectedEndDate(new Date(e.target.value))}
            />
            <DatePicker
              selectedDate={selectedEndDate}
              onDateChange={(date) => handleDateChange("endDate", date)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="present"
              checked={isCurrentDate}
              onCheckedChange={handleCurrentDateChange}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <Label htmlFor="present" className="text-sm text-gray-600">
              Present (Current)
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="skills" className="font-semibold text-black">
          Skills Used
        </Label>
        <div className="flex flex-wrap gap-2 border rounded-md p-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center"
        >
          <Check className="mr-2" size={16} />{" "}
          Save
        </Button>
      </div>
    </form>
  );
}
