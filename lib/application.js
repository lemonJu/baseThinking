module.exports = {
    _attrs: {},
    setAttr: function (key, value) {
        this._attrs[key] = value
    },
    getAttr: function (key) {
        return this._attrs[key]
    },
    removeAttr: function (key) {
        this._attrs[key] = null;
    }
}