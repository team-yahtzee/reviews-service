import $ from 'jquery';
import ReactPaginate from 'react-paginate';

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 7);
    
    this.props.setOffset(offset);

    $(document).ready(function(){
      $( "a.scrollLink" ).click((event) => {
          event.preventDefault();
          $("html, body").animate({ scrollTop: $('#anchor').offset().top - 15 }, 500);
      });
    });
  }

  buildHref() {
    let pageNumbers = document.getElementsByTagName('a');
    for (let i = 0; i < pageNumbers.length; i++) {
      pageNumbers[i].href = "anchor"
    }
  }

  render() {
    return (
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        itemClass={'item'}
        pageClassName={'page'}
        pageCount={this.props.pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        hrefBuilder={this.buildHref}
        pageLinkClassName={'scrollLink'}
        previousLinkClassName={'scrollLink'}
        nextLinkClassName={'scrollLink'}
        disabledClassName={'disabledButtons'}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    );
  }
}

export default Pagination;