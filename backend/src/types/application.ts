export enum ApplicationStatus {
  Applied = "applied",
  Screening = "screening",
  Interview = "interview",
  Offer = "offer",
  Rejected = "rejected",
  FollowedUp = "followedUp",
  TakeHome = "takeHome",
  RejectedAfterInterview = "rejectedAfterInterview",
  Expired = "expired",
  Saved = "saved",
}

export interface Application {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string;
  appliedDate: string;
  jobUrl: string | null;
  salaryRange: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StatusEvent {
  id: string;
  applicationId: string;
  fromStatus: ApplicationStatus | null;
  toStatus: ApplicationStatus;
  createdAt: string;
}
