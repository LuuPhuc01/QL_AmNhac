using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.Admin.Controllers
{
    public class QL_QuocgiaController : Controller
    {
        [Area("admin")]
        public async Task<IActionResult> Index()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            IList<QuocGia> qg = new List<QuocGia>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync("QuocGia/GetAll");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    qg = JsonConvert.DeserializeObject<List<QuocGia>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = qg;

            }
            return View();
        }
    }
}
