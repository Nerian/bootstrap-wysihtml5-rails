require "rails"
require "bootstrap-wysihtml5-rails/version"

autoload :Wysihtml5Input, 'bootstrap-wysihtml5-rails/simple_form/wysihtml5_input'

module BootstrapWysihtml5Rails
  module Rails
    if ::Rails.version.to_s < "3.1"
      require "bootstrap-wysihtml5-rails/railtie"
    else
      require "bootstrap-wysihtml5-rails/engine"
    end
  end
end
