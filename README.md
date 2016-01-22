# Bootstrap wysihtml5 for Rails

[![Gem Version](https://badge.fury.io/rb/bootstrap-wysihtml5-rails.png)](http://badge.fury.io/rb/bootstrap-wysihtml5-rails)

[![endorse](https://api.coderwall.com/nerian/endorsecount.png)](https://coderwall.com/nerian)

[Bootstrap](http://getbootstrap.com) is a toolkit from Twitter designed to kickstart development of webapps and sites. It includes base CSS and HTML for typography, forms, buttons, tables, grids, navigation, and more.

http://getbootstrap.com/

Bootstrap Wysihtml5 is a plugin for Bootstrap designed by James Hollingworth. It provides a stylish wysiwyg editor for Bootstrap. We use Christian Sterzl's fork.

https://github.com/bootstrap-wysiwyg/bootstrap3-wysiwyg

bootstrap-wysihtml5-rails project integrates it with Rails 3 assets pipeline.

https://github.com/Nerian/bootstrap-wysihtml5-rails

__This repo is only for packaging bootstrap-wysihtml5 into a ruby gem. If yor Pull Request is about changing bootstrap-wysihtml5 (any file in the 'vendor' folder) please create it in their repository, not here.__

__Latest version with Bootstrap 2 support was `0.3.1.24`. New releases only package Bootstrap 3 support.__

## Rails > 3.1
Include bootstrap-wysihtml5-rails in Gemfile;

``` ruby
gem 'bootstrap-wysihtml5-rails'
```

or you can install from latest build;

``` ruby
gem 'bootstrap-wysihtml5-rails', github: 'nerian/bootstrap-wysihtml5-rails'
```
and run `bundle install`.

This gem doesn't include Bootstrap. You can get Bootstrap here: https://github.com/twbs/bootstrap-sass

## Configuration

Bootstrap-wysihtml5 depends on bootstrap and jQuery.

app/assets/stylesheets/application.css
``` css
*= require bootstrap-wysihtml5
```

if you are using SASS: app/assets/stylesheets/application.scss
``` scss
@import "bootstrap-wysihtml5/bootstrap3-wysihtml5";
```

app/assets/javascripts/application.js
```javascript
//= require bootstrap-wysihtml5

You may include all locales like this:

//= require bootstrap-wysihtml5/locales

Or just add the ones that you want

//= require bootstrap-wysihtml5/locales/de-DE
//= require bootstrap-wysihtml5/locales/es-ES
```

`//= require bootstrap-wysihtml5` will embed both wysihtml5x and handlebars. But you can fine tune what you require, like this:

```javascript
//= require bootstrap-wysihtml5/wysihtml5x-toolbar.js
//= require bootstrap-wysihtml5/handlebars.runtime.min.js

//= require bootstrap-wysihtml5/minimum
```

You may need to restart your rails server.

## Using bootstrap-wysihtml5-rails directly

Just call wysihtml5() with any selector.

```html
<textarea id="some-textarea" class='wysihtml5' placeholder="Enter text ..."></textarea>

<script type="text/javascript">
  $(document).ready(function(){

    $('.wysihtml5').each(function(i, elem) {
      $(elem).wysihtml5();
    });

  })
</script>

```

## Using bootstrap-wysihtml5-rails with simple_form

There is `simple_form` input which you can apply via `as: :wysihtml5` option.

```erb
<%= f.input :content, as: :wysihtml5 %>
```
Or with [bootstrap3-wysiwyg](https://github.com/bootstrap-wysiwyg/bootstrap3-wysiwyg#options) options

```erb
<%= f.input :content, as: :wysihtml5, wysihtml5: { locale: "es-ES" } %>
```

## If using Turbolinks

```
$(document).on('page:load', function(){
  window['rangy'].initialized = false
})
```

## Using bootstrap-wysihtml5-rails with Font Awesome

In the case you're not using Glyphicons but Font-Awesome, here is how to make Wysihtml5 use Font-Awesome :

```javascript
$(elem).wysihtml5({ toolbar:{ "fa": true } });
```

## Passing options

To activate direct html editing and disable blockquote:
```
  $('.wysihtml5').wysihtml5({'toolbar': {'blockquote': false, 'html': true}})
```

Toolbal default options are:

```
toolbar: {
      'font-styles': true,
      'color': false,
      'emphasis': {
        'small': true
      },
      'blockquote': true,
      'lists': true,
      'html': false,
      'link': true,
      'image': true,
      'smallmodals': false
    }
```

## License
Copyright (c) 2012-2014 Gonzalo Rodríguez-Baltanás Díaz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
