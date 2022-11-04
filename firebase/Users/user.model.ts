import { Base } from 'firebase/Base.model';

export interface User extends Base {
  photoURL: any;
  image: any;
  name?: string | null;
  email: string;
  isCoach?: boolean;
  displayName?: string;
  alias?: string | null;
  images: Image[];
  contact?: {
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
  };
  phone?: string;
  medicInformation?: {
    bloodType: string | null;
    considerations: string | null;
  };
  emergencyContact?: {
    name: string | null;
    phone: string | null;
    relationship: string | null;
  };
  birth?: string;
  profileType?: {
    isCoach?: boolean;
    isCompany?: boolean;
    isAthlete?: boolean;
  };
  companyInfo?: CompanyInfo;
}

export interface CompanyInfo{
   email?: string | null;
    phone?: string | null;
    resume?: string | null;
    isVisible?:boolean | null
    name:string
    images?:Image[]
}

interface Image {
  url:string
  metadata?:any
}