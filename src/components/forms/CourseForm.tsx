"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";
import { DatePicker } from "@/lib/DatePicker";
import { format } from "date-fns";


const schema = z.object({
  course: z.string().min(1, { message: "Degree is required" }),
  school: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  startDate: z
    .string().optional(),
  endDate: z
    .string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CourseFormProps {
  onClose: () => void;
}

export default function CourseForm({ onClose }: CourseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isCurrentDate, setIsCurrentDate] = useState(false);
  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>();
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

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    onClose();
    // Handle form submission logic here, e.g., send data to the server or update state
  };
  const handleCurrentDateChange = (checked: boolean) => {
    setIsCurrentDate(checked);
    if (checked) {
      const currentDate = new Date();
      setSelectedEndDate(currentDate);
      const formattedDate = `${String(currentDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${currentDate.getFullYear()}`;
      setValue("endDate", formattedDate);
    }
  };
  console.log(enteredUrl);

  const handleUrlSubmit = (url: string) => {
    setEnteredUrl(url);
    setIsUrlFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white  rounded-lg "
      >
        <div className="space-y-1">
          <Label htmlFor="course" className="text-sm font-semibold text-black">
            Course Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="course"
              {...register("course")}
              className="flex-grow border-gray-300"
              placeholder="Enter course title"
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
          {errors.course && (
            <p className="text-red-500 text-sm">{errors.course.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="school" className="text-sm font-semibold text-black">
            Institution
          </Label>
          <Input
            id="school"
            {...register("school")}
            className="border-gray-300"
            placeholder="Enter Institution"
          />
         
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="city" className="text-sm font-semibold text-black">
              City
            </Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-gray-300">
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

          <div className="space-y-1">
            <Label
              htmlFor="country"
              className="text-sm font-semibold text-black"
            >
              Country
            </Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-gray-300">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              htmlFor="startDate"
              className="text-sm font-semibold text-black"
            >
              Start Date
            </Label>
            <div className="relative">
              <Input
                id="startDate"
                {...register("startDate")}
                value={selectedStartDate ? format(selectedStartDate, "MM-yyyy") : ""}
                className="border-gray-300"
                placeholder="MM/YYYY"
                onChange={(e) => setSelectedStartDate(new Date(e.target.value))}
              />
              <DatePicker
              selectedDate={selectedStartDate}
              onDateChange={(date) => handleDateChange("startDate", date)}
            />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="endDate"
            className="text-sm font-semibold text-black"
            >
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={isCurrentDate}
                onCheckedChange={handleCurrentDateChange}
                className="border-gray-300 text-orange-500"
              />
              <Label
                htmlFor="current"
                className="text-sm font-medium text-gray-700"
              >
                Present (Current)
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="description"
            className="text-sm font-semibold text-black"
          >
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            className="border-gray-300 h-20"
            placeholder="Type Here..."
          />
        </div>

        <div className="flex justify-end mt-2">
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
