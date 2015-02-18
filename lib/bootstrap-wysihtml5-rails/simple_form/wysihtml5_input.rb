class Wysihtml5Input < SimpleForm::Inputs::TextInput
  def input(wrapper_options)
    idf = "#{lookup_model_names.join("_")}_#{reflection_or_attribute_name}"
    script = template.content_for(:javascript) do
              template.content_tag(:script, type: 'text/javascript') do
                "$('textarea[id=#{idf}]').wysihtml5();".html_safe
              end
            end

    super + script
  end
end
