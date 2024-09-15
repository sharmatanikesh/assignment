"use client";

import { useForm,} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";
import { DatePicker } from "@/lib/DatePicker";
import { format } from "date-fns";

const schema = z.object({
  certificate: z.string().min(1, { message: "Certificate is required" }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CertificateFormProps{
  onClose:()=>void
}
export default function CertificateForm({ onClose }: CertificateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isNoExpiry, setIsNoExpiry] = useState(false);
  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [enteredUrl, setEnteredUrl] = useState<string | null>(null);


  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>();

  const handleCurrentDateChange = (checked: boolean) => {
    setIsNoExpiry(checked);
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

  const handleUrlSubmit = (url: string) => {
    setEnteredUrl(url);
    setIsUrlFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-1 bg-white p-1 rounded-lg "
      >
        <div className="space-y-2">
          <Label htmlFor="certificate" className="text-sm font-semibold text-black">
            Certificate<span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="certificate"
              {...register("certificate")}
              className="flex-grow border-gray-300"
              placeholder="Enter certificate name"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsUrlFormOpen(true)}
              className="px-3 py-2 h-10 border-orange-300 text-orange-500 hover:bg-orange-50"
            >
              <LinkIcon className="h-4 w-4" />
              <span className="ml-2">View Link</span>
            </Button>
          </div>
          {errors.certificate && (
            <p className="text-red-500 text-sm">{errors.certificate.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
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
          </div>

          <div className="space-y-2">
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
                value={selectedEndDate ? format(selectedEndDate, "MM-yyyy") : ""}
                className="border-gray-300 "
                placeholder="MM/YYYY"
                disabled={isNoExpiry}
                onChange={(e) => setSelectedEndDate(new Date(e.target.value))}
              />
              <DatePicker
              selectedDate={selectedEndDate}
              onDateChange={(date) => handleDateChange("endDate", date)}
            />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="noExpiry"
                checked={isNoExpiry}
                onCheckedChange={handleCurrentDateChange}
                className="border-gray-300 text-orange-500"
              />
              <Label
                htmlFor="noExpiry"
                className="text-sm font-medium text-black"
              >
                No Expiry
              </Label>
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
            className="border-gray-300 h-24"
            placeholder="Type Here..."
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 mt-1 text-white"
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
