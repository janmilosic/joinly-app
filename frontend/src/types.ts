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

export interface ProfileEvent {
  id: string;
  title: string;
  startsAt: string;
  locationName: string;
  categoryName: string;
}

export interface Profile {
  displayName: string;
  email: string;
  createdAt: string;
  upcoming: ProfileEvent[];
  history: ProfileEvent[];
  organized: ProfileEvent[];
}