$(document).ready(function () {
  const pages = Array.from({ length: 604 }, (_, i) =>
    `https:\/\/alquran.vip\/APIs\/quran-pages\/${String(i + 1).padStart(3, '0')}.png`
  );
  const input = document.querySelector(".surah-serch");
  const btnSearch = document.querySelector(".btn-serch");
  let currentPage = 0;
  const imgLeft = document.getElementById("quranPageLeft");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const effect = document.getElementById("effect");
  if (localStorage.getItem("thems") !== null) {
    $(".them").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $("footer").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $(".next").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $(".prev").css('background-color', JSON.parse(localStorage.getItem("thems")));
  }
  $(".box").css("display", 'flex')
  $("#nav").fadeIn(1500);
  $(window).scroll(function () {
    if (window.scrollY > 500) {
      $("#nav").fadeOut(1000);
    } else {
      $("#nav").fadeIn(1000);
    }
  })
  function updatePages() {
    imgLeft.src = pages[currentPage || 0];
  }
  // زر التالي
  next.addEventListener("click", () => {
    if (currentPage < pages.length) {
      currentPage++;
      effect.src = 'dist/soundEffect.mp3';
      updatePages();
    }
  });
  prev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      effect.src = 'dist/soundEffect.mp3';
      updatePages();
    }
  });
  searchSurah = (pageNumper) => {
    const imgLeft = document.getElementById("quranPageLeft");
    if (!pageNumper || pageNumper < 1 || pageNumper > 604) {
      return;
    }
    imgLeft.src = `https://alquran.vip/APIs/quran-pages/${pageNumper.toString().padStart(3, '0')}.png`;
    currentPage = pageNumper - 1;
  }
  const surahPages = {
    "الفاتحة": 1, "البقرة": 2, "آل عمران": 50, "النساء": 77, "المائدة": 106, "الأنعام": 128,
    "الأعراف": 151, "الأنفال": 177, "التوبة": 187, "يونس": 208, "هود": 221, "يوسف": 235,
    "الرعد": 249, "إبراهيم": 255, "الحجر": 262, "النحل": 267, "الإسراء": 282, "الكهف": 293,
    "مريم": 305, "طه": 312, "الأنبياء": 322, "الحج": 332, "المؤمنون": 342, "النور": 350,
    "الفرقان": 359, "الشعراء": 367, "النمل": 377, "القصص": 385, "العنكبوت": 396, "الروم": 404,
    "لقمان": 411, "السجدة": 415, "الأحزاب": 418, "سبأ": 428, "فاطر": 434, "يس": 440,
    "الصافات": 446, "ص": 453, "الزمر": 458, "غافر": 467, "فصلت": 477, "الشورى": 483,
    "الزخرف": 489, "الدخان": 496, "الجاثية": 499, "الأحقاف": 502, "محمد": 507, "الفتح": 511,
    "الحجرات": 515, "ق": 518, "الذاريات": 520, "الطور": 523, "النجم": 526, "القمر": 528,
    "الرحمن": 531, "الواقعة": 534, "الحديد": 537, "المجادلة": 542, "الحشر": 545, "الممتحنة": 549,
    "الصف": 551, "الجمعة": 553, "المنافقون": 554, "التغابن": 556, "الطلاق": 558, "التحريم": 560,
    "الملك": 562, "القلم": 564, "الحاقة": 566, "المعارج": 568, "نوح": 570, "الجن": 572,
    "المزمل": 574, "المدثر": 575, "القيامة": 577, "الإنسان": 578, "المرسلات": 580, "النبأ": 582,
    "النازعات": 583, "عبس": 585, "التكوير": 586, "الإنفطار": 587, "المطففين": 587, "الإنشقاق": 589,
    "البروج": 590, "الطارق": 591, "الأعلى": 591, "الغاشية": 592, "الفجر": 593, "البلد": 594,
    "الشمس": 595, "الليل": 595, "الضحى": 596, "الشرح": 596, "التين": 597, "العلق": 597,
    "القدر": 598, "البينة": 598, "الزلزلة": 599, "العاديات": 599, "القارعة": 600, "التكاثر": 600,
    "العصر": 601, "الهمزة": 601, "الفيل": 601, "قريش": 602, "الماعون": 602, "الكوثر": 602,
    "الكافرون": 603, "النصر": 603, "المسد": 603, "الإخلاص": 604, "الفلق": 604, "الناس": 604
  };

  btnSearch.addEventListener("click", () => {
    const inputValue = input.value.trim();
    if (!isNaN(inputValue) && inputValue !== ' ') {
      searchSurah(Number(inputValue));
    }else if(surahPages[inputValue]) {
        searchSurah(surahPages[inputValue]);
      }
  });
  // تحميل الصفحات الأولى عند بدء التشغيل
  updatePages();
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
    $("footer").css('background-color', thems);
    $(".next").css('background-color', thems);
    $(".prev").css('background-color', thems);

    localStorage.setItem('thems', JSON.stringify(thems))
  })
});