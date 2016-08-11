/* ===========================================================
 * Bootstrap: fileinput.js v3.1.3
 * http://jasny.github.com/bootstrap/javascript/#fileinput
 * ===========================================================
 * Copyright 2012-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {
    "use strict";

    var isIE = window.navigator.appName == 'Microsoft Internet Explorer';

    // FILEUPLOAD PUBLIC CLASS DEFINITION
    // =================================

    var Fileinput = function (element, options) {
        this.$element = $(element);

        this.$input = this.$element.find(':file');
        if (this.$input.length === 0) return;

        this.name = this.$input.attr('name') || options.name;
        // console.log(this.name);

        this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]');
        if (this.$hidden.length === 0) {
            this.$hidden = $('<input type="hidden">').insertBefore(this.$input)
        }

        this.$preview = this.$element.find('.fileinput-preview');
        var height = this.$preview.css('height');
        if (this.$preview.css('display') !== 'inline' && height !== '0px' && height !== 'none') {
            this.$preview.css('line-height', height)
        }

        this.original = {
            exists: this.$element.hasClass('fileinput-exists'),
            preview: this.$preview.html(),
            hiddenVal: this.$hidden.val()
        };

        // console.log(123);
        // console.log(this.original.hiddenVal);

        this.listen()
    };

    Fileinput.prototype.trigger = function (e) {
        this.$input.trigger('click');
        e.preventDefault()
    },

        Fileinput.prototype.listen = function () {
            this.$input.on('change.bs.fileinput', $.proxy(this.change, this));
            $(this.$input[0].form).on('reset.bs.fileinput', $.proxy(this.reset, this));

            this.$element.find('[data-trigger="fileinput"]').on('click.bs.fileinput', $.proxy(this.trigger, this));
            this.$element.find('[data-dismiss="fileinput"]').on('click.bs.fileinput', $.proxy(this.clear, this))
        },


            Fileinput.prototype.change = function (e) {
                // console.log(e);
                var files = e.target.files === undefined ? (e.target && e.target.value ? [{name: e.target.value.replace(/^.+\\/, '')}] : []) : e.target.files;


                // console.log(files);

                e.stopPropagation();

                if (files.length === 0) {
                    this.clear();
                    return
                }

                this.$hidden.val('');
                this.$hidden.attr('name', '');
                this.$input.attr('name', this.name);

                var file = files[0];

                // console.log(file.name);

                if (this.$preview.length > 0 && (typeof file.type !== "undefined" ? file.type.match(/^image\/(gif|png|jpeg)$/) : file.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader !== "undefined") {
                    var reader = new FileReader();
                    var preview = this.$preview;
                    var element = this.$element;
                    reader.onload = function (re) {
                        var $img = $('<img>');
                        $img[0].src = re.target.result;
                        files[0].result = re.target.result;

                        element.find('.fileinput-filename').text(file.name);


                        // if parent has max-height, using `(max-)height: 100%` on child doesn't take padding and border into account
                        if (preview.css('max-height') != 'none') $img.css('max-height', parseInt(preview.css('max-height'), 10) - parseInt(preview.css('padding-top'), 10) - parseInt(preview.css('padding-bottom'), 10) - parseInt(preview.css('border-top'), 10) - parseInt(preview.css('border-bottom'), 10))

                        preview.html($img);
                        element.addClass('fileinput-exists').removeClass('fileinput-new');

                        element.trigger('change.bs.fileinput', files)
                    };

                    reader.readAsDataURL(file)
                } else {
                    if (files.length > 1) {
                        //console.log('many files');

                        this.$element.find('.fileinput-filename').text('Выбрано файлов: ' + files.length);
                        this.$preview.text(file.name);
                        this.$element.addClass('fileinput-exists').removeClass('fileinput-new');
                        this.$element.trigger('change.bs.fileinput')
                    } else {
                        //console.log('1 file');

                        this.$element.find('.fileinput-filename').text(file.name);
                        this.$preview.text(file.name);
                        this.$element.addClass('fileinput-exists').removeClass('fileinput-new');
                        this.$element.addClass('fileChanged');
                        this.$element.trigger('change.bs.fileinput')
                    }
                }
            },

            Fileinput.prototype.clear = function (e) {
                //добавил setTimeout иначе не работало в IE
                var that = this;
                setTimeout(function () {
                    if (e) e.preventDefault();

                    that.$hidden.val('');
                    that.$hidden.attr('name', that.name);
                    that.$input.attr('name', '');

                    //ie8+ doesn't support changing the value of input with type=file so clone instead
                    if (isIE) {
                        var inputClone = that.$input.clone(true);
                        that.$input.after(inputClone);
                        that.$input.remove();
                        that.$input = inputClone;
                    } else {
                        that.$input.val('')
                    }

                    that.$preview.html('');
                    that.$element.find('.fileinput-filename').text('');
                    that.$element.addClass('fileinput-new').removeClass('fileinput-exists');
                    that.$element.removeClass('fileChanged');

                    if (e !== undefined) {
                        that.$input.trigger('change');
                        that.$element.trigger('clear.bs.fileinput')
                    }
                }, 10);
            },

            Fileinput.prototype.reset = function () {
                this.clear()
                this.$hidden.val(this.original.hiddenVal)
                this.$preview.html(this.original.preview)
                this.$element.find('.fileinput-filename').text('')

                if (this.original.exists) this.$element.addClass('fileinput-exists').removeClass('fileinput-new')
                else this.$element.addClass('fileinput-new').removeClass('fileinput-exists')

                this.$element.trigger('reset.bs.fileinput')
            };

    // console.log('Fileinput');
    // console.log(Fileinput());

    // FILEUPLOAD PLUGIN DEFINITION
    // ===========================

    var old = $.fn.fileinput;

    $.fn.fileinput = function (options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.fileinput');
            if (!data) $this.data('bs.fileinput', (data = new Fileinput(this, options)))
            if (typeof options == 'string') data[options]()
        })
    };

    $.fn.fileinput.Constructor = Fileinput


    // FILEINPUT NO CONFLICT
    // ====================

    $.fn.fileinput.noConflict = function () {
        $.fn.fileinput = old;
        return this
    };


    // FILEUPLOAD DATA-API
    // ==================

    $(document).on('click.fileinput.data-api', '[data-provides="fileinput"]', function (e) {
        var $this = $(this);
        if ($this.data('bs.fileinput')) return;
        $this.fileinput($this.data());

        var $target = $(e.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');
        if ($target.length > 0) {
            e.preventDefault();
            $target.trigger('click.bs.fileinput')
        }
    })

}(window.jQuery);
