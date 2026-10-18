/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const oTimKiem = document.getElementById("o-tim-kiem");
const danhSach = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

function capNhatBoDem() {
	const cacTin = Array.from(danhSach.querySelectorAll("li"));
	const soTinHien = cacTin.filter(tin => !tin.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoaGoc = oTimKiem.value;
	const tuKhoa = tuKhoaGoc.toLowerCase();
	const cacTin = danhSach.querySelectorAll("li");
	let soTinHien = 0;

	for (const tin of cacTin) {
		const vanBan = `${tin.querySelector("h3").textContent} ${tin.querySelector("p").textContent}`.toLowerCase();
		const khop = vanBan.includes(tuKhoa);
		tin.classList.toggle("an", !khop);
		if (khop) {
			soTinHien++;
		}
	}

	if (soTinHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoaGoc}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}
	capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSach.addEventListener("click", (e) => {
	if (!e.target.classList.contains("more")) {
		return;
	}
	const doanVan = e.target.parentNode.querySelector("p");
	const dangMo = doanVan.classList.toggle("day-du");
	e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	if (oTieuDe.value === "" || oNoiDung.value === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const tinMoi = document.createElement("li");
	const ngay = document.createElement("span");
	const tieuDe = document.createElement("h3");
	const noiDung = document.createElement("p");
	const nutMoRong = document.createElement("button");

	ngay.className = "time";
	ngay.textContent = homNay();
	tieuDe.textContent = oTieuDe.value;
	noiDung.textContent = oNoiDung.value;
	nutMoRong.type = "button";
	nutMoRong.className = "more";
	nutMoRong.textContent = "Read more >>";
	tinMoi.append(ngay, tieuDe, noiDung, nutMoRong);
	danhSach.prepend(tinMoi);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});

locTin();
