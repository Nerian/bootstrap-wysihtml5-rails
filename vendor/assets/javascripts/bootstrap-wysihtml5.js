!function($, wysi) {
    "use strict";

    var templates = {
        "font-styles": "<li class='dropdown'>" +
                           "<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>" +
                               "<i class='icon-font'></i>&nbsp;<span class='current-font'>Normal text</span>&nbsp;<b class='caret'></b>" +
                           "</a>" +
                           "<ul class='dropdown-menu'>" +
                               "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div'>Normal text</a></li>" +
                               "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1'>Heading 1</a></li>" +
                               "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2'>Heading 2</a></li>" +
                           "</ul>" +
                       "</li>",
        "emphasis":    "<li>" +
                           "<div class='btn-group'>" +
                               "<a class='btn' data-wysihtml5-command='bold' title='CTRL+B'><i class='icon-bold'></i></a>" +
                               "<a class='btn' data-wysihtml5-command='italic' title='CTRL+I'><i class='icon-italic'></i></a>" +
                               "<a class='btn' data-wysihtml5-command='underline' title='CTRL+U'><i class='icon-underline'></i></a>" +
                           "</div>" +
                       "</li>",
        "lists":       "<li>" +
                           "<div class='btn-group'>" +
                               "<a class='btn' data-wysihtml5-command='insertUnorderedList' title='Unordered List'><i class='icon-list'></i></a>" +
                               "<a class='btn' data-wysihtml5-command='insertOrderedList' title='Ordered List'><i class='icon-th-list'></i></a>" +
                               "<a class='btn' data-wysihtml5-command='Outdent' title='Outdent'><i class='icon-indent-right'></i></a>" +
                               "<a class='btn' data-wysihtml5-command='Indent' title='Indent'><i class='icon-indent-left'></i></a>" +
                           "</div>" +
                       "</li>",
        "link":        "<li>" +
                           "<div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>" +
                               "<div class='modal-header'>" +
                                   "<a class='close' data-dismiss='modal'>&times;</a>" +
                                   "<h3>Insert Link</h3>" +
                               "</div>" +
                               "<div class='modal-body'>" +
                                    "<div class='control-group'>" +
                                      "<label class='control-label'>Text to display</label>" +
                                        "<div class='controls'>" +
                                          "<input class='bootstrap-wysihtml5-insert-link-url-display-text input-xlarge'>" +
                                        "</div>" + 
                                    "</div>" +
                                    "<div class='control-group'>" +
                                      "<label class='control-label'>Link</label>" +
                                        "<div class='controls'>" +
                                          "<input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>" +
                                        "</div>" + 
                                    "</div>" +
                               "</div>" +
                               "<div class='modal-footer'>" +
                                   "<a href='#' class='btn' data-dismiss='modal'>Cancel</a>" +
                                   "<a href='#' class='btn btn-primary' data-dismiss='modal'>Insert link</a>" +
                               "</div>" +
                           "</div>" +
                           "<a class='btn' data-wysihtml5-command='createLink' title='Insert link'><i class='icon-link'></i></a>" +
                       "</li>",
        "image":       "<li>" +
                           "<div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'>" +
                               "<div class='modal-header'>" +
                                   "<a class='close' data-dismiss='modal'>&times;</a>" +
                                   "<h3>Insert Image</h3>" +
                               "</div>" +
                               "<div class='modal-body'>" +
                                   "<input value='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge'>" +
                               "</div>" +
                               "<div class='modal-footer'>" +
                                   "<a href='#' class='btn' data-dismiss='modal'>Cancel</a>" +
                                   "<a href='#' class='btn btn-primary' data-dismiss='modal'>Insert image</a>" +
                               "</div>" +
                           "</div>" +
                           "<a class='btn' data-wysihtml5-command='insertImage' title='Insert image'><i class='icon-picture'></i></a>" +
                       "</li>",

        "html":
                       "<li>" +
                           "<div class='btn-group'>" +
                               "<a class='btn' data-wysihtml5-action='change_view' title='Edit HTML'>HTML</a>" +
                           "</div>" +
                       "</li>",

        "customerAttributesDropdown":
                       "<li>" +
                           "<div class='btn-group'>" +
                               "<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>Insert Attribute " +
                                 "<span class='caret'></span>" +
                               "</a>" +
                               "<ul class='dropdown-menu' id='customer-dropdown'>" +
                               "</ul>" + 
                           "</div>" +
                       "</li>"
                     }                      
    

    var defaultOptions = {
        "font-styles": true,
        "emphasis": true,
        "lists": true,
        "html": false,
        "link": true,
        "image": true,
        "customerAttributesDropdown": false,
        customerAttributes: [],
        events: {},
        parserRules: {
            tags: {
                "b":  {},
                "i":  {},
                "br": {},
                "ol": {},
                "ul": {},
                "li": {},
                "h1": {},
                "h2": {},
                "blockquote": {},
                "u": 1,
                "img": {
                    "check_attributes": {
                        "width": "numbers",
                        "alt": "alt",
                        "src": "url",
                        "height": "numbers"
                    }
                },
                "a":  {
                    set_attributes: {
                        target: "_blank",
                        rel:    "nofollow"

                    },
                    check_attributes: {
                        href:   "url" // important to avoid XSS
                    }
                }
            }
        },
        stylesheets: []
    };

    var Wysihtml5 = function(el, options) {
        this.el = el;
        this.toolbar = this.createToolbar(el, options || defaultOptions);
        this.editor =  this.createEditor(options);

        window.editor = this.editor;

        $('iframe.wysihtml5-sandbox').each(function(i, el){
            $(el.contentWindow).off('focus.wysihtml5').on({
              'focus.wysihtml5' : function(){
                 $('li.dropdown').removeClass('open');
               }
            });
        });
    };


    Wysihtml5.prototype = {

        constructor: Wysihtml5,

        createEditor: function(options) {
            options = $.extend(defaultOptions, options || {});
		    options.toolbar = this.toolbar[0];

		    var editor = new wysi.Editor(this.el[0], options);

            if(options && options.events) {
                for(var eventName in options.events) {
                    editor.on(eventName, options.events[eventName]);
                }
            }

            return editor;
        },

        createToolbar: function(el, options) {
            var self = this;
            var toolbar = $("<ul/>", {
                'class' : "wysihtml5-toolbar",
                'style': "display:none"
            });


            for(var key in defaultOptions) {
                var value = false;

                if(options[key] !== undefined) {
                    if(options[key] === true) {
                        value = true;
                    }
                } else {
                    value = defaultOptions[key];
                }

                if(value === true) {

                   if (key != "customerAttributesDropdown") toolbar.append(templates[key]);
                    
                    if(key === "html") {
                        this.initHtml(toolbar);
                    }

                    if(key === "link") {
                        this.initInsertLink(toolbar);
                    }

                    if(key === "image") {
                        this.initInsertImage(toolbar);
                    }

                    if(key === "customerAttributesDropdown") {
                      if (options["customerAttributesDropdown"] === true && options["customerAttributes"] !== undefined) {
                        toolbar.append(templates[key]);
                        this.initInsertCustomerAttributesDropdown(toolbar, options["customerAttributes"]);
                      }
                    }
                }
            }

            if(options.toolbar) {
                for(key in options.toolbar) {
                   toolbar.append(options.toolbar[key]);
                }
            }

            toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function(e) {
                var el = $(e.srcElement);
                self.toolbar.find('.current-font').text(el.html());
            });

            this.el.before(toolbar);

            return toolbar;
        },

        initHtml: function(toolbar) {
            var changeViewSelector = "a[data-wysihtml5-action='change_view']";
            toolbar.find(changeViewSelector).click(function(e) {
                toolbar.find('a.btn').not(changeViewSelector).toggleClass('disabled');
            });
        },

        initInsertCustomerAttributesDropdown: function(toolbar, customerAttributes) {
            var dropdown = toolbar.find('#customer-dropdown');
            if (customerAttributes.length == 0) {
              dropdown.append('<li><a><span class="tab"> No attributes found.</span></a></li>');
            
            } else {
              for (var i = 0; i < customerAttributes.length; i++) {
                dropdown.append('<li><a href="#"><span class="tab">customer.' + customerAttributes[i] + '</span></a></li>');  
              };

              dropdown.find('li').click(function(e) {
                e.preventDefault();
                var attribute = ($(this).find('a span'))[0].innerText;
                self.editor.composer.commands.exec("insertAttribute", attribute);
              });
            }
        },

        initInsertImage: function(toolbar) {
            var self = this;
            var insertImageModal = toolbar.find('.bootstrap-wysihtml5-insert-image-modal');
            var urlInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-url');
            var insertButton = insertImageModal.find('a.btn-primary');
            var initialValue = urlInput.val();

            var insertImage = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.composer.commands.exec("insertImage", url);
            };

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertImage();
                    insertImageModal.modal('hide');
                }
            });

            insertButton.click(insertImage);

            insertImageModal.on('shown', function() {
                urlInput.focus();
            });

            insertImageModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=insertImage]').click(function() {
                insertImageModal.modal('show');
                insertImageModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
					e.stopPropagation();
				});
                return false;
            });
        },

        initInsertLink: function(toolbar) {
            var self = this;
            var insertLinkModal = toolbar.find('.bootstrap-wysihtml5-insert-link-modal');
            var urlInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-url');
            var urlDisplayText = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-url-display-text');
            var insertButton = insertLinkModal.find('a.btn-primary');
            var initialValue = urlInput.val();

            var removeEscapingForLiquidTags = function(url) {
              var LIQUID_OPENING_REG_EXP = "%7B%7B";
              var LIQUID_CLOSING_REG_EXP = "%7D%7D";  
              return url.replace(LIQUID_OPENING_REG_EXP, "{{").replace(LIQUID_CLOSING_REG_EXP, "}}")
            }

            var insertLink = function() {
                var url = urlInput.val();
                url = removeEscapingForLiquidTags(url);
                urlInput.val(removeEscapingForLiquidTags(initialValue));
                var displayText = removeEscapingForLiquidTags(urlDisplayText.val())
                
                if (urlDisplayText.val() == "")
                    displayText = url;
              
                self.editor.composer.commands.exec("createLink", {
                    href: url,
                    target: "_blank",
                    rel: "nofollow",
                    text: displayText,
                });
            };

            var pressedEnter = false;

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertLink();
                    insertLinkModal.modal('hide');
                }
            });

            insertButton.click(insertLink);

            insertLinkModal.on('shown', function() {
                urlInput.focus();
            });

            insertLinkModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=createLink]').click(function() {
                // Clear previous values
                urlInput.val("http://");
                urlDisplayText.val("");

                // Get link and range for cursor
                var link = self.editor.composer.commands.state("createLink");
                var range = self.editor.composer.selection.getRange();
                
                // Update href
                if (link && link[0] && link[0].href) {
                  urlInput.val(removeEscapingForLiquidTags(link[0].href));
                }

                // Make display text equal to the selected range, if range exists
                if (range != "" && range) {
                  urlDisplayText.val(range);
                } 

                // else, if there was a previous display text use that
                else {
                  if (link && link[0] && link[0].text) {
                    urlDisplayText.val(link[0].text);
                  }
                }

                insertLinkModal.modal('show');
                insertLinkModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
					         e.stopPropagation();
				        });
                return false;
            });


        }
    };

    $.fn.wysihtml5 = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.data('wysihtml5', new Wysihtml5($this, options));
        });
    };

    $.fn.wysihtml5.Constructor = Wysihtml5;

}(window.jQuery, window.wysihtml5);
