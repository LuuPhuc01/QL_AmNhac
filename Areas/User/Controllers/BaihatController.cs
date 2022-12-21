using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using QLBH.Models.ModelLink;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class BaihatController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index(int id)
        {
            NgheSiLink ns = new NgheSiLink();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync($"NgheSi/{id}");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    ns = JsonConvert.DeserializeObject<NgheSiLink>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = ns;
                return View();
            }
        }
    }
}
