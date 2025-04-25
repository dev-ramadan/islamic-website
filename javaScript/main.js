
$(document).ready(function () {
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
  const opt = document.querySelector("#surah-list");
  const karae = document.querySelector("#reciter-list");
  const triwayat = document.querySelector("#riwayat");
  const serchName = document.querySelector(".name");
  const inputSerch = document.querySelector(".input-serch");
  const baseURL = "https://api.quran.com/api/v4/";
  const reciterName = "resources/recitations";
  const adioFils = "chapter_recitations/";
  const suraName = "chapters";
  // استدعاء القراء
  (async function getReciter() {
    const reciters = await fetch(`${baseURL}${reciterName}`);
    const reciterArray = await reciters.json();
    const result = reciterArray.recitations;
    result.map((reciter) => {
      const option = document.createElement("option");
      const div = document.createElement("div");
      div.classList.add("serch-name");
      div.textContent += reciter.reciter_name;
      serchName.appendChild(div);
      option.textContent = reciter.reciter_name;
      option.value = reciter.id;
      option.setAttribute("data-style", reciter.style);
      karae.appendChild(option);
    });

    karae.addEventListener("change", (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const kareaStyle = selectedOption.dataset.style;
      getRiwayate(e.target.value, kareaStyle);
    });
  })();

  const getRiwayate = (id, style) => {
    triwayat.innerHTML = `<option>أختر المصحف</option>`;
    const options = document.createElement("option");
    //
    if (style != "null") {
      options.textContent = style;
    } else {
      options.textContent = "Murattal";
    }

    triwayat.appendChild(options);
    triwayat.addEventListener("change", () => {
      getSura(id);
    });
  };

  // استدعاء السور مع الصوت
  async function getSura(id) {
    opt.innerHTML = '<option value="">جارٍ تحميل السور...</option>'; // رسالة مؤقتة

    try {
      // تحميل أسماء السور
      const surahNameResponse = await fetch(`${baseURL}${suraName}`);
      const surahNameData = await surahNameResponse.json();
      const name_arabic = surahNameData.chapters; // قائمة السور

      // تحميل روابط التلاوة
      const response = await fetch(`${baseURL}${adioFils}${id}`);
      const data = await response.json();
      const finalData = data.audio_files;

      opt.innerHTML = '<option value="">اختر السورة</option>';

      // إضافة التلاوات إلى القائمة
      finalData.map((recitation) => {
        let surah = name_arabic.find((s) => s.id === recitation.chapter_id); // البحث عن اسم السورة 
        let option = document.createElement("option");
        option.value = recitation.audio_url; // وضع رابط الصوت
        option.textContent = `${recitation.chapter_id} - ${surah ? surah.name_arabic : "اسم غير متوفر"
          }`;
        opt.appendChild(option);
      });
    } catch (error) {
      console.error("خطأ أثناء تحميل السور:", error);
    }
    opt.addEventListener("change", (e) => play(e.target.value));
  }

  async function play(e) {
    const playAudio = document.querySelector(".fa-circle-play");
    playAudio.addEventListener("click", () => {
      const audio = document.querySelector("#audio");
      audio.src = "";
      audio.src = e;
      audio.type = "audio/ogg";
    });
  }

  // البحث عن القارئ
  window.serch = async function (reciter) {
    const reciters = await fetch(`${baseURL}${reciterName}`);
    const reciterArray = await reciters.json();
    const result = reciterArray.recitations;
    serchName.innerHTML = "";
    result.forEach((reciters) => {
      if (reciters.reciter_name.toLowerCase().includes(reciter.toLowerCase())) {
        const reciterDiv = document.createElement("div");
        reciterDiv.setAttribute("data-bs-toggle", "modal");
        reciterDiv.setAttribute("data-bs-target", "#exampleModal");
        reciterDiv.classList.add("serch-name");
        reciterDiv.innerHTML = `<p class="">${reciters.reciter_name}</p>`;
        const reciterName = reciterDiv.querySelector("p").textContent;
        reciterDiv.addEventListener("click", () =>
          suraByKare(reciterName, reciters.id, reciters.style)
        );
        serchName.appendChild(reciterDiv);
      }
    });
  }
  const suraByKare = (name, id, style) => {
    getSura(id);
    karae.innerHTML = `<option>${name}</option>`;
    if (style != "null") {
      getRiwayate(id, style);
    }
    getRiwayate(id, "Murattal");
  };
  serchName.addEventListener("click", () => inputSerch.focus());

  // احاديث
  (async function fetchHadiths() {
    try {
      const response = await fetch(
        "https://hadithapi.com/public/api/hadiths?apiKey=$2y$10$SJM3LJCqBO6JSFBYYYKQQrrqSHJAL7CfIPHno8tNcZXLdLdE8kS"
      );
      const data = await response.json();
      let hadiths = data.hadiths.data;
      hadiths = hadiths.filter(
        (hadith) => hadith.hadithArabic && hadith.hadithArabic.length <= 400
      );
      const sliderContainer = document.getElementById("hadithSlider");
      hadiths.forEach((hadith) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<p>${hadith.hadithArabic}</p>`;
        sliderContainer.appendChild(slide);
      });
      new Swiper(".swiper-container", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  })();
   // anmation
   $(".website").animate({ width: "100%" }, 1000);
   $(".website").animate({ height: "100vh" }, 1000, function () {
     $(".background .arrow").slideDown(1000)
     $(".website #nav").fadeIn(1000);
     $(".website #navHome").fadeIn(1000);
     $("#radioButton").fadeIn(1000);
     $(".box").css("display", 'flex')
   });
   $(window).scroll(function () {
     if (window.scrollY > 500) {
       $(".website #nav").fadeOut(1000);
     } else {
       $(".website #nav").fadeIn(1000);
     }
   });
 });
 // them action
 $(".fa-gear").click(() => {
   let x = $(".colors").outerWidth();
   if ($(".box").css("left") === '0px') {
     $(".box").animate({ left: `-${x}` }, 1000)
   } else {
     $(".box").animate({ left: `0px` }, 1000)
   }
 });
 let spans = $(".colors span");
 for (let i = 0; i < spans.length; i++) {
   let dataColor = spans[i].getAttribute("data-color");
   spans[i].style.backgroundColor = dataColor
 };
 $(spans).click((e) => {
   let thems = $(e.target).css('background-color');
   $(".them").css('background-color', thems);
   $("#navHome").css('background-color', thems);
   $("footer").css('background-color', thems);
   $(".arrow i").css('color', thems);
   $(".quicGoin").css('border-color', thems);
   $(".quicGoin").css('color', thems);
   $(".serch-name").css('border-color', thems);
   $(".all-reciters span").css('background-color', thems);
   localStorage.setItem('thems', JSON.stringify(thems));
});
