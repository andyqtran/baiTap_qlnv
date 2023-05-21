class DSNV {
    constructor() {
        this.arr = [];
    }

    themNV(nv) {
        this.arr.push(nv);
    }

    xoaNV(taiKhoan) {
        var index = this.findIndex(taiKhoan);
        if (index > -1) {
            this.arr.splice(index, 1);
        }
    }

    findIndex(taiKhoan) {
        return this.arr.findIndex((nv) => nv.taiKhoan == taiKhoan);
    }

    findNV(taiKhoan) {
        var index = this.findIndex(taiKhoan);
        if (index > -1) {
            return this.arr[index];
        }

        return null;
    }

    updateNV(nv) {
        var index = this.findIndex(nv.taiKhoan);
        if (index > -1) {
            this.arr[index] = nv;
        }
    }

    filterNV(loaiNV) {
        return this.arr.filter((nv) => nv.loaiNV == loaiNV);
    }
}
