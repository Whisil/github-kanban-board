const apiToken = process.env.REACT_APP_API_TOKEN;

export const getRepoInfo = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${apiToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => ({
      repoName: data.name,
      repoLink: data.html_url,
      ownerName: data.owner.login,
      ownerLink: data.owner.html_url,
      starsCount: data.stargazers_count,
    }));

  return response;
};
