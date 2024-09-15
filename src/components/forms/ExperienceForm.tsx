'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Define validation schema
const schema = z.object({
  company: z.string().min(1, { message: 'Company name is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  startDate: z.date(),
  endDate: z.date().optional(),
  present: z.boolean(),
  skills: z.array(z.string()).nonempty({ message: 'At least one skill is required' }),
});

type FormData = z.infer<typeof schema>;
interface ExperienceFormProps{
  onClose:()=>void
}
export default function ExperienceForm({onClose}:ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: ['Figma', 'Maze', 'Adobe XD'],
    },
  });

  const [skills, setSkills] = useState(['Figma', 'Maze', 'Adobe XD']);
  const [isCurrentDate, setIsCurrentDate] = useState(false);

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleCurrentDateChange = (checked: boolean) => {
    setIsCurrentDate(checked);
    if (checked) {
      setValue('endDate', undefined);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    onClose();
    // Handle form submission logic here, e.g., send data to the server or update state
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="company">Company Name<span className="text-red-500">*</span></Label>
          <Input id="company" {...register('company')} placeholder="Enter company name" />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        <div className="flex gap-2">
          <div className="flex-grow space-y-2">
            <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
            <Input id="title" {...register('title')} placeholder="Type Here..." />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="w-1/3 space-y-2">
            <Label htmlFor="type">Type</Label>
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
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2 space-y-2">
            <Label htmlFor="city">City</Label>
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
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
          <div className="w-1/2 space-y-2">
            <Label htmlFor="country">Country</Label>
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
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2 space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>
          <div className="w-1/2 space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isCurrentDate}
                    >
                      {field.value ? (
                        format(field.value, "MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
            <div className="flex items-center gap-2">
              <Checkbox
                id="present"
                checked={isCurrentDate}
                onCheckedChange={handleCurrentDateChange}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <Label htmlFor="present" className="text-sm text-gray-600">Present (Current)</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills Used</Label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-1 text-gray-500 hover:text-gray-700">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
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
    </div>
  );
}