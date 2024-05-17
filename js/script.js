//------------------------ Responsive menu ----------------
window.addEventListener("load", function () {
  addRequiredClasses();
});

function addRequiredClasses() {
  if (window.innerWidth < 860) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
}

let hamberger = document.querySelector(".hamberger");
let mobileNav = document.querySelector(".nav-list");

let bars = document.querySelectorAll(".hamberger span");

let isActive = false;

hamberger.addEventListener("click", function () {
  mobileNav.classList.toggle("open");

  if (!isActive) {
    bars[0].style.transform = "rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(-45deg)";
    isActive = true;
  } else {
    bars[0].style.transform = "rotate(0deg)";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "rotate(0deg)";
    isActive = false;
  }
});
// ------------------------ Responsive menu ----------------

// scroll to top //
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      $("#topBtn").fadeIn();
    } else {
      $("#topBtn").fadeOut();
    }
  });

  $("#topBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });
});
//----//
//---contact form ----//
document.getElementById("contactForm").addEventListener("submit", function () {
  alert("Form submitted!"); // You can customize this message
});
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
function genratealert() {
  alert("PLEASE FILL THIS FORM FOR BUY INSURANCE: WE WILL CONTACT YOU SOON");
}
