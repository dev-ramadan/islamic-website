const navitem = document.querySelector("#nav");
const NavBar = `

<nav class="them navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="dist/image/loo.png" class="logo img-fluid"></img></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <i class="fa-solid fa-bars menu"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <div class="col-lg-6">

       </div>
       <ul class="navbar-nav me-auto mb-2 mb-lg-0 col-lg-6 justify-content-around">
       <li><a class="list" href="dous.html">أدعية <i class="fas fa-pray"></i></a></li>
       <li><a class="list" href="azkar.html">أذكار <i class="fa fa-book"></i></a></li>
       <li><a class="list" href="time.html">مواقيت الصلاة <i class="fa fa-mosque"></i></a></li>
       <li><a class="list" href="moshf.html"> القران الكريم <i class="fa-solid fa-book-open"></i></a></li>
       <li><a class="list" href="index.html">الرئيسية <i class="fa fa-home"></i></a></li>
      </ul>
      </div>
    </div>
  </nav>
`;
navitem.innerHTML = NavBar;