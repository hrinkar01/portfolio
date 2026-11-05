import prData from "./pullRequests.json";

export interface PullRequest {
  id: string;
  number: number;
  repo: string;
  repoUrl: string;
  subsystem?: string;
  title: string;
  url: string;
  status: "approved" | "merged" | "open" | "under_review" | "closed";
  date: string;
  forge: "ForkMesh" | "GitHub OWASP";
}

export const PULL_REQUESTS: PullRequest[] = prData as PullRequest[];
