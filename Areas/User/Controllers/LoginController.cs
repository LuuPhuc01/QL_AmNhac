using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class LoginController : Controller
    {
        [Area("User")]
        public IActionResult Index()
        {
            return View();
        }
        [Area("User")]
        public async Task<IActionResult> Login(NguoiDung nd)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.PostAsJsonAsync<NguoiDung>("Auth/login", nd);

                response.Wait();

                var test = response.Result;

                if (test.IsSuccessStatusCode)
                {
                    var result = await response.Result.Content.ReadAsStringAsync();

                    var bh = JsonConvert.DeserializeObject<string>(result);
                    //Console.WriteLine(bh);
                    //_contextAccessor.HttpContext.Session.SetString("token", bh);
                    HttpContext.Session.SetString("token", bh);
                    return Redirect("User/Home/Index");
                }
                else
                {
                    return RedirectToAction("Index");
                }

            }
            return View();
        }
    }
}
