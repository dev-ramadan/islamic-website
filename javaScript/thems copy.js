const themBox = document.querySelector("#thems");
const arrow = document.querySelector("#x")
const thems = `
<div class="box">
<div class="colors">
<h4>choose color :</h4>
<span data-color="#111425" class="color-item"></span>
<span data-color="brown" class="color-item"></span>
<span data-color="teal" class="color-item"></span>
<span data-color="slategrey" class="color-item"></span>
<span data-color="blue" class="color-item"></span>
<span data-color="cornflowerblue" class="color-item"></span>

</div>
    <i class="fa-solid fa-gear"></i>
</div>
`
themBox.innerHTML = thems