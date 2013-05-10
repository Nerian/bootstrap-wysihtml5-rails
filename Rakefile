#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)

desc "Update assets"
task 'update' do
  origin_lib_path = "bootstrap-wysihtml5/lib"
  origin_src_path = "bootstrap-wysihtml5/src"
  dest_javascript_path = "vendor/assets/javascripts/bootstrap-wysihtml5"
  dest_css_path = "vendor/assets/stylesheets/bootstrap-wysihtml5"

  if Dir.exist?('bootstrap-wysihtml5')
    system("cd bootstrap-wysihtml5 && git pull && cd ..")
  else
    system("git clone git://github.com/jhollingworth/bootstrap-wysihtml5.git bootstrap-wysihtml5")
  end

  system("cp #{origin_src_path}/bootstrap-wysihtml5.css #{dest_css_path}/core.css")

  Dir.foreach("bootstrap-wysihtml5/src/locales") do |file|
    unless file == '.' || file == '..'
      abbreviated_file_name = file.gsub('bootstrap-wysihtml5.', '')
      system("cp #{origin_src_path}/locales/#{file} #{dest_javascript_path}/locales/#{abbreviated_file_name}")
    end
  end

  core_file = File.read("#{origin_src_path}/bootstrap-wysihtml5.js")
  original_string = /stylesheets: \[".\/lib\/css\/wysiwyg-color.css"\]/
  objective_string = 'stylesheets: ["<%= Rails.configuration.assets.prefix + \'/bootstrap-wysihtml5/wysiwyg-color.css\' %>"]'

  replaced   = core_file.gsub(original_string, objective_string)

  File.open("#{dest_javascript_path}/core.js.erb", "w") { |file| file.puts replaced }

  system("cp #{origin_lib_path}/js/wysihtml5-0.3.0.js #{dest_javascript_path}/wysihtml5.js")
  system("cp #{origin_lib_path}/css/wysiwyg-color.css #{dest_css_path}/wysiwyg-color.css")


  system("git status")
end

desc "Build"
task "build" do
  system("gem build bootstrap-wysihtml5-rails.gemspec")
end

desc "Publish a new version"
task :publish => :build do
  tags = `git tag`.split
  system("git tag #{BootstrapWysihtml5Rails::Rails::VERSION}") unless tags.include?(BootstrapWysihtml5Rails::Rails::VERSION)
  system("gem push bootstrap-wysihtml5-rails-#{BootstrapWysihtml5Rails::Rails::VERSION}.gem")
  system("git push")
end