$(document).ready(function () {
    // Log Helper
    function logAction(action) {
      const logContainer = $('#log-container');
      logContainer.append(`<div>${action}</div>`);
      logContainer.scrollTop(logContainer[0].scrollHeight);
    }

    // Directional Buttons
    $('#move-up').click(() => logAction('Moved up'));
    $('#move-down').click(() => logAction('Moved down'));
    $('#move-left').click(() => logAction('Moved left'));
    $('#move-right').click(() => logAction('Moved right'));

    // Speed Slider
    $('#speed-slider').on('input', function () {
      $('#speed-display').text($(this).val());
    });

    // Speed Confirmation Modal
    $('#confirm-speed').click(function () {
      const speed = $('#speed-slider').val();
      $('#modal-speed').text(speed);
      const modal = new bootstrap.Modal($('#speedModal'));
      modal.show();
    });

    // Apply Speed Button in Modal
    $('#apply-speed').click(function () {
      const speed = $('#speed-slider').val();
      logAction(`Speed set to ${speed}`);
      const modal = bootstrap.Modal.getInstance($('#speedModal'));
      modal.hide();
    });
  });