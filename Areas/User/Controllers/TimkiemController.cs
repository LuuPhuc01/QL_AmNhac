using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class TimkiemController : Controller
    {
        [Area("user")]
        [HttpPost]
        public async Task<IActionResult> Index(string search)
        {
            IList<BaiHatLink> bh = new List<BaiHatLink>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync($"TimKiem/{search}");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    bh = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = bh;

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
