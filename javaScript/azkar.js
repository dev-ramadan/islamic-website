$(document).ready(function () {
    const morning = document.querySelector(".morning");
    const evening = document.querySelector(".evening");
    const prayerAzkar = document.querySelector(".prayerAzkar");
    const prayerLaterAzkar = document.querySelector(".prayerLater");
    const hajjAndUmrah = document.querySelector(".hajjAndUmrah");
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
            const getAzkar =   await fetch("https://api.allorigins.win/raw?url=https://alquran.vip/APIs/azkar");
            const azkarJson = await getAzkar.json();
            const morningAzkar = azkarJson.morning_azkar;
            const eveningAzkar = azkarJson.evening_azkar;
            const prayerAzkars = azkarJson.prayer_azkar;
            const prayerLaterAzkars = azkarJson.prayer_later_azkar
            const hajjAndUmrahAzkar = azkarJson.hajj_and_umrah_azkar

            
            ;            
            morningAzkar.map(morningA => {
                morning.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${morningA.text}</td>
                            <td>${morningA.count}</td>
                        </tr>
                    </tbody>
                `;
            });

            eveningAzkar.map(morningA => {
                evening.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${morningA.text}</td>
                            <td>${morningA.count}</td>
                        </tr>
                    </tbody>
                `;
            });


            prayerAzkars.map(morningA => {
                prayerAzkar.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${morningA.text}</td>
                            <td>${morningA.count}</td>
                        </tr>
                    </tbody>
                `;
            });


            prayerLaterAzkars.map(morningA => {
                prayerLaterAzkar.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${morningA.text}</td>
                            <td>${morningA.count}</td>
                        </tr>
                    </tbody>
                `;
            });

            hajjAndUmrahAzkar.map(morningA => {
                hajjAndUmrah.innerHTML += `
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
            let parentAzkar = this.closest(".azkar-section"); 
            if (parentAzkar) {
                parentAzkar.classList.toggle("more");
            }
            if(parentAzkar.classList.contains('more')){
                button.textContent ='إخفاء ▼' ;            
            }else{
                button.textContent ='إظهار المزيد ▼' ;            
            }
        });
    });
    //  تحكم في الألوان (Theme)
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
        $("#nav").css('background-color', thems);
        $("footer").css('background-color', thems);
        localStorage.setItem('thems', JSON.stringify(thems));
    });

});
