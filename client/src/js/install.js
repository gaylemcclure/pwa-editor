const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //Store trigger
    window.deferredPrompt = event;

    //Hide the button class
    butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptE = window.deferredPrompt;
    // Return if no trigger
    if (!promptE) {
        return;
    }
    // Show the prompt
    promptE.prompt();
    //Reset var to null
    window.deferredPrompt = null;
    // Show the button again
    butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
	// Remove the prompt
	window.deferredPrompt = null;
});
