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

    // Changer la teinte du background via le slider
    const root = document.documentElement;
    const colorSlider = document.getElementById('color-slider');
    const opacitySlider = document.getElementById('opacity-slider');

    // Ajouter un élément voile obscurcissant au document si ce n'est pas fait
    let overlay = document.getElementById('dark-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'dark-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '1'; // Derrière les popups
        overlay.style.pointerEvents = 'none'; // Ignorer les clics pour garder le voile non-interactif
        document.body.appendChild(overlay);
    }

    // Charger les valeurs sauvegardées depuis les cookies si elles existent
    const savedHue = getCookie('backgroundHue');
    const savedOpacity = getCookie('backgroundOpacity');

    // Appliquer la teinte si elle est sauvegardée
    if (savedHue) {
        colorSlider.value = savedHue;
        const hue = savedHue / 3;
        root.style.setProperty('--color1', `hsl(${hue}, 100%, 50%)`);
        root.style.setProperty('--color2', `hsl(${(hue + 30) % 360}, 100%, 50%)`);
        root.style.setProperty('--color3', `hsl(${(hue + 60) % 360}, 100%, 50%)`);
        root.style.setProperty('--color4', `hsl(${(hue + 90) % 360}, 100%, 50%)`);
        root.style.setProperty('--color5', `hsl(${(hue + 120) % 360}, 100%, 50%)`);
    }

    // Appliquer l'opacité si elle est sauvegardée
    if (savedOpacity) {
        opacitySlider.value = savedOpacity;
        const opacity = savedOpacity / 100;
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }

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

    // Ajouter les événements input des sliders après le chargement des cookies
    colorSlider.addEventListener('input', function () {
        const hue = colorSlider.value / 3;

        // Mettre à jour les couleurs de fond
        root.style.setProperty('--color1', `hsl(${hue}, 100%, 50%)`);
        root.style.setProperty('--color2', `hsl(${(hue + 30) % 360}, 100%, 50%)`);
        root.style.setProperty('--color3', `hsl(${(hue + 60) % 360}, 100%, 50%)`);
        root.style.setProperty('--color4', `hsl(${hue + 90} % 360, 100%, 50%)`);
        root.style.setProperty('--color5', `hsl(${hue + 120} % 360, 100%, 50%)`);

        // Enregistrer la valeur dans un cookie
        setCookie('backgroundHue', colorSlider.value, 30);
    });

    opacitySlider.addEventListener('input', function () {
        const opacity = opacitySlider.value / 100;

        // Mettre à jour l'opacité du voile
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

        // Enregistrer la valeur dans un cookie
        setCookie('backgroundOpacity', opacitySlider.value, 30);
    });

    // Gestion du bouton reset pour effacer les cookies et recharger la page
    $('#reset-settings').on('click', function () {
        // Fonction pour effacer les cookies spécifiques
        function clearCookie(name) {
            document.cookie = name + '=; Max-Age=0; path=/';
        }

        // Effacer les cookies de background
        clearCookie('backgroundHue');
        clearCookie('backgroundOpacity');

        // Recharger la page pour appliquer le reset
        location.reload();
    });

    // Fonction pour définir un cookie
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    // Fonction pour obtenir un cookie par son nom
    function getCookie(name) {
        const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
        return value ? decodeURIComponent(value[2]) : null;
    }
});
