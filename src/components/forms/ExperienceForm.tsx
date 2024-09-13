'use client'

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

// Define validation schema
const schema = z.object({
  company: z.string().min(1, { message: 'Company name is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  startDate: z.string().regex(/^\d{2}\/\d{4}$/, { message: 'Date must be in MM/YYYY format' }),
  endDate: z.string().regex(/^\d{2}\/\d{4}$/, { message: 'Date must be in MM/YYYY format' }),
  present: z.boolean(),
  skills: z.array(z.string()).nonempty({ message: 'At least one skill is required' }),
});

type FormData = z.infer<typeof schema>;

interface ExperienceFormProps {
  onSubmit: (data: FormData) => void;
}

export default function ExperienceForm({ onSubmit }: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
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
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
      setValue('endDate', formattedDate);
    } else {
      setValue('endDate', '');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
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
            <Input id="start-date" {...register('startDate')} placeholder="MM/YYYY" />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>
          <div className="w-1/2 space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input id="end-date" {...register('endDate')} placeholder="MM/YYYY" disabled={isCurrentDate} />
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
