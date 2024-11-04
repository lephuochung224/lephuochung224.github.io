
        $(document).ready(function() {
            var i = 2;
            $("#btnDK").click(function() {
                $("#myModal").modal();

            })


            function kiemTraMa() {
                var regex = /^K16-\d{9}$/;
                var Ma = $("#txtMa").val();

                if (Ma == "") {
                    $("#tbMa").html("Bắt buộc nhập");
                    $("#tbMa").addClass("mauDo");
                    $("#tbMa").removeClass("mauXanh");
                    return false;
                } else if (!regex.test(Ma)) {
                    $("#tbMa").html("Nhập sai, mã phải theo mẫu K16-xxxxxxxxx");
                    $("#tbMa").addClass("mauDo");
                    $("#tbMa").removeClass("mauXanh");
                    return false;
                } else {
                    $("#tbMa").html("Nhập đúng rồi");
                    $("#tbMa").addClass("mauXanh");
                    $("#tbMa").removeClass("mauDo");
                    return true;
                }
            }
            $("#txtMa").blur(kiemTraMa);




            function kiemTraHT() {
                var regex = /^([A-Z]{1}[a-z]+)(\s[A-Z]{1}[a-z]*)+$/;
                var hoten = $("#txtHt").val();
                if (hoten == "") {
                    $("#tbTen").html("Bat buoc nhap");
                    $("#tbTen").addClass("mauDo");
                    $("#tbTen").removeClass("mauXanh");
                    return false;
                } else if (regex.test(hoten) == false) {
                    $("#tbTen").html("Họ tên: viết hoa chữu đầu ví dụ: Tran Anh Dung");
                    $("#tbTen").addClass("mauDo");
                    $("#tbTen").removeClass("mauXanh");
                    return false;
                } else {
                    $("#tbTen").html("Nhap dung roi");
                    $("#tbTen").addClass("mauXanh");
                    $("#tbTen").removeClass("mauDo");
                    return true;
                }
            };
            $("#txtHt").blur(kiemTraHT);

            function kiemTraMaLop() {
                var regex = /^[A-Z0-9]{11}$/;
                var Lop = $("#txtLop").val();

                if (Lop == "") {

                    $("#tbLop").html("Bắt buộc nhập");
                    $("#tbLop").addClass("mauDo");
                    $("#tbLop").removeClass("mauXanh");
                    return false;
                } else if (!regex.test(Lop)) {

                    $("#tbLop").html("Nhập sai, mã lớp phải gồm 11 ký tự chữ in hoa và chữ số");
                    $("#tbLop").addClass("mauDo");
                    $("#tbLop").removeClass("mauXanh");
                    return false;
                } else {

                    $("#tbLop").html("Nhập đúng rồi");
                    $("#tbLop").addClass("mauXanh");
                    $("#tbLop").removeClass("mauDo");
                    return true;
                }
            }
            $("#txtLop").blur(kiemTraMaLop);


            function kiemTraNgayThamGia() {
                var ngayThamGiaValue = $("#txtDate").val();

                if (ngayThamGiaValue == "") {

                    $("#tbDate").html("Bắt buộc nhập");
                    $("#tbDate").addClass("mauDo");
                    $("#tbDate").removeClass("mauXanh");
                    return false;
                } else {
                    var ngayThamGia = new Date(ngayThamGiaValue);
                    var ngayHienTai = new Date();


                    ngayHienTai.setDate(ngayHienTai.getDate() + 30);

                    if (ngayThamGia <= ngayHienTai) {

                        $("#tbDate").html("Ngày tham gia phải sau ngày hiện tại ít nhất 30 ngày");
                        $("#tbDate").addClass("mauDo");
                        $("#tbDate").removeClass("mauXanh");
                        return false;
                    } else {

                        $("#tbDate").html("Ngày tham gia hợp lệ");
                        $("#tbDate").addClass("mauXanh");
                        $("#tbDate").removeClass("mauDo");
                        return true;
                    }
                }
            }
            $("#txtDate").blur(kiemTraNgayThamGia);


            function kiemTraDT() {
                var regex = /^0[0-9]{9}$/;
                var DT = $("#txtDt").val();

                if (DT == "") {
                    $("#tbDt").html("Bắt buộc nhập");
                    $("#tbDt").addClass("mauDo");
                    $("#tbDt").removeClass("mauXanh");
                    return false;
                } else if (!regex.test(DT)) {
                    $("#tbDt").html("Nhập sai, Điện thoại theo mẫu: 0xxx-xxx-xxx bắt buộc dùng chữ số 0 ở đầu ");
                    $("#tbDt").addClass("mauDo");
                    $("#tbDt").removeClass("mauXanh");
                    return false;
                } else {
                    $("#tbDt").html("Nhập đúng rồi");
                    $("#tbDt").addClass("mauXanh");
                    $("#tbDt").removeClass("mauDo");
                    return true;
                }
            }
            $("#txtDt").blur(kiemTraDT);

            function kiemTraDC() {
                var regex = /^.{3,15}@iuh.edu.vn$/;
                var diachi = $("#txtDc").val();
                if (diachi == "") {
                    $("#tbDc").html("Bắt buộc nhập");
                    $("#tbDc").addClass("mauDo");
                    $("#tbDc").removeClass("mauXanh");
                    return false;
                } else if (!regex.test(diachi)) {
                    $("#tbDc").html("Nhập sai");
                    $("#tbDc").addClass("mauDo");
                    $("#tbDc").removeClass("mauXanh");
                    return false;
                } else {
                    $("#tbDc").html("dung");
                    $("#tbDc").addClass("mauXanh");
                    $("#tbDc").removeClass("mauDo");
                    return true;
                }
            }
            $("#txtDc").blur(kiemTraDC);


            $("#btnSave").click(function() {
                var ma = $("#txtMa").val();
                var ht = $("#txtHt").val();
                var lop = $("#txtLop").val();
                var date = $("#txtDate").val();
                var dt = $("#txtDt").val();
                var dc = $("#txtDc").val();

                var them = `
                <tr>
                    <td>` + (i++) + `</td> 
                    <td>` + ma + `</td>
                    <td>` + ht + `</td>
                    <td>` + lop + `</td>
                    <td>` + date + `</td>
                    <td>` + dt + `</td>
                    <td>` + dc + `</td>
                </tr>
                `;
                $("#tbDanhSach").append(them);
                $("#myModal").modal("hide");
                return true;
            });
        });
