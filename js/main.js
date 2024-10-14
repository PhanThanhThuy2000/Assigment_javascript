// slide 
var images = [];
for (let i = 0; i < 6; i++) {
    images[i] = new Image();
    images[i].src = "img/" + "img" + i + ".png";
}
var index = 0; //vi tri 

function next() {
    if (index >= images.length) {
        index = 0;
    }
    index++;
    var anh = document.getElementById("anh"); // lấy id ảnh
    anh.src = images[index].src;
}

function prev() {
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
    var anh = document.getElementById("anh"); // lấy id ảnh
    anh.src = images[index].src;
}

function start() {
    t = setInterval("next()", 3000);
}


// Thiết lập thời gian kết thúc Flash Sale
const saleEndTime = new Date().getTime() + (60 * 60 * 10000);

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = saleEndTime - now;

    // Tính toán giờ, phút, giây còn lại
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60); //Tính số phút còn lại:
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    // Hiển thị trên đồng hồ
    // luôn có độ dài 2 ký tự bằng cách thêm số 0 ở đầu nếu cần thiết 
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    // Nếu hết thời gian, dừng đếm ngược và hiển thị thông báo
    if (timeRemaining < 0) {
        clearInterval(interval);
        document.getElementById('clock').style.display = 'none';
        document.getElementById('message').innerText = "Flash Sale đã kết thúc!";
    }
}
// Cập nhật đồng hồ mỗi giây
const interval = setInterval(updateCountdown, 1000);

// Tạo mảng
const arrSP = [{
    ma: "SP0001",
    ten: "S ách dạy làm giàu",
    hinh: "img/sach1.png",
    giaGoc: "400.000",
    gia: "350.000"
}, {
    ma: "SP0002",
    ten: "Sách dạy học quản lý",
    hinh: "img/sach2.png",
    giaGoc: "200.000",
    gia: "150.000"
}, {
    ma: "SP0003",
    ten: "Sách dạy đầu tư",
    hinh: "img/sach3.png",
    giaGoc: "300.000",
    gia: "250.000"
}];

// load dữ liệu sản phẩm 
let str = "";
for (let i = 0; i < arrSP.length; i++) {
    str += `
<div class="colum">
    <div class="sanpham">
        <img src="${arrSP[i].hinh}" alt="">
        <p class="tenSP">${arrSP[i].ten}</p>
        <div class="price">
            <del class="giaGoc">đ${arrSP[i].giaGoc}</del>
            <p class="giaSP">đ${arrSP[i].gia}</p>
        </div>
    </div>
<button class="btnAddCart" onclick="addCart('${arrSP[i].ma}')">Add to Cart</button>
</div>
`;
}
document.querySelector(".dsSp").innerHTML = str;

//hiệu ứng onmouseover
var texts = document.querySelectorAll(".tenSP");
texts.forEach(function(text) {
    text.onmouseover = function() {
        text.style.color = "#F5A623";
    }
    text.onmouseout = function() {
        text.style.color = "";
    }
});

const arrCart = [];

// load dữ liệu giỏ hàng
function displayCart() {
    let cartHTML = "";
    arrCart.forEach((item, index) => { // item sản phẩm,index là chỉ số của sp đó
        let itemTotal = item.sp.gia * item.qty; // tong tien 
        cartHTML += `
    <div class="item-gio-hang">
        <div class="hinh-anh">
           <img src="${item.sp.hinh}" alt="${item.sp.ten}" width="50">
        </div>
        <p class="ten">Tên sản phẩm: ${item.sp.ten}</p>
        
        <div class="giaBan">Gía sản phẩm: ${item.sp.gia} VND</div>
        <input type="number" class="soLuong" value="${item.qty}" onchange="updateQuantity(${index}, this.value)">
        <p class="tongTien">Tổng tiền: ${itemTotal}.000VND</p>
        <button class="hanhDong" onclick="removeFromCart(${index})">Xóa</button>
    </div>
    `;
    });

    document.querySelector(".gio-hang").innerHTML = cartHTML;
}

// Thêm sp
function addCart(maSP) {
    let item;
    let foundInCart = false;

    // Tìm sản phẩm theo mã sản phẩm
    for (let i = 0; i < arrSP.length; i++) {
        if (arrSP[i].ma === maSP) {
            item = arrSP[i];
            break;
        }
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    for (let i = 0; i < arrCart.length; i++) {
        if (arrCart[i].sp.ma === maSP) { // nếu có rồi
            arrCart[i].qty++; //Tăng số lượng sản phẩm trong giỏ hàng lên
            foundInCart = true; // đã có trong giỏ hàng
            break;
        }
    }

    // Nếu sản phẩm không có trong giỏ hàng, hãy thêm nó vào
    if (!foundInCart) {
        let cartItem = {
            sp: item, //Thông tin sản phẩm đã tìm thấy từ arrSP
            qty: 1 // Số lượng sản phẩm, mặc định là 1
        };
        arrCart.push(cartItem); // thêm vào mảng giỏ hàng
    }

    displayCart(); //load lại
}

// cập nhật số lượng qyt
function updateQuantity(index, newQty) {
    arrCart[index].qty = parseInt(newQty); // Truy cập vào sản phẩm tại vị trí index trong giỏ hàng. Chuyển đổi giá trị nhập từ người dùng (thường ở dạng chuỗi) sang kiểu số nguyên
    displayCart(); //load lại
}

// xóa sản phẩm
function removeFromCart(index) {
    arrCart.splice(index, 1); // Xóa 
    displayCart(); // //load lại
}