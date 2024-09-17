$(document).ready(function() {
    // Sélectionner les éléments
    const $openButton = $('#open-patchnote');
    const $closeButton = $('#close-patchnote');
    const $popup = $('#patchnote-popup');
    const $popupBackground = $('#popup-background');

    // Fonction pour ouvrir la popup avec fade-in
    function openPopup(event) {
        event.stopPropagation(); // Empêcher la propagation du clic pour éviter la fermeture instantanée
        $popup.fadeIn(300).css('display', 'flex'); // Afficher la popup avec Flexbox
        $popupBackground.fadeIn(300); // Faire apparaître le fond sombre
        $('body').addClass('overflow-hidden'); // Désactiver le scroll du fond
    }

    // Fonction pour fermer la popup avec fade-out
    function closePopup() {
        $popup.fadeOut(300);
        $popupBackground.fadeOut(300);
        $('body').removeClass('overflow-hidden');
    }

    // Ouvrir la popup lorsque l'utilisateur clique sur le bouton
    $openButton.on('click', openPopup);

    // Fermer la popup lorsque l'utilisateur clique sur la croix ou sur l'arrière-plan sombre
    $closeButton.on('click', closePopup);
    $popupBackground.on('click', closePopup);

    // Empêcher la fermeture si on clique à l'intérieur de la popup elle-même
    $popup.find('.bg-white').on('click', function(event) {
        event.stopPropagation(); // Empêche la fermeture en cliquant à l'intérieur de la popup
    });

    // Fermer la popup si on clique en dehors de la popup (sur l'arrière-plan sombre)
    $(document).on('click', function(event) {
        if ($popup.is(':visible') && !$(event.target).closest('.bg-white').length) {
            closePopup(); // Fermer si le clic est en dehors de la popup
        }
    });
});
