const baseURL = "https://api.github.com/repos/";
const apiToken = process.env.REACT_APP_API_TOKEN;

export const getIssues = async (url: string) => {
  const response = await fetch(
    `${
      baseURL + url.split(`/`)[3] + `/` + url.split("/")[4]
    }/issues?per_page=60`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${apiToken}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) =>
      data
        .filter((item: any) => !item.pull_request)
        .map((item: any) => ({
          title: item.title,
          issueNumber: item.number,
          openedTimestamp: item.created_at,
          user: item.user.login,
          userLink: item.user.html_url,
          commentsCount: item.comments,
          repoApiUrl: item.repository_url,
        }))
    );

  return response;
};
