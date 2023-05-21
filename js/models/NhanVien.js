class NhanVien {
    constructor(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam
    ) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = luongCoBan;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = 0;
        this.loaiNV = "";
    }

    tinhTongLuong() {
        switch (this.chucVu) {
            case "Sếp":
                this.tongLuong = this.luongCoBan * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = this.luongCoBan * 2;
                break;
            default:
                this.tongLuong = this.luongCoBan * 1;
                break;
        }
    }

    xepLoai() {
        if (this.gioLam >= 192) {
            this.loaiNV = "Nhân viên xuất sắc";
        } else if (this.gioLam >= 176) {
            this.loaiNV = "Nhân viên giỏi";
        } else if (this.gioLam >= 160) {
            this.loaiNV = "Nhân viên khá";
        } else {
            this.loaiNV = "Nhân viên trung bình";
        }
    }
}
