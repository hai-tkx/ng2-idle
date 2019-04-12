/*
 * Represents an alternative storage for browser that doesn't support localstorage. (i.e. Safari in
 * private mode)
 * @implements Storage
 */
var AlternativeStorage = /** @class */ (function () {
    function AlternativeStorage() {
        this.storageMap = {};
    }
    Object.defineProperty(AlternativeStorage.prototype, "length", {
        /*
         * Returns an integer representing the number of data items stored in the storageMap object.
         */
        get: function () {
            return Object.keys(this.storageMap).length;
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Remove all keys out of the storage.
     */
    AlternativeStorage.prototype.clear = function () {
        this.storageMap = {};
    };
    /*
     * Return the key's value
     *
     * @param key - name of the key to retrieve the value of.
     * @return The key's value
     */
    AlternativeStorage.prototype.getItem = function (key) {
        if (typeof this.storageMap[key] !== 'undefined') {
            return this.storageMap[key];
        }
        return null;
    };
    /*
     * Return the nth key in the storage
     *
     * @param index - the number of the key you want to get the name of.
     * @return The name of the key.
     */
    AlternativeStorage.prototype.key = function (index) {
        return Object.keys(this.storageMap)[index] || null;
    };
    /*
     * Remove a key from the storage.
     *
     * @param key - the name of the key you want to remove.
     */
    AlternativeStorage.prototype.removeItem = function (key) {
        this.storageMap[key] = undefined;
    };
    /*
     * Add a key to the storage, or update a key's value if it already exists.
     *
     * @param key - the name of the key.
     * @param value - the value you want to give to the key.
     */
    AlternativeStorage.prototype.setItem = function (key, value) {
        this.storageMap[key] = value;
    };
    return AlternativeStorage;
}());
export { AlternativeStorage };
//# sourceMappingURL=alternativestorage.js.map