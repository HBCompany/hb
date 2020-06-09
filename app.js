let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // You can save the event in order to trigger the prompt later (see below)
    deferredPrompt = e;

    // Update UI notify the user they can add to home screen.
    // With this you can show the Add to home screen button.
    showInstallPromotion();
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';

    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});