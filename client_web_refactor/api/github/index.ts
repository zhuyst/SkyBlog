import fetch from "isomorphic-fetch";
import { PROJECT_URL } from "@/Constant";
import { checkStatus } from "@/api";

const GITHUB_REQUEST = {
  method: "GET",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
};

export interface IGithubFullCommitInfo {
  sha: string;
  author: {
    login: string;
    html_url: string;
  };
  commit: {
    message: string;
  };
  html_url: string;
}

export async function fetchCommits(perPage: number): Promise<IGithubFullCommitInfo[]> {
  const url = `${PROJECT_URL}/commits?per_page=${perPage}`;
  const response = await fetch(url, GITHUB_REQUEST);
  return checkStatus<IGithubFullCommitInfo[]>(response);
}

export interface IGithubInfo {
  stargazers_count: number;
}

export async function fetchProjectStar(): Promise<IGithubInfo> {
  const response = await fetch(PROJECT_URL, GITHUB_REQUEST);
  return checkStatus<IGithubInfo>(response);
}
