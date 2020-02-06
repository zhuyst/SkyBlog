export interface IGithubFullCommitInfo {
  sha: string;
  author: {
    login: string;
    htmlUrl: string;
  };
  commit: {
    message: string;
  };
  htmlUrl: string;
}

export interface IGithubInfo {
  stargazersCount: number;
}
