namespace QLBH.Models
{
    public class HomeModel
    {


		public List<AlbumLink>? TopAlbums { get; set; }
		public List<AlbumLink>? AlbumsNoiBat { get; set; }
		public AlbumLink? AlbumLink { get; set; }
		public List<BaiHatLink>? TopBaiHats { get; set; }
        public List<BaiHat>? BaiHatYeuThichs { get; set; }

    }
}
