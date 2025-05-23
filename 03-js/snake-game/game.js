canvas = document.getElementById("game");
ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let sol = 10;
let ust = 10;
let konum = 20;
let boyut = 18;

let ustHareket = 0;
let solHareket = 0;

let elmaSol = 5;
let elmaUst = 5;

let hiz = 10;

let yilanUzunluk = 3;
let yilanParcalari = [];

let skor = 0;

class yilanParcasi {
  constructor(sol, ust) {
    this.sol = sol;
    this.ust = ust;
  }
}

function oyunuCiz() {
  ekraniTemizle();
  yilaniCiz();
  yilanKonumunuGuncelle();
  elmayiCiz();
  elmaninKonumunuDegistir();
  skoruCiz();
  hiziCiz();
  let result = oyunBittiMi();
  if (result) {
    return;
  }

  setTimeout(oyunuCiz, 1000 / hiz);
}

function ekraniTemizle() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function yilaniCiz() {
  ctx.fillStyle = "green";
  for (let i = 0; i < yilanParcalari.length; i++) {
    let parca = yilanParcalari[i];
    ctx.fillRect(parca.sol * konum, parca.ust * konum, boyut, boyut);
  }

  yilanParcalari.push(new yilanParcasi(sol, ust));

  if (yilanParcalari.length > yilanUzunluk) {
    yilanParcalari.shift();
  }

  ctx.fillStyle = "white";
  ctx.fillRect(sol * konum, ust * konum, boyut, boyut);
}

function yilanKonumunuGuncelle() {
  let solSonuc = sol + solHareket;
  let ustSonuc = ust + ustHareket;
  if (solSonuc > 19) {
    sol = 0;
  } else if (solSonuc < 0) {
    sol = 19;
  } else {
    sol = solSonuc;
  }

  if (ustSonuc > 19) {
    ust = 0;
  } else if (ustSonuc < 0) {
    ust = 19;
  } else {
    ust = ustSonuc;
  }
}

function tusHareketleri(e) {
  switch (e.keyCode) {
    case 38: //yukarı
      if (ustHareket == 1) {
        return;
      }
      ustHareket = -1;
      solHareket = 0;
      break;
    case 40: //asagi
      if (ustHareket == -1) {
        return;
      }
      ustHareket = 1;
      solHareket = 0;
      break;
    case 37: //sol
      if (solHareket == 1) {
        return;
      }
      ustHareket = 0;
      solHareket = -1;
      break;
    case 39: //sag
      if (solHareket == -1) {
        return;
      }
      ustHareket = 0;
      solHareket = 1;
      break;
  }
}

function elmayiCiz() {
  ctx.fillStyle = "red";
  ctx.fillRect(elmaSol * konum, elmaUst * konum, boyut, boyut);
}

function elmaninKonumunuDegistir() {
  if (sol === elmaSol && ust === elmaUst) {
    elmaSol = Math.floor(Math.random() * konum);
    elmaUst = Math.floor(Math.random() * konum);
    yilanUzunluk++;
    skor += 10;
    let elmaKonumuMusaitMi = false;

    while (!elmaKonumuMusaitMi) {
      elmaKonumuMusaitMi = true;
      yilanParcalari.forEach((element) => {
        if (element.sol === elmaSol && element.ust === elmaUst) {
          elmaSol = Math.floor(Math.random() * konum);
          elmaUst = Math.floor(Math.random() * konum);
          elmaKonumuMusaitMi = false;
        }
      });
    }

    if (yilanUzunluk % 3 === 0) {
      hiz++;
    }
  }
}

function oyunBittiMi() {
  let oyunBitti = false;
  if (solHareket === 0 && ustHareket === 0) {
    return;
  }

  for (let i = 0; i < yilanParcalari.length; i++) {
    let part = yilanParcalari[i];
    if (part.sol === sol && part.ust === ust) {
      oyunBitti = true;
      break;
    }
  }
  if (oyunBitti) {
    ctx.fillStyle = "white";
    ctx.font = "50px verdana";
    ctx.fillText("GAME OVER!", 200 / 4.5, 200);
  }

  return oyunBitti;
}

function skoruCiz() {
  ctx.fillStyle = "white";
  ctx.font = "20px verdana";
  ctx.fillText(`Skor: ${skor}`, 300, 30);
}

function hiziCiz() {
  ctx.fillStyle = "white";
  ctx.font = "20px verdana";
  ctx.fillText(`Hız: ${hiz}`, 300, 60);
}

function yeniOyun() {
  document.location.reload();
}

oyunuCiz();
