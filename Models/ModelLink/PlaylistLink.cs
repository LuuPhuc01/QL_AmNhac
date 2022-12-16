namespace QLBH.Models
{
    public class PlaylistLink
    {
        public int Id { get; set; }
        public string TENPLAYLIST { get; set; } = string.Empty;
        public NguoiDung? NguoiDung { get; set; }
        public List<BaiHat>? BaiHats { get; set; }
    }
}
