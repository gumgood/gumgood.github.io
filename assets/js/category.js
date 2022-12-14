const i_toggles = document.querySelectorAll("i.toggle").forEach((i) => {
    i.addEventListener("click", function () {
        i.classList.toggle('rotate');
        for (var li = i.parentNode; (li = li.nextElementSibling) && li.classList.contains('subcategory');)
            li.classList.toggle('hidden');
    });
});