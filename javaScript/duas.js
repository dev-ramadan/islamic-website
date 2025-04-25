$(document).ready(function () {
  const propheticDuas = document.querySelector(".propheticDuas");
  const quranDuas = document.querySelector(".quranDuas");
  const prophetsDuas = document.querySelector(".prophetsDuas");
  const quranCompletionDuas = document.querySelector(".quranCompletion");



  $("#nav").fadeIn(1500);
  if (localStorage.getItem("thems") !== null) {
    $("footer").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $("#nav").css('background-color', JSON.parse(localStorage.getItem("thems")));
  }

  (async () => {
    $(".spinner").css("display","flex",()=>{
      $(".spinner").fadeIn(200)
  })
    try {
      const getAzkar = await fetch("https://api.allorigins.win/raw?url=https://alquran.vip/APIs/duas");
      const azkarJson = await getAzkar.json();
      const prophetic_duas = azkarJson.prophetic_duas;
      const quran_duas = azkarJson.quran_duas;
      const prophets_duas = azkarJson.prophets_duas;
      const quran_completion_duas = azkarJson.quran_completion_duas;
      prophetic_duas.map(morningA => {
        propheticDuas.innerHTML += `
              <tbody>
                  <tr>
                      <td>${morningA.text}</td>
                      <td>${morningA.count}</td>
                  </tr>
              </tbody>
          `;
      });

      quran_duas.map(morningA => {
        quranDuas.innerHTML += `
              <tbody>
                  <tr>
                      <td>${morningA.text}</td>
                      <td>${morningA.count}</td>
                  </tr>
              </tbody>
          `;
      });


      prophets_duas.map(morningA => {
        prophetsDuas.innerHTML += `
              <tbody>
                  <tr>
                      <td>${morningA.text}</td>
                      <td>${morningA.count}</td>
                  </tr>
              </tbody>
          `;
      });


      quran_completion_duas.map(morningA => {
        quranCompletionDuas.innerHTML += `
              <tbody>
                  <tr>
                      <td>${morningA.text}</td>
                      <td>${morningA.count}</td>
                  </tr>
              </tbody>
          `;
      });

    } catch (error) {
      console.error("حدث خطأ أثناء تحميل الأذكار:", error);

    }finally{
      $(".spinner").fadeOut(500, function () {
            $("body").css("overflow", "auto")});
    }

  })();

  let buttons = document.querySelectorAll(".more-btn");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      let parentAzkar = this.closest(".duas-section");
      if (parentAzkar) {
        parentAzkar.classList.toggle("more");
      }
      if (parentAzkar.classList.contains('more')) {
        button.textContent = 'إخفاء ▼';
      } else {
        button.textContent = 'إظهار المزيد ▼';
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
    $("#nav").css('background-color', thems);
    $("footer").css('background-color', thems);

    localStorage.setItem('thems', JSON.stringify(thems));
  })

});