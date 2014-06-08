#!/usr/bin/env rake
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)

def copy_locales
  Dir['bootstrap-wysihtml5/dist/locales/*'].each do |file|
    `cp #{file} vendor/assets/javascripts/bootstrap-wysihtml5/locales/#{File.basename(file).gsub('bootstrap-wysihtml5.', '')}`
  end
end

def copy_javascript
  `cp bootstrap-wysihtml5/dist/bootstrap3-wysihtml5.all.min.js vendor/assets/javascripts/bootstrap-wysihtml5/bootstrap3-wysihtml5.js`
end

def copy_css
  `cp bootstrap-wysihtml5/dist/bootstrap3-wysihtml5.css vendor/assets/stylesheets/bootstrap-wysihtml5/bootstrap3-wysihtml5.css`
end

desc "Update assets"
task 'update' do
  if Dir.exist?('bootstrap-wysihtml5')
    system("cd bootstrap-wysihtml5 && git pull && cd ..")
  else
    system("git clone git://github.com/Waxolunist/bootstrap3-wysihtml5-bower.git bootstrap-wysihtml5")
  end

  copy_locales
  copy_javascript
  copy_css

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
