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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    heritageLocation: '',
    userDescription: '',
    contactInfo: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Contact form submitted:', formData)
    // TODO: Save to database
    onOpenChange(false)
    setFormData({
      firstName: '',
      lastName: '',
      pronouns: '',
      heritageLocation: '',
      userDescription: '',
      contactInfo: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle className="text-2xl font-bold">Create Your Profile</DialogTitle>
          <DialogDescription>
            Share your cultural background and connect with others
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="py-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pronouns">Pronouns *</Label>
              <Select
                value={formData.pronouns}
                onValueChange={(value) => setFormData({ ...formData, pronouns: value })}
              >
                <SelectTrigger id="pronouns">
                  <SelectValue placeholder="Select your pronouns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="he/him">he/him</SelectItem>
                  <SelectItem value="she/her">she/her</SelectItem>
                  <SelectItem value="they/them">they/them</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heritageLocation">Location of Your Heritage *</Label>
              <Input
                id="heritageLocation"
                placeholder="e.g., Inuit, Māori, Maasai, etc."
                required
                value={formData.heritageLocation}
                onChange={(e) => setFormData({ ...formData, heritageLocation: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userDescription">
                Description of Yourself and Your Culture (max 100 words) *
              </Label>
              <Textarea
                id="userDescription"
                rows={6}
                placeholder="Share about yourself and your cultural background..."
                required
                value={formData.userDescription}
                onChange={(e) => setFormData({ ...formData, userDescription: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                {formData.userDescription.split(/\s+/).filter(Boolean).length}/100 words
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information (optional)</Label>
              <Input
                id="contactInfo"
                placeholder="Email, social media, or preferred contact method"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              />
            </div>
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-border shrink-0">
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Create Profile
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
