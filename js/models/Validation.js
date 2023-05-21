class Validation {
    true(errorId) {
        domId(errorId).style.display = "none";
        domId(errorId).innerHTML = "";
        return true;
    }

    false(errorId, mess) {
        domId(errorId).style.display = "block";
        domId(errorId).innerHTML = mess;
        return false;
    }

    kiemTraRong(value, errorId, mess) {
        if (value == "") {
            // false
            return this.false(errorId, mess);
        }

        // true
        return this.true(errorId);
    }

    kiemTraMinMaxKiTu(value, errorId, mess, min, max) {
        if (value.length < min || value.length > max) {
            // false
            return this.false(errorId, mess);
        }

        // true
        return this.true(errorId);
    }

    kiemTraMinMax(value, errorId, mess, min, max) {
        if (value < min || value > max) {
            // false
            return this.false(errorId, mess);
        }

        // true
        return this.true(errorId);
    }

    kiemTraPattern(value, errorId, mess, pattern) {
        if (value.match(pattern)) {
            // true
            return this.true(errorId);
        }

        // false
        return this.false(errorId, mess);
    }

    kiemTraChucVu(selectedId, errorId, mess) {
        if (domId(selectedId).selectedIndex != 0) {
            // true
            return this.true(errorId);
        }

        // False
        return this.false(errorId, mess);
    }

    kiemTraTrungTaiKhoan(value, errorId, mess, arr) {
        if (arr.every((nv) => nv.taiKhoan != value)) {
            // true
            return this.true(errorId);
        }

        // false
        return this.false(errorId, mess);
    }
}
