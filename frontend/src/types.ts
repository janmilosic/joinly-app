export interface EventListItem {
  id: string;
  title: string;
  locationName: string;
  region: string;
  startsAt: string;
  difficulty: string;
  categoryName: string;
  capacity?: number;
  participantCount?: number;
}

export interface EventDetail {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  startsAt: string;
  endsAt: string;
  locationName: string;
  region: string;
  description?: string;
  difficulty?: string;
  organizerName?: string;
  capacity?: number;
  participantCount?: number;
  isOrganizer?: boolean;
  isRegistered?: boolean;
}

export interface EventFormValues {
  title: string;
  description: string;
  categoryId: string;
  locationName: string;
  region: string;
  startsAt: string;
  endsAt: string;
  difficulty: string;
  capacity: string;
}