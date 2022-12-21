using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using QLBH.Models.ModelLink;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class TimkiemController : Controller
    {
        [Area("user")]
        [HttpPost]
        public async Task<IActionResult> Index(string search)
        {
            TimKiemModel tk = new TimKiemModel();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //bai hat
                HttpResponseMessage getData = await client.GetAsync($"TimKiem/Baihat/{search}");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    tk.BaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                //album
                HttpResponseMessage getDataAl = await client.GetAsync($"TimKiem/Album/{search}");

                if (getDataAl.IsSuccessStatusCode)
                {
                    string results = getDataAl.Content.ReadAsStringAsync().Result;
                    tk.Albums = JsonConvert.DeserializeObject<List<AlbumLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                //nghe si
                HttpResponseMessage getDataNS = await client.GetAsync($"TimKiem/NgheSi/{search}");

                if (getDataAl.IsSuccessStatusCode)
                {
                    string results = getDataNS.Content.ReadAsStringAsync().Result;
                    tk.NgheSis = JsonConvert.DeserializeObject<List<NgheSiLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                ViewData.Model = tk;

            }
            return View();
        }
        [Area("user")]
        public IActionResult Timkiem_Baihat()
        {
            return View();
        }
        [Area("user")]
        public IActionResult Timkiem_Playlist_Album()
        {
            return View();
        }
        [Area("user")]
        public IActionResult Timkiem_Casy()
        {
            return View();
        }
    }
}
