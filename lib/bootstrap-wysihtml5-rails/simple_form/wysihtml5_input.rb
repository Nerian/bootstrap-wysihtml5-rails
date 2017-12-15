class Wysihtml5Input < SimpleForm::Inputs::TextInput
  def input(wrapper_options)
    jquery = %Q($("textarea##{lookup_model_names.join("_")}_#{reflection_or_attribute_name}").wysihtml5(#{options[:wysihtml5].to_json});)
    script = template.javascript_tag(%Q(if (typeof($) === "function") { #{jquery} } else { document.onreadystatechange = function() { if (document.readyState == "interactive") { #{jquery} } } })).html_safe

    super + script
  end
end
