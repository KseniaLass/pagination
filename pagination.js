class Pagination {
    constructor(options) {
        this.$el = options.$el;
        this.length = options.length;
        this.offset = options.offset;

        this.page = 1;

        this.showOffset =  Math.floor(this.offset/2)
    }

    init() {
        this._renderHTML();
        this._setActive();
        this._showCurrentNumber();

        $('body').on('click', '.page-item', (e) => {
            e.preventDefault();
            this.page = $(e.target).closest('.page-item').data('page');

            this._setActive();
            this._showCurrentNumber();
        });
    }

    _renderHTML() {
        let html = '';

        for(let i = 1; i < this.length+1; i++) {
            if(i === 1) {
                html += `<li class="page-item static" data-page=${i}><a class="page-link" href="#">${i}</a></li>`;
                if(this.length > this.offset+2) {
                    html += `<li class="page-item page-ellipsis disabled" data-page="increment"><span class="page-link">...</span></li>`;
                }
            } else if (i === this.length) {
                if(this.length > this.offset+2) {
                    html += `<li class="page-item page-ellipsis disabled" data-page="decrement"><span class="page-link">...</span></li>`;
                }
                html += `<li class="page-item static" data-page=${i}><a class="page-link" href="#">${i}</a></li>`;
            } else {
                html += `<li class="page-item" data-page=${i}><a class="page-link" href="#" >${i}</a></li>`;
            }
        }

        this.$el.append(html);
    }

    _setActive() {
        this.$el.find('.page-item').removeClass('active');
        this.$el.find('.page-item[data-page="'+this.page+'"]').addClass('active');
    }

    _checkEllipsis() {
        if(this.page <= this.offset) {
            this.$el.find('.page-item[data-page="increment"]').addClass('hidden');
        } else {
            this.$el.find('.page-item[data-page="increment"]').removeClass('hidden');
        }

        if(this.page >= this.length - this.offset+1) {
            this.$el.find('.page-item[data-page="decrement"]').addClass('hidden');
        } else {
            this.$el.find('.page-item[data-page="decrement"]').removeClass('hidden');
        }
    }

    _showCurrentNumber() {

        this._checkEllipsis();
        let start, end;

        if(this.page <= this.offset) {
            start = 0;
            end = this.offset+1;
        } else if (this.page > this.length - this.offset) {
            start = this.length - this.offset;
            end = this.length;
        } else {
            start = this.page - this.showOffset;
            end = this.page + this.showOffset;
        }

        this.$el.find('.page-item:not(.page-ellipsis)').removeClass('show').addClass('hidden');

        for(let i = start; i < end+1; i++) {
            this.$el.find('.page-item:not(.page-ellipsis)').eq(i-1).removeClass('hidden').addClass('show')
        }

    }
}