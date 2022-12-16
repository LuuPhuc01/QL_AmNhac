using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.Admin.Controllers
{

    public class QL_NghesyController : Controller
    {
        [Area("admin")]
        public async Task<IActionResult> Index()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
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
}
