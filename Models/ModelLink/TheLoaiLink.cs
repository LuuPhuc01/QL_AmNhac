namespace QLBH.Models
{
    public class TheLoaiLink
    {
        public int Id { get; set; }
        public string TenTL { get; set; } = string.Empty;
        public List<BaiHat>? BaiHats { get; set; }
    }
}
