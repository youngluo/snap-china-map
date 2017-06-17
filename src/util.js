export default {
    merge(oldObj, newObj) {
        let result = oldObj;
        for (let newKey in newObj) {
            if (newObj.hasOwnProperty(newKey)) {
                result[newKey] = newObj[newKey];
            }
        }

        return result;
    },
    isEmptyObject(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },
    getElementAbsolutePos(ele) {
        let offsetLeft = ele.offsetLeft,
            offsetTop = ele.offsetTop,
            curOffsetParent = ele.offsetParent;

        while (curOffsetParent !== null) {
            offsetLeft += curOffsetParent.offsetLeft;
            offsetTop += curOffsetParent.offsetTop;
            curOffsetParent = curOffsetParent.offsetParent;
        }

        return {
            left: offsetLeft,
            top: offsetTop
        };
    }
};