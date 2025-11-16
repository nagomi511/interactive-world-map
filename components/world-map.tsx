'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle, Users, BookOpen, Calendar } from 'lucide-react'

interface WorldMapProps {
  onSelectPeople: (id: string) => void
  onOpenStoryForm: () => void
  onOpenEventForm: () => void
  onOpenContactForm: () => void
}

const indigenousPeoples = [
  {
    id: 'ainu',
    name: 'Ainu People',
    region: 'Hokkaido, Japan',
    position: { x: 82, y: 32 },
  },
  {
    id: 'maori',
    name: 'Māori People',
    region: 'New Zealand',
    position: { x: 92, y: 82 },
  },
  {
    id: 'navajo',
    name: 'Navajo Nation',
    region: 'Southwestern United States',
    position: { x: 18, y: 33 },
  },
  {
    id: 'sami',
    name: 'Sámi People',
    region: 'Northern Europe',
    position: { x: 52, y: 18 },
  },
  {
    id: 'aboriginal',
    name: 'Aboriginal Australians',
    region: 'Australia',
    position: { x: 84, y: 72 },
  },
  {
    id: 'inuit',
    name: 'Inuit',
    region: 'Arctic Region',
    position: { x: 28, y: 12 },
  },
  {
    id: 'maya',
    name: 'Maya People',
    region: 'Mexico & Central America',
    position: { x: 20, y: 42 },
  },
  {
    id: 'masai',
    name: 'Maasai People',
    region: 'East Africa',
    position: { x: 56, y: 58 },
  },
  {
    id: 'karen',
    name: 'Karen People',
    region: 'Thailand & Myanmar',
    position: { x: 74, y: 44 },
  },
  {
    id: 'quechua',
    name: 'Quechua People',
    region: 'Andes Mountains',
    position: { x: 26, y: 62 },
  },
]

export function WorldMap({ onSelectPeople, onOpenStoryForm, onOpenEventForm, onOpenContactForm }: WorldMapProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Map background - full width */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/world-map-silhouette-dark-minimalist.jpg"
            alt="World Map"
            className="h-full w-full object-cover mix-blend-soft-light"
          />
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Indigenous peoples markers */}

      <div className="absolute right-6 top-6 z-20 flex flex-col gap-3">
        <Button
          size="sm"
          onClick={onOpenStoryForm}
          className="bg-primary/80 hover:bg-primary backdrop-blur-sm shadow-lg"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Show1
        </Button>
        <Button
          size="sm"
          onClick={onOpenEventForm}
          className="bg-primary/80 hover:bg-primary backdrop-blur-sm shadow-lg"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Show2
        </Button>
        <Button
          size="sm"
          onClick={onOpenContactForm}
          className="bg-primary/80 hover:bg-primary backdrop-blur-sm shadow-lg"
        >
          <Users className="mr-2 h-4 w-4" />
          Show3
        </Button>
      </div>
    </div>
  )
}
