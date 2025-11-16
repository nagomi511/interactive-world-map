'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, Calendar, MapPin } from 'lucide-react'
import type { Story } from '@/app/page'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface WorldMapProps {
  onSelectPeople: (id: string) => void
  onOpenStoryForm: () => void
  onOpenEventForm: () => void
  onOpenContactForm: () => void
  stories: Story[]
  showStoryPins: boolean
  onToggleStoryPins: () => void
}

function latLngToPosition(lat: number, lng: number) {
  // Simple Mercator projection approximation
  const x = ((lng + 180) / 360) * 100
  const y = ((90 - lat) / 180) * 100
  return { x, y }
}

export function WorldMap({ 
  onSelectPeople, 
  onOpenStoryForm, 
  onOpenEventForm, 
  onOpenContactForm,
  stories,
  showStoryPins,
  onToggleStoryPins
}: WorldMapProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)

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

      {showStoryPins && stories.map((story) => {
        const position = latLngToPosition(story.latitude, story.longitude)
        return (
          <button
            key={story.id}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onClick={() => setSelectedStory(story)}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              <div className="relative w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm border-2 border-primary flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </button>
        )
      })}

      <div className="absolute right-6 top-6 z-20 flex flex-col gap-3">
        <Button
          size="sm"
          onClick={onToggleStoryPins}
          className={`${
            showStoryPins 
              ? 'bg-primary hover:bg-primary/90' 
              : 'bg-primary/80 hover:bg-primary'
          } backdrop-blur-sm shadow-lg`}
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

      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
            <DialogTitle className="text-2xl font-bold">{selectedStory?.title}</DialogTitle>
            <DialogDescription>
              {selectedStory?.shortDescription}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{selectedStory?.location}</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Submitted by</h3>
                <p className="text-muted-foreground">
                  {selectedStory?.firstName} {selectedStory?.lastName}
                </p>
              </div>

              {selectedStory?.videoUrl && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Video</h3>
                  <a 
                    href={selectedStory.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              )}

              {selectedStory?.story && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Story</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedStory.story}
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-foreground pt-4">
                Posted on {selectedStory?.createdAt.toLocaleDateString()}
              </div>
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t border-border shrink-0">
            <Button onClick={() => setSelectedStory(null)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
