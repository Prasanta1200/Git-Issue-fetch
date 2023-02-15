const pageNumberElement = document.getElementById("page_number");
const issuesListElement = document.getElementById("issues_list");
const loadPrevButton = document.getElementById("load_prev");
const loadNextButton = document.getElementById("load_next");

let currentPage = 1;

const fetchIssues = async (page) => {
  const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`);
  const data = await response.json();
  console.log(data);
  return data;
};

const displayIssues = async (page) => {
  const issues = await fetchIssues(page);
  issuesListElement.innerHTML = "";
  issues.forEach((issue) => {
    const li = document.createElement("li");
    console.log(issue)
    console.log(issue.title)
    li.textContent = issue.title;
    issuesListElement.appendChild(li);
  });
  pageNumberElement.textContent = `Page number ${page}`;
};

loadNextButton.addEventListener("click", async () => {
  currentPage += 1;
  await displayIssues(currentPage);
});

loadPrevButton.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage -= 1;
    await displayIssues(currentPage);
  }
});

displayIssues(currentPage);
