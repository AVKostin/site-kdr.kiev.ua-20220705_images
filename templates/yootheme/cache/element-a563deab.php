<?php // @file /home/kdr00/kdr.kiev.ua/www/templates/yootheme/vendor/yootheme/builder/elements/description_list/element.json

return [
  '@import' => "{$file['dirname']}/element.php", 
  'name' => 'description_list', 
  'title' => 'Description List', 
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
    'layout' => 'grid-2', 
    'width' => 'auto', 
    'gutter' => 'small', 
    'meta_style' => 'meta', 
    'meta_align' => 'below-content'
  ], 
  'placeholder' => [
    'children' => [[
        'type' => 'description_list_item', 
        'props' => []
      ], [
        'type' => 'description_list_item', 
        'props' => []
      ], [
        'type' => 'description_list_item', 
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
      'item' => 'description_list_item'
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
    'list_style' => [
      'label' => 'Style', 
      'description' => 'Select the list style and add larger padding between items.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Divider' => 'divider', 
        'Striped' => 'striped'
      ]
    ], 
    'list_size' => [
      'type' => 'checkbox', 
      'text' => 'Larger padding'
    ], 
    'layout' => [
      'label' => 'Layout', 
      'description' => 'Define the layout of the title, meta and content.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        '2 Column Grid' => 'grid-2', 
        '2 Column Grid (Meta only)' => 'grid-2-m', 
        'Stacked' => 'stacked'
      ]
    ], 
    'width' => [
      'label' => 'Width', 
      'description' => 'Define the width of the title within the grid.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Auto' => 'auto', 
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Expand' => 'expand'
      ], 
      'enable' => 'layout != \'stacked\''
    ], 
    'leader' => [
      'type' => 'checkbox', 
      'text' => 'Add a leader', 
      'enable' => 'layout == \'grid-2-m\' && width == \'expand\''
    ], 
    'gutter' => [
      'label' => 'Gutter', 
      'description' => 'Select the gutter width between the title and content.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Small' => 'small', 
        'Medium' => 'medium', 
        'Default' => '', 
        'Large' => 'large'
      ], 
      'enable' => 'layout == \'grid-2\' || layout == \'grid-2-m\' && !(width == \'expand\' && leader)'
    ], 
    'breakpoint' => [
      'label' => 'Breakpoint', 
      'description' => 'Set the breakpoint from which the layout will stack.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Always' => '', 
        'Small (Phone Landscape)' => 's', 
        'Medium (Tablet Landscape)' => 'm', 
        'Large (Desktop)' => 'l', 
        'X-Large (Large Screens)' => 'xl'
      ], 
      'enable' => 'layout != \'stacked\''
    ], 
    'title_style' => [
      'label' => 'Style', 
      'description' => 'Select the title style and add an optional colon at the end of the title.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Strong' => 'strong', 
        'H1' => 'h1', 
        'H2' => 'h2', 
        'H3' => 'h3', 
        'H4' => 'h4', 
        'H5' => 'h5', 
        'H6' => 'h6'
      ], 
      'enable' => 'show_title'
    ], 
    'title_colon' => [
      'type' => 'checkbox', 
      'text' => 'Add a colon', 
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
        'Above Content' => 'above-content', 
        'Below Content' => 'below-content'
      ], 
      'enable' => 'show_meta && layout != \'grid-2-m\''
    ], 
    'content_style' => [
      'label' => 'Style', 
      'description' => 'Select a predefined text style, including color, size and font-family.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Lead' => 'lead', 
        'Meta' => 'meta'
      ], 
      'enable' => 'show_content'
    ], 
    'link_style' => [
      'label' => 'Style', 
      'description' => 'This option doesn\'t apply unless a URL has been added to the item. Only the item\'s content will be linked.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Muted' => 'muted', 
        'Reset' => 'reset'
      ], 
      'enable' => 'show_link'
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
    'id' => $this->get('builder:id'), 
    'class' => $this->get('builder:cls'), 
    'css' => [
      'label' => 'CSS', 
      'description' => 'Enter your own custom CSS. The following selectors will be prefixed automatically for this element: <code>.el-element</code>, <code>.el-item</code>, <code>.el-title</code>, <code>.el-meta</code>, <code>.el-content</code>', 
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
              'label' => 'List', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['list_style', 'list_size', 'layout', 'width', 'leader', 'gutter', 'breakpoint']
            ], [
              'label' => 'Title', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['title_style', 'title_colon', 'title_color']
            ], [
              'label' => 'Meta', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['meta_style', 'meta_color', 'meta_align']
            ], [
              'label' => 'Content', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['content_style']
            ], [
              'label' => 'Link', 
              'type' => 'group', 
              'divider' => true, 
              'fields' => ['link_style']
            ], [
              'label' => 'General', 
              'type' => 'group', 
              'fields' => ['text_align', 'text_align_breakpoint', 'text_align_fallback', 'maxwidth', 'maxwidth_align', 'maxwidth_breakpoint', 'margin', 'margin_remove_top', 'margin_remove_bottom', 'animation', '_parallax_button', 'visibility']
            ]]
        ], [
          'title' => 'Advanced', 
          'fields' => ['name', 'id', 'class', 'css']
        ]]
    ]
  ]
];
