using QLBH.Controllers;
using QLBH.Models;
namespace QLBH.Models
{
    public class BaiHatLink
    {
        public int Id { get; set; }
        public string TENBAIHAT { get; set; } = string.Empty;
        public string? LOIBAIHAT { get; set; }
        public int? LUOTYEUTHICH { get; set; }
        public int? LUOTNGHE { get; set; }
        public string? THOILUONG { get; set; }
        public string? ANHBH { get; set; }
        public string? LINKBH { get; set; }
        public string? LINKANHPN { get; set; }
        public Album? Album { get; set; }
        public List<NgheSi>? Casi { get; set; }
        public TheLoai? TheLoai { get; set; }
        public QuocGia? QuocGia { get; set; }
        public List<NguoiDung>? NguoiDungs { get; set; }
        public List<Playlist>? Playlists { get; set; }
    }
}
