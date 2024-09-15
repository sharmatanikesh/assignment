import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { PlusIcon, BookOpenIcon, GraduationCapIcon } from 'lucide-react'

export default function Component() {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleClose = () => {
    setIsMainDialogOpen(false)
    setSelectedOption(null)
  }

  return (
    <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedOption ? `Add ${selectedOption}` : 'Add Block'}</DialogTitle>
        </DialogHeader>
        {!selectedOption ? (
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleOptionSelect('Education')}>
              <GraduationCapIcon className="mr-2 h-4 w-4" />
              Education
            </Button>
            <Button variant="outline" onClick={() => handleOptionSelect('Course')}>
              <BookOpenIcon className="mr-2 h-4 w-4" />
              Course
            </Button>
            {/* Add more options as needed */}
          </div>
        ) : selectedOption === 'Education' ? (
          <form className="space-y-4">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
              <Input id="degree" placeholder="Enter field of study" />
            </div>
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
              <Input id="school" placeholder="Enter school / university" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <Select>
                  <option>Select</option>
                  {/* Add city options */}
                </Select>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <Select>
                  <option>Select</option>
                  {/* Add country options */}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <Input id="startDate" placeholder="MM/YYYY" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <Input id="endDate" placeholder="MM/YYYY" />
              </div>
            </div>
            <Button type="submit" className="w-full">Save</Button>
          </form>
        ) : (
          <div>
            {/* Add forms for other options here */}
            <p>Form for {selectedOption}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}