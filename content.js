const patterns = [
  /ai overview/i,  // en
  /übersicht mit ki/i, // de
  /AI による概要/, // ja
  /Обзор от ИИ/, // ru
  /AI 摘要/, // zh-TW
  /AI-overzicht/i, // nl
  /Vista creada con IA/i, // es
  /Přehled od AI/i, // cz
  /סקירה כללית שנוצרה על ידי AI/i, // he
];

const observer = new MutationObserver(() => {
  // Check both h1 and h2 for AI overview text
  const headers = [...document.querySelectorAll('h1, h2')];
  const aiOverviewHeader = headers.find(el => patterns.some(pattern => pattern.test(el.innerText)));

  if (aiOverviewHeader?.parentElement) {
    aiOverviewHeader.parentElement.style.display = "none";
  }

  // Adjust layout after removal
  const mainElement = document.querySelector('[role="main"]');
  if (mainElement) {
    mainElement.style.marginTop = "24px";
  }

  // Remove AI-related questions in "People also ask" section
  const peopleAlsoAskAiOverviews = [
    ...document.querySelectorAll("div.related-question-pair"),
  ].filter((el) => patterns.some((pattern) => pattern.test(el.innerHTML)));

  peopleAlsoAskAiOverviews.forEach((el) => {
    el.parentElement.parentElement.style.display = "none";
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
