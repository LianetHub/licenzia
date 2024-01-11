"use strict";

$(function () {



    // tooltips 
    if ($('.info-tooltip').length > 0) {
        $('.info-tooltip').tooltip();
    }

    // click handlers

    $(document).on('click', function (e) {
        let $target = $(e.target);


        // open mobile menu 
        if ($target.hasClass('icon-menu') || $target[0].closest('.sidebar__close')) {
            $("body").toggleClass('open-menu');
            $('.sidebar').toggleClass('active');
        }

        // open submenu in catalog
        if ($target.hasClass('sidebar__menu-btn')) {
            $target.toggleClass('active');
            $target.next().slideToggle();
        }

        // delete table row
        if ($target[0].closest('.table__delete')) {
            // let $table = $target.closest('.table');
            $target.closest('tr').remove();

            // if ($table.find('tbody').find('tr').length === 0) {
            //     $table.hide();
            // }
        }

        // copy btn
        if ($target[0].closest('[data-copy]')) {
            let $copyBtn = $target.closest('[data-copy]');
            copyToClipboard($copyBtn);
        }

        // open drafts body
        if ($target[0].closest('.bid__drafts-btn')) {
            $target.closest('.bid__drafts-btn').toggleClass('open').next().slideToggle()
        }

        // bid hand write
        if ($target[0].hasAttribute('data-hand')) {
            $('.bid__form').addClass('active');
            $('.bid-company-info').addClass('visible');
            $('.bid__search-input').val($target.text())
        }
        // bid company no reg
        if ($target[0].hasAttribute('data-no-reg')) {
            $('.bid__form').addClass('active');
            $('.bid-company-info').removeClass('visible');
            $('.bid__search-input').val($target.text())
        }

        // bid company 
        if ($target[0].closest('[data-id-company]')) {

            let $companyValue = $target.closest('[data-id-company]').data("id-company");

            $('.bid__form').addClass('active');
            $('.bid__result').addClass('active');
            $('.bid-company-info').removeClass('visible');
            $('.bid__search-input').val($companyValue);
        }

        // delete table row
        if ($target[0].closest('.bid__drafts-delete')) {
            let $draftsWrapper = $target.closest('.bid__drafts-content');
            $target.closest('.bid__drafts-item').remove();
            if ($draftsWrapper.find('.bid__drafts-item').length === 0) {
                $draftsWrapper.html($('<p/>', {
                    class: "bid__drafts-empty",
                    text: "Черновики заявок отсутствуют"
                }))
            }
        }

        // choise card in modal services
        if ($target.hasClass('choise-btn')) {
            $target.toggleClass('selected');
            if ($target.hasClass('selected')) {
                $target.text("Выбрано");
            } else {
                $target.text("Выбрать");

            }
        }

        // save changes in leads step 3
        if ($target.hasClass('bid__save')) {
            $target.addClass('saved');
            $target.text("Сохранено");
        }

        // delete choise service
        if ($target[0].closest('.service-delete')) {
            $target.next().fadeIn();
        }
        if ($target.hasClass('service-delete__body-cancel')) {
            $target.closest('.service-delete__body').fadeOut();
        }
        if ($target.hasClass('service-delete__body-delete')) {
            $target.closest('.services-list__item').remove();
        }

        // get filters
        if ($target[0].closest('.bid__toggler')) {
            $target.closest('.bid__toggler').next().toggleClass('visible')
        }

        // clear filters
        if ($target[0].closest('.bid__filters-clear')) {
            $('.bid__filter-input').each(function (index, item) {
                item.checked = false;
            })
        }




    });


    // drag and drop handler

    $('.file-loader').on('dragover', function (e) {
        e.preventDefault()
        $(this).addClass('over');
    });
    $('.file-loader > .file-loader__input').on('change', function (e) {
        updateDragStatus($(this).closest('.file-loader'), $(this)[0].files[0])
    })
    $('.file-loader').on('dragend', function () {
        $(this).removeClass('over');
    });
    $('.file-loader').on('dragleave', function () {
        $(this).removeClass('over');
    });
    $('.file-loader').on("drop dragdrop", function (e) {
        e.preventDefault();
        if (e.originalEvent.dataTransfer.files.length > 0) {
            let uploadFile = e.originalEvent.dataTransfer.files;
            $(this).find('.file-loader__input').files = uploadFile;
            updateDragStatus($(this), e.originalEvent.dataTransfer.files[0])
        }

    });

    // search handlers

    $('.bid__search-input').on('focus', () => {
        $('.bid__search-input').addClass('focus').closest('.bid__search').find('.bid__search-box').slideDown();
    })
    $('.bid__search-input').on('blur', () => {
        $('.bid__search-input').removeClass('focus').closest('.bid__search').find('.bid__search-box').slideUp();
    })


    // grid toggler 
    $('[name="grid-toggler"]').on('change', function (e) {
        const $target = $(e.target);

        if ($target.val() == 'row') {
            $('.grid-list').addClass('row');
        } else {
            $('.grid-list').removeClass('row');

        }

    })


    // functions

    function updateDragStatus(dropZoneElement, file) {

        dropZoneElement.find('.file-loader__desc').addClass('hidden');

        if (dropZoneElement.find('.file-loader__name').length == 0) {
            let $fileName = $('<span/>', {
                class: "file-loader__name",
            })
            dropZoneElement.find('.file-loader__body').append($fileName);
        }

        dropZoneElement.find('.file-loader__name').text(file.name)


    }

    function copyToClipboard($copyBtn) {

        let idCopyBlock = "#" + $copyBtn.data('copy');


        let $temp = $("<input>", {
            class: "hidden",
            type: "text",
            value: ($(idCopyBlock)[0].tagName === "INPUT") ? $(idCopyBlock).val() : $(idCopyBlock).text()
        });
        let $tooltip = $("<div/>", {
            class: 'tooltip',
            text: "Скопировано"
        });
        $copyBtn.append($tooltip);
        $tooltip.fadeIn(300);
        $("body").append($temp);
        $temp[0].select();

        document.execCommand("copy");
        $temp.remove();
        setTimeout(() => {
            $tooltip.remove()
        }, 400)

    }



});



