/* eslint-disable no-empty */
"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  let articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */

  let targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add("active");

  /* add class 'active' to the correct article */
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks() {
  //console.log("Funkcja tagów zostałą wykonana");

  const titleList = document.querySelector(optTitleListSelector);

  const articles = document.querySelectorAll(optArticleSelector);

  /* Remove list of links from left column */
  titleList.innerHTML = "";

  let html = "";
  for (let article of articles) {
    /* Read article id and store in const */

    const articleId = article.getAttribute("id");
    /* Find element wit the title and store title in const */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* Creare HTML code for link and store it in const */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    /* Add HTML code to list of links on left side */
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
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    let articleTagsArr = articleTags.split(" ");

    /* START LOOP: for each tag */

    for (let tag of articleTagsArr) {
      /* generate HTML of the link */
      let linkHtml = '<li><a href="#tag-' + tag + '">' + tag + "</a></li> ";

      /* add generated code to html variable */
      html += linkHtml;
    }
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */

    tagList.innerHTML = html;
  }
  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event) {
  console.log("Handled!");
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace("#tag-", "");

  /* find all tag links with class active */

  let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let link of activeTagLinks) {
    /* remove class active */
    link.classList.remove("active");
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  let allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tag of allTagLinks) {
    /* add class active */

    tag.classList.add("active");
  }

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */



}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();
