using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace QLBH.Areas.Admin.Controllers
{

    public class QL_AlbumController : Controller
    {
        [Area("admin")]
        public async Task<IActionResult> Index()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            IList<AlbumLink> qg = new List<AlbumLink>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync("Album/GetAll");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    qg = JsonConvert.DeserializeObject<List<AlbumLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = qg;
                return View();
            }
        }
        [Area("admin")]

        public async Task<IActionResult> ThemAlbum()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                

                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            else
            {
                IList<NgheSi> qg = new List<NgheSi>();
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:7032/api/");

                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage getData = await client.GetAsync("NgheSi/GetAll");

                    if (getData.IsSuccessStatusCode)
                    {
                        string results = getData.Content.ReadAsStringAsync().Result;
                        qg = JsonConvert.DeserializeObject<List<NgheSi>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                    ViewData.Model = qg;

                    return View();
                }
            }
        }
        [Area("admin")]

        [HttpPost]
        public async Task<IActionResult> ThemAlbum(Album album)
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                var response = client.PostAsJsonAsync<Album>("album", album);
                response.Wait();

                var test = response.Result;
                //Console.WriteLine(response.Result);
                if (test.IsSuccessStatusCode)
                {
                    return RedirectToAction("index");
                }
                else
                {
                    Console.WriteLine("error");
                }

            }
            return View("~/admin/QL_NgheSi/ThemNgheSi");
        }
    }
}
