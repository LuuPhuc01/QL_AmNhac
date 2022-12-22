namespace QLBH.Models
{
    public class NgheSiViewModel
    {
        public NgheSi? NgheSi { get; set; }
        public List<AlbumLink>? Albums { get; set; }
        public List<BaiHatLink>? BaiHats { get; set; }

        public List<BaiHat>? BaiHatYeuThichs { get; set; }

        public List<PlaylistLink>? Playlists { get; set; }
    }
}
