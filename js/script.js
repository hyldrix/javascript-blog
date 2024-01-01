'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  let articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */

  let targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');

  /* add class 'active' to the correct article */
}




const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('Funkcja tagów zostałą wykonana');

  const titleList = document.querySelector(optTitleListSelector);

  const articles = document.querySelectorAll(optArticleSelector);

  /* Remove list of links from left column */
  titleList.innerHTML = '';

  let html = '';
  for (let article of articles) {
    /* Read article id and store in const */

    const articleId = article.getAttribute('id');
    /* Find element wit the title and store title in const */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* Creare HTML code for link and store it in const */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    /* Add HTML code to list of links on left side */
    html += linkHTML;
    titleList.innerHTML = html;
  }
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
