$(document).ready(function () {
    // Sélectionner les éléments de la pop-up Patchnote
    const $openPatchnoteButton = $('#open-patchnote');
    const $closePatchnoteButton = $('#close-patchnote');
    const $patchnotePopup = $('#patchnote-popup');

    // Sélectionner les éléments de la pop-up Settings
    const $openSettingsButton = $('#open-settings');
    const $closeSettingsButton = $('#close-settings');
    const $settingsPopup = $('#settings-popup');

    // Arrière-plan sombre partagé par les deux popups
    const $popupBackground = $('#popup-background');

    // Fonction pour ouvrir une popup
    function openPopup(popup) {
        popup.fadeIn(300).css('display', 'flex'); // Afficher la popup avec Flexbox
        $popupBackground.fadeIn(300); // Faire apparaître le fond sombre
        $('body').addClass('overflow-hidden'); // Désactiver le scroll du fond
    }

    // Fonction pour fermer une popup
    function closePopup(popup) {
        popup.fadeOut(300);
        $popupBackground.fadeOut(300);
        $('body').removeClass('overflow-hidden');
    }

    // Ouvrir la popup Patchnote
    $openPatchnoteButton.on('click', function (event) {
        event.stopPropagation(); // Empêcher la propagation du clic
        openPopup($patchnotePopup);
    });

    // Ouvrir la popup Settings
    $openSettingsButton.on('click', function (event) {
        event.stopPropagation(); // Empêcher la propagation du clic
        openPopup($settingsPopup);
    });

    // Fermer la popup Patchnote
    $closePatchnoteButton.on('click', function () {
        closePopup($patchnotePopup);
    });

    // Fermer la popup Settings
    $closeSettingsButton.on('click', function () {
        closePopup($settingsPopup);
    });

    // Fermer la popup si on clique sur l'arrière-plan sombre
    $popupBackground.on('click', function () {
        closePopup($patchnotePopup);
        closePopup($settingsPopup);
    });

    // Empêcher la fermeture si on clique à l'intérieur des popups
    $patchnotePopup.find('.bg-white').on('click', function (event) {
        event.stopPropagation();
    });

    $settingsPopup.find('.bg-white').on('click', function (event) {
        event.stopPropagation();
    });

    // Fermer la popup si on clique en dehors de la popup (sur l'arrière-plan sombre)
    $(document).on('click', function (event) {
        if ($patchnotePopup.is(':visible') && !$(event.target).closest('.bg-white').length) {
            closePopup($patchnotePopup);
        }
        if ($settingsPopup.is(':visible') && !$(event.target).closest('.bg-white').length) {
            closePopup($settingsPopup);
        }
    });

    // Changer la teinte du background via le slider
    const root = document.documentElement;
    const colorSlider = document.getElementById('color-slider');

    colorSlider.addEventListener('input', function () {
        const hue = colorSlider.value;

        root.style.setProperty('--color1', `${hue}, 100%, 50%`);
        root.style.setProperty('--color2', `${(hue + 30) % 360}, 100%, 50%`);
        root.style.setProperty('--color3', `${(hue + 60) % 360}, 100%, 50%`);
        root.style.setProperty('--color4', `${(hue + 90) % 360}, 100%, 50%`);
        root.style.setProperty('--color5', `${(hue + 120) % 360}, 100%, 50%`);
    });
});
