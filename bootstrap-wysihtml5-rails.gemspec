# -*- encoding: utf-8 -*-
require File.expand_path('../lib/bootstrap-wysihtml5-rails/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Gonzalo Rodríguez-Baltanás Díaz"]
  gem.email         = ["siotopo@gmail.com"]
  gem.description   = %q{A wysiwyg text editor for Twitter Bootstrap}
  gem.homepage      = "https://github.com/Nerian/bootstrap-wysihtml5-rails"
  gem.summary       = gem.description
  gem.license       = 'MIT'

  gem.name          = "bootstrap-wysihtml5-rails"
  gem.require_paths = ["lib"]
  gem.files         = `git ls-files`.split("\n").reject { |i| i=~/testapp/}
  gem.version       = BootstrapWysihtml5Rails::Rails::VERSION

  gem.add_dependency "railties", ">= 3.0"
  gem.add_development_dependency "bundler", ">= 1.0"
  gem.add_development_dependency "rake"
end
