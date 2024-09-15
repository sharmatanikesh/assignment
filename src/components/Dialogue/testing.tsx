import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import ExperienceForm from '../forms/ExperienceForm'

type BlockOption = {
  icon: React.ReactNode
  label: string
}

const blockOptions: BlockOption[] = [
  { icon: <span className="text-xl">👤</span>, label: 'About' },
  { icon: <span className="text-xl">💼</span>, label: 'Professional Experience' },
  { icon: <span className="text-xl">🎓</span>, label: 'Education' },
  { icon: <span className="text-xl">🏗️</span>, label: 'Projects' },
  { icon: <span className="text-xl">🛠️</span>, label: 'Skill' },
  { icon: <span className="text-xl">📚</span>, label: 'Course' },
  { icon: <span className="text-xl">🏆</span>, label: 'Award' },
  { icon: <span className="text-xl">📜</span>, label: 'Certificate' },
  { icon: <span className="text-xl">🗣️</span>, label: 'Language' },
  { icon: <span className="text-xl">🌟</span>, label: 'Interest' },
  { icon: <span className="text-xl">📞</span>, label: 'Contact' },
  { icon: <span className="text-xl">🔧</span>, label: 'Custom' },
]

export default function AddBlockDialog() {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  const handleBlockClick = (label: string) => {
    setSelectedBlock(label)
  }

  const handleClose = () => {
    setIsMainDialogOpen(false)
    setSelectedBlock(null)
  }

  return (
    <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="text-xl">+</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-900 shadow-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedBlock ? `Add ${selectedBlock}` : 'Add Block'}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <hr className="border-t border-gray-300" />
        {!selectedBlock ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {blockOptions.map((option) => (
              <Button
                key={option.label}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleBlockClick(option.label)}
              >
                {option.icon}
                <span className="mt-2 text-sm">{option.label}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4">
            {selectedBlock.toLowerCase().includes("experience") && <ExperienceForm />}
            {/* Add more conditions for other block types */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}