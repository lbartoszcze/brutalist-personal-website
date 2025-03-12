export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  tags?: string[];
  createdAt?: string; // Using ISO 8601 string format
  updatedAt?: string;
  published?: boolean;
}

// Add Project type if it doesn't exist
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  technologies: string[];
  imageUrl?: string | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  featured?: boolean;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 