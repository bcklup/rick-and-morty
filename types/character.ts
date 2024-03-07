export interface Character {
  id: number;
  name: string;
  url?: string;
  created?: string;
  status?: "Dead" | "Alive" | "unknown";
  species?: string;
  type?: string;
  gender?: "Female" | "Male" | "Genderless" | "unknown";
  origin?: { name: string; url: string };
  location?: { name: string; url: string };
  image?: string;
  episode?: string[];
}
