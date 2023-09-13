"use strict";

const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const country = "us";
let page = 1;
let totalResults = 0;

async function fetchData() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${
        currentUser.category || "general"
      }&pageSize=${
        currentUser.pageSize || 5
      }&page=${page}&apiKey=620e0ff2fb314212a3772524cda20813`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // process the data

    showData(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();

async function showData(data) {
  totalResults = data.totalResults;

  // if page number = 1 then prevBtn is hidden
  if (Number(pageNum.textContent) == 1) {
    prevBtn.style.display = "none";
  } else prevBtn.style.display = "block";

  // ex: if totalResults = 37, pageNum = 5
  // then 33 / 5 = 6.6 => Math.ceil(6.6) = 7
  // => pageSize = 7
  if (
    Math.ceil(totalResults / currentUser.pageSize) ===
    Number(pageNum.textContent)
  ) {
    nextBtn.style.display = "none";
  } else nextBtn.style.display = "block";

  let newsHtml = "";

  data.articles.forEach((element) => {
    newsHtml += `
    <div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${element.urlToImage}"
									class="card-img"
									>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${element.title}</h5>
									<p class="card-text">${element.description}</p>
									<a href="${element.url}" target="_blank"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
    `;
    document.getElementById("news-container").innerHTML = newsHtml;
  });
}

nextBtn.addEventListener("click", function () {
  page++;
  pageNum.textContent = page;
  fetchData();
});

prevBtn.addEventListener("click", function () {
  page--;
  pageNum.textContent = page;
  fetchData();
});
