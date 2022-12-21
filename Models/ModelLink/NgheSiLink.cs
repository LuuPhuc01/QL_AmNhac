namespace QLBH.Models.ModelLink
{
    public class NgheSiLink
    {
        public int Id { get; set; }
        public string TenNS { get; set; } = string.Empty;
        public string GioiThieu { get; set; } = string.Empty;
        public string AnhNS { get; set; } = string.Empty;
        public List<BaiHat>? BaiHats { get; set; }
        public List<Album>? Album { get; set; }
    }
}
