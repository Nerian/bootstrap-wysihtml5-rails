#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)

ORIGIN_LIB_PATH = "bootstrap-wysihtml5/lib"
ORIGIN_SRC_PATH = "bootstrap-wysihtml5/src"
DEST_JAVASCRIPT_PATH = "vendor/assets/javascripts/bootstrap-wysihtml5"
DEST_CSS_PATH = "vendor/assets/stylesheets/bootstrap-wysihtml5"

def b2
  system("cd bootstrap-wysihtml5 && git checkout master")

  system("cp #{ORIGIN_SRC_PATH}/bootstrap-wysihtml5.css #{DEST_CSS_PATH}/core.css")

  core_file = File.read("#{ORIGIN_SRC_PATH}/bootstrap-wysihtml5.js")
  original_string = /stylesheets: \[".\/lib\/css\/wysiwyg-color.css"\]/
  objective_string = "stylesheets: [\"<%= stylesheet_path('bootstrap-wysihtml5/wysiwyg-color.css') %>\"]"

  replaced   = core_file.gsub(original_string, objective_string)

  File.open("#{DEST_JAVASCRIPT_PATH}/core.js.erb", "w") { |file| file.puts replaced }
end

def b3
  system("cd bootstrap-wysihtml5 && git checkout tb3")

  system("cp #{ORIGIN_SRC_PATH}/bootstrap-wysihtml5.css #{DEST_CSS_PATH}/core-b3.css")

  core_file = File.read("#{ORIGIN_SRC_PATH}/bootstrap-wysihtml5.js")
  original_string = /stylesheets: \[".\/lib\/css\/wysiwyg-color.css"\]/
  objective_string = "stylesheets: [\"<%= stylesheet_path('bootstrap-wysihtml5/wysiwyg-color.css') %>\"]"

  replaced   = core_file.gsub(original_string, objective_string)

  File.open("#{DEST_JAVASCRIPT_PATH}/core-b3.js.erb", "w") { |file| file.puts replaced }
end



desc "Update assets"
task 'update' do
  if Dir.exist?('bootstrap-wysihtml5')
    system("cd bootstrap-wysihtml5 && git pull && cd ..")
  else
    system("git clone git://github.com/jhollingworth/bootstrap-wysihtml5.git bootstrap-wysihtml5")
    system("cd bootstrap-wysihtml5 && git remote add b3 git@github.com:artillery/bootstrap-wysihtml5.git")
    system("cd bootstrap-wysihtml5 && git fetch b3")
    system("cd bootstrap-wysihtml5 && git checkout -b tb3 b3/master")
  end

  Dir.foreach("bootstrap-wysihtml5/src/locales") do |file|
    unless file == '.' || file == '..'
      abbreviated_file_name = file.gsub('bootstrap-wysihtml5.', '')
      system("cp #{ORIGIN_SRC_PATH}/locales/#{file} #{DEST_JAVASCRIPT_PATH}/locales/#{abbreviated_file_name}")
    end
  end

  system("cp #{ORIGIN_LIB_PATH}/js/wysihtml5-0.3.0.js #{DEST_JAVASCRIPT_PATH}/wysihtml5.js")
  system("cp #{ORIGIN_LIB_PATH}/css/wysiwyg-color.css #{DEST_CSS_PATH}/wysiwyg-color.css")

  b2
  b3

  system("git status")
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
