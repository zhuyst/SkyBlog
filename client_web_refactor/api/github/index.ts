import fetch from "isomorphic-fetch";
import { PROJECT_URL } from "@/config";
import { checkStatus } from "@/api";
import { IGithubFullCommitInfo, IGithubInfo } from "@/define/github";

const GITHUB_REQUEST = {
  method: "GET",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
};

export async function fetchCommits(perPage: number): Promise<IGithubFullCommitInfo[]> {
  const url = `${PROJECT_URL}/commits?per_page=${perPage}`;
  const response = await fetch(url, GITHUB_REQUEST);
  return checkStatus<IGithubFullCommitInfo[]>(response);
}

export async function fetchProjectStar(): Promise<IGithubInfo> {
  const response = await fetch(PROJECT_URL, GITHUB_REQUEST);
  return checkStatus<IGithubInfo>(response);
}
