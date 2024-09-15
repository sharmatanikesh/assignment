"use client";

import { useForm,} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { UrlForm } from "@/components/forms/UrlForm";

const schema = z.object({
  certificate: z.string().min(1, { message: "Certificate is required" }),
  startDate: z
    .string()
    .regex(/^\d{2}\/\d{4}$/, { message: "Date must be in MM/YYYY format" }),
  endDate: z
    .string()
    .regex(/^\d{2}\/\d{4}$/, { message: "Date must be in MM/YYYY format" }),
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

  const handleCurrentDateChange = (checked: boolean) => {
    setIsNoExpiry(checked);
    if (checked) {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${currentDate.getFullYear()}`;
      setValue("endDate", formattedDate);
    }
  };
  console.log(enteredUrl);
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
        className="space-y-1 bg-white p-2 rounded-lg shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="certificate" className="text-sm font-medium text-gray-700">
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
              className="text-sm font-medium text-gray-700"
            >
              Start Date
            </Label>
            <div className="relative">
              <Input
                id="startDate"
                {...register("startDate")}
                className="border-gray-300"
                placeholder="MM/YYYY"
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-700"
            >
              End Date
            </Label>
            <div className="relative">
              <Input
                id="endDate"
                {...register("endDate")}
                className="border-gray-300"
                placeholder="MM/YYYY"
                disabled={isNoExpiry}
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="noExpiry"
                checked={isNoExpiry}
                onCheckedChange={handleCurrentDateChange}
                className="border-gray-300 text-orange-500"
              />
              <Label
                htmlFor="noExpiry"
                className="text-sm font-medium text-gray-700"
              >
                No Expiry
              </Label>
            </div>
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
