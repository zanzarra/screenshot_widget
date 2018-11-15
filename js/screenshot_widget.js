(function ($) {
  Drupal.behaviors.screenshot_widget = {
    attach: function (context, settings) {

      $('form.screenshot-form').once('screenshot-widget').each(function() {

        var processedCount = 0;

        this.addEventListener('submit', function(event) {

          var $form = $(event.target);
          var $elements = $("input[data-screenshot-controls='0']", $form);

          if ($elements.length !== processedCount) {
            event.preventDefault();

            $elements.each(function() {
              var $element = $(this);
              var selector = $element.data('screenshot-selector');
              var screenshot_element = document.body;

              if (selector) {
                var $selected_element = $(selector);
                if ($selected_element.length > 0) {
                  screenshot_element = $selected_element.get(0);
                }
              }

              html2canvas(screenshot_element, {useCORS: true, async: false}).then(function(canvas) {

                $element.val(canvas.toDataURL('image/jpeg', 0.9));
                processedCount++;
                if ($elements.length === processedCount) {
                  $(event.explicitOriginalTarget).trigger('click');
                }
              });
            });
          }
        });

      });

      $('.make-screenshot-button').once('manual-screenshot-widget').each(function() {

        this.addEventListener('mousedown', function(event) {
          event.stopImmediatePropagation();

          var $element = $('.screenshot-element', $(event.target).parent());
          var selector = $element.data('screenshot-selector');
          var screenshot_element = document.body;

          if (selector) {
            var $selected_element = $(selector);
            if ($selected_element.length > 0) {
              screenshot_element = $selected_element.get(0);
            }
          }

          html2canvas(screenshot_element, {useCORS: true, async: false}).then(function(canvas) {
            $element.val(canvas.toDataURL('image/jpeg', 0.9)).change();
            $(event.target).trigger(event.type);
          });

        });
      });

    }
  };
})(jQuery);
