require "rails"
require "bootstrap-wysihtml5-rails/version"

module BootstrapWysihtml5Rails
  module Rails
    if ::Rails.version < "3.1"
      require "bootstrap-wysihtml5-rails/railtie"
    else
      require "bootstrap-wysihtml5-rails/engine"
    end
  end
end