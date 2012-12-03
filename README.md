# Bootstrap Wysihtml5 for Rails

Bootstrap is a toolkit from Twitter designed to kickstart development of webapps and sites.
It includes base CSS and HTML for typography, forms, buttons, tables, grids, navigation, and more.

http://twitter.github.com/bootstrap/

Bootstrap Wysihtml5 is a plugin for Bootstrap designed by James Hollingworth. It provides a stylish wysiwyg editor for Bootstrap.

https://github.com/jhollingworth/bootstrap-wysihtml5

bootstrap-wysihtml5-rails project integrates it with Rails 3 assets pipeline.

https://github.com/Nerian/bootstrap-wysihtml5-rails


## Rails > 3.1
Include bootstrap-wysihtml5-rails in Gemfile;

``` ruby
gem 'bootstrap-wysihtml5-rails'
```

or you can install from latest build;

``` ruby
gem 'bootstrap-wysihtml5-rails', :require => 'bootstrap-wysihtml5-rails',
                              :git => 'git://github.com/Nerian/bootstrap-wysihtml5-rails.git'
```

and run bundle install.

This gem doesn't include Bootstrap. You can get Bootstrap here: https://github.com/anjlab/bootstrap-rails 

## Configuration

app/assets/stylesheets/application.css

``` css
*= require bootstrap-wysihtml5
```

Bootstrap-wysihtml5 depends on jquery and bootstrap-button. Make sure to require it in the manifest file.

``` javascript
//= require jquery            # Not included
//= require bootstrap-button  # Not included
```

Add necessary javascript(s) files to app/assets/javascripts/application.js

```javascript
//= require bootstrap-wysihtml5

You may include all locales like this:

//= require bootstrap-wysihtml5/locales

Or just add the ones that you want

//= require bootstrap-wysihtml5/locales/de-DE
//= require bootstrap-wysihtml5/locales/es-ES
```

You may need to restart your rails server.

## Using bootstrap-wysihtml5-rails

Just call wysihtml5() with any selector.

```html
<textarea id="some-textarea" class='wysihtml5' placeholder="Enter text ..."></textarea>
	
<script type="text/javascript">
  $('.wysihtml5').each(function(i, elem) {
    $(elem).wysihtml5();
  });
</script>

```

A live example:  http://jsfiddle.net/5UUrg/

## License
Copyright (c) 2011 Gonzalo Rodríguez-Baltanás Díaz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
