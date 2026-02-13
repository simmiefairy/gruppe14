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
    
    // Smooth fade-in effekt når sidebar åbner
    $('#cart-trigger').on('click', function() {
        const sidebar = $('#sidebar');
        if (sidebar.is(':visible')) {
            sidebar.fadeOut(300);
            $('#backdrop').fadeOut(300);
        } else {
            sidebar.fadeIn(300);
            $('#backdrop').fadeIn(300);
        }
    });
    
    // Luk sidebar med fade-out effekt
    $('#btn-luk, #backdrop').on('click', function() {
        $('#sidebar').fadeOut(300);
        $('#backdrop').fadeOut(300);
    });
    
    // jQuery - håndter login panel med slide-effekt
    $('#loginLogoutLink').on('click', function() {
        $('#loginPanel').slideDown(300);
    });
    
    // Luk login panel med slide-up
    $('.close-btn').on('click', function() {
        $('#loginPanel').slideUp(300);
    });

});
