namespace QLBH.Models
{
    public class QuocGiaLink
    {
        public int Id { get; set; }
        public string TenQG { get; set; } = string.Empty;
        public List<BaiHat>? BaiHats { get; set; }
    }
}
