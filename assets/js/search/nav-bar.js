const profile = document.getElementById("profile");
const profileParent = document.getElementById("profile_parent");
const languages = document.getElementById("languages");
const languagesParent = document.getElementById("languages_parent");
const innerLang = document.getElementById("inner_lang");

const showLanguages = (event) => {
  event.stopPropagation();
  languages.classList.toggle("hidden");
  profile.classList.add("hidden");
  const clickedElement = event.target.closest("div");
  if (clickedElement && clickedElement.querySelector("span")) {
    const languageText = clickedElement.querySelector("span").innerHTML.trim();
    const languageImg = clickedElement.querySelector("img").src;

    innerLang.innerHTML = `<img src="${languageImg}" alt="" />
                             <span>${languageText}</span>
                             <img src="/icons/UpdateMain/arrow-down.svg" alt="" />`;
  }
};

const handleClickOutside = () => {
  profile.classList.add("hidden");
  languages.classList.add("hidden");
};

const showProfile = (event) => {
  event.stopPropagation();
  profile.classList.toggle("hidden");
  languages.classList.add("hidden");
};

languagesParent.addEventListener("click", showLanguages);
profileParent.addEventListener("click", showProfile);
document.body.addEventListener("click", handleClickOutside);
