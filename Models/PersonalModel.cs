namespace QLBH.Models
{
	public class PersonalModel
	{
		public List<PlaylistLink>? Playlists { get; set; }
		public List<BaiHatLink>? BaiHats { get; set; }

        public List<BaiHatLink>? BaiHatYeuThichs_Playlist { get; set; }


        public Playlist? Playlist { get; set; }

		public string? userToken { get; set; }
	}
}
