<?php // @file /home/kdr00/kdr.kiev.ua/www/templates/yootheme/vendor/yootheme/builder/elements/grid/element.json

return [
  '@import' => "{$file['dirname']}/element.php", 
  'name' => 'grid', 
  'title' => 'Grid', 
  'icon' => $this->get('url:images/icon.svg'), 
  'iconSmall' => $this->get('url:images/iconSmall.svg'), 
  'element' => true, 
  'container' => true, 
  'width' => 500, 
  'defaults' => [
    'show_title' => true, 
    'show_meta' => true, 
    'show_content' => true, 
    'show_image' => true, 
    'show_link' => true, 
    'grid_default' => '1', 
    'grid_medium' => '3', 
    'filter_style' => 'tab', 
    'filter_all' => true, 
    'filter_position' => 'top', 
    'filter_align' => 'left', 
    'filter_grid_width' => 'auto', 
    'filter_breakpoint' => 'm', 
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
    'link_text' => 'Read more', 
    'link_style' => 'default', 
    'margin' => 'default', 
    'item_animation' => ''
  ], 
  'placeholder' => [
    'children' => [[
        'type' => 'grid_item', 
        'props' => []
      ], [
        'type' => 'grid_item', 
        'props' => []
      ], [
        'type' => 'grid_item', 
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
      'item' => 'grid_item', 
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
    'show_image' => [
      'type' => 'checkbox', 
      'text' => 'Show the image'
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
    'grid_masonry' => [
      'label' => 'Masonry', 
      'description' => 'The masonry effect creates a layout free of gaps even if grid cells have different heights. ', 
      'type' => 'checkbox', 
      'text' => 'Enable masonry effect'
    ], 
    'grid_parallax' => [
      'label' => 'Parallax', 
      'description' => 'The parallax effect moves single grid columns at different speeds while scrolling. Define the vertical parallax offset in pixels.', 
      'type' => 'range', 
      'attrs' => [
        'min' => 0, 
        'max' => 600, 
        'step' => 10
      ]
    ], 
    'gutter' => [
      'label' => 'Gutter', 
      'description' => 'Set the grid gutter width and display dividers between grid cells.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Default' => '', 
        'Large' => 'large', 
        'Collapse' => 'collapse'
      ]
    ], 
    'divider' => [
      'type' => 'checkbox', 
      'text' => 'Show dividers'
    ], 
    'grid_default' => [
      'label' => 'Phone Portrait', 
      'description' => 'Set the number of grid columns for each breakpoint. <i>Inherit</i> refers to the number of columns on the next smaller screen size.', 
      'type' => 'select', 
      'options' => [
        '1 Column' => '1', 
        '2 Columns' => '2', 
        '3 Columns' => '3', 
        '4 Columns' => '4', 
        '5 Columns' => '5', 
        '6 Columns' => '6'
      ]
    ], 
    'grid_small' => [
      'label' => 'Phone Landscape', 
      'description' => 'Set the number of grid columns for each breakpoint. <i>Inherit</i> refers to the number of columns on the next smaller screen size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Inherit' => '', 
        '1 Column' => '1', 
        '2 Columns' => '2', 
        '3 Columns' => '3', 
        '4 Columns' => '4', 
        '5 Columns' => '5', 
        '6 Columns' => '6'
      ]
    ], 
    'grid_medium' => [
      'label' => 'Tablet Landscape', 
      'description' => 'Set the number of grid columns for each breakpoint. <i>Inherit</i> refers to the number of columns on the next smaller screen size.', 
      'type' => 'select', 
      'options' => [
        'Inherit' => '', 
        '1 Column' => '1', 
        '2 Columns' => '2', 
        '3 Columns' => '3', 
        '4 Columns' => '4', 
        '5 Columns' => '5', 
        '6 Columns' => '6'
      ]
    ], 
    'grid_large' => [
      'label' => 'Desktop', 
      'description' => 'Set the number of grid columns for each breakpoint. <i>Inherit</i> refers to the number of columns on the next smaller screen size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Inherit' => '', 
        '1 Column' => '1', 
        '2 Columns' => '2', 
        '3 Columns' => '3', 
        '4 Columns' => '4', 
        '5 Columns' => '5', 
        '6 Columns' => '6'
      ]
    ], 
    'grid_xlarge' => [
      'label' => 'Large Screens', 
      'description' => 'Set the number of grid columns for each breakpoint. <i>Inherit</i> refers to the number of columns on the next smaller screen size.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Inherit' => '', 
        '1 Column' => '1', 
        '2 Columns' => '2', 
        '3 Columns' => '3', 
        '4 Columns' => '4', 
        '5 Columns' => '5', 
        '6 Columns' => '6'
      ]
    ], 
    'filter' => [
      'label' => 'Filter', 
      'type' => 'checkbox', 
      'text' => 'Enable filter navigation'
    ], 
    'filter_style' => [
      'label' => 'Style', 
      'description' => 'Select the filter navigation style. The pill and divider styles are only available for horizontal Subnavs.', 
      'type' => 'select', 
      'options' => [
        'Tabs' => 'tab', 
        'Subnav (Nav)' => 'subnav', 
        'Subnav Divider (Nav)' => 'subnav-divider', 
        'Subnav Pill (Nav)' => 'subnav-pill'
      ], 
      'enable' => 'filter'
    ], 
    'filter_all' => [
      'label' => 'All Items', 
      'type' => 'checkbox', 
      'text' => 'Show filter control for all items', 
      'enable' => 'filter'
    ], 
    'filter_all_label' => [
      'attrs' => [
        'placeholder' => 'All'
      ], 
      'enable' => 'filter && filter_all'
    ], 
    'filter_position' => [
      'label' => 'Position', 
      'description' => 'Position the filter navigation at the top, left or right. A larger style can be applied to left and right navigations.', 
      'type' => 'select', 
      'options' => [
        'Top' => 'top', 
        'Left' => 'left', 
        'Right' => 'right'
      ], 
      'enable' => 'filter'
    ], 
    'filter_style_primary' => [
      'type' => 'checkbox', 
      'text' => 'Primary navigation', 
      'enable' => 'filter && (filter_position == \'left\' || filter_position == \'right\') && $match(filter_style, \'(^subnav)\')'
    ], 
    'filter_align' => [
      'label' => 'Alignment', 
      'description' => 'Align the filter controls.', 
      'type' => 'select', 
      'options' => [
        'Left' => 'left', 
        'Right' => 'right', 
        'Center' => 'center', 
        'Justify' => 'justify'
      ], 
      'enable' => 'filter && filter_position == \'top\''
    ], 
    'filter_margin' => [
      'label' => 'Margin', 
      'description' => 'Set the vertical margin.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Default' => '', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge'
      ], 
      'enable' => 'filter && filter_position == \'top\''
    ], 
    'filter_grid_width' => [
      'label' => 'Grid Width', 
      'description' => 'Define the width of the filter navigation. Choose between percent and fixed widths or expand columns to the width of their content.', 
      'type' => 'select', 
      'options' => [
        'Auto' => 'auto', 
        '50%' => '1-2', 
        '33%' => '1-3', 
        '25%' => '1-4', 
        '20%' => '1-5', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large'
      ], 
      'enable' => 'filter && (filter_position == \'left\' || filter_position == \'right\')'
    ], 
    'filter_gutter' => [
      'label' => 'Grid Gutter', 
      'description' => 'Select the gutter width between the filter navigation and grid.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Default' => '', 
        'Large' => 'large', 
        'Collapse' => 'collapse'
      ], 
      'enable' => 'filter && (filter_position == \'left\' || filter_position == \'right\')'
    ], 
    'filter_breakpoint' => [
      'label' => 'Grid Breakpoint', 
      'description' => 'Set the breakpoint from which the filter navigation and grid will stack.', 
      'type' => 'select', 
      'options' => [
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l'
      ], 
      'enable' => 'filter && (filter_position == \'left\' || filter_position == \'right\')'
    ], 
    'lightbox' => [
      'label' => 'Lightbox', 
      'type' => 'checkbox', 
      'text' => 'Enable lightbox gallery'
    ], 
    'lightbox_image_width' => [
      'attrs' => [
        'placeholder' => 'auto'
      ], 
      'enable' => 'lightbox'
    ], 
    'lightbox_image_height' => [
      'attrs' => [
        'placeholder' => 'auto'
      ], 
      'enable' => 'lightbox'
    ], 
    'lightbox_image_orientation' => [
      'label' => 'Image Orientation', 
      'description' => 'Width and height will be flipped accordingly, if the image is in portrait or landscape format.', 
      'type' => 'checkbox', 
      'text' => 'Allow mixed image orientations', 
      'enable' => 'lightbox'
    ], 
    'title_display' => [
      'label' => 'Show Title', 
      'description' => 'Display the title inside the panel, as the lightbox caption or both.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Overlay + Lightbox' => '', 
        'Overlay only' => 'item', 
        'Lightbox only' => 'lightbox'
      ], 
      'enable' => 'show_title && lightbox'
    ], 
    'content_display' => [
      'label' => 'Show Content', 
      'description' => 'Display the content inside the panel, as the lightbox caption or both.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Overlay + Lightbox' => '', 
        'Overlay only' => 'item', 
        'Lightbox only' => 'lightbox'
      ], 
      'enable' => 'show_content && lightbox'
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
      'description' => 'Add padding to the content if the image is top, left or right aligned.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Default' => 'default', 
        'Large' => 'large'
      ], 
      'show' => '!panel_style', 
      'enable' => 'show_image && image_align != \'between\''
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
      'description' => 'Top, left or right aligned images can be attached to the card\'s edge. If the image is aligned to the left or right, it will also extend to cover the whole space.', 
      'type' => 'checkbox', 
      'text' => 'Align image without padding', 
      'show' => 'panel_style', 
      'enable' => 'show_image && image_align != \'between\''
    ], 
    'item_maxwidth' => [
      'type' => 'select', 
      'label' => 'Max Width', 
      'description' => 'Set the maximum width.', 
      'default' => '', 
      'options' => [
        'None' => '', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Large' => 'large', 
        'X-Large' => 'xlarge', 
        'XX-Large' => 'xxlarge'
      ]
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox)'
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox)'
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox)'
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox)'
    ], 
    'title_align' => [
      'label' => 'Alignment', 
      'description' => 'Align the title to the top or left in regards to the content.', 
      'type' => 'select', 
      'options' => [
        'Top' => 'top', 
        'Left' => 'left'
      ], 
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox)'
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox) && title_align == \'left\''
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox) && title_align == \'left\''
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox) && title_align == \'left\''
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
      'enable' => 'show_title && (title_display != \'lightbox\' && lightbox || !lightbox)'
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
    'content_style' => [
      'label' => 'Style', 
      'description' => 'Select a predefined text style, including color, size and font-family.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Lead' => 'lead'
      ], 
      'enable' => 'show_content && (content_display != \'lightbox\' && lightbox || !lightbox)'
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
      'enable' => 'show_content && (content_display != \'lightbox\' && lightbox || !lightbox)'
    ], 
    'image_width' => [
      'attrs' => [
        'placeholder' => 'auto'
      ], 
      'enable' => 'show_image'
    ], 
    'image_height' => [
      'attrs' => [
        'placeholder' => 'auto'
      ], 
      'enable' => 'show_image'
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
      'enable' => 'show_image && (!panel_style || (panel_style && (!panel_card_image || image_align == \'between\')))'
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
      'enable' => 'show_image && !panel_style'
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
      'enable' => 'show_link && show_image && !panel_style && link_type == \'element\''
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
      'enable' => 'show_image && !panel_style'
    ], 
    'image_box_decoration_inverse' => [
      'type' => 'checkbox', 
      'text' => 'Inverse style', 
      'enable' => 'show_image && !panel_style && $match(image_box_decoration, \'^(default|primary|secondary)$\')'
    ], 
    'icon_ratio' => [
      'label' => 'Icon Size', 
      'description' => 'Enter a size ratio, if you want the icon to appear larger than the default font size, for example 1.5 or 2 to double the size.', 
      'attrs' => [
        'placeholder' => '1'
      ], 
      'enable' => 'show_image'
    ], 
    'icon_color' => [
      'label' => 'Icon Color', 
      'description' => 'Set the icon color.', 
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
      'enable' => 'show_image'
    ], 
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
      'enable' => 'show_image'
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
      'enable' => 'show_image && (image_align == \'left\' || image_align == \'right\')'
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
      'enable' => 'show_image && (image_align == \'left\' || image_align == \'right\') && !(panel_card_image && panel_style)'
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
      'enable' => 'show_image && (image_align == \'left\' || image_align == \'right\')'
    ], 
    'image_vertical_align' => [
      'label' => 'Vertical Alignment', 
      'description' => 'Vertically center grid cells.', 
      'type' => 'checkbox', 
      'text' => 'Center', 
      'enable' => 'show_image && (image_align == \'left\' || image_align == \'right\')'
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
      'enable' => 'show_image && (image_align == \'between\' || image_align == \'bottom\' && !panel_card_image)'
    ], 
    'image_svg_inline' => [
      'label' => 'Inline SVG', 
      'description' => 'Inject SVG images into the page markup, so that they can easily be styled with CSS.', 
      'type' => 'checkbox', 
      'text' => 'Make SVG stylable with CSS', 
      'enable' => 'show_image'
    ], 
    'image_svg_animate' => [
      'type' => 'checkbox', 
      'text' => 'Animate strokes', 
      'enable' => 'show_image && image_svg_inline'
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
      'enable' => 'show_image && image_svg_inline'
    ], 
    'link_type' => [
      'label' => 'Type', 
      'description' => 'Show the link as a button or choose between linking just the image and title or the whole item.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Button' => '', 
        'Title/Image' => 'content', 
        'Item' => 'element'
      ], 
      'enable' => 'show_link'
    ], 
    'link_target' => [
      'type' => 'checkbox', 
      'text' => 'Open in a new window', 
      'enable' => 'show_link && !lightbox'
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
    'item_animation' => $this->get('builder:animation'), 
    '_parallax_button' => $this->get('builder:_parallax_button'), 
    'visibility' => $this->get('builder:visibility'), 
    'name' => $this->get('builder:name'), 
    'status' => $this->get('builder:status'), 
    'id' => $this->get('builder:id'), 
    'class' => $this->get('builder:cls'), 
    'css' => [
      'label' => 'CSS', 
      'description' => 'Enter your own custom CSS. The following selectors will be prefixed automatically for this element: <code>.el-element</code>, <code>.el-item</code>, <code>.el-title</code>, <code>.el-meta</code>, <code>.el-content</code>, <code>.el-image</code>, <code>.el-link</code>', 
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
          'fields' => ['content', 'show_title', 'show_meta', 'show_image', 'show_content', 'show_link']
        ], [
          'title' => 'Settings', 
          'fields' => [[
              'label' => 'Grid', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['grid_masonry', 'grid_parallax', 'gutter', 'divider']
            ], [
              'label' => 'Columns', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['grid_default', 'grid_small', 'grid_medium', 'grid_large', 'grid_xlarge']
            ], [
              'label' => 'Filter', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['filter', 'filter_style', 'filter_all', 'filter_all_label', 'filter_position', 'filter_style_primary', 'filter_align', 'filter_margin', 'filter_grid_width', 'filter_gutter', 'filter_breakpoint']
            ], [
              'label' => 'Lightbox', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['lightbox', [
                  'label' => 'Image Width/Height', 
                  'description' => 'Setting just one value preserves the original proportions. The image will be resized and cropped automatically, and where possible, high resolution images will be auto-generated.', 
                  'type' => 'grid', 
                  'width' => '1-2', 
                  'fields' => ['lightbox_image_width', 'lightbox_image_height']
                ], 'lightbox_image_orientation', 'title_display', 'content_display']
            ], [
              'label' => 'Panel', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['panel_style', 'panel_content_padding', 'panel_size', 'panel_card_image', 'item_maxwidth']
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
              'fields' => [[
                  'label' => 'Width/Height', 
                  'description' => 'Setting just one value preserves the original proportions. The image will be resized and cropped automatically, and where possible, high resolution images will be auto-generated.', 
                  'type' => 'grid', 
                  'width' => '1-2', 
                  'fields' => ['image_width', 'image_height']
                ], 'image_border', 'image_box_shadow', 'image_hover_box_shadow', 'image_box_decoration', 'image_box_decoration_inverse', 'icon_ratio', 'icon_color', 'image_align', 'image_grid_width', 'image_gutter', 'image_breakpoint', 'image_vertical_align', 'image_margin', 'image_svg_inline', 'image_svg_animate', 'image_svg_color']
            ], [
              'label' => 'Link', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['link_type', 'link_target', 'link_text', 'link_style', 'link_size', 'link_margin']
            ], [
              'label' => 'General', 
              'type' => 'group', 
              'fields' => ['text_align', 'text_align_breakpoint', 'text_align_fallback', 'maxwidth', 'maxwidth_align', 'maxwidth_breakpoint', 'margin', 'margin_remove_top', 'margin_remove_bottom', 'item_animation', '_parallax_button', 'visibility']
            ]]
        ], $this->get('builder:advanced')]
    ]
  ]
];
