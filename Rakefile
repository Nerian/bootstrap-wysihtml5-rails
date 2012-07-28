#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)

desc "Update assets"
task 'update' do
  system("rm -rf bootstrap-wysihtml5")
  system("git clone git://github.com/jhollingworth/bootstrap-wysihtml5.git")
  system("cp bootstrap-wysihtml5/src/bootstrap-wysihtml5.css vendor/assets/stylesheets/bootstrap-wysihtml5.css")
  system("cp bootstrap-wysihtml5/src/bootstrap-wysihtml5.js vendor/assets/javascripts/bootstrap-wysihtml5.js")
  system("cp bootstrap-wysihtml5/lib/js/wysihtml5-0.3.0.js vendor/assets/javascripts/wysihtml5.js")
  system("git status")
end

desc "Build the gem"
task "build" do
  system("gem build bootstrap-wysihtml5-rails.gemspec")
end

desc "Publish the gem"
task 'publish' do
  system("gem push bootstrap-wysihtml5-rails-#{BootstrapWysihtml5Rails::Rails::VERSION}.gem")
  system("git push")
end

desc "Release a new version"
task "release" do
  system("gem build bootstrap-wysihtml5-rails.gemspec")
  system("gem push bootstrap-wysihtml5-rails-#{BootstrapWysihtml5Rails::Rails::VERSION}.gem")
  system("git push")
end