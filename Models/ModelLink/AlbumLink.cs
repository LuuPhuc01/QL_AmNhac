using QLBH.Controllers;
using QLBH.Models;

namespace QLBH.Models
{
    public class AlbumLink
    {
        public int Id { get; set; }
        public string TENAL { get; set; } = string.Empty;
        public int? LUOTQUANTAM { get; set; } = 0;
        public DateTime? THOIGIANPH { get; set; } = DateTime.Today;
        public string? ANHAL { get; set; } = string.Empty;
        public List<BaiHat>? BaiHats { get; set; }
        public NgheSi? NgheSi { get; set; }
    }
}
