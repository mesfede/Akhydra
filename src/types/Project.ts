import { FieldValue } from 'firebase/firestore';

export interface Project {
  id?: string;
  title: string;
  location: string;
  mainArea: string;
  description: string;
  mainImage: string;
  gallery: string[];
  details: {
    hidraulica?: string;
    vial?: string;
    ambiental?: string;
  };
  createdAt: any;
  updatedAt: any;
}
