export interface Entry {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  poster: string;
}

export type NewEntry = Omit<Entry, "id">; // NewEntry is for creating entries
