'use client'

import { useState } from 'react'
import { WorldMap } from '@/components/world-map'
import { InfoModal } from '@/components/info-modal'
import { StoryForm } from '@/components/story-form'
import { EventForm } from '@/components/event-form'
import { ContactForm } from '@/components/contact-form'
import { CultureCompassHeader } from '@/components/culture-compass-header'
import { HeroSection } from '@/components/hero-section'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, Users } from 'lucide-react'

export interface Story {
  id: string
  firstName: string
  lastName: string
  location: string
  latitude: number
  longitude: number
  title: string
  shortDescription: string
  story: string
  videoUrl?: string
  createdAt: Date
}

export interface Event {
  id: string
  eventName: string
  hostName: string
  eventDate: string
  eventLocation: string
  latitude: number
  longitude: number
  shortDescription: string
  eventUrl: string
  createdAt: Date
}

export interface Person {
  id: string
  firstName: string
  lastName: string
  pronouns: string
  heritageLocation: string
  latitude: number
  longitude: number
  userDescription: string
  contactInfo?: string
  createdAt: Date
}

export default function Home() {
  const [selectedPeople, setSelectedPeople] = useState<string | null>(null)
  const [storyFormOpen, setStoryFormOpen] = useState(false)
  const [eventFormOpen, setEventFormOpen] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const [showStoryPins, setShowStoryPins] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [showEventPins, setShowEventPins] = useState(false)
  const [people, setPeople] = useState<Person[]>([])
  const [showPeoplePins, setShowPeoplePins] = useState(false)

  const handleAddStory = (story: Omit<Story, 'id' | 'createdAt'>) => {
    const newStory: Story = {
      ...story,
      id: `story-${Date.now()}`,
      createdAt: new Date(),
    }
    setStories([...stories, newStory])
    console.log('[v0] New story added:', newStory)
  }

  const handleAddEvent = (event: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...event,
      id: `event-${Date.now()}`,
      createdAt: new Date(),
    }
    setEvents([...events, newEvent])
    console.log('[v0] New event added:', newEvent)
  }

  const handleAddPerson = (person: Omit<Person, 'id' | 'createdAt'>) => {
    const newPerson: Person = {
      ...person,
      id: `person-${Date.now()}`,
      createdAt: new Date(),
    }
    setPeople([...people, newPerson])
    console.log('[v0] New person added:', newPerson)
  }

  return (
    <main className="min-h-screen bg-background">
      <CultureCompassHeader />
      <HeroSection />
      
      <header className="bg-gradient-to-b from-background/95 to-background/0 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            WorldMap
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setStoryFormOpen(true)}
              variant="default"
              size="default"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Stories
            </Button>
            <Button
              onClick={() => setEventFormOpen(true)}
              variant="default"
              size="default"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </Button>
            <Button
              onClick={() => setContactFormOpen(true)}
              variant="default"
              size="default"
            >
              <Users className="mr-2 h-4 w-4" />
              People
            </Button>
          </div>
        </div>
      </header>

      <WorldMap
        onSelectPeople={setSelectedPeople}
        onOpenStoryForm={() => setStoryFormOpen(true)}
        onOpenEventForm={() => setEventFormOpen(true)}
        onOpenContactForm={() => setContactFormOpen(true)}
        stories={stories}
        showStoryPins={showStoryPins}
        onToggleStoryPins={() => setShowStoryPins(!showStoryPins)}
        events={events}
        showEventPins={showEventPins}
        onToggleEventPins={() => setShowEventPins(!showEventPins)}
        people={people}
        showPeoplePins={showPeoplePins}
        onTogglePeoplePins={() => setShowPeoplePins(!showPeoplePins)}
      />

      <InfoModal
        peopleId={selectedPeople}
        open={!!selectedPeople}
        onOpenChange={(open) => !open && setSelectedPeople(null)}
      />

      <StoryForm 
        open={storyFormOpen} 
        onOpenChange={setStoryFormOpen}
        onSubmit={handleAddStory}
      />
      <EventForm 
        open={eventFormOpen} 
        onOpenChange={setEventFormOpen}
        onSubmit={handleAddEvent}
      />
      <ContactForm 
        open={contactFormOpen} 
        onOpenChange={setContactFormOpen}
        onSubmit={handleAddPerson}
      />
    </main>
  )
}
