// blur navbar
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("backdrop-opacity-30");
  } else {
    navbar.classList.remove("backdrop-opacity-30");
  }
});
// toggle paragraph
function toggleParagraph(faqNumber) {
  var paragraph = document.getElementById("answerParagraph" + faqNumber);
  var arrowIcon = document.getElementById("arrowIcon" + faqNumber);

  if (paragraph.classList.contains("hidden")) {
    paragraph.classList.remove("hidden");
    arrowIcon.src = "./assets/up-arrow.png";
  } else {
    paragraph.classList.add("hidden");
    arrowIcon.src = "./assets/down-arrow.png";
  }
}
