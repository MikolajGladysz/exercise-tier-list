document.querySelectorAll(".mscl-img").forEach(function (e) {
  e.addEventListener("click", function (e) {
    document.querySelector(".mscl-prev").classList.toggle("hidden");
    document.querySelector(".mscl-back").classList.toggle("hidden");
    document.querySelector(".section-title").classList.toggle("hidden");
    document.querySelector(".mscl-con").classList.toggle("no-margin");
  });
});
document.querySelector(".tierlist-btn").addEventListener("click", function () {
  document.querySelector(".mscl-con").classList.toggle("hidden");
  document.querySelector(".mscl-prev").classList.toggle("hidden");
  document.querySelector(".mscl-tier").classList.toggle("hidden");
});
document.querySelectorAll(".tier-item").forEach(function (e) {
  e.addEventListener("click", function (e) {
    document.querySelector(".modal").classList.toggle("hidden");
  });
});
const modal = document.querySelector(".modal");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.toggle("hidden");
  }
};
document.querySelector(".back").addEventListener("click", function () {
  document.querySelector(".mscl-con").classList.toggle("hidden");
  document.querySelector(".mscl-prev").classList.toggle("hidden");
  document.querySelector(".mscl-tier").classList.toggle("hidden");
});
