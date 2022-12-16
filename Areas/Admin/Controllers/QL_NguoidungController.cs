using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using QLBH.Models;
using Newtonsoft.Json;

namespace QLBH.Areas.Admin.Controllers
{

    public class QL_NguoidungController : Controller
    {
        [Area("admin")]
        public async Task<IActionResult> Index()
        {
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("dangnhap", "ql", new { area = "Admin" });
            }
            IList<NguoiDung> nd = new List<NguoiDung>();
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage getData = await client.GetAsync("User/GetAll");

                if(getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    nd = JsonConvert.DeserializeObject<List<NguoiDung>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                ViewData.Model = nd;

            }
            return View();
        }

    }
}
