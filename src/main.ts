import './style.css'

const carouselImages = document.getElementsByClassName('carouselimage') as HTMLCollectionOf<HTMLImageElement>
var page = 1

function rad(degrees:number) {
    return degrees * (Math.PI/180)
}

function lerp(a:number, b:number, t:number) {
    return a + (b - a) * t
}

function sinerp(a:number, b:number, t:number) {
    const x = (t-0.5)*2
    return lerp(a, b, Math.tan( rad(x) ))
}

function nextFrame() {
    return new Promise(requestAnimationFrame)
}

var carouselDb = true
async function scrollCarousel() {
    if (!carouselDb) {
        return
    }
    carouselDb = false

    const start = page * 100
    page--
    if (page <= -2) {page = 1}
    const goal = page * 100
    
    for (let t = 0; t < 1; t+=0.025) {
        await nextFrame()
        for (const i of carouselImages) {
            i.style.transform = `translateX(${lerp(start, goal, t)}%)`
        }
    }

    carouselDb = true
}

function colorEverythingBecauseItsFunny() {
    // for (const i of document.getElementsByTagName('div')) {
    //     const randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 
    //     i.style.backgroundColor = randomColor
    // }

    // for (const i of document.getElementsByTagName('li')) {
    //     const randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 
    //     i.style.backgroundColor = randomColor
    // }

    // for (const i of document.getElementsByTagName('ul')) {
    //     const randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 
    //     i.style.backgroundColor = randomColor
    // }
}


for (const i of carouselImages) {
    i.onclick = function() {
        scrollCarousel()
    }
}
colorEverythingBecauseItsFunny()