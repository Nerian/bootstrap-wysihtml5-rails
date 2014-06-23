#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)
require 'json'

BASE_FOLDER = 'bower_components/bootstrap3-wysihtml5-bower/dist'

def copy_locales
  Dir["#{BASE_FOLDER}/locales/*"].each do |file|
    `cp #{file} vendor/assets/javascripts/bootstrap-wysihtml5/locales/#{File.basename(file).gsub('bootstrap-wysihtml5.', '')}`
  end
end

def copy_javascript
  `cp #{BASE_FOLDER}/bootstrap3-wysihtml5.all.min.js vendor/assets/javascripts/bootstrap-wysihtml5/bootstrap3-wysihtml5.js`
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
