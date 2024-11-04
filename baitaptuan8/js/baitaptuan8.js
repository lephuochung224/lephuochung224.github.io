$(document).ready(function() {
    var i = 2;
    $("#btnDK").click(function() {
        $("#myModal").modal();
    });

    function kiemTraMA() {
        var mauKT = /^[0-9]{9}$/;
        if (!mauKT.test($("#txtMa").val())) {
            $("#tbMa").html("Mã học viên phải có 9 chữ số").addClass("mauDo");
        } else {
            $("#tbMa").html("");
                }
    }
        $("#txtMa").blur(kiemTraMA);
        
        
        function kiemtraHT() {
            var kt = /^([A-Z]{1}[a-z]+)(\s[A-Z]{1}[a-z]*)+$/;
            if ( $("#txtHT").val() == ""){
                $("#tbTen").html("Bắt buộc nhập").addClass("mauDo");
                return false;
            } 
            if (!kt.test($("#txtHT").val())) {
                $("#tbTen").html("Chữ cái đầu mỗi từ phải viết hoa !!").addClass("mauDo");
                return  false;
            } 
                $("#tbTen").html("");
                return true;
                
            
        }
            $("#txtHT").blur(kiemtraHT);
            
            function kiemtraDC() {
                var mauKT1 = /^[a-z0-9-_]{3,15}$/;
                var mauKT = /(abc)$/;
                if ( $("txtbEmail").val() == ""){
                    $("#tbEmail").html("Bắt buộc nhập").addClass("mauDo");
                    return false;
                } 
                if (!mauKT.test($("#txtDC").val())) {
                    $("#tbEmail").html("Email phải kết thúc bằng abc").addClass("mauDo");
                    return  false;
                } 
                    $("#tbEmail").html("");
                    return true;
                
            }
                $("#txtDC").blur(kiemtraDC);

                $("#slGia").change(function(){
                    $("#slGia option:selected").each(function() {
                        $("#txtDV").val($(this).val());
                        
                    });
                });

                $(".chkDoDung").click(function(){
                    var tienDD = 0;
                    $(".chkDoDung:checked").each(function(){
                        tienDD += parseFloat($(this).val());
                    });
                    $("#txtDD").val(tienDD);

                    var tong = parseFloat($("#txtDD").val()) + parseFloat($("#txtDV").val() || 0);
                    $("#txtTong").val(tong);
                });

                $("#btnSave").click(function() {
                    var ma = $("#txtMa").val();
                    var ht = $("#txtHT").val();
                    var dc = $("#txtDC").val();
                    var tdv = $("#txtDV").val();
                    var tdd = $("#txtDD").val();
                    var tong = $("#txtTong").val();
                    var them = "<tr><td>" + (i++) + "</td><td>" + ma + "</td><td>" + ht + "</td><td>" + dc + "</td><td>" + tdv + "</td><td>" + tdd + "</td><td>" + tong + "</td></tr>";
                    $("#tbDanhSach").append(them);
                    $("#myModal").modal("hide");
                    return true;
                });

                

});
