if('serviceWorker' in navigator) {
    try{
        navigator.serviceWorker.register('js/sw.js');
        console.log(`SW registered`);
    }catch (error) {
        console.log(`SW reg failed`);
    }
}