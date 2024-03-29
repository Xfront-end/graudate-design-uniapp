const debounce = (fn,wait) => {
    var timer = null;
    return function() {
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(fn,wait);
    }
}

module.exports = {
	debounce
}