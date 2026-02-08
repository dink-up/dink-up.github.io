import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/config/routes';

export function CreateEventView() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('8');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Implement event creation
    setTimeout(() => {
      setLoading(false);
      navigate(ROUTES.HOME);
    }, 1000);
  };

  return (
    <PageLayout title="Create Event" showBack showBottomNav={false}>
      <div className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card>
            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4">
              Basic Info
            </h3>
            <div className="space-y-4">
              <Input
                label="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Saturday Morning Pickleball"
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-1.5">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about your event..."
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-600 dark:focus:border-teal-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <Input
                  label="Max Players"
                  type="number"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(e.target.value)}
                  min="2"
                  max="100"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <Input
                  label="End Time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <Button onClick={() => setStep(2)} className="w-full" disabled={!name || !date || !startTime || !endTime}>
                Next: Location
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <Card>
            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-4">
              Location
            </h3>
            <div className="space-y-4">
              <Input
                label="Venue Name"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="Community Center Courts"
                required
              />
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State"
                required
              />
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} loading={loading} className="flex-1" disabled={!venueName || !address}>
                  Create Event
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}