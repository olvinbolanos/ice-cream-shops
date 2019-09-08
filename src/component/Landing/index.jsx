import React from 'react'
import '../../App.css'

const timer = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date()
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${months[month]} ${day}, ${year}`
}

let slideIndex = 1;

// Next/previous controls
const plusSlides = n => {
    showSlides(slideIndex += n)
}

// Thumbnail image control
const currentSlide = n => {
    showSlides(slideIndex = n)
}

const showSlides = n => {
    let i;
    let slides = document.getElementsByClassName('slides')
    let dots = document.getElementsByClassName('dot')
    
    if (n > slides.length) {
      slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[slideIndex - 1].style.display = 'block'
    dots[slideIndex-1].className += ' active'
}

showSlides(slideIndex)

const Landing = () => (
    <div className="landingBody">
        <h1 className="landing">Landing</h1>
        <div className="landing">{timer()}</div>
        <div>
            <p className="landingTheme">
            Find the Best Icecream Shops, While Avoiding Those That Have A Low Rating
            </p>
            <p className="landing">Brought to you by: Olvin Bolaños</p>
        </div>

        {/**** slideContainer ***/}
       
        <div className="slides fade">
            {/* catch the number and caption text */}
            <div className="slides fade">
                <div className="numbertext">1 / 3</div>
                <img src="https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_800/https://gunthersicecream.com/wp-content/uploads/2019/03/icecream-menu-feature.jpg" className="carousel-img" alt="images of icecream" />
                <div className="text">Caption Text</div>
            </div>
        <div className="slides fade">
            <div className="numbertext">2 / 3</div>
            <img src="https://images.pexels.com/photos/209424/pexels-photo-209424.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" className="carousel-img" alt="images of icecream"/>
            <div className="text">Caption Two</div>
        </div>
        <div className="slides fade">
            <div className="numbertext">3 / 3</div>
            <img src="https://jessicainthekitchen.com/wp-content/uploads/2018/08/Vegan-Mango-Ice-Cream-3-Ingredients-6.jpg" className="carousel-img" alt=""/>
            <div className="text">Caption Three</div>
        </div>  
         {/* Next and previous buttons */}
        <a className="prev" onClick={plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={plusSlides(1)}>&#10095;</a>
        </div>  

        {/* The dots/circles  */}
    <div className="alignTheDots">
        <span className="dot" onClick={currentSlide(1)}></span>
        <span className="dot" onClick={currentSlide(2)}></span>
        <span className="dot" onClick={currentSlide(3)}></span>
    </div> 
</div>
)

export default Landing