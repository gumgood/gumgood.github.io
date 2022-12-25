document.querySelectorAll("i.triangle-down").forEach((i) => {
    i.addEventListener("click", function () {
        i.toggleAttribute('rotate');
        for (var li = i.parentNode; (li = li.nextElementSibling) && li.classList.contains('subcategory');)
            li.toggleAttribute('hidden');
    });
});