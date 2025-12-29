$(document).ready(function () {

  /* =========================
     THEMES 
  ========================= */
  if (localStorage.getItem("thems") !== null) {
    $(".them").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $("footer").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $(".arrow i").css('color', JSON.parse(localStorage.getItem("thems")));
    $(".quicGoin").css('border-color', JSON.parse(localStorage.getItem("thems")));
    $(".quicGoin").css('color', JSON.parse(localStorage.getItem("thems")));
  }

  $(window).scroll(function () {
    const audioPlayer = document.querySelector("#audio");
    if (window.scrollY > 450) {
      audioPlayer.classList.remove("player");
    } else {
      audioPlayer.classList.add("player");
    }
  });

  window.fristScroll = () => {
    window.scrollTo(0, 550);
  };

  /* =========================
     ELEMENTS
  ========================= */
  const opt = document.querySelector("#surah-list");
  const karae = document.querySelector("#reciter-list");
  const triwayat = document.querySelector("#riwayat");
  const serchName = document.querySelector(".name");
  const inputSerch = document.querySelector(".input-serch");
  const audio = document.querySelector("#audio");

  const baseURL = "https://mp3quran.net/api/v3/";
  const reciterName = "recent_reads";
  const suraName = "suwar";

  /* =========================
     GET RECITERS
  ========================= */
  (async function getReciter() {
    const reciters = await fetch(`${baseURL}${reciterName}`);
    const reciterArray = await reciters.json();
    const result = reciterArray.reads;

    result.forEach((reciter) => {
      const option = document.createElement("option");
      const div = document.createElement("div");

      div.classList.add("serch-name");
      div.textContent = reciter.name;
      serchName.appendChild(div);

      option.textContent = reciter.name;
      option.value = reciter.id;

      // ✅ تصحيح: لازم join
      option.setAttribute("data-style", reciter.moshaf.map(a => a.name).join(","));
      option.setAttribute("data-id", reciter.moshaf.map(a => a.id).join(","));
      option.setAttribute("data-server", reciter.moshaf.map(a => a.server).join(","));

      karae.appendChild(option);
    });

    karae.addEventListener("change", (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];

      const kareaStyle = selectedOption.getAttribute("data-style").split(",");
      const style_id = selectedOption.getAttribute("data-id").split(",");
      const server = selectedOption.getAttribute("data-server").split(",");

      getRiwayate(e.target.value, kareaStyle, server, style_id);
    });

  })();

  /* =========================
     GET RIWAYAT
  ========================= */
  const getRiwayate = (id, style, server, style_id) => {

    triwayat.innerHTML = `<option>أختر المصحف</option>`;
    opt.innerHTML = `<option>اختر السورة</option>`;
    audio.src = "";

    // ✅ style Array مش string
    if (Array.isArray(style)) {
      style.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = style_id[index];
        option.textContent = item.trim();
        option.setAttribute("data-server", server[index]);
        triwayat.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.value = "Murattal";
      option.textContent = "Murattal";
      triwayat.appendChild(option);
    }
  };

  triwayat.addEventListener("change", (e) => {
    const styleId = e.target.value;
    const server = e.target.selectedOptions[0].dataset.server;
    getSura(styleId, server);
  });

  /* =========================
     GET SURAH
  ========================= */
  async function getSura(style_id, server) {

    opt.innerHTML = '<option value="">جارٍ تحميل السور...</option>';

    try {
      const response = await fetch(`${baseURL}${suraName}`);
      const data = await response.json();
      const finalData = data.suwar;

      opt.innerHTML = '<option value="">اختر السورة</option>';

      // ✅ دلوقتي Option لكل سورة
      finalData.forEach(a => {
        const option = document.createElement("option");
        option.value = `${server}${String(a.id).padStart(3, "0")}.mp3`;
        option.textContent = `${a.id} - ${a.name}`;
        opt.appendChild(option);
      });

    } catch (error) {
      console.error("خطأ أثناء تحميل السور:", error);
    }
  }

// اختيار العنصر
const playButton = document.querySelector(".fa-circle-play");

// تشغيل الصوت عند الضغط على زر التشغيل
playButton.addEventListener("click", () => {
  const selectedOption = document.querySelector("#surah-list").selectedOptions[0];
  if (selectedOption) {
    audio.src = selectedOption.value;
    audio.play();
  } else {
    alert("اختر السورة أولاً");
  }
});


  /* =========================
     SEARCH
  ========================= */
  window.serch = async function (reciter) {
    const reciters = await fetch(`${baseURL}${reciterName}`);
    const reciterArray = await reciters.json();
    const result = reciterArray.reads;

    serchName.innerHTML = "";

    result.forEach((reciters) => {
      if (reciters.name.toLowerCase().includes(reciter.toLowerCase())) {
        const reciterDiv = document.createElement("div");
        reciterDiv.classList.add("serch-name");
        reciterDiv.innerHTML = `<p>${reciters.name}</p>`;
        serchName.appendChild(reciterDiv);
      }
    });
  };

  serchName.addEventListener("click", () => inputSerch.focus());

  /* =========================
     ANIMATION
  ========================= */
  $(".website").animate({ width: "100%" }, 1000);
  $(".website").animate({ height: "100vh" }, 1000, function () {
    $(".background .arrow").slideDown(1000);
    $(".website #nav").fadeIn(1000);
    $(".website #navHome").fadeIn(1000);
    $("#radioButton").fadeIn(1000);
    $(".box").css("display", 'flex');
  });

  $(window).scroll(function () {
    if (window.scrollY > 500) {
      $(".website #nav").fadeOut(1000);
    } else {
      $(".website #nav").fadeIn(1000);
    }
  });

});

/* =========================
   THEME ACTION 
========================= */
$(".fa-gear").click(() => {
  let x = $(".colors").outerWidth();
  if ($(".box").css("left") === '0px') {
    $(".box").animate({ left: `-${x}` }, 1000);
  } else {
    $(".box").animate({ left: `0px` }, 1000);
  }
});

let spans = $(".colors span");
for (let i = 0; i < spans.length; i++) {
  let dataColor = spans[i].getAttribute("data-color");
  spans[i].style.backgroundColor = dataColor;
}

$(spans).click((e) => {
  let thems = $(e.target).css('background-color');
  $(".them, #navHome, footer").css('background-color', thems);
  $(".arrow i, .quicGoin").css('color', thems);
  $(".quicGoin, .serch-name").css('border-color', thems);
  localStorage.setItem('thems', JSON.stringify(thems));
});
