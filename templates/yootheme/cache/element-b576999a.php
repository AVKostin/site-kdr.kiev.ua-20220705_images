<?php // @file /home/kdr00/kdr.kiev.ua/www/templates/yootheme/vendor/yootheme/builder/elements/slider/element.json

return [
  '@import' => "{$file['dirname']}/element.php", 
  'name' => 'slider', 
  'title' => 'Slider', 
  'icon' => $this->get('url:images/icon.svg'), 
  'iconSmall' => $this->get('url:images/iconSmall.svg'), 
  'element' => true, 
  'container' => true, 
  'width' => 500, 
  'defaults' => [
    'show_title' => true, 
    'show_meta' => true, 
    'show_content' => true, 
    'show_link' => true, 
    'slider_width' => 'fixed', 
    'slider_width_default' => '1-1', 
    'slider_width_medium' => '1-3', 
    'slider_min_height' => 300, 
    'slider_gutter' => 'default', 
    'slider_autoplay_pause' => true, 
    'nav' => 'dotnav', 
    'nav_align' => 'center', 
    'nav_breakpoint' => 's', 
    'slidenav' => 'default', 
    'slidenav_margin' => 'medium', 
    'slidenav_breakpoint' => 's', 
    'slidenav_outside_breakpoint' => 'xl', 
    'overlay_mode' => 'cover', 
    'overlay_position' => 'center', 
    'overlay_transition' => 'fade', 
    'title_element' => 'h3', 
    'meta_style' => 'meta', 
    'meta_align' => 'below-title', 
    'link_text' => 'Read more', 
    'link_style' => 'default', 
    'text_align' => 'center', 
    'margin' => 'default'
  ], 
  'placeholder' => [
    'children' => [[
        'type' => 'slider_item', 
        'props' => []
      ], [
        'type' => 'slider_item', 
        'props' => []
      ], [
        'type' => 'slider_item', 
        'props' => []
      ], [
        'type' => 'slider_item', 
        'props' => []
      ], [
        'type' => 'slider_item', 
        'props' => []
      ]]
  ], 
  'templates' => [
    'render' => "{$file['dirname']}/templates/template.php", 
    'content' => "{$file['dirname']}/templates/content.php"
  ], 
  'fields' => [
    'content' => [
      'label' => 'Items', 
      'type' => 'content-items', 
      'item' => 'slider_item', 
      'media' => [
        'type' => 'image', 
        'item' => [
          'title' => 'title', 
          'image' => 'src'
        ]
      ]
    ], 
    'show_title' => [
      'label' => 'Display', 
      'type' => 'checkbox', 
      'text' => 'Show the title'
    ], 
    'show_meta' => [
      'type' => 'checkbox', 
      'text' => 'Show the meta text'
    ], 
    'show_content' => [
      'type' => 'checkbox', 
      'text' => 'Show the content'
    ], 
    'show_link' => [
      'description' => 'Show or hide content fields without the need to delete the content itself.', 
      'type' => 'checkbox', 
      'text' => 'Show the link'
    ], 
    'slider_width' => [
      'label' => 'Item Width Mode', 
      'description' => 'Define whether the width of the slider items is fixed or automatically expanded by its content widths.', 
      'type' => 'select', 
      'options' => [
        'Fixed' => 'fixed', 
        'Auto' => ''
      ]
    ], 
    'slider_height' => [
      'label' => 'Height', 
      'description' => 'The height will adapt automatically based on its content. Alternatively, the height can adapt to the height of the viewport. <br><br>Note: Make sure, no height is set in the section settings when using one of the viewport options.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Auto' => '', 
        'Viewport' => 'full', 
        'Viewport (Minus 20%)' => 'percent', 
        'Viewport (Minus the following section)' => 'section'
      ], 
      'enable' => 'slider_width'
    ], 
    'slider_min_height' => [
      'label' => 'Min Height', 
      'description' => 'Set the minimum height. This is useful if the content is too large on small devices.', 
      'type' => 'range', 
      'attrs' => [
        'min' => 200, 
        'max' => 800, 
        'step' => 50
      ], 
      'enable' => 'slider_width && slider_height'
    ], 
    'slider_gutter' => [
      'label' => 'Gutter', 
      'description' => 'Set the grid gutter width and display dividers between grid cells.', 
      'type' => 'select', 
      'options' => [
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Default' => 'default', 
        'Large' => 'large', 
        'Collapse' => ''
      ]
    ], 
    'slider_divider' => [
      'type' => 'checkbox', 
      'text' => 'Show dividers', 
      'enable' => 'slider_gutter'
    ], 
    'slider_width_default' => [
      'label' => 'Phone Portrait', 
      'description' => 'Set the item width for each breakpoint. <i>Inherit</i> refers to the item width of the next smaller screen size.', 
      'type' => 'select', 
      'options' => [
        '100%' => '1-1', 
        '83%' => '5-6', 
        '80%' => '4-5', 
        '60%' => '3-5', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        '16%' => '1-6'
      ], 
      'enable' => 'slider_width'
    ], 
    'slider_width_small' => [
      'label' => 'Phone Landscape', 
      'description' => 'Set the item width for each breakpoint. <i>Inherit</i> refers to the item width of the next smaller screen size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Inherit' => '', 
        '100%' => '1-1', 
        '83%' => '5-6', 
        '80%' => '4-5', 
        '60%' => '3-5', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        '16%' => '1-6'
      ], 
      'enable' => 'slider_width'
    ], 
    'slider_width_medium' => [
      'label' => 'Tablet Landscape', 
      'description' => 'Set the item width for each breakpoint. <i>Inherit</i> refers to the item width of the next smaller screen size.', 
      'type' => 'select', 
      'options' => [
        'Inherit' => '', 
        '100%' => '1-1', 
        '83%' => '5-6', 
        '80%' => '4-5', 
        '60%' => '3-5', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        '16%' => '1-6'
      ], 
      'enable' => 'slider_width'
    ], 
    'slider_width_large' => [
      'label' => 'Desktop', 
      'description' => 'Set the item width for each breakpoint. <i>Inherit</i> refers to the item width of the next smaller screen size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Inherit' => '', 
        '100%' => '1-1', 
        '83%' => '5-6', 
        '80%' => '4-5', 
        '60%' => '3-5', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        '16%' => '1-6'
      ], 
      'enable' => 'slider_width'
    ], 
    'slider_width_xlarge' => [
      'label' => 'Large Screens', 
      'description' => 'Set the item width for each breakpoint. <i>Inherit</i> refers to the item width of the next smaller screen size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Inherit' => '', 
        '100%' => '1-1', 
        '83%' => '5-6', 
        '80%' => '4-5', 
        '60%' => '3-5', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        '16%' => '1-6'
      ], 
      'enable' => 'slider_width'
    ], 
    'slider_sets' => [
      'label' => 'Sets', 
      'description' => 'Group items into sets. The number of items within a set depends on the defined item width, e.g. <i>33%</i> means that each set contains 3 items.', 
      'type' => 'checkbox', 
      'text' => 'Slide all visible items at once'
    ], 
    'slider_center' => [
      'label' => 'Center', 
      'type' => 'checkbox', 
      'text' => 'Center the active slide'
    ], 
    'slider_finite' => [
      'label' => 'Finite', 
      'type' => 'checkbox', 
      'text' => 'Disable infinite scrolling'
    ], 
    'slider_velocity' => [
      'label' => 'Velocity', 
      'description' => 'Set the velocity in pixels per millisecond.', 
      'type' => 'range', 
      'attrs' => [
        'min' => 0.200000000000000011102230246251565404236316680908203125, 
        'max' => 3, 
        'step' => 0.1000000000000000055511151231257827021181583404541015625, 
        'placeholder' => '1'
      ]
    ], 
    'slider_autoplay' => [
      'label' => 'Autoplay', 
      'type' => 'checkbox', 
      'text' => 'Enable autoplay'
    ], 
    'slider_autoplay_pause' => [
      'type' => 'checkbox', 
      'text' => 'Pause autoplay on hover', 
      'enable' => 'slider_autoplay'
    ], 
    'slider_autoplay_interval' => [
      'label' => 'Interval', 
      'description' => 'Set the autoplay interval in seconds.', 
      'type' => 'range', 
      'attrs' => [
        'min' => 5, 
        'max' => 15, 
        'step' => 1, 
        'placeholder' => '7'
      ], 
      'enable' => 'slider_autoplay'
    ], 
    'nav' => [
      'label' => 'Navigation', 
      'description' => 'Select the navigation type.', 
      'type' => 'select', 
      'options' => [
        'None' => '', 
        'Dotnav' => 'dotnav'
      ]
    ], 
    'nav_align' => [
      'label' => 'Position', 
      'description' => 'Align the navigation\'s items.', 
      'type' => 'select', 
      'options' => [
        'Left' => 'left', 
        'Center' => 'center', 
        'Right' => 'right'
      ], 
      'enable' => 'nav'
    ], 
    'nav_margin' => [
      'label' => 'Margin', 
      'description' => 'Set the vertical margin.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium'
      ], 
      'enable' => 'nav'
    ], 
    'nav_breakpoint' => [
      'label' => 'Breakpoint', 
      'description' => 'Display the navigation only on this device width and larger.', 
      'type' => 'select', 
      'options' => [
        'Always' => '', 
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l', 
        'X-Large (Large Screens)' => 'xl'
      ], 
      'enable' => 'nav'
    ], 
    'nav_color' => [
      'label' => 'Color', 
      'description' => 'Set light or dark color mode.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Light' => 'light', 
        'Dark' => 'dark'
      ], 
      'enable' => 'nav'
    ], 
    'slidenav' => [
      'label' => 'Position', 
      'description' => 'Select the position of the slidenav.', 
      'type' => 'select', 
      'options' => [
        'None' => '', 
        'Default' => 'default', 
        'Outside' => 'outside', 
        'Top Left' => 'top-left', 
        'Top Right' => 'top-right', 
        'Center Left' => 'center-left', 
        'Center Right' => 'center-right', 
        'Bottom Left' => 'bottom-left', 
        'Bottom Center' => 'bottom-center', 
        'Bottom Right' => 'bottom-right'
      ]
    ], 
    'slidenav_hover' => [
      'type' => 'checkbox', 
      'text' => 'Show on hover only', 
      'enable' => 'slidenav'
    ], 
    'slidenav_large' => [
      'type' => 'checkbox', 
      'text' => 'Larger style', 
      'enable' => 'slidenav'
    ], 
    'slidenav_margin' => [
      'label' => 'Margin', 
      'description' => 'Apply a margin between the slidenav and the slider container.', 
      'type' => 'select', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large'
      ], 
      'enable' => 'slidenav'
    ], 
    'slidenav_breakpoint' => [
      'label' => 'Breakpoint', 
      'description' => 'Display the slidenav only on this device width and larger.', 
      'type' => 'select', 
      'options' => [
        'Always' => '', 
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l', 
        'X-Large (Large Screens)' => 'xl'
      ], 
      'enable' => 'slidenav'
    ], 
    'slidenav_color' => [
      'label' => 'Color', 
      'description' => 'Set light or dark color mode.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Light' => 'light', 
        'Dark' => 'dark'
      ], 
      'enable' => 'slidenav'
    ], 
    'slidenav_outside_breakpoint' => [
      'label' => 'Outside Breakpoint', 
      'description' => 'Display the slidenav only outside on this device width and larger. Otherwise it will be displayed inside.', 
      'type' => 'select', 
      'options' => [
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l', 
        'X-Large (Large Screens)' => 'xl'
      ], 
      'enable' => 'slidenav == \'outside\''
    ], 
    'slidenav_outside_color' => [
      'label' => 'Outside Color', 
      'description' => 'Set light or dark color if the slidenav is outside of the slideshow.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Light' => 'light', 
        'Dark' => 'dark'
      ], 
      'enable' => 'slidenav == \'outside\''
    ], 
    'overlay_mode' => [
      'label' => 'Mode', 
      'description' => 'When using cover mode, you need to set the text color manually.', 
      'type' => 'select', 
      'options' => [
        'Cover' => 'cover', 
        'Caption' => 'caption'
      ]
    ], 
    'overlay_hover' => [
      'type' => 'checkbox', 
      'text' => 'Display overlay on hover'
    ], 
    'overlay_transition_background' => [
      'type' => 'checkbox', 
      'text' => 'Animate background only', 
      'enable' => 'overlay_hover && overlay_mode == \'cover\''
    ], 
    'overlay_style' => [
      'label' => 'Style', 
      'description' => 'Select the style for the overlay.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Overlay Default' => 'overlay-default', 
        'Overlay Primary' => 'overlay-primary', 
        'Tile Default' => 'tile-default', 
        'Tile Muted' => 'tile-muted', 
        'Tile Primary' => 'tile-primary', 
        'Tile Secondary' => 'tile-secondary'
      ]
    ], 
    'text_color' => [
      'label' => 'Text Color', 
      'description' => 'Set light or dark color mode for text, buttons and controls.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Light' => 'light', 
        'Dark' => 'dark'
      ], 
      'enable' => '!overlay_style || overlay_style && overlay_mode == \'cover\''
    ], 
    'text_color_hover' => [
      'type' => 'checkbox', 
      'text' => 'Inverse the text color on hover', 
      'enable' => 'overlay_style && overlay_mode == \'cover\' && overlay_transition_background'
    ], 
    'overlay_padding' => [
      'label' => 'Padding', 
      'description' => 'Set the padding between the overlay and its content.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Small' => 'small', 
        'Large' => 'large', 
        'None' => 'none'
      ]
    ], 
    'overlay_position' => [
      'label' => 'Position', 
      'description' => 'Select the overlay or content position.', 
      'type' => 'select', 
      'options' => [
        'Top' => 'top', 
        'Bottom' => 'bottom', 
        'Left' => 'left', 
        'Right' => 'right', 
        'Top Left' => 'top-left', 
        'Top Center' => 'top-center', 
        'Top Right' => 'top-right', 
        'Bottom Left' => 'bottom-left', 
        'Bottom Center' => 'bottom-center', 
        'Bottom Right' => 'bottom-right', 
        'Center' => 'center', 
        'Center Left' => 'center-left', 
        'Center Right' => 'center-right'
      ]
    ], 
    'overlay_margin' => [
      'label' => 'Margin', 
      'description' => 'Apply a margin between the overlay and the image container.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large'
      ], 
      'enable' => 'overlay_style'
    ], 
    'overlay_maxwidth' => [
      'label' => 'Max Width', 
      'description' => 'Set the maximum content width.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge'
      ], 
      'enable' => '!$match(overlay_position, \'(^top$|^bottom$)\')'
    ], 
    'overlay_transition' => [
      'label' => 'Transition', 
      'description' => 'Select a hover transition for the overlay.', 
      'type' => 'select', 
      'options' => [
        'Fade' => 'fade', 
        'Scale Up' => 'scale-up', 
        'Scale Down' => 'scale-down', 
        'Slide Top Small' => 'slide-top-small', 
        'Slide Bottom Small' => 'slide-bottom-small', 
        'Slide Left Small' => 'slide-left-small', 
        'Slide Right Small' => 'slide-right-small', 
        'Slide Top Medium' => 'slide-top-medium', 
        'Slide Bottom Medium' => 'slide-bottom-medium', 
        'Slide Left Medium' => 'slide-left-medium', 
        'Slide Right Medium' => 'slide-right-medium', 
        'Slide Top 100%' => 'slide-top', 
        'Slide Bottom 100%' => 'slide-bottom', 
        'Slide Left 100%' => 'slide-left', 
        'Slide Right 100%' => 'slide-right'
      ], 
      'enable' => 'overlay_hover'
    ], 
    'image_width' => [
      'attrs' => [
        'placeholder' => 'auto'
      ]
    ], 
    'image_height' => [
      'attrs' => [
        'placeholder' => 'auto'
      ]
    ], 
    'image_transition' => [
      'label' => 'Transition', 
      'description' => 'Select an image transition.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Scale Up' => 'scale-up', 
        'Scale Down' => 'scale-down'
      ]
    ], 
    'title_transition' => [
      'label' => 'Transition', 
      'description' => 'Select a hover transition for the title.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Fade' => 'fade', 
        'Scale Up' => 'scale-up', 
        'Scale Down' => 'scale-down', 
        'Slide Top Small' => 'slide-top-small', 
        'Slide Bottom Small' => 'slide-bottom-small', 
        'Slide Left Small' => 'slide-left-small', 
        'Slide Right Small' => 'slide-right-small', 
        'Slide Top Medium' => 'slide-top-medium', 
        'Slide Bottom Medium' => 'slide-bottom-medium', 
        'Slide Left Medium' => 'slide-left-medium', 
        'Slide Right Medium' => 'slide-right-medium', 
        'Slide Top 100%' => 'slide-top', 
        'Slide Bottom 100%' => 'slide-bottom', 
        'Slide Left 100%' => 'slide-left', 
        'Slide Right 100%' => 'slide-right'
      ], 
      'enable' => 'show_title && overlay_hover'
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
      'enable' => 'show_title'
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
      'enable' => 'show_title'
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
      'enable' => 'show_title'
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
      'enable' => 'show_title'
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
      'enable' => 'show_title'
    ], 
    'meta_transition' => [
      'label' => 'Transition', 
      'description' => 'Select a hover transition for the meta text.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Fade' => 'fade', 
        'Scale Up' => 'scale-up', 
        'Scale Down' => 'scale-down', 
        'Slide Top Small' => 'slide-top-small', 
        'Slide Bottom Small' => 'slide-bottom-small', 
        'Slide Left Small' => 'slide-left-small', 
        'Slide Right Small' => 'slide-right-small', 
        'Slide Top Medium' => 'slide-top-medium', 
        'Slide Bottom Medium' => 'slide-bottom-medium', 
        'Slide Left Medium' => 'slide-left-medium', 
        'Slide Right Medium' => 'slide-right-medium', 
        'Slide Top 100%' => 'slide-top', 
        'Slide Bottom 100%' => 'slide-bottom', 
        'Slide Left 100%' => 'slide-left', 
        'Slide Right 100%' => 'slide-right'
      ], 
      'enable' => 'show_meta && overlay_hover'
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
      'enable' => 'show_meta'
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
      'enable' => 'show_meta'
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
      'enable' => 'show_meta'
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
      'enable' => 'show_meta'
    ], 
    'content_transition' => [
      'label' => 'Transition', 
      'description' => 'Select a hover transition for the content.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Fade' => 'fade', 
        'Scale Up' => 'scale-up', 
        'Scale Down' => 'scale-down', 
        'Slide Top Small' => 'slide-top-small', 
        'Slide Bottom Small' => 'slide-bottom-small', 
        'Slide Left Small' => 'slide-left-small', 
        'Slide Right Small' => 'slide-right-small', 
        'Slide Top Medium' => 'slide-top-medium', 
        'Slide Bottom Medium' => 'slide-bottom-medium', 
        'Slide Left Medium' => 'slide-left-medium', 
        'Slide Right Medium' => 'slide-right-medium', 
        'Slide Top 100%' => 'slide-top', 
        'Slide Bottom 100%' => 'slide-bottom', 
        'Slide Left 100%' => 'slide-left', 
        'Slide Right 100%' => 'slide-right'
      ], 
      'enable' => 'show_content && overlay_hover'
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
      'enable' => 'show_content'
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
      'enable' => 'show_content'
    ], 
    'link_type' => [
      'label' => 'Type', 
      'description' => 'Show the link as a button or choose between linking just the image and title or the whole item.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Button' => '', 
        'Title' => 'content', 
        'Item' => 'element'
      ], 
      'enable' => 'show_link'
    ], 
    'link_target' => [
      'type' => 'checkbox', 
      'text' => 'Open in a new window', 
      'enable' => 'show_link'
    ], 
    'link_transition' => [
      'label' => 'Transition', 
      'description' => 'Select a hover transition for the link.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Fade' => 'fade', 
        'Scale Up' => 'scale-up', 
        'Scale Down' => 'scale-down', 
        'Slide Top Small' => 'slide-top-small', 
        'Slide Bottom Small' => 'slide-bottom-small', 
        'Slide Left Small' => 'slide-left-small', 
        'Slide Right Small' => 'slide-right-small', 
        'Slide Top Medium' => 'slide-top-medium', 
        'Slide Bottom Medium' => 'slide-bottom-medium', 
        'Slide Left Medium' => 'slide-left-medium', 
        'Slide Right Medium' => 'slide-right-medium', 
        'Slide Top 100%' => 'slide-top', 
        'Slide Bottom 100%' => 'slide-bottom', 
        'Slide Left 100%' => 'slide-left', 
        'Slide Right 100%' => 'slide-right'
      ], 
      'enable' => 'show_link && !link_type && overlay_hover'
    ], 
    'link_text' => [
      'label' => 'Text', 
      'description' => 'Enter the text for the link.', 
      'enable' => 'show_link && !link_type'
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
      'enable' => 'show_link && !link_type'
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
      'enable' => 'show_link && !link_type && link_style && link_style != \'link-muted\' && link_style != \'link-text\''
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
      'enable' => 'show_link && !link_type'
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
    'container_padding_remove' => $this->get('builder:container_padding_remove'), 
    'name' => $this->get('builder:name'), 
    'status' => $this->get('builder:status'), 
    'id' => $this->get('builder:id'), 
    'class' => $this->get('builder:cls'), 
    'css' => [
      'label' => 'CSS', 
      'description' => 'Enter your own custom CSS. The following selectors will be prefixed automatically for this element: <code>.el-element</code>, <code>.el-item</code>, <code>.el-nav</code>, <code>.el-slidenav</code>, <code>.el-image</code>, <code>.el-title</code>, <code>.el-meta</code>, <code>.el-content</code>', 
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
          'fields' => ['content', 'show_title', 'show_meta', 'show_content', 'show_link']
        ], [
          'title' => 'Settings', 
          'fields' => [[
              'label' => 'Slider', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['slider_width', 'slider_height', 'slider_min_height', 'slider_gutter', 'slider_divider']
            ], [
              'label' => 'Item Width', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['slider_width_default', 'slider_width_small', 'slider_width_medium', 'slider_width_large', 'slider_width_xlarge']
            ], [
              'label' => 'Animation', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['slider_sets', 'slider_center', 'slider_finite', 'slider_velocity', 'slider_autoplay', 'slider_autoplay_pause', 'slider_autoplay_interval']
            ], [
              'label' => 'Navigation', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['nav', 'nav_align', 'nav_margin', 'nav_breakpoint', 'nav_color']
            ], [
              'label' => 'Slidenav', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['slidenav', 'slidenav_hover', 'slidenav_large', 'slidenav_margin', 'slidenav_breakpoint', 'slidenav_color', 'slidenav_outside_breakpoint', 'slidenav_outside_color']
            ], [
              'label' => 'Overlay', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['overlay_mode', 'overlay_hover', 'overlay_transition_background', 'overlay_style', 'text_color', 'text_color_hover', 'overlay_padding', 'overlay_position', 'overlay_margin', 'overlay_maxwidth', 'overlay_transition']
            ], [
              'label' => 'Image/Video', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => [[
                  'label' => 'Width/Height', 
                  'description' => 'Setting just one value preserves the original proportions. The image will be resized and cropped automatically, and where possible, high resolution images will be auto-generated.', 
                  'type' => 'grid', 
                  'width' => '1-2', 
                  'fields' => ['image_width', 'image_height']
                ], 'image_transition']
            ], [
              'label' => 'Title', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['title_transition', 'title_style', 'title_decoration', 'title_color', 'title_element', 'title_margin']
            ], [
              'label' => 'Meta', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['meta_transition', 'meta_style', 'meta_color', 'meta_align', 'meta_margin']
            ], [
              'label' => 'Content', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['content_transition', 'content_style', 'content_margin']
            ], [
              'label' => 'Link', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['link_type', 'link_target', 'link_transition', 'link_text', 'link_style', 'link_size', 'link_margin']
            ], [
              'label' => 'General', 
              'type' => 'group', 
              'fields' => ['text_align', 'text_align_breakpoint', 'text_align_fallback', 'maxwidth', 'maxwidth_align', 'maxwidth_breakpoint', 'margin', 'margin_remove_top', 'margin_remove_bottom', 'animation', '_parallax_button', 'visibility', 'container_padding_remove']
            ]]
        ], $this->get('builder:advanced')]
    ]
  ]
];
