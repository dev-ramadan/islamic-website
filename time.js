$(document).ready(function () {
  if (localStorage.getItem("thems") !== null) {
    $(".them").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $("footer").css('background-color', JSON.parse(localStorage.getItem("thems")));
    $(".times").css('border-color', JSON.parse(localStorage.getItem("thems")));
  }
  $("#nav").fadeIn(1000);
  $(".box").css("display", 'flex')
  $(window).scroll(function () {
    if (window.scrollY > 500) {
      $("#nav").fadeOut(1000);
    } else {
      $("#nav").fadeIn(1000);
    }
  });

  $(".spinner").css("display", "flex", () => {
    $(".spinner").fadeIn(200)
  })
  try {
    (async () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formatDate = `${day}-${month}-${year}`;
      //  عرض الساعة
      function updateClock() {
        const now = new Date();
        const clock = now.toLocaleTimeString("en-US", { hour12: true });
        $(".clock").html(`<h1>${clock}</h1>`);
      }
      // تحديث الساعة كل ثانية
      setInterval(updateClock, 1000);
      updateClock();

      // استقبال مواعيد الصلوات
      const getTime = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${formatDate}?city=Cairo&country=Damietta`
      );
      const res = await getTime.json();
      const result = res.data.timings;
      const dateAPI = res.data.date.gregorian;
      const dateHijri = res.data.date.hijri;
      const time = document.querySelector(".ttime");
      let { Fajr, Dhuhr, Asr, Maghrib, Isha } = result;
      function convertTime(time) {
        let [hours, minutes] = time.split(":").map(Number);
        let format = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${format} ${hours} : ${minutes}`;
      }
      // عرض المواعيد في الصفحة
      time.innerHTML = `
            <div class="col-12  date">
            <div><h5>${dateHijri.date}</h5></div>
            <div><h5>${dateAPI.weekday.en}-${dateAPI.day}-${dateAPI.month.en}</h5></div>
            <div><h5>${dateAPI.date}</h5></div>
            </div>
                    <div class="col-12 d-flex justify-content-between flex-column gap-4 time-piranr">
                <div>
                    <div class="time">${convertTime(Fajr)}</div>
                    <div class="timeName">الفجر</div>
                </div>  
                
                <div>
                    <div class="time">${convertTime(Dhuhr)}</div>
                    <div class="timeName">الظهر</div>
                </div>  
    
                <div>
                    <div class="time">${convertTime(Asr)}</div>
                    <div class="timeName">العصر</div>
                </div>  
    
                <div>
                    <div class="time">${convertTime(Maghrib)}</div>
                    <div class="timeName">المغرب</div>
                </div>  
    
                <div>
                    <div class="time">${convertTime(Isha)}</div>
                    <div class="timeName">العشاء</div>
                </div>  
      
            </div>
            `;
      if (localStorage.getItem("thems") !== null) {
        $(".date").css('border-color', JSON.parse(localStorage.getItem("thems")));
        $(".timeName").css('border-color', JSON.parse(localStorage.getItem("thems")));
        $(".time").css('border-color', JSON.parse(localStorage.getItem("thems")));
      }

      // ايجاد الصلاة التالية
      const prayers = {
        الفجر: Fajr,
        الظهر: Dhuhr,
        العصر: Asr,
        المغرب: Maghrib,
        العشاء: Isha,
      };
      (() => {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const times = hour * 60 + minutes;
        let nextPryers = null;
        let minValue = Infinity;

        for (const [prayer, time] of Object.entries(prayers)) {
          const [hour, minutes] = time.split(":").map(Number);
          const curantMinutes = hour * 60 + minutes;

          if (curantMinutes > times && times - curantMinutes < minValue) {
            nextPryers = { name: prayer, time: time };
            minValue = times - curantMinutes;
            const nextPryer = `<h3>الصلاة التالية: ${nextPryers.name
              }</h3> <h4> ${convertTime(nextPryers.time)} الموعد </h4>`;
            $(".nextTime").html(nextPryer);
            return nextPryers;
          } else {
            $(".nextTime").html(
              `<h3>الصلاة التالية الفجر</h3> <h4> ${convertTime(
                Fajr
              )} الموعد </h4>`
            );
          }
        }
      })();
    })();
  } catch (error) {
    console.log(error);
  } finally {
    $(".spinner").fadeOut(500, function () {
      $("body").css("overflow", "auto")
    });
  }
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
    $(".timeName").css('border-color', thems);
    $(".date").css('border-color', thems);
    $(".time").css('border-color', thems);
    $(".times").css('border-color', thems);
    localStorage.setItem('thems', JSON.stringify(thems));
  })
});