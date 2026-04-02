export enum ApplicationStatus {
  Applied = "applied",
  Interview = "interview",
  Offer = "offer",
  Rejected = "rejected",
  FollowedUp = "followed_up",
  TakeHome = "take_home",
  RejectedAfterInterview = "rejected_after_interview",
  Expired = "expired",
}

export interface Application {
  id: number; // Ideally UUID, but basic incrementing number is fine for now.
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string;
  appliedDate: string;
  jobUrl: string;
  salaryRange: string;
  createdAt: string;
  updated_at: string;
  notes: string;
}
