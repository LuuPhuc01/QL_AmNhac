using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
//using QLBH.Models;
using System.Diagnostics;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class HomeController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index()
        {
            HomeModel homeModel = new HomeModel();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Top Albums
                HttpResponseMessage getDataTopalbums = await client.GetAsync("Album/TopAlbum/5");

                if (getDataTopalbums.IsSuccessStatusCode)
                {
                    string results = getDataTopalbums.Content.ReadAsStringAsync().Result;
                    homeModel.TopAlbums = JsonConvert.DeserializeObject<List<AlbumLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                //Top Albums Nổi bật
                HttpResponseMessage getDataAlbumNB = await client.GetAsync("Album/GetTGPhatHanh/5");

                if (getDataAlbumNB.IsSuccessStatusCode)
                {
                    string results = getDataAlbumNB.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    homeModel.AlbumsNoiBat = JsonConvert.DeserializeObject<List<AlbumLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                //Top BaiHat
                HttpResponseMessage getDataTopBaiHat = await client.GetAsync("BaiHat/GetTop/9");

                if (getDataTopBaiHat.IsSuccessStatusCode)
                {
                    string results = getDataTopBaiHat.Content.ReadAsStringAsync().Result;
                    homeModel.TopBaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = homeModel;

                return View();
            }
        }
        [Area("user")]
        public ActionResult About()
        {
            return View();
        }
    }
}