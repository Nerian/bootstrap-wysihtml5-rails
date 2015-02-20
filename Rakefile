#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)
require 'json'

BASE_FOLDER = 'bower_components/bootstrap3-wysihtml5-bower/dist'
WYSIHTMLX = 'bower_components/wysihtml5x/dist'
HANDLEBARS = 'bower_components/handlebars'
COLORS = '"._wysihtml5-temp     { display: none; }",
        ".wysiwyg-color-black {color: black;}",
        ".wysiwyg-color-silver {color: silver;}",
        ".wysiwyg-color-gray {color: gray;}",
        ".wysiwyg-color-white {color: white;}",
        ".wysiwyg-color-maroon {color: maroon;}",
        ".wysiwyg-color-red {color: red;}",
        ".wysiwyg-color-purple {color: purple;}",
        ".wysiwyg-color-fuchsia {color: fuchsia;}",
        ".wysiwyg-color-green {color: green;}",
        ".wysiwyg-color-lime {color: lime;}",
        ".wysiwyg-color-olive {color: olive;}",
        ".wysiwyg-color-yellow {color: yellow;}",
        ".wysiwyg-color-navy {color: navy;}",
        ".wysiwyg-color-blue {color: blue;}",
        ".wysiwyg-color-teal {color: teal;}",
        ".wysiwyg-color-aqua {color: aqua;}",
        ".wysiwyg-color-orange {color: orange;}",'

def copy_locales
  Dir["#{BASE_FOLDER}/locales/*"].each do |file|
    `cp #{file} vendor/assets/javascripts/bootstrap-wysihtml5/locales/#{File.basename(file).gsub('bootstrap-wysihtml5.', '')}`
  end
end

def copy_javascript
  `cp #{BASE_FOLDER}/templates.js vendor/assets/javascripts/bootstrap-wysihtml5/templates.js`
  `cp #{BASE_FOLDER}/bootstrap3-wysihtml5.js vendor/assets/javascripts/bootstrap-wysihtml5/bootstrap3-wysihtml5.js`
  `cp #{BASE_FOLDER}/commands.js vendor/assets/javascripts/bootstrap-wysihtml5/commands.js`
  `cp #{WYSIHTMLX}/wysihtml5x-toolbar.js vendor/assets/javascripts/bootstrap-wysihtml5/wysihtml5x-toolbar.js`
  `cp #{HANDLEBARS}/handlebars.runtime.min.js vendor/assets/javascripts/bootstrap-wysihtml5/handlebars.runtime.min.js`

  `cp #{BASE_FOLDER}/bootstrap3-wysihtml5.all.min.js vendor/assets/javascripts/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js`
end

def copy_css
  `cp #{BASE_FOLDER}/bootstrap3-wysihtml5.css vendor/assets/stylesheets/bootstrap-wysihtml5/bootstrap3-wysihtml5.css`
end

def print_version
  puts "bootstrap3-wysihtml5-bower #{JSON.parse(File.read(BASE_FOLDER + '/../.bower.json'))['version']}"
  puts "bootstrap-wysihtml5-rails #{BootstrapWysihtml5Rails::Rails::VERSION}"
end

desc "Update assets"
task 'update' do
  if Dir.exist?('bootstrap-wysihtml5')
    system("bower update bootstrap3-wysihtml5-bower")
  else
    system("bower install bootstrap3-wysihtml5-bower")
  end

  copy_locales
  copy_javascript
  copy_css

  system("git status")

  file_path = 'vendor/assets/javascripts/bootstrap-wysihtml5/templates.js'
  file = File.read(file_path)
  file = file.gsub('<input value=\"http://\" class=\"bootstrap-wysihtml5-insert-image-url form-control\">', '<input value=\"http://\" class=\"bootstrap-wysihtml5-insert-image-url form-control\" data-wysihtml5-dialog-field=\"src\">')
  File.write(file_path, file)

  file_path = 'vendor/assets/javascripts/bootstrap-wysihtml5/wysihtml5x-toolbar.js'
  file = File.read(file_path)
  file = file.gsub('"._wysihtml5-temp     { display: none; }",', COLORS)
  File.write(file_path, file)

  print_version
end

desc "Build"
task "build" do
  system("gem build bootstrap-wysihtml5-rails.gemspec")
end

desc "Publish a new version"
task :publish => :build do
  tags = `git tag`.split
  version = BootstrapWysihtml5Rails::Rails::VERSION
  system("git tag -a #{version} -m 'Release #{version}' ") unless tags.include?(version)
  system("gem push bootstrap-wysihtml5-rails-#{version}.gem")
  system("git push --follow-tags")
end