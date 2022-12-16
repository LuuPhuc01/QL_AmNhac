
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using QLBH.Models;
using Newtonsoft.Json;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Session;

namespace QLBH.Areas.Admin.Controllers
{

    public class QLController : Controller
    {
        private readonly IHttpContextAccessor _contextAccessor;
       
        //public QLController(IHttpContextAccessor contextAccessor)
        //{
        //    _contextAccessor= contextAccessor;
        //}
        [Area("admin")]
        public ActionResult Index()
        {
            

            //_contextAccessor.HttpContext.Session.SetString("token", "abc");
            //if(_contextAccessor.HttpContext.Session.GetString("token") == null)
            //{
            //    return RedirectToAction("DangNhap");
            //}
            if(HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("DangNhap");
            }
            return Redirect("QL_BaiHat/index");

        }
        [Area("admin")]
        public ActionResult DangNhap()
        {
            return View();
        }
        [Area("admin")]
        [HttpPost]
        public async Task<IActionResult> DangNhap(NguoiDung nd)
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
                    return RedirectToAction("index");
                }
                else
                {
                    Console.WriteLine("error");
                }

            }
            return View();
        }
        [Area("admin")]
        public ActionResult DangXuat()
        {
            HttpContext.Session.Remove("token");
            if (HttpContext.Session.GetString("token") == null)
            {
                return RedirectToAction("DangNhap");
            }
            return Redirect("QL_BaiHat/index");

        }
    }
}
