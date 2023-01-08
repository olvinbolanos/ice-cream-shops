 import React, {Component} from 'react'
 import '../../App.css'

 class Carousel extends Component {
  
    carouselRender = ( source, activeItem, handleEvent ) => {
  
       const indicators = source.map(( item, i ) => {
         let itemClass = '';
         if( item.id === activeItem ){
           itemClass += ' active';
         }
         
         return <li key={i} data-target="#demo" data-slide-to="1" className={ itemClass }
                 onClick={ e => handleEvent( e, 'clickItem', item )}>></li>;
      });   
      
      const imgs = source.map(( item, i ) => {
        let itemClass = 'carousel-item';
        if( item.id === activeItem ){
          itemClass += ' active';
        }
        return <div key={i} className={ itemClass }>
          <img src={item.src} className="img-fluid" alt="New York" />
        </div>;
      });
    
      return <div id="demo" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators">
                  { indicators }
                </ul>
                <div className="carousel-inner">
                  { imgs }
                </div>
                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                  <span className="carousel-control-prev-icon"
                    onClick={e => handleEvent( e, 'prevItem', {}, source )}>
                  </span>
                </a>
                <a className="carousel-control-next" href="#demo" data-slide="next">
                  <span className="carousel-control-next-icon"
                    onClick={e => handleEvent( e, 'nextItem', {}, source )}>
                  </span>
                </a>
              </div>;
    };
    render() {
        const { itemsSrc, activeItem, handleEvent } = this.props;    
        return <div>{this.carouselRender( itemsSrc, activeItem, handleEvent ) }</div>;    
      }
    }

    export default Carousel