using QLBH.Models.ModelLink;

namespace QLBH.Models
{
    public class TimKiemModel
    {
        public List<AlbumLink>? Albums { get; set; }
        public List<BaiHatLink>? BaiHats { get; set; }
        public List<NgheSiLink>? NgheSis { get; set; }
    }
}
