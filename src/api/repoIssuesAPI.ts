const baseURL = "https://api.github.com/repos/";
const apiToken = process.env.REACT_APP_API_TOKEN;

export const getRepo = async (url: string) => {
  const response = await fetch(
    `${
      baseURL + url.split(`/`)[3] + `/` + url.split("/")[4]
    }/issues?per_page=100&state=all`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${apiToken}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => [
      data
        .filter((item: any) => !item.pull_request)
        .map((item: any) => ({
          title: item.title,
          issueNumber: item.number,
          openedAtTimestamp: item.created_at,
          user: item.user.login,
          userLink: item.user.html_url,
          commentsCount: item.comments,
          assignees: item.assignees,
          closedAtTimestamp: item.closed_at,
        })),
      data[0].repository_url,
    ])
    .then(async (result) => {
      const response = await fetch(result[1], {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${apiToken}`,
        },
      }).then((k) => k.json());
      return [
        ...result,
        {
          repoName: response.name,
          repoLink: response.html_url,
          ownerName: response.owner.login,
          ownerLink: response.owner.html_url,
          starsCount: response.stargazers_count,
        },
      ];
    });

  return response;
};
