using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class PersonalController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index()
        {
            var Usertoken = HttpContext.Session.GetString("tokenUser");
            if(Usertoken== null)
            {
				return RedirectToAction("Index", "Login", new { area = "User" });
			}
            IList<BaiHatLink> bh = new List<BaiHatLink>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync("BaiHat/GetAll");

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
        public IActionResult PersonalPlaylist()
        {
            return View();
        }
        /*        [Area("user")]
                public IActionResult AddPlaylist()
                {
                    return View();
                }*/
        [Area("User")]
        public async Task<IActionResult> AddPlaylist()
        {
            return View();
        }
        [Area("User")]

        [HttpPost]
        public async Task<IActionResult> AddPlaylist(BaiHat BaiHat)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                var response = client.PostAsJsonAsync<BaiHat>("BaiHat", BaiHat);
                response.Wait();

                var test = response.Result;
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("index");
                }

            }
            return View("~/User/Personal/AddPlaylist");
        }
    }


}
