// blur navbar
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("backdrop-opacity-30");
  } else {
    navbar.classList.remove("backdrop-opacity-30");
  }
});
// toggle text area
function toggleTextarea(faqNumber) {
  var textarea = document.getElementById("answerTextarea" + faqNumber);
  var arrowIcon = document.getElementById("arrowIcon" + faqNumber);

  if (textarea.classList.contains("hidden")) {
    textarea.classList.remove("hidden");
    arrowIcon.src = "./assets/up-arrow.png";
  } else {
    textarea.classList.add("hidden");
    arrowIcon.src = "./assets/down-arrow.png";
  }
}
