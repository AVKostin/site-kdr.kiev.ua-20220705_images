<?php // @file /home/kdr00/kdr.kiev.ua/www/templates/yootheme/vendor/yootheme/builder/elements/slideshow_item/element.json

return [
  '@import' => "{$file['dirname']}/element.php", 
  'name' => 'slideshow_item', 
  'title' => 'Item', 
  'width' => 500, 
  'templates' => [
    'render' => "{$file['dirname']}/templates/template.php", 
    'content' => "{$file['dirname']}/templates/content.php"
  ], 
  'fields' => [
    'image' => [
      'label' => 'Image', 
      'type' => 'image', 
      'show' => '!video'
    ], 
    'video' => [
      'label' => 'Video', 
      'description' => 'Select a video file or enter a link from <a href="https://www.youtube.com" target="_blank">YouTube</a> or <a href="https://vimeo.com" target="_blank">Vimeo</a>.', 
      'type' => 'video', 
      'show' => '!image'
    ], 
    '_media' => [
      'type' => 'button-panel', 
      'panel' => 'builder-slideshow-item-media', 
      'text' => 'Edit Settings', 
      'show' => 'image || video'
    ], 
    'image_alt' => [
      'label' => 'Image Alt', 
      'show' => 'image && !video'
    ], 
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
    'link' => $this->get('builder:link'), 
    'link_text' => [
      'label' => 'Link Text', 
      'description' => 'Set a different link text for this item.', 
      'enable' => 'link'
    ], 
    'text_color' => [
      'label' => 'Text Color', 
      'description' => 'Set a different text color for this item.', 
      'type' => 'select', 
      'default' => '', 
      'options' => [
        'Default' => '', 
        'Light' => 'light', 
        'Dark' => 'dark'
      ]
    ], 
    'thumbnail' => [
      'label' => 'Navigation Thumbnail', 
      'description' => 'This option is only used if the thumbnail navigation is set.', 
      'type' => 'image'
    ]
  ], 
  'fieldset' => [
    'default' => [
      'fields' => ['image', 'video', '_media', 'image_alt', 'title', 'meta', 'content', 'link', 'link_text', 'text_color', 'thumbnail']
    ]
  ], 
  'panels' => [
    'builder-slideshow-item-media' => [
      'title' => 'Image/Video', 
      'width' => 500, 
      'fields' => [
        'media_background' => [
          'label' => 'Background Color', 
          'description' => 'Use the background color in combination with blend modes.', 
          'type' => 'color'
        ], 
        'media_blend_mode' => [
          'label' => 'Blend Mode', 
          'description' => 'Determine how the image or video will blend with the background color.', 
          'type' => 'select', 
          'default' => '', 
          'options' => [
            'Normal' => '', 
            'Multiply' => 'multiply', 
            'Screen' => 'screen', 
            'Overlay' => 'overlay', 
            'Darken' => 'darken', 
            'Lighten' => 'lighten', 
            'Color-dodge' => 'color-dodge', 
            'Color-burn' => 'color-burn', 
            'Hard-light' => 'hard-light', 
            'Soft-light' => 'soft-light', 
            'Difference' => 'difference', 
            'Exclusion' => 'exclusion', 
            'Hue' => 'hue', 
            'Saturation' => 'saturation', 
            'Color' => 'color', 
            'Luminosity' => 'luminosity'
          ], 
          'enable' => 'media_background'
        ], 
        'media_overlay' => [
          'label' => 'Overlay Color', 
          'description' => 'Set an additional transparent overlay to soften the image or video.', 
          'type' => 'color'
        ]
      ], 
      'fieldset' => [
        'default' => [
          'fields' => ['media_background', 'media_blend_mode', 'media_overlay']
        ]
      ]
    ]
  ]
];
