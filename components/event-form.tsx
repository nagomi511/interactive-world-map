'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

interface EventFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventForm({ open, onOpenChange }: EventFormProps) {
  const [formData, setFormData] = useState({
    eventName: '',
    hostName: '',
    eventDate: '',
    eventLocation: '',
    shortDescription: '',
    eventUrl: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Event form submitted:', formData)
    // TODO: Save to database and add marker to map
    onOpenChange(false)
    setFormData({
      eventName: '',
      hostName: '',
      eventDate: '',
      eventLocation: '',
      shortDescription: '',
      eventUrl: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle className="text-2xl font-bold">Post a Cultural Event</DialogTitle>
          <DialogDescription>
            Share indigenous cultural events happening around the world
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                required
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostName">Event Host Name *</Label>
              <Input
                id="hostName"
                placeholder="Individual or organization name"
                required
                value={formData.hostName}
                onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input
                id="eventDate"
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventLocation">Event Location *</Label>
              <Input
                id="eventLocation"
                placeholder="City, Country or specific venue"
                required
                value={formData.eventLocation}
                onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                This location will be used to place a marker on the map
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                rows={4}
                placeholder="Briefly describe the event..."
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventUrl">Event Page / Booking URL *</Label>
              <Input
                id="eventUrl"
                type="url"
                placeholder="https://..."
                required
                value={formData.eventUrl}
                onChange={(e) => setFormData({ ...formData, eventUrl: e.target.value })}
              />
            </div>
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-border shrink-0">
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Post Event
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
