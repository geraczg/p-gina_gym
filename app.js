const formatCalories = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 0,
});

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.hidden = true;
    image.closest(".brand-mark")?.classList.add("is-missing");
    image.closest(".trainer-photo")?.classList.add("is-missing");
  });
});

const form = document.querySelector("#tdee-form");
const sex = document.querySelector("#sex");
const age = document.querySelector("#age");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const activity = document.querySelector("#activity");

const bmrResult = document.querySelector("#bmr-result");
const tdeeResult = document.querySelector("#tdee-result");
const cutResult = document.querySelector("#cut-result");
const bulkResult = document.querySelector("#bulk-result");

function calories(value) {
  return `${formatCalories.format(Math.round(value))} kcal`;
}

function calculateTdee() {
  const weightKg = Number(weight.value);
  const heightCm = Number(height.value);
  const years = Number(age.value);
  const multiplier = Number(activity.value);
  const sexOffset = sex.value === "male" ? 5 : -161;

  if (!weightKg || !heightCm || !years || !multiplier) return;

  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * years + sexOffset;
  const tdee = bmr * multiplier;

  bmrResult.textContent = calories(bmr);
  tdeeResult.textContent = calories(tdee);
  cutResult.textContent = calories(tdee - 400);
  bulkResult.textContent = calories(tdee + 250);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateTdee();
});

[sex, age, weight, height, activity].forEach((control) => {
  control.addEventListener("input", calculateTdee);
  control.addEventListener("change", calculateTdee);
});

const header = document.querySelector(".topbar");
const toggleHeader = () => {
  header.dataset.scrolled = String(window.scrollY > 10);
};

window.addEventListener("scroll", toggleHeader, { passive: true });

const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mainNav.dataset.open = String(!open);
});

mainNav.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  mainNav.dataset.open = "false";
});

document.querySelector("#lead-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-status").textContent =
    "Listo. Tu solicitud quedo preparada para responder por WhatsApp o correo.";
  event.currentTarget.reset();
});

calculateTdee();
toggleHeader();
