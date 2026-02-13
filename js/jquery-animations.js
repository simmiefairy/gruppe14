// ==========================================
// JQUERY ANIMATIONER
// ==========================================
// Denne fil demonstrerer brugen af jQuery til DOM-manipulering og animationer

$(document).ready(function() {
    
    // Animering når man klikker på favorit-knapperne
    $(document).on('click', '.tilføj-favorit', function(e) {
        const icon = $(this).find('span');
        
        // jQuery animation - skaler ikonet
        icon.animate({
            fontSize: '1.5em'
        }, 150, function() {
            icon.animate({
                fontSize: '1em'
            }, 150);
        });
        
        // Farve-transition med jQuery addClass/removeClass
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

});
