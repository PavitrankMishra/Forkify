import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        // Page 1, there are other pages
        if(this._data.page === 1 && numPages > 1) {
            return '1 & other pages';
        }

        // Last Page
        if(this._data.page === numPages && numPages > 1) {
            return 'Last Page';
        }

        // Other Page
        if(this._data.page < numPages) {
            return 'other pages';
        }

        // Page1 ans there are no other pages
        return 'Only 1 Page';
    }
}

export default new PaginationView();