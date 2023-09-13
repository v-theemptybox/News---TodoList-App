"use strict";

const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const queryInput = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");

let page = 1;
let totalResults = 0;

async function fetchData() {
  try {
    if (queryInput.value !== "") {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${queryInput.value}&pageSize=${
          currentUser.pageSize || 5
        }&page=${page}&apiKey=620e0ff2fb314212a3772524cda20813`
      );
      if (!response.ok) {
        console.log(response.status);

        // too many requests, dev acc are limited to 100 request over 24h
        if (response.status === 429) {
          console.log("Rate limited, waiting and retrying...");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // try fetchData() again
          return fetchData();
        } else throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // process the data

      console.log(data.totalResults);
      if (data.totalResults == 0) {
        alert(`There are no news containing ${queryInput.value} keyword`);
      }
      showData(data);
    } else
      alert(
        "Too many request, please fill in your information in the search box!"
      );
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

searchBtn.addEventListener("click", function () {
  fetchData();
});

async function showData(data) {
  totalResults = data.totalResults;

  if (Number(pageNum.textContent) == 1) {
    prevBtn.style.display = "none";
  } else prevBtn.style.display = "block";

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
