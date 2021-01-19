import React from "react";
import classNames from "classnames";

export class MoviePagination extends React.Component {
   dots = '...'
   constructor(props) {
      super(props);
      console.log("pagination constructor")

      this.state = {
         page_numbers: []
      }
   }

   getClasses = p => {
      return classNames("page-link", {active: p === this.props.page})
   }
   setPage = p => () => this.props.setPage(p)

   pageNumbers = () => {
      console.log("pagination pageNumbers")

      const {page: currentPage, total_pages: totalPage} = this.props
      let pageRange = 1
      let numbers = []

      let rangeStart = currentPage - pageRange;
      let rangeEnd = currentPage + pageRange;

      if (totalPage < rangeEnd) {
         rangeEnd = totalPage;
         rangeStart = totalPage - pageRange * 2;
         rangeStart = rangeStart < 1 ? 1 : rangeStart;
      }

      if (rangeStart <= 1) {
         rangeStart = 1;
         rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
      }

      if (rangeStart <= 3) {
         for (let i = 1; i < rangeStart; i++)
            numbers.push(i)
      } else {
         numbers.push(1, this.dots)
      }

      for (let i = rangeStart; i <= rangeEnd; i++) {
         numbers.push(i)
      }

      if (rangeEnd >= totalPage - 2) {
         for (let i = rangeEnd + 1; i <= totalPage; i++) {
            numbers.push(i)
         }
      } else {
         numbers.push(this.dots, totalPage)
      }

      this.setState({page_numbers: numbers})
   }

   shouldComponentUpdate(nextProps, nextState, nextContext) {
      let res = this.props.page !== nextProps.page || this.state.page_numbers.length<=1;
      console.log('update?',res)
      return res
   }

   componentDidMount() {
      console.log("pagination mount", this.props, this.state)
      this.pageNumbers()
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log("pagination DidUpdate")
      console.log(prevState, this.state, prevProps.page!==this.props.page)
      if(prevProps.page!==this.props.page){
         this.pageNumbers()
      }
   }

   render() {
      const {page, total_pages} = this.props
      console.log("pagination render", this.state.page_numbers)
      return (
         <div>
            <h4>Current page: {page}{' | '} Total Pages: {total_pages}</h4>
            <nav aria-label="Page navigation example">
               <ul className="pagination">
                  <li className={classNames("page-item", {disabled: page <= 1})}>
                     <span className="page-link" aria-label="Previous"
                           onClick={this.setPage(page - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                     </span>
                  </li>

                  {this.state.page_numbers.map((number,idx) => {
                     return (
                        <li key={idx}
                            className={classNames("page-item", {active: page === number}, {disabled: number === this.dots})}>
                            <span className="page-link"
                                  onClick={this.setPage(number)}>
                            {number}
                            </span>
                        </li>
                     )
                  })}

                  <li className="page-item">
                     <span className="page-link" aria-label="Next"
                           onClick={this.setPage(page + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                     </span>
                  </li>
               </ul>
            </nav>
         </div>
      );
   }
}