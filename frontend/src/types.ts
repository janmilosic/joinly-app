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