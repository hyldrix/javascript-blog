"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  clickedElement.classList.add("active");

  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  let articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  let targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add("active");
}

function generateTitleLinks(customSelector = "") {
  const titleList = document.querySelector(optTitleListSelector);

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  titleList.innerHTML = "";

  let html = "";
  for (let article of articles) {
    const articleId = article.getAttribute("id");

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    html += linkHTML;
    titleList.innerHTML = html;
  }
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagList = article.querySelector(optArticleTagsSelector);
    let html = "";
    const articleTags = article.getAttribute("data-tags");

    let articleTagsArr = articleTags.split(" ");

    for (let tag of articleTagsArr) {
      let linkHtml = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";

      html += linkHtml;
    }

    tagList.innerHTML = html;
  }
}

generateTags();

function tagClickHandler(event) {
  console.log("Handled!");
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const tag = href.replace("#tag-", "");
  let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let link of activeTagLinks) {
    link.classList.remove("active");
  }
  let allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tag of allTagLinks) {
    tag.classList.add("active");
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll(".post-tags a");
  for (let link of links) {
    link.addEventListener("click", tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const selectedAuthor = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute("data-author");
    selectedAuthor.innerHTML = `<a href="#author-${author}">by ${author}</a>`;
  }
}

generateAuthors();

function addClickListenersToAuthors() {
  const authors = document.querySelectorAll(optArticleAuthorSelector);
  for (let author of authors) {
    let link = author.querySelector("a");
    link.addEventListener("click", authorClickHandler);
  }
}

addClickListenersToAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const author = href.replace("#author-", "");
  let activeAuthorsLinks = document.querySelectorAll(
    `a.active[href^="#author-${href}"]`
  );
  for (let link of activeAuthorsLinks) {
    link.classList.remove("active");
  }

  let allAuthorLinks = document.querySelectorAll(`a[href="${href}"]`);

  console.log(allAuthorLinks);

  for (let link of allAuthorLinks) {
    link.classList.add("active");
  }

  generateTitleLinks(`[data-author="${author}"]`);
}
