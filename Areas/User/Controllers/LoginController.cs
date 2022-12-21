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
                    HttpContext.Session.SetString("tokenUser", bh);
                    //Console.WriteLine(HttpContext.Session.GetString("tokenUser"));

                    return RedirectToAction("Index", "Personal", new { area = "User" });
                }
                else
                {
                    return RedirectToAction("Index");
                }

            }
            //return View();
        }
        [Area("User")]

        public async Task<IActionResult> Register(NguoiDung nd)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.PostAsJsonAsync<NguoiDung>("Auth/register", nd);

                response.Wait();
                //Console.WriteLine(response.Result);

                //var test = response.Result;

                if (response.Result.IsSuccessStatusCode)
                {
                    
                    //return RedirectToAction("Index", "Home", new { area = "User" });

                    var responselogin = client.PostAsJsonAsync<NguoiDung>("Auth/login", nd);

                    response.Wait();

                    var test = responselogin.Result;

                    if (test.IsSuccessStatusCode)
                    {
                        var result = await responselogin.Result.Content.ReadAsStringAsync();

                        var bh = JsonConvert.DeserializeObject<string>(result);
                        //Console.WriteLine(bh);
                        HttpContext.Session.SetString("tokenUser", bh);

                        return RedirectToAction("Index", "Personal", new { area = "User" });
                    }
                    else
                    {
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    return RedirectToAction("Index");
                }

            }

        }
        [Area("User")]

        public ActionResult LogOut()
        {
            HttpContext.Session.Remove("tokenUser");
            if (HttpContext.Session.GetString("tokenUser") == null)
            {
                return RedirectToAction("Index", "Home", new { area = "User" });

            }
            return RedirectToAction("Index", "Personal", new { area = "User" });


        }
    }
}
