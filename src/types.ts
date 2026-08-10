export type UniversityType = 'Private' | 'Government' | 'Semi-Government';
export type IsAutonomous = 'Yes' | 'No';

export interface BranchFee {
  branch_name: string;
  tuition_fee: number;
  development_fee: number;
  total_fee: number;
  seats: number;
}

export interface CutoffEntry {
  branch: string;
  category: 'GOPEN' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'TFWS';
  round1_percentile: number;
  round2_percentile: number;
  round3_percentile: number;
}

export interface College {
  id: number;
  collage_name: string;
  state: string;
  district: string;
  branch: string;
  fees: number;
  ranking: number;
  address: string;
  placement: string;
  image: string;
  merit_list_pdf: string;
  university_type: UniversityType;
  is_autonomous: IsAutonomous;
  gallery_images: string[];
  description?: string;
  established_year?: number;
  accreditation?: string;
  highest_package?: string;
  average_package?: string;
  facilities?: string[];
  cutoff_general?: number;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  branch_fees_list?: BranchFee[];
  cutoff_list?: CutoffEntry[];
}

export interface StudentDocument {
  id: string;
  name: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  fileDataUrl: string;
}

export interface FilterState {
  searchQuery: string;
  selectedState: string;
  selectedDistrict: string;
  selectedBranch: string;
  universityType: string;
  isAutonomous: string;
  maxFees: number;
  sortBy: 'ranking_asc' | 'ranking_desc' | 'fees_low' | 'fees_high' | 'name_asc' | 'est_year_desc' | 'est_year_asc';
}

export type ActivePage = 'login' | 'main' | 'college_detail' | 'profile' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  preferredBranch: string;
  currentPercentile: number;
  savedCollegeIds: number[];
  applicationsSubmitted: number;
  avatarUrl: string;
}
