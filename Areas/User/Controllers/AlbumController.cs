using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class AlbumController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index()
        {
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
        [Area("user")]
        public async Task<IActionResult> ChiTietAlbum(int id)
        {
            HomeModel pm = new HomeModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));



                //ALbum
                HttpResponseMessage getDataALbum = await client.GetAsync($"Album/{id}");


                if (getDataALbum.IsSuccessStatusCode)
                {
                    string results = getDataALbum.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    pm.AlbumLink = JsonConvert.DeserializeObject<AlbumLink>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                //bai hat album

                HttpResponseMessage getData = await client.GetAsync($"Album/GetBaiHatAlbum/{id}");


                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    pm.TopBaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                // bai hat yeu thich
                var Usertoken = HttpContext.Session.GetString("tokenUser");
                //Console.WriteLine(userToken);
                if (Usertoken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                    HttpResponseMessage getDatabhyt = await client.GetAsync("my/BaihatUser/GetAll");


                    if (getDatabhyt.IsSuccessStatusCode)
                    {
                        string results = getDatabhyt.Content.ReadAsStringAsync().Result;
                        //Console.WriteLine(results);
                        pm.BaiHatYeuThichs = JsonConvert.DeserializeObject<List<BaiHat>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                }

                ViewData.Model = pm;

            }
            return View();
        }
    }
}
