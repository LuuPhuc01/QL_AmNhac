using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.Admin.Controllers
{
    public class QL_TheloaiController : Controller
    {
        [Area("admin")]

        public async Task<IActionResult> Index()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            IList<TheLoai> tl = new List<TheLoai>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync("TheLoai/GetAll");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    tl = JsonConvert.DeserializeObject<List<TheLoai>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = tl;

            }
            return View();
        }
    }
}
