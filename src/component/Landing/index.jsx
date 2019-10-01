import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Pagination from '../Pagination'
import Carousel from '../Carousel'
import '../../App.css'

const timer = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${months[month]} ${day}, ${year}`
}
  
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
                break;
                default:
                    console.log('could not send back images')
            }
        }

        render() {
            let props = this.props
            const { activeItem } = this.state
            props = {...props, handleEvent: this.handleEvent, activeItem}
            return (
            <div className="landingBody">
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
              <div>
                  <div className="landing">
                      <p className="landingTimer">{timer()}</p>
                      <h2 className="landingHeading">Welcome to your icecream finder</h2>
                  </div>
            </div>
            </div>
            )
        }
    }

export default withRouter(Landing)


