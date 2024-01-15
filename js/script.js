/* eslint-disable no-prototype-builtins */
'use strict';
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  articleTag: Handlebars.compile(
    document.querySelector('#template-article-tag').innerHTML
  ),
  articleAuthor: Handlebars.compile(
    document.querySelector('#template-article-author').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-rhs').innerHTML
  ),
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.list.authors',
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  let articleSelector = clickedElement.getAttribute('href');

  let targetArticle = document.querySelector(`${articleSelector}`);
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(opts.titleListSelector);

  const articles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );

  titleList.innerHTML = '';

  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    html += linkHTML;
    titleList.innerHTML = html;
  }
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
function addClickListenersToAuthors() {
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorsLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  let activeAuthorsLinks = document.querySelectorAll(
    `a.active[href^="#author-${href}"]`
  );
  for (let link of activeAuthorsLinks) {
    link.classList.remove('active');
  }

  let allAuthorLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let link of allAuthorLinks) {
    link.classList.add('active');
  }

  generateTitleLinks(`[data-author="${author}"]`);
}

function generateTags() {
  const articles = document.querySelectorAll(opts.articleSelector);

  for (let article of articles) {
    const tagList = article.querySelector(opts.articleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');

    let articleTagsArr = articleTags.split(' ');

    for (let tag of articleTagsArr) {
      const linkHTMLData = { tag: tag };
      const linkHTML = templates.articleTag(linkHTMLData);

      html += linkHTML;
    }

    tagList.innerHTML = html;
  }
}

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let link of activeTagLinks) {
    link.classList.remove('active');
  }
  let allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tag of allTagLinks) {
    tag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll(`a[href^="#tag-"]`);

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll(opts.articleSelector);
  for (let article of articles) {
    const selectedAuthor = article.querySelector(opts.articleAuthorSelector);
    const author = article.getAttribute('data-author');

    const linkHTMLData = { author: author };
    const linkHTML = templates.articleAuthor(linkHTMLData);

    selectedAuthor.innerHTML = linkHTML;
  }
}

function calculateTagsParams(tags) {
  let params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);

  return classNumber;
}

function generateRHSTags() {
  let allTags = {};

  const articles = document.querySelectorAll(opts.articleSelector);

  for (let article of articles) {
    const tagList = article.querySelector(opts.articleTagsSelector);
    let html = '';

    const articleTags = article.getAttribute('data-tags');

    let tagArr = articleTags.split(' ');

    for (let tag of tagArr) {
      let linkHTML = ``;

      html += linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag] += 1;
      }
    }

    tagList.innerHTML += html;
  }
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = { tags: [] };

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function generateRHSAuthors() {
  let allAuthors = {};

  const articles = document.querySelectorAll(opts.articleSelector);
  const authorsListSelector = document.querySelector(opts.authorsListSelector);

  for (let article of articles) {
    const author = article.getAttribute('data-author');

    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author] += 1;
    }
  }

  const allAuthorsData = { authors: [] };


  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorsListSelector.innerHTML = templates.authorLink(allAuthorsData);
}

generateTitleLinks();
generateTags();
generateAuthors();
generateRHSTags();
generateRHSAuthors();
addClickListenersToAuthors();
addClickListenersToTags();
