#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)

desc "Build the gem"
task "build" do
  system("gem build bootstrap-wysihtml5-rails.gemspec")
end

desc "Publish the gem"
task 'publish' do
  system("gem push bootstrap-wysihtml5-rails-#{BootstrapWysihtml5Rails::Rails::VERSION}.gem")
end