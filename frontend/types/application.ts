export enum ApplicationStatus {
  Applied = "applied",
  Interview = "interview",
  Offer = "offer",
  Rejected = "rejected",
  FollowedUp = "followed_up",
  TakeHomeAssignment = "take_home_assignment",
  RejectedAfterInterview = "rejected_after_interview",
  Expired = "expired",
}

export interface Application {
  id: number; // Ideally UUID, but basic incrementing number is fine for now.
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
  jobUrl: string;
  salaryRange: string;
  createdAt: string;
  updated_at: string;
}
