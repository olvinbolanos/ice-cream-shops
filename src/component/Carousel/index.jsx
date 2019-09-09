 import React, {Component} from 'react'

 class Carousel extends Component {
    constructor( props ){
      super( props );
    }
  
    carouselRender = (  source, activeItem, handleEvent ) => {
      //console.info('Carousel->carouselRender [0]', { source, state: this.state });
  
       const indicators = source.map(( item, i ) => {
        let itemClass = '';
        if( item.id === activeItem ){
          itemClass += ' active';
        }
        //console.info('Carousel->carouselRender [3]', { id: item.id, item, pageItemClass, activeItem: activeItem });
        return <li key={i} data-target="#demo" data-slide-to="1" className={ itemClass }
                 onClick={ e => handleEvent( e, 'clickItem', item )}>></li>;
      });   
      
      const imgs = source.map(( item, i ) => {
        let itemClass = 'carousel-item';
        if( item.id === activeItem ){
          itemClass += ' active';
        }
        //console.info('Carousel->carouselRender [5]', { id: item.id, item, pageItemClass, activeItem: activeItem });
        return <div key={i} className={ itemClass }>
          <img src={item.src} className="img-fluid" alt="New York" />
        </div>;
      });
    
      //console.info('Carousel->carouselRender [7]', { });
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
        //console.info('MenuContent->render()', { source });
    
        return <div>{this.carouselRender( itemsSrc, activeItem, handleEvent ) }</div>;    
      }
    }

    export default Carousel