<?php // @file /home/kdr00/kdr.kiev.ua/www/templates/yootheme/vendor/yootheme/builder/elements/panel/element.json

return [
  '@import' => "{$file['dirname']}/element.php", 
  'name' => 'panel', 
  'title' => 'Panel', 
  'icon' => $this->get('url:images/icon.svg'), 
  'iconSmall' => $this->get('url:images/iconSmall.svg'), 
  'element' => true, 
  'width' => 500, 
  'defaults' => [
    'link_text' => 'Read more', 
    'title_element' => 'h3', 
    'title_align' => 'top', 
    'title_grid_width' => '1-2', 
    'title_breakpoint' => 'm', 
    'meta_style' => 'meta', 
    'meta_align' => 'below-title', 
    'icon_ratio' => 4, 
    'image_align' => 'top', 
    'image_grid_width' => '1-2', 
    'image_breakpoint' => 'm', 
    'image_svg_color' => 'emphasis', 
    'link_style' => 'default', 
    'margin' => 'default'
  ], 
  'placeholder' => [
    'props' => [
      'title' => 'Title', 
      'meta' => '', 
      'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
      'image' => '', 
      'icon' => ''
    ]
  ], 
  'templates' => [
    'render' => "{$file['dirname']}/templates/template.php", 
    'content' => "{$file['dirname']}/templates/content.php"
  ], 
  'fields' => [
    'title' => [
      'label' => 'Title'
    ], 
    'meta' => [
      'label' => 'Meta'
    ], 
    'content' => [
      'label' => 'Content', 
      'type' => 'editor'
    ], 
    'image' => $this->get('builder:image'), 
    'image_width' => [
      'label' => 'Width', 
      'attrs' => [
        'placeholder' => 'auto'
      ], 
      'enable' => 'image'
    ], 
    'image_height' => [
      'label' => 'Height', 
      'attrs' => [
        'placeholder' => 'auto'
      ], 
      'enable' => 'image'
    ], 
    'image_alt' => [
      'label' => 'Image Alt', 
      'enable' => 'image'
    ], 
    'icon' => [
      'label' => 'Icon', 
      'description' => 'Instead of using a custom image, you can click on the pencil to pick an icon from the icon library.', 
      'type' => 'icon', 
      'enable' => '!image'
    ], 
    'link' => $this->get('builder:link'), 
    'link_target' => $this->get('builder:link_target'), 
    'link_text' => [
      'label' => 'Link Text', 
      'description' => 'Enter the text for the link.', 
      'enable' => 'link'
    ], 
    'panel_style' => [
      'label' => 'Style', 
      'description' => 'Select one of the boxed card styles or a blank panel.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Card Default' => 'card-default', 
        'Card Primary' => 'card-primary', 
        'Card Secondary' => 'card-secondary', 
        'Card Hover' => 'card-hover'
      ]
    ], 
    'panel_content_padding' => [
      'label' => 'Padding', 
      'description' => 'Add padding to the content if the image is top, bottom, left or right aligned.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Default' => 'default', 
        'Large' => 'large'
      ], 
      'show' => '!panel_style', 
      'enable' => 'image && image_align != \'between\''
    ], 
    'panel_size' => [
      'label' => 'Padding', 
      'description' => 'Define the card\'s size by selecting the padding between the card and its content.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Large' => 'large'
      ], 
      'show' => 'panel_style'
    ], 
    'panel_card_image' => [
      'description' => 'Top, bottom, left or right aligned images can be attached to the card\'s edge. If the image is aligned to the left or right, it will also extend to cover the whole space.', 
      'type' => 'checkbox', 
      'text' => 'Align image without padding', 
      'show' => 'panel_style', 
      'enable' => 'image && image_align != \'between\''
    ], 
    'title_style' => [
      'label' => 'Style', 
      'description' => 'Title styles differ in font-size but may also come with a predefined color, size and font.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Hero' => 'heading-hero', 
        'Primary' => 'heading-primary', 
        'H1' => 'h1', 
        'H2' => 'h2', 
        'H3' => 'h3', 
        'H4' => 'h4', 
        'H5' => 'h5', 
        'H6' => 'h6'
      ], 
      'enable' => 'title'
    ], 
    'title_decoration' => [
      'label' => 'Decoration', 
      'description' => 'Decorate the title with a divider, bullet or a line that is vertically centered to the heading.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Divider' => 'divider', 
        'Bullet' => 'bullet', 
        'Line' => 'line'
      ], 
      'enable' => 'title'
    ], 
    'title_color' => [
      'label' => 'Color', 
      'description' => 'Select the text color. If the Background option is selected, styles that don\'t apply a background image use the primary color instead.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Muted' => 'muted', 
        'Emphasis' => 'emphasis', 
        'Primary' => 'primary', 
        'Success' => 'success', 
        'Warning' => 'warning', 
        'Danger' => 'danger', 
        'Background' => 'background'
      ], 
      'enable' => 'title'
    ], 
    'title_element' => [
      'label' => 'HTML Element', 
      'description' => 'Choose one of the six heading elements to fit your semantic structure.', 
      'type' => 'select', 
      'options' => [
        'H1' => 'h1', 
        'H2' => 'h2', 
        'H3' => 'h3', 
        'H4' => 'h4', 
        'H5' => 'h5', 
        'H6' => 'h6'
      ], 
      'enable' => 'title'
    ], 
    'title_align' => [
      'label' => 'Alignment', 
      'description' => 'Align the title to the top or left in regards to the content.', 
      'type' => 'select', 
      'options' => [
        'Top' => 'top', 
        'Left' => 'left'
      ], 
      'enable' => 'title'
    ], 
    'title_grid_width' => [
      'label' => 'Grid Width', 
      'description' => 'Define the width of the title within the grid. Choose between percent and fixed widths or expand columns to the width of their content.', 
      'type' => 'select', 
      'options' => [
        'Auto' => 'auto', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'XX-Large' => 'xxlarge'
      ], 
      'enable' => 'title && title_align == \'left\''
    ], 
    'title_gutter' => [
      'label' => 'Grid Gutter', 
      'description' => 'Select the gutter width between the title and content.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Default' => '', 
        'Large' => 'large', 
        'Collapse' => 'collapse'
      ], 
      'enable' => 'title && title_align == \'left\''
    ], 
    'title_breakpoint' => [
      'label' => 'Grid Breakpoint', 
      'description' => 'Set the breakpoint from which grid cells will stack.', 
      'type' => 'select', 
      'options' => [
        'Always' => '', 
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l'
      ], 
      'enable' => 'title && title_align == \'left\''
    ], 
    'title_margin' => [
      'label' => 'Margin Top', 
      'description' => 'Set the top margin. Note that the margin will only apply if the content field immediately follows another content field.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'None' => 'remove'
      ], 
      'enable' => 'title'
    ], 
    'meta_style' => [
      'label' => 'Style', 
      'description' => 'Select a predefined meta text style, including color, size and font-family.', 
      'type' => 'select', 
      'options' => [
        'Default' => '', 
        'Meta' => 'meta', 
        'H4' => 'h4', 
        'H5' => 'h5', 
        'H6' => 'h6'
      ], 
      'enable' => 'meta'
    ], 
    'meta_color' => [
      'label' => 'Color', 
      'description' => 'Select the text color.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Muted' => 'muted', 
        'Emphasis' => 'emphasis', 
        'Primary' => 'primary', 
        'Success' => 'success', 
        'Warning' => 'warning', 
        'Danger' => 'danger'
      ], 
      'enable' => 'meta'
    ], 
    'meta_align' => [
      'label' => 'Alignment', 
      'description' => 'Align the meta text.', 
      'type' => 'select', 
      'options' => [
        'Above Title' => 'above-title', 
        'Below Title' => 'below-title', 
        'Below Content' => 'below-content'
      ], 
      'enable' => 'meta'
    ], 
    'meta_margin' => [
      'label' => 'Margin Top', 
      'description' => 'Set the top margin. Note that the margin will only apply if the content field immediately follows another content field.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'None' => 'remove'
      ], 
      'enable' => 'meta'
    ], 
    'content_style' => [
      'label' => 'Style', 
      'description' => 'Select a predefined text style, including color, size and font-family.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Lead' => 'lead'
      ], 
      'enable' => 'content'
    ], 
    'content_margin' => [
      'label' => 'Margin Top', 
      'description' => 'Set the top margin. Note that the margin will only apply if the content field immediately follows another content field.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'None' => 'remove'
      ], 
      'enable' => 'content'
    ], 
    'image_border' => [
      'label' => 'Border', 
      'description' => 'Select the image\'s border style.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Rounded' => 'rounded', 
        'Circle' => 'circle', 
        'Pill' => 'pill'
      ], 
      'enable' => 'image && (!panel_style || (panel_style && (!panel_card_image || image_align == \'between\')))'
    ], 
    'image_box_shadow' => [
      'label' => 'Box Shadow', 
      'description' => 'Select the image\'s box shadow size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge'
      ], 
      'enable' => 'image && !panel_style'
    ], 
    'image_hover_box_shadow' => [
      'label' => 'Hover Box Shadow', 
      'description' => 'Select the image\'s box shadow size on hover.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge'
      ], 
      'enable' => 'link && image && !panel_style && link_type == \'element\''
    ], 
    'image_box_decoration' => [
      'label' => 'Box Decoration', 
      'description' => 'Select the image\'s box decoration style. Note: The Mask option is not supported by all styles and may have no visible effect.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Default' => 'default', 
        'Primary' => 'primary', 
        'Secondary' => 'secondary', 
        'Floating Shadow' => 'shadow', 
        'Mask' => 'mask'
      ], 
      'enable' => 'image && !panel_style'
    ], 
    'image_box_decoration_inverse' => [
      'type' => 'checkbox', 
      'text' => 'Inverse style', 
      'enable' => 'image && !panel_style && $match(image_box_decoration, \'^(default|primary|secondary)$\')'
    ], 
    'icon_ratio' => $this->get('builder:icon_ratio'), 
    'icon_color' => $this->get('builder:icon_color'), 
    'image_align' => [
      'label' => 'Alignment', 
      'description' => 'Align the image to the top, left, right or place it between the title and the content.', 
      'type' => 'select', 
      'options' => [
        'Top' => 'top', 
        'Bottom' => 'bottom', 
        'Left' => 'left', 
        'Right' => 'right', 
        'Between' => 'between'
      ], 
      'enable' => 'image || icon'
    ], 
    'image_grid_width' => [
      'label' => 'Grid Width', 
      'description' => 'Define the width of the image within the grid. Choose between percent and fixed widths or expand columns to the width of their content.', 
      'type' => 'select', 
      'options' => [
        'Auto' => 'auto', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'XX-Large' => 'xxlarge'
      ], 
      'enable' => '(image || icon) && (image_align == \'left\' || image_align == \'right\')'
    ], 
    'image_gutter' => [
      'label' => 'Grid Gutter', 
      'description' => 'Select the gutter width between the image and content items.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Default' => '', 
        'Large' => 'large', 
        'Collapse' => 'collapse'
      ], 
      'enable' => '(image || icon) && (image_align == \'left\' || image_align == \'right\') && !(panel_card_image && panel_style)'
    ], 
    'image_breakpoint' => [
      'label' => 'Grid Breakpoint', 
      'description' => 'Set the breakpoint from which grid cells will stack.', 
      'type' => 'select', 
      'options' => [
        'Always' => '', 
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l'
      ], 
      'enable' => '(image || icon) && (image_align == \'left\' || image_align == \'right\')'
    ], 
    'image_vertical_align' => [
      'label' => 'Vertical Alignment', 
      'description' => 'Vertically center grid cells.', 
      'type' => 'checkbox', 
      'text' => 'Center', 
      'enable' => '(image || icon) && (image_align == \'left\' || image_align == \'right\')'
    ], 
    'image_margin' => [
      'label' => 'Margin Top', 
      'description' => 'Set the top margin. Note that the margin will only apply if the content field immediately follows another content field.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'None' => 'remove'
      ], 
      'enable' => '(image || icon) && (image_align == \'between\' || (image_align == \'bottom\' && !(panel_style && panel_card_image))'
    ], 
    'image_svg_inline' => [
      'label' => 'Inline SVG', 
      'description' => 'Inject SVG images into the page markup, so that they can easily be styled with CSS.', 
      'type' => 'checkbox', 
      'text' => 'Make SVG stylable with CSS', 
      'enable' => 'image'
    ], 
    'image_svg_animate' => [
      'type' => 'checkbox', 
      'text' => 'Animate strokes', 
      'enable' => 'image && image_svg_inline'
    ], 
    'image_svg_color' => [
      'label' => 'SVG Color', 
      'description' => 'Select the SVG color. It will only apply to supported elements defined in the SVG.', 
      'type' => 'select', 
      'options' => [
        'Inherit' => '', 
        'Muted' => 'muted', 
        'Emphasis' => 'emphasis', 
        'Primary' => 'primary', 
        'Secondary' => 'secondary', 
        'Success' => 'success', 
        'Warning' => 'warning', 
        'Danger' => 'danger'
      ], 
      'enable' => 'image && image_svg_inline'
    ], 
    'link_type' => [
      'label' => 'Type', 
      'description' => 'Show the link as a button or choose between linking just the image and title or the whole element.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Button' => '', 
        'Title/Image' => 'content', 
        'Element' => 'element'
      ], 
      'enable' => 'link'
    ], 
    'link_style' => [
      'label' => 'Style', 
      'description' => 'Set the link style.', 
      'type' => 'select', 
      'options' => [
        'Button Default' => 'default', 
        'Button Primary' => 'primary', 
        'Button Secondary' => 'secondary', 
        'Button Danger' => 'danger', 
        'Button Text' => 'text', 
        'Link' => '', 
        'Link Muted' => 'link-muted', 
        'Link Text' => 'link-text'
      ], 
      'enable' => 'link && !link_type'
    ], 
    'link_size' => [
      'label' => 'Button Size', 
      'description' => 'Set the button size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Large' => 'large'
      ], 
      'enable' => 'link && !link_type && link_style && link_style != \'link-muted\' && link_style != \'link-text\''
    ], 
    'link_margin' => [
      'label' => 'Margin Top', 
      'description' => 'Set the top margin. Note that the margin will only apply if the content field immediately follows another content field.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'None' => 'remove'
      ], 
      'enable' => 'link && !link_type'
    ], 
    'text_align' => $this->get('builder:text_align_justify'), 
    'text_align_breakpoint' => $this->get('builder:text_align_breakpoint'), 
    'text_align_fallback' => $this->get('builder:text_align_justify_fallback'), 
    'maxwidth' => $this->get('builder:maxwidth'), 
    'maxwidth_align' => $this->get('builder:maxwidth_align'), 
    'maxwidth_breakpoint' => $this->get('builder:maxwidth_breakpoint'), 
    'margin' => $this->get('builder:margin'), 
    'margin_remove_top' => $this->get('builder:margin_remove_top'), 
    'margin_remove_bottom' => $this->get('builder:margin_remove_bottom'), 
    'animation' => $this->get('builder:animation'), 
    '_parallax_button' => $this->get('builder:_parallax_button'), 
    'visibility' => $this->get('builder:visibility'), 
    'name' => $this->get('builder:name'), 
    'status' => $this->get('builder:status'), 
    'id' => $this->get('builder:id'), 
    'class' => $this->get('builder:cls'), 
    'css' => [
      'label' => 'CSS', 
      'description' => 'Enter your own custom CSS. The following selectors will be prefixed automatically for this element: <code>.el-element</code>, <code>.el-title</code>, <code>.el-meta</code>, <code>.el-content</code>, <code>.el-image</code>, <code>.el-link</code>', 
      'type' => 'editor', 
      'editor' => 'code', 
      'mode' => 'css', 
      'attrs' => [
        'debounce' => 500
      ]
    ]
  ], 
  'fieldset' => [
    'default' => [
      'type' => 'tabs', 
      'fields' => [[
          'title' => 'Content', 
          'fields' => ['title', 'meta', 'content', 'image', [
              'description' => 'Setting just one value preserves the original proportions. The image will be resized and cropped automatically, and where possible, high resolution images will be auto-generated.', 
              'name' => '_image_dimension', 
              'type' => 'grid', 
              'width' => '1-2', 
              'fields' => ['image_width', 'image_height']
            ], 'image_alt', 'icon', 'link', 'link_target', 'link_text']
        ], [
          'title' => 'Settings', 
          'fields' => [[
              'label' => 'Panel', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['panel_style', 'panel_content_padding', 'panel_size', 'panel_card_image']
            ], [
              'label' => 'Title', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['title_style', 'title_decoration', 'title_color', 'title_element', 'title_align', 'title_grid_width', 'title_gutter', 'title_breakpoint', 'title_margin']
            ], [
              'label' => 'Meta', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['meta_style', 'meta_color', 'meta_align', 'meta_margin']
            ], [
              'label' => 'Content', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['content_style', 'content_margin']
            ], [
              'label' => 'Image', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['image_border', 'image_box_shadow', 'image_hover_box_shadow', 'image_box_decoration', 'image_box_decoration_inverse', 'icon_ratio', 'icon_color', 'image_align', 'image_grid_width', 'image_gutter', 'image_breakpoint', 'image_vertical_align', 'image_margin', 'image_svg_inline', 'image_svg_animate', 'image_svg_color']
            ], [
              'label' => 'Link', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['link_type', 'link_style', 'link_size', 'link_margin']
            ], [
              'label' => 'General', 
              'type' => 'group', 
              'fields' => ['text_align', 'text_align_breakpoint', 'text_align_fallback', 'maxwidth', 'maxwidth_align', 'maxwidth_breakpoint', 'margin', 'margin_remove_top', 'margin_remove_bottom', 'animation', '_parallax_button', 'visibility']
            ]]
        ], $this->get('builder:advanced')]
    ]
  ]
];
