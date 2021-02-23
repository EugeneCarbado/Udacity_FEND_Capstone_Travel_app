import { doc } from "prettier";

// const hero = document.querySelector('hero');

const totalCount = 10;

function changeImg() {
  const num = Math.ceil(Math.random() * totalCount);
  document.body.background = "..src/client/media/img-" + num + ".jpg";
  document.body.style.backgroundRepeat = "repeat";
}

export { changeImg };
