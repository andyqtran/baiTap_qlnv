function domId(id) {
    return document.getElementById(id);
}
var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();

// Lấy thông tin nhân viên
function getInfo(isAdd) {
    var taiKhoan = domId("tknv").value;
    var hoTen = domId("name").value;
    var email = domId("email").value;
    var matKhau = domId("password").value;
    var ngayLam = domId("datepicker").value;
    var luongCoBan = domId("luongCB").value;
    var chucVu = domId("chucVu").value;
    var gioLam = domId("gioLam").value;

    // Validation tài khoản
    var isValid = true;
    if (isAdd) {
        isValid &=
            validation.kiemTraRong(
                taiKhoan,
                "tbTKNV",
                "(*) Vui lòng không nhập rỗng"
            ) &&
            validation.kiemTraMinMaxKiTu(
                taiKhoan,
                "tbTKNV",
                "(*) Vui lòng nhập từ 4 tới 6 kí tự",
                4,
                6
            ) &&
            validation.kiemTraTrungTaiKhoan(
                taiKhoan,
                "tbTKNV",
                "(*) Tài khoản này đã tồn tại",
                dsnv.arr
            );
    }
    // Validation tên nhân viên
    isValid &=
        validation.kiemTraRong(
            hoTen,
            "tbTen",
            "(*) Vui lòng không nhập rỗng"
        ) &&
        validation.kiemTraPattern(
            hoTen,
            "tbTen",
            "(*) Vui lòng nhập tên hợp lệ",
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );

    // Validation email
    isValid &=
        validation.kiemTraRong(
            email,
            "tbEmail",
            "(*) Vui lòng không nhập rỗng"
        ) &&
        validation.kiemTraPattern(
            email,
            "tbEmail",
            "(*) Vui lòng nhập email hợp lệ",
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );

    // Validation mật khẩu
    isValid &=
        validation.kiemTraRong(
            matKhau,
            "tbMatKhau",
            "(*) Vui lòng không nhập rỗng"
        ) &&
        validation.kiemTraPattern(
            matKhau,
            "tbMatKhau",
            "(*) Vui lòng nhập mật khẩu hợp lệ",
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
        ) &&
        validation.kiemTraMinMaxKiTu(
            matKhau,
            "tbMatKhau",
            "(*) Vui lòng nhập mật khẩu từ 6 tới 10 kí tự",
            6,
            10
        );

    // Validation ngày làm
    isValid &=
        validation.kiemTraRong(
            ngayLam,
            "tbNgay",
            "(*) Vui lòng không nhập rỗng"
        ) &&
        validation.kiemTraPattern(
            ngayLam,
            "tbNgay",
            "(*) Vui lòng nhập ngày hợp lệ",
            /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
        );

    // Validation lương cơ bản
    isValid &=
        validation.kiemTraRong(
            luongCoBan,
            "tbLuongCB",
            "(*) Vui lòng không nhập rỗng"
        ) &&
        validation.kiemTraMinMax(
            luongCoBan,
            "tbLuongCB",
            "(*) Vui lòng nhập lương cơ bản từ 1.000.000 tới 20.000.000",
            1000000,
            20000000
        );

    // Validation chức vụ
    isValid &= validation.kiemTraChucVu(
        "chucVu",
        "tbChucVu",
        "(*) Vui lòng chọn chức vụ"
    );

    // Validation giờ làm
    isValid &=
        validation.kiemTraRong(
            gioLam,
            "tbGiolam",
            "(*) Vui lòng không nhập rỗng"
        ) &&
        validation.kiemTraMinMax(
            gioLam,
            "tbGiolam",
            "(*) Vui lòng nhập giờ làm từ 80 giờ tới 200 giờ",
            80,
            200
        );

    if (isValid) {
        var nv = new NhanVien(
            taiKhoan,
            hoTen,
            email,
            matKhau,
            ngayLam,
            luongCoBan,
            chucVu,
            gioLam
        );

        nv.tinhTongLuong();
        nv.xepLoai();

        return nv;
    }

    return null;
}

// Render table
function renderTable(array) {
    if (array) {
        var content = array.map(
            (nv) =>
                `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNV}</td>
            <td class="d-flex">
            <button class="btn btn-warning mr-1"onclick="editNhanVien('${nv.taiKhoan}')" data-toggle="modal"
            data-target="#myModal"><i class="fa-solid fa-pencil"></i></button>
            <button class="btn btn-danger"><i class="fa-solid fa-trash-can" onclick="xoaNhanVien('${nv.taiKhoan}')"></i></button>
            </td>
            </tr>`
        );
        domId("tableDanhSach").innerHTML = content.join("");
    }
}

// Thêm Nhân viên
function themNhanVien() {
    domId("btnThemNV").classList.remove("none");
    var nv = getInfo(true);
    if (nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.arr);
        setLocalStorage();
    }
}
domId("btnThemNV").addEventListener("click", themNhanVien);
domId("btnThem").onclick = () => {
    domId("tknv").disabled = false;
    domId("btnThemNV").classList.remove("none");
    domId("btnCapNhat").classList.add("none");
    domId("modalForm").reset();
};

// Set local storage
function setLocalStorage() {
    localStorage.setItem("dsnv", JSON.stringify(dsnv.arr));
}

// get local storage
function getLocalStorage() {
    if (localStorage.getItem("dsnv")) {
        dsnv.arr = JSON.parse(localStorage.getItem("dsnv"));
        renderTable(dsnv.arr);
    }
}

// Xóa nhân viên
function xoaNhanVien(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage();
}

// edit nhân viên
function editNhanVien(taiKhoan) {
    domId("btnCapNhat").classList.remove("none");
    domId("btnThemNV").classList.add("none");
    var nv = dsnv.findNV(taiKhoan);

    domId("tknv").value = nv.taiKhoan;
    domId("tknv").disabled = true;

    domId("name").value = nv.hoTen;
    domId("email").value = nv.email;
    domId("password").value = nv.matKhau;
    domId("datepicker").value = nv.ngayLam;
    domId("luongCB").value = nv.luongCoBan;
    domId("chucVu").value = nv.chucVu;
    domId("gioLam").value = nv.gioLam;
}

// Cập nhật nhân viên
function capNhatNhanVien() {
    var currNv = getInfo(false);
    if (currNv) {
        dsnv.updateNV(currNv);
        renderTable(dsnv.arr);
        setLocalStorage();
    }
}
domId("btnCapNhat").addEventListener("click", capNhatNhanVien);

function timNhanVien() {
    var loaiNV = domId("filterLoaiNV").value;
    var filterArray = dsnv.filterNV(loaiNV);

    if (loaiNV == "Loại nhân viên") {
        renderTable(dsnv.arr);
    } else {
        renderTable(filterArray);
    }
}
domId("filterLoaiNV").addEventListener("change", timNhanVien);
