import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Pagination from '../Pagination'
import Carousel from '../Carousel'
import '../../App.css'

const timer = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date()
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${months[month]} ${day}, ${year}`
}

// let slideIndex = 1;
// // Next/previous controls
// const plusSlides = n => {
//     showSlides(slideIndex += n)
// }

// // Thumbnail image control
// const currentSlide = n => {
//     showSlides(slideIndex = n)
// }

// const showSlides = n => {
//     let i;
//     let slides = document.getElementsByClassName('slides')
//     let dots = document.getElementsByClassName('dot')

//     {
//         if (n > slides) {
//             slideIndex = 1
//         } else if (n < 1) {
//             slideIndex = slides.length

//         }
//     }
//     let sliders = []
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = 'none' 
//         sliders.push()
//     }

//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(' active', '');
//     }

//     slides[slideIndex - 1].style.display = 'block'
//     dots[slideIndex-1].className += ' active'
// }
  

    class Landing extends Component {
        constructor(props) {
            super(props)
            this.state = {
                activeItem: 0
            }
        }

        handleEvent = (e, actionType, item, items) => {
            e.preventDefault()
            let itemsLength, activeItem

            switch( actionType ) {
                case 'clickItem':
                    this.setState({
                        activeItem: item.id
                    })
                break;
                case 'prevItem':
                    activeItem = this.state.activeItem;
                    if (activeItem === 0) {
                        break
                    }

                    activeItem -= 1
                    this.setState({activeItem})
                break;
                case 'nextItem':
                    itemsLength = items.length;
                    activeItem = this.state.activeItem
                    if (activeItem === itemsLength - 1) {
                        break
                    }
                    activeItem += 1
                    this.setState({ activeItem })
                break
            }
        }

        render() {
            let props = this.props
            const { activeItem } = this.state
            props = {...props, handleEvent: this.handleEvent, activeItem}
            return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1">
                        </div>
                        <div className="col-10">
                            <Pagination {...props} />
                            <Carousel {...props} />
                        </div>
                        <div className="col-1">
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }

export default withRouter(Landing)


