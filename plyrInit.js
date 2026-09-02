//Plyr Initialize
const players = Array.from(document.querySelectorAll('.js-player')).map((p) => new Plyr(p));

//SPLIDE SLIDESHOW
var splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 5500,
});

splide.on('moved', function (newIndex) {

    document.querySelectorAll('.slide-content').forEach(btn => {
        btn.classList.remove('animShow');
    });

    const activeSlide = splide.Components.Slides.getAt(newIndex);

    activeSlide.slide.querySelector('.slide-content')?.classList.add('animShow');

    console.log(newIndex);
});

splide.mount();
