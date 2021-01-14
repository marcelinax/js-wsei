//Jeden element - obsługa zdarzenia click
//  1.pobierz referencje do obiektu
//const firstImg = document.getElementById('firstImage')
///const firstImg= document.querySelector('img')
//console.dir(firstImg);
// 2. zapisz sie na zdarzenie kliknięcia
//firstImg.addEventListener('click', showLightBox)v
//function showLightBox(ev){
//    console.log(ev.target.src);
//}

// pobierz wszystkie grafiki z .gallery
const imgs = document.querySelectorAll(".gallery img");
let keyValue = 0;
const imgText = document.querySelector(".page");

document.addEventListener("DOMContentLoaded", () => main());
//funkcja główna
const main = () => {
  for (let index = 0; index < imgs.length; index++) {
    const img = imgs[index];
    img.addEventListener("click", (event) => {
      keyValue = parseInt(event.target.dataset.key);
      // zmienianie podpisu zdjęcia
      imgText.innerHTML = parseInt(keyValue + 1) + " / " + imgs.length;
      // ustawianie głównego zdjęcia
      document.querySelector(".lightbox__img img").src = event.target.src;
      document.querySelector(".lightbox").classList.add("visible");
      if (keyValue == 14) {
        document.querySelector(".right").style.display = "none";
      } else document.querySelector(".right").style.display = "flex";
      if (keyValue == 0) {
        document.querySelector(".left").style.display = "none";
      } else if (keyValue > 0)
        document.querySelector(".left").style.display = "flex";
    });
  }
  //prawa strzałka
  document.querySelector(".right").addEventListener("click", () => {
    for (let i = 0; i < imgs.length; i++) {
      if (parseInt(imgs[i].dataset.key) === keyValue + 1) {
        document.querySelector(".lightbox__img img").src = imgs[i].src;
      }
    }
    keyValue = keyValue + 1;
    imgText.innerHTML = parseInt(keyValue + 1) + " / " + imgs.length;

    if (keyValue == 14) {
      document.querySelector(".right").style.display = "none";
    } else document.querySelector(".right").style.display = "flex";
    if (keyValue == 0) {
      document.querySelector(".left").style.display = "none";
    } else if (keyValue > 0)
      document.querySelector(".left").style.display = "flex";
  });
  //lewa strzałka
  document.querySelector(".left").addEventListener("click", () => {
    for (let i = 0; i < imgs.length; i++) {
      if (parseInt(imgs[i].dataset.key) === keyValue - 1) {
        document.querySelector(".lightbox__img img").src = imgs[i].src;
      }
    }
    keyValue = keyValue - 1;
    imgText.innerHTML = parseInt(keyValue + 1) + " / " + imgs.length;
    if (keyValue == 14) {
      document.querySelector(".right").style.display = "none";
    } else document.querySelector(".right").style.display = "flex";
    if (keyValue == 0) {
      document.querySelector(".left").style.display = "none";
    } else if (keyValue > 0)
      document.querySelector(".left").style.display = "flex";
  });
  //zamykanie lightbox'a
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".lightbox").classList.remove("visible");
  });
};

//zadanie zamknac zdjecie zmieniajac display na none
//animacje
// dodać alty i wyświetlić tekst pod grafikami
// wyświetlenie numeru zdjęcia
