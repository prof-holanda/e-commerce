
function LocalStorageManager() {
    this.localStoragePrefix = 'e-commerce-';
}

LocalStorageManager.prototype = {
    get: function(key) {
        return JSON.parse(localStorage.getItem(this.localStoragePrefix + key)) || [];
    }, 
    
    set: function(key, value) {
        localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(value));
    }
};