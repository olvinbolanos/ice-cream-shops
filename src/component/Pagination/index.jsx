import React, {Component} from 'react'
import '../../App.css'

class Pagination extends Component {
  
    paginationRender = ( source, activeItem, handleEvent ) => {
  
      const items = source.map(( item, i ) => {
        let itemClass = 'page-item';
        if( item.id === activeItem ){
          itemClass += ' active';
        }
        return <li key={i} className={ itemClass }>
          <a className="page-link" href="#"
          onClick={ e => handleEvent( e, 'clickItem', item )}>
            { i + 1 }</a>
        </li>;
      });
  
      return <ul className="pagination pagination-sm justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" 
            onClick={e => handleEvent( e, 'prevItem', {}, items )}>Prev</a>
        </li>
        {items}
        <li className="page-item">
          <a className="page-link" href="#"
            onClick={e => handleEvent( e, 'nextItem', {}, items )}>Next</a>
        </li>
      </ul>;
    };
  
    render() {
      const { itemsSrc, activeItem, handleEvent } = this.props;
  
      return <div>{this.paginationRender( itemsSrc, activeItem, handleEvent ) }</div>;
    }
  }

  export default Pagination